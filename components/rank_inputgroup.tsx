import React from "react";
import { Position } from "@/types/types";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface IProps {
  position: Position;
  updatePosition: (position: Position) => void;
}
const RankInputGroup = ({ position, updatePosition }: IProps) => (
  <div className="form-control mr-6">
    <div className="input-group">
      <button
        className="btn btn-square font-bold"
        onClick={() =>
          updatePosition({ ...position, ranking: position.ranking + 10 })
        }
      >
        <ArrowDownIcon /> +10
      </button>
      <input
        type="number"
        className="input input-bordered w-16 appearance-textfield"
        value={position.ranking}
        onChange={(event) =>
          updatePosition({ ...position, ranking: parseInt(event.target.value) })
        }
      />
      <button
        className="btn btn-square font-bold"
        onClick={() =>
          updatePosition({ ...position, ranking: position.ranking - 10 })
        }
      >
        <ArrowUpIcon /> -10
      </button>
    </div>
  </div>
);

export default RankInputGroup;
