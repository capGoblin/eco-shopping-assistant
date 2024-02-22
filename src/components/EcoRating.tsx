import React from "react";
import ProgressBar from "./ProgressBar";
interface EcoRating {
  Material: number;
  "Energy Efficiency": number;
  Transportation: number;
  "End-of-Life Management": number;
  "Overall Eco-Friendliness Rating": number;
}
interface EcoRatingProps {
  ecoRating: EcoRating;
}
const EcoRating = ({ ecoRating }: EcoRatingProps) => {
  return (
    <div>
      <div className="">Material: </div>
      <ProgressBar progress={ecoRating?.Material!} />
      <div>Energy Efficiency: </div>
      <ProgressBar progress={ecoRating?.["Energy Efficiency"]!} />
      <div>Transportation: </div>
      <ProgressBar progress={ecoRating?.Transportation!} />
      <div>End-of-Life Management: </div>
      <ProgressBar progress={ecoRating?.["End-of-Life Management"]!} />
      <div>Overall Eco-Friendliness Rating: </div>
      <ProgressBar progress={ecoRating?.["Overall Eco-Friendliness Rating"]!} />
    </div>
  );
};

export default EcoRating;
