import React from "react";
import { ICriterion } from "@/components/Onboarding/index";

interface IProps {
  criterion: ICriterion;
  index: number;
}

const getCriterionValues = (criterion: ICriterion) => {
  if (Array.isArray(criterion.value)) {
    return criterion.value.map((item: any) => item.name).join(", ");
  } else {
    return criterion.value.label;
  }
};

const CriterionDisplay = ({ criterion, index }: IProps) => (
  <div className="p-2 flex flex-row">
    <p className="w-1/3">{`${index + 1}. ${criterion.label}`}</p>
    <p>{getCriterionValues(criterion)}</p>
  </div>
);

export default CriterionDisplay;
