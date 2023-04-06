import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Select, { ActionMeta, SingleValue } from "react-select";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPositionIdAtom, positionsSelector } from "@/_state";
import { Position } from "@/types/types";

const SearchBar = () => {
  const positions = useRecoilValue(positionsSelector);
  const setCurrentPositionId = useSetRecoilState(currentPositionIdAtom);
  const onSelect = (
    position: SingleValue<Position>,
    actionMeta: ActionMeta<Position>
  ) => {
    if (actionMeta.action == "select-option" && position) {
      setCurrentPositionId(position.id);
      // @ts-ignore
      document.getElementById("modal").checked = true;
    }
  };

  return (
    <div className="form-control mr-20">
      <div className="input-group input-group-lg">
        <div className="border border-r-0 rounded-l-full p-1 flex items-center">
          <MagnifyingGlassIcon className="h-8 w-8 text-base-300" />
        </div>
        <Select
          className="input input-bordered p-0 w-96"
          isSearchable={true}
          isClearable={true}
          placeholder="Chercher un poste..."
          name="positions_search"
          onChange={onSelect}
          options={positions}
          getOptionLabel={(option) =>
            `${option.ranking}. ${option.role?.name} - ${option.tribunal?.name}`
          }
          getOptionValue={(option) => `${option.id}`}
          styles={{
            input: (baseStyles) => ({
              ...baseStyles,
              boxShadow: "none",
            }),
            control: (baseStyles) => ({
              ...baseStyles,
              border: 0,
              height: "100%",
              borderRadius: "0.5rem",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              padding: 0,
            }),
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
