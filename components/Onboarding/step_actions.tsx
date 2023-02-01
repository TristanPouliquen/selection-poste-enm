import React from "react"
import {IStepProps} from "@/components/Onboarding/index";

const StepActions : React.FC<IStepProps> = ({ exitOnboarding, nextStep}) =>
    <div className="modal-action justify-between items-baseline">
        <a className="link link-secondary" onClick={exitOnboarding}>Quitter l&apos;onboarding</a>
        <button className="btn btn-primary" onClick={nextStep}>Suivant</button>
    </div>

export default StepActions