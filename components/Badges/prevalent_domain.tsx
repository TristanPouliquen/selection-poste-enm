import React from "react";
import { Position } from "@/types/types";

interface IProps {
  position: Position;
}
const PrevalentDomainBadge = ({ position }: IProps) => (
  <div className="badge badge-outline rounded-lg ml-3">
    {position.prevalentDomain}
  </div>
);

export default PrevalentDomainBadge;
