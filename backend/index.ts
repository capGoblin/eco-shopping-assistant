import express from "express";
import { createClient } from "@supabase/supabase-js";
import { exec } from "child_process";
import { supabase } from "./supabaseClient";
import generateEcoRating from "./script/openai-api";
import stringToJSON from "./lib/stringToJSON";
const app = express();
const port = 3000;
interface EcoRating {
  Material: number;
  "Energy Efficiency": number;
  Transportation: number;
  "End-of-Life Management": number;
  "Overall Eco-Friendliness Rating": number;
}

app.get("/run-script/:productUrl", (req, res) => {
  const productUrl = decodeURIComponent(req.params.productUrl);

  exec(
    `ts-node ./script/index.ts "${productUrl}"`,
    async (execError, stdout, stderr) => {
      if (execError) {
        console.log(`error executing script: ${execError.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      // Parse the script output
      const productDetails = JSON.parse(stdout);
      console.log(productDetails);

      // Update the productDetails table in Supabase
      const { error } = await supabase
        .from("productDetails")
        .insert(productDetails);

      if (error) {
        console.error("Error updating Supabase:", error);
        res.status(500).send("Error updating Supabase");
      } else {
        const { img_src, ...rest } = productDetails;
        const productDetailsWithoutImage = rest;
        const ecoRating = await generateEcoRating(productDetailsWithoutImage)
          .then((ecoRating) => {
            // console.log("Eco-friendliness rating:", ecoRating);
            return ecoRating;
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        console.log(productDetails);
        const formattedEcoRating: EcoRating = stringToJSON(ecoRating!);
        console.log(formattedEcoRating);
        res.send([productDetails, formattedEcoRating]);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
