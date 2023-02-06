import React, { MouseEvent } from "react";
import { Position } from "@/types/types";
import { BackpackIcon, EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useSetRecoilState } from "recoil";
import { currentPositionAtom } from "@/_state";

interface IProps {
  position: Position;
}
const CardSmall = ({ position }: IProps) => {
  const setCurrentPosition = useSetRecoilState(currentPositionAtom);
  const toggleTaken = (e: MouseEvent) => {
    e.preventDefault();
    console.log("toto");
  };
  return (
    <div
      className={`card card-compact w-auto ${
        position.taken ? "bg-base-200" : "bg-base-100"
      } shadow-xl my-5 cursor-pointer`}
      onClick={() => setCurrentPosition(position)}
    >
      <div className="card-body">
        <h2 className="card-title flex items-center">
          <div className="mr-4 text-base-300">{position.ranking}.</div>
          <div className="flex w-1/4 grow">
            <div>{position.id}</div>
            <div className="flex">
              <BackpackIcon className="h-6 w-6" />
              <div className="flex-1">{position.tribunal_id}</div>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <div className="badge badge-outline rounded-lg ml-3">
              {position.prevalent_domain}
            </div>
            {position.placed ? (
              <div className="badge rounded-lg badge-secondary ml-3">Placé</div>
            ) : null}
          </div>
          <div className="ml-3" onClick={toggleTaken}>
            {position.taken ? (
              <EyeNoneIcon className="h-4 w-4  text-base-300" />
            ) : (
              <EyeOpenIcon className="h-4 w-4" />
            )}
          </div>
        </h2>
      </div>
    </div>
  );
};
export default CardSmall;
