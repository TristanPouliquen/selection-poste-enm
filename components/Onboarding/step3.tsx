import React from "react";
import { IStepProps } from "@/components/Onboarding/index";
import StepActions from "@/components/Onboarding/step_actions";

const Step3: React.FC<IStepProps> = (props) => (
  <>
    <div className="grow ml-4">
      <h1 className="text-4xl font-bold mb-3">
        Quels critères souhaites-tu déclasser ?
      </h1>
    </div>
    <StepActions {...props} />
  </>
);

export default Step3;
