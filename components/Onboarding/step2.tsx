import React from "react";
import { IStepProps } from "@/components/Onboarding/index";
import StepActions from "@/components/Onboarding/step_actions";

const Step2: React.FC<IStepProps> = (props) => (
  <>
    <div className="grow ml-4">
      <h1 className="text-4xl font-bold mb-3">
        Quels critères souhaites-tu mettre en avant ?
      </h1>
    </div>
    <StepActions {...props} />
  </>
);

export default Step2;
