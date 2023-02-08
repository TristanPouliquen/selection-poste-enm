import React from "react";
import { IStepProps } from "@/components/Onboarding/index";
import StepActions from "@/components/Onboarding/step_actions";

const Step1 = (props: IStepProps) => (
  <>
    <div className="grow hero">
      <div className="hero-content text-center max-w-full">
        <div>
          <h1 className="text-5xl font-bold">
            Bienvenue à la sélection de ton premier poste
          </h1>
          <h2 className="text-xl py-6">
            Pour te faciliter la tâche, ces quelques étapes vont te permettre de
            faire un premier tri.
          </h2>
          <p className="w-3/5 mx-auto">
            Tu vas pouvoir sélectionner plusieurs critères, et en fonction de
            ceux mis en avant ou à éviter, un premier classement automatique
            sera effectué.
          </p>
          <p className="py-4">En espérant que cet outil te rende service !</p>
        </div>
      </div>
    </div>
    <StepActions {...props} />
  </>
);

export default Step1;
