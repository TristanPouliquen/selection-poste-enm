import React from "react";
import { Position } from "@/types/types";

interface IProps {
  position: Position;
}

const PlacedBadge = ({ position }: IProps) =>
  position.placed ? (
    <div className="badge rounded-lg badge-secondary mr-2">Placé</div>
  ) : null;

export default PlacedBadge;
