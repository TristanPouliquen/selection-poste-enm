import React, { useContext } from "react";
import { CriteriaContext, IStepProps } from "@/components/Onboarding/index";
import CriterionDisplay from "@/components/Onboarding/criterion_display";

const Step4 = ({ exitOnboarding, confirmRanking }: IStepProps) => {
  const { criteria } = useContext(CriteriaContext);
  return (
    <>
      <div className="grow ml-4 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-3">Récap</h1>
        <p>
          Voici le résumé de tes choix, si cela est bon pour toi, clique sur
          &quot;Confirmer&quot; !
        </p>
        <h2 className="text-2xl font-bold my-3">Critères mis en avant</h2>
        {criteria.positive.map((criterion, index) => (
          <CriterionDisplay
            key={`criterion_display_positive_${index}`}
            criterion={criterion}
            index={index}
          />
        ))}
        <h2 className="text-2xl font-bold my-3">Critères déclassés</h2>
        {criteria.negative.map((criterion, index) => (
          <CriterionDisplay
            key={`criterion_display_negative_${index}`}
            criterion={criterion}
            index={index}
          />
        ))}
      </div>
      <div className="modal-action justify-between items-baseline">
        <a className="link link-secondary" onClick={exitOnboarding}>
          Quitter l&apos;onboarding
        </a>
        <button className="btn btn-primary" onClick={confirmRanking}>
          Confirmer
        </button>
      </div>
    </>
  );
};

export default Step4;
