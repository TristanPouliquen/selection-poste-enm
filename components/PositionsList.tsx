import React from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { Position } from "@/types/types";
import CardSmall from "@/components/card_small";
import { positionsSelector, usePositionsActions } from "@/_state";
import { StrictModeDroppable } from "@/components/StrictModeDroppable";

const PositionsList = () => {
  const [positions, setPositions] = useRecoilState(positionsSelector);
  const { updateRanking } = usePositionsActions();
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    const movedPosition = positions[source.index];
    const replacedPosition = positions[destination.index];
    const copy = [...positions];
    const [moved] = copy.splice(source.index, 1);
    copy.splice(destination.index, 0, moved);
    setPositions(copy);
    updateRanking({ ...movedPosition, ranking: replacedPosition.ranking });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="positionList">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grow"
          >
            {positions.map((position: Position, index) => (
              <Draggable
                key={"position_" + position.id}
                draggableId={"position_" + position.id}
                index={index}
              >
                {(provided) => (
                  <label
                    htmlFor="modal"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <CardSmall position={position} />
                  </label>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default PositionsList;
