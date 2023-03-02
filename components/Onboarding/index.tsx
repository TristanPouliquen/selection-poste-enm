import React, { createContext, useContext, useState } from "react";
import Step1 from "@/components/Onboarding/step1";
import Step2 from "@/components/Onboarding/step2";
import Step3 from "@/components/Onboarding/step3";
import Step4 from "@/components/Onboarding/step4";
import { appStateAtom, useAppStateAction, usePositionsActions } from "@/_state";
import { useRecoilValue } from "recoil";
import Stepper from "@/components/Onboarding/stepper";

export interface IStepProps {
  exitOnboarding: () => void;
  nextStep: () => void;
  confirmRanking: () => void;
}
export interface ICriterion {
  name: string;
  label: string;
  value: (number | string)[];
}
export interface ICriteria {
  positive: ICriterion[];
  negative: ICriterion[];
}
export const CriteriaContext = createContext<{
  criteria: ICriteria;
  setCriteria: (criteria: ICriteria) => void;
}>({
  criteria: { positive: [], negative: [] },
  setCriteria: () => {},
});
const OnboardingModal = () => {
  const [criteria, setCriteria] = useState<ICriteria>({
    positive: [],
    negative: [],
  });
  const [step, setStep] = useState<number>(1);
  const appState = useRecoilValue(appStateAtom);
  const { update } = useAppStateAction();
  const { rankPositions } = usePositionsActions();
  const exitOnboarding = () =>
    appState ? update({ ...appState, onboarded: true }) : null;
  const nextStep = () => setStep(step + 1);
  const confirmRanking = () => {
    rankPositions(criteria).then(exitOnboarding).catch(console.error);
  };
  const navigateTo = (actualStep: number, targetStep: number) =>
    targetStep > 0 && targetStep < actualStep ? setStep(targetStep) : null;
  let Component: React.FC<IStepProps>;
  switch (step) {
    case 2:
      Component = Step2;
      break;
    case 3:
      Component = Step3;
      break;
    case 4:
      Component = Step4;
      break;
    case 1:
    default:
      Component = Step1;
  }
  return (
    <div className="modal modal-open">
      <div className="modal-box h-5/6 max-w-6xl flex flex-col overflow-hidden">
        <Stepper step={step} navigateTo={navigateTo} />
        <CriteriaContext.Provider value={{ criteria, setCriteria }}>
          <Component
            exitOnboarding={exitOnboarding}
            nextStep={nextStep}
            confirmRanking={confirmRanking}
          />
        </CriteriaContext.Provider>
      </div>
    </div>
  );
};

export default OnboardingModal;
