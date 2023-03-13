import React, { useContext } from "react";
import { CriteriaContext } from "@/components/Onboarding/index";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/components/Home/strict_mode_droppable";
import Select, { SingleValue } from "react-select";
import CriterionSelect from "@/components/Onboarding/criterion_select";
import { PlusCircledIcon } from "@radix-ui/react-icons";

interface IProps {
  stage: "positive" | "negative";
}
interface IOption {
  label: string;
  value: string;
}

const options: IOption[] = [
  {
    label: "Tribunal",
    value: "tribunal",
  },
  {
    label: "Cour d'appel",
    value: "appealCourt",
  },
  {
    label: "Groupe",
    value: "group",
  },
  {
    label: "Fonction",
    value: "role",
  },
  {
    label: "Domaine principal",
    value: "prevalent_domain",
  },
  {
    label: "Placé ou non",
    value: "placed",
  },
];
const CriterionForm = ({ stage }: IProps) => {
  const { criteria, setCriteria } = useContext(CriteriaContext);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    const copy = [...criteria[stage]];
    const [moved] = copy.splice(source.index, 1);
    copy.splice(destination.index, 0, moved);
    setCriteria({ ...criteria, [stage]: copy });
  };
  const availableOptions = options.filter(
    (option) =>
      !criteria[stage].find((criterion) => criterion.name === option.value)
  );
  const onChange = (newValue: SingleValue<IOption>) => {
    if (newValue) {
      setCriteria({
        ...criteria,
        [stage]: [
          ...criteria[stage],
          { name: newValue.value, label: newValue.label, value: [] },
        ],
      });
    }
  };

  return (
    <div className="flex flex-col grow overscroll-contain">
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId={`criterion_droppable_${stage}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grow"
            >
              {criteria[stage].map((criterion, index) => (
                <Draggable
                  key={`${stage}_criterion_${criterion.name}`}
                  draggableId={`${stage}_criterion_${criterion.name}`}
                  index={index}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <CriterionSelect
                        index={index}
                        dragHandleProps={provided.dragHandleProps}
                        criterion={criterion}
                        stage={stage}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      <div className="form-control flex flex-row items-center">
        <PlusCircledIcon className="h-6 w-6 mr-2" />
        <div className="text-bold">Ajouter un nouveau critère:&nbsp;</div>
        <Select
          key={`${stage}_select_${criteria[stage].length}`}
          menuPlacement="top"
          className="ml-4 w-96"
          isSearchable={true}
          options={availableOptions}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CriterionForm;
