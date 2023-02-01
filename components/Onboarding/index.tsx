import React, {useState} from "react"
import Step1 from "@/components/Onboarding/step1";
import Step2 from "@/components/Onboarding/step2";
import Step3 from "@/components/Onboarding/step3";
import Step4 from "@/components/Onboarding/step4";

export interface IStepProps {
    exitOnboarding: () => void,
    nextStep: () => void
}
const OnboardingModal: React.FC = () => {
    const [step, setStep] = useState<number>(1)
    const exitOnboarding = () => console.log("skip")
    const nextStep = () => setStep(step+1)
    const navigateTo = (actualStep: number, targetStep: number) => targetStep > 0 && targetStep < actualStep ? setStep(targetStep) : null
    let Component: React.FC<IStepProps>
    switch (step) {
        case 2:
            Component = Step2
            break
        case 3:
            Component = Step3
            break
        case 4:
            Component = Step4
            break
        case 1:
        default:
            Component = Step1
    }
    return <div className="modal modal-open">
        <div className="modal-box h-5/6 max-w-6xl flex flex-col">
            <ul className="steps w-full text-center mb-10">
                <li
                    onClick={() => navigateTo(step, 1)}
                    className={`step ${step>0 ? 'step-secondary cursor-pointer' : null}`}
                >Bienvenue !</li>
                <li
                    onClick={() => navigateTo(step, 2)}
                    className={`step ${step>1 ? 'step-secondary cursor-pointer' : null}`}
                >Mes favoris</li>
                <li
                    onClick={() => navigateTo(step, 3)}
                    className={`step ${step>2 ? 'step-secondary cursor-pointer' : null}`}
                >À éviter</li>
                <li
                    className={`step ${step>3 ? 'step-secondary cursor-pointer' : null}`}
                >Résumé</li>
            </ul>
            <Component exitOnboarding={exitOnboarding} nextStep={nextStep}/>
        </div>

    </div>
}

export default OnboardingModal