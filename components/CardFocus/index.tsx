import React, { useEffect } from "react";
import { Position } from "@/types/types";
import { BackpackIcon, BookmarkIcon, Cross2Icon } from "@radix-ui/react-icons";
import { usePositionsActions } from "@/_state";
import RankInputGroup from "@/components/CardFocus/rank_inputgroup";
import ReactEditorForm from "@/components/CardFocus/react_editor_form";
import TribunalDetails from "@/components/CardFocus/tribunal_details";
import TagContainer from "@/components/CardFocus/tag_container";

interface IProps {
  position: Position;
}

const CardFocus = ({ position }: IProps) => {
  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // @ts-ignore
        document.getElementById("modal").checked = false;
      }
    };
    document.addEventListener("keydown", closeOnEsc, false);

    return () => document.removeEventListener("keydown", closeOnEsc, false);
  });
  const { update, updateRanking } = usePositionsActions();
  const onChange = (notes: string) => {
    return update({ ...position, notes });
  };

  return position ? (
    <label htmlFor="modal" className="modal">
      <label
        htmlFor=""
        className="modal-box h-5/6 w-11/12 max-w-7xl flex flex-col"
      >
        <h1 className="mx-2 text-4xl font-bold flex flex-row items-center">
          <div className="flex flex-row grow">
            {position.role?.name}{" "}
            <BackpackIcon className="ml-4 mr-2 h-10 w-10" />{" "}
            {position.tribunal?.name}
          </div>
          <RankInputGroup position={position} updatePosition={updateRanking} />
          <label className="float-right cursor-pointer" htmlFor="modal">
            <Cross2Icon className="h-8 w-8" />
          </label>
        </h1>
        <div className="divider"></div>
        <div className="divide-x flex flex-row">
          <h3 className="text-lg flex items-center pr-1">
            <BookmarkIcon className="h-4 w-4" />
            Tags
          </h3>
          <TagContainer
            position={position}
            key={`tag_container_position_${position.id}`}
          />
        </div>
        <div className="divider"></div>
        <div className="grow">
          <ReactEditorForm
            value={position.notes}
            onChangeCallback={onChange}
            key={"position_notes_" + position.id}
          />
        </div>
        {position.tribunal ? (
          <>
            <div className="divider"></div>
            <TribunalDetails tribunal={position.tribunal} />
          </>
        ) : null}
      </label>
    </label>
  ) : null;
};

export default CardFocus;
