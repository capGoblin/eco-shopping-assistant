import express from "express";
import { createClient } from "@supabase/supabase-js";
import { exec } from "child_process";
import { supabase } from "./supabaseClient";
const app = express();
const port = 3000;

app.get("/run-script", (req, res) => {
  exec("ts-node ./script/index.ts", async (execError, stdout, stderr) => {
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

    // Update the productDetails table in Supabase
    const { data, error } = await supabase
      .from("productDetails")
      .insert(productDetails);

    if (error) {
      console.error("Error updating Supabase:", error);
      res.status(500).send("Error updating Supabase");
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
