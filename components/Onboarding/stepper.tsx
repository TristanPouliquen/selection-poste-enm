import React from "react";

interface IProps {
  step: number;
  navigateTo: (source: number, destination: number) => void;
}
const Stepper = ({ step, navigateTo }: IProps) => (
  <ul className="steps w-full text-center mb-10">
    <li
      onClick={() => navigateTo(step, 1)}
      className={`step ${step > 0 ? "step-secondary cursor-pointer" : null}`}
    >
      Bienvenue !
    </li>
    <li
      onClick={() => navigateTo(step, 2)}
      className={`step ${step > 1 ? "step-secondary cursor-pointer" : null}`}
    >
      Mes favoris
    </li>
    <li
      onClick={() => navigateTo(step, 3)}
      className={`step ${step > 2 ? "step-secondary cursor-pointer" : null}`}
    >
      À éviter
    </li>
    <li className={`step ${step > 3 ? "step-secondary cursor-pointer" : null}`}>
      Résumé
    </li>
  </ul>
);

export default Stepper;
