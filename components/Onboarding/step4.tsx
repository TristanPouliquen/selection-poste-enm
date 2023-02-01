import React from "react"
import {IStepProps} from "@/components/Onboarding/index";

const Step4: React.FC<IStepProps> = ({ exitOnboarding }) =>
    <>
        <div className="grow ml-4">
            <h1 className="text-4xl font-bold mb-3">Récap</h1>
            <p>Voici le résumé de tes choix, si cela est bon pour toi, clique sur &quot;Confirmer&quot; !</p>
            <h2 className="text-2xl font-bold my-3">Critères mis en avant</h2>
            <h2 className="text-2xl font-bold my-3">Critères déclassés</h2>
        </div>
        <div className="modal-action justify-between items-baseline">
            <a className="link link-secondary" onClick={exitOnboarding}>Quitter l&apos;onboarding</a>
            <button className="btn btn-primary loading">Confirmer</button>
        </div>
    </>

export default Step4