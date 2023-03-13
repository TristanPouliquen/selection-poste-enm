import React from "react";
import { IStepProps } from "@/components/Onboarding/index";
import StepActions from "@/components/Onboarding/step_actions";
import CriterionForm from "@/components/Onboarding/criterion_form";

const Step3 = (props: IStepProps) => (
  <>
    <div className="grow ml-4 flex flex-col overflow-y-auto">
      <h1 className="text-4xl font-bold mb-3">
        Quels critères souhaites-tu déclasser ?
      </h1>
      <CriterionForm stage="negative" />
    </div>
    <StepActions {...props} />
  </>
);

export default Step3;
