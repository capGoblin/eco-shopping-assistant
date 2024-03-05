import React from "react";
import ProgressBar from "./ProgressBar";
import { EcoRating } from "../App";
import extractNumbers from "../lib/extractNumbers";
// interface EcoRating {
//   Material: number;
//   "Energy Efficiency": number;
//   Transportation: number;
//   "End-of-Life Management": number;
//   "Overall Eco-Friendliness Rating": number;
// }
interface EcoRatingProps {
  ecoRating: EcoRating;
}
const DisplayEcoRating = ({ ecoRating }: EcoRatingProps) => {
  const cleanedObj = Object.fromEntries(
    Object.entries(ecoRating)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );
  return (
    <div>
      <div className="">
        <strong>Material: </strong> {cleanedObj?.Material!}
      </div>
      <ProgressBar progress={extractNumbers(cleanedObj?.Material!)} />
      <div>
        <strong>Energy Efficiency</strong> {cleanedObj?.["Energy Efficiency"]!}
      </div>
      <ProgressBar progress={extractNumbers(cleanedObj?.["Energy Efficiency"]!)} />
      <div>
        <strong>Transportation:</strong> {cleanedObj?.Transportation!}{" "}
      </div>
      <ProgressBar progress={extractNumbers(cleanedObj?.Transportation!)} />
      <div>
        <strong>End-of-Life Management:</strong>{" "}
        {cleanedObj?.["End-of-Life Management"]! || cleanedObj?.["Endof-Life Management"]}{" "}
      </div>
      <ProgressBar progress={extractNumbers(cleanedObj?.["End-of-Life Management"]! || cleanedObj?.["Endof-Life Management"])} />
      <div>
        <strong>Overall Eco-Friendliness Rating: </strong>{" "}
        {cleanedObj?.["Overall Eco-Friendliness Rating"]! || cleanedObj?.["Overall EcoFriendliness Rating"]}
      </div>
      <ProgressBar progress={extractNumbers(cleanedObj?.["Overall Eco-Friendliness Rating"]! || cleanedObj?.["Overall EcoFriendliness Rating"])} />
    </div>
  );
};

export default DisplayEcoRating;
