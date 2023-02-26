import React from "react";
import { Position } from "@/types/types";

interface IProps {
  position: Position;
}
const PrevalentDomainBadge = ({ position }: IProps) => (
  <div className="badge badge-outline rounded-lg mr-2">
    {position.prevalentDomain}
  </div>
);

export default PrevalentDomainBadge;
