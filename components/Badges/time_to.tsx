import React from "react";
import { formatDuration, intervalToDuration } from "date-fns";
import { fr } from "date-fns/locale";
import { Tribunal } from "@/types/types";

interface IProps {
  tribunal: Tribunal;
}
const TimeToBadge = ({ tribunal }: IProps) => {
  const duration = intervalToDuration({
    start: new Date(0),
    end: new Date((tribunal.timeTo ?? 0) * 60 * 1000),
  });
  return (
    <span
      className="badge badge-outline"
      style={
        tribunal.timeWindow ? { color: tribunal.timeWindow.color } : undefined
      }
    >
      {formatDuration(duration, { locale: fr })}
    </span>
  );
};

export default TimeToBadge;
