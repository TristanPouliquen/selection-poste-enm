import React from "react";
import { IStepProps } from "@/components/Onboarding/index";
import StepActions from "@/components/Onboarding/step_actions";
import CriterionForm from "@/components/Onboarding/criterion_form";

const Step2 = (props: IStepProps) => (
  <>
    <div className="grow ml-4 flex flex-col overflow-y-auto">
      <h1 className="text-4xl font-bold mb-3">
        Quels critères souhaites-tu mettre en avant ?
      </h1>
      <CriterionForm stage="positive" />
    </div>
    <StepActions {...props} />
  </>
);

export default Step2;
