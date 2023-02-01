import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Block from "@uiw/react-color-block";
import { ColorResult } from "@uiw/color-convert";

interface IProps {
  name: string;
  color: string;
  id: number;
  updateCallback: string;
}
const ColorPicker: React.FC<IProps> = ({ id, name, color, updateCallback }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const updateColor = (color: ColorResult) => {
    console.log(color);
    setDisplayColorPicker(false);
    invoke(updateCallback, { id, color: color.hex })
      .then(console.log)
      .catch(console.error);
  };
  return (
    <div className="flex items-baseline mt-2">
      <div className="w-40 mr-3">{name}</div>
      <div className="relative">
        <input
          className="input input-bordered input-xs max-w-xs"
          value={color}
          onFocus={() => setDisplayColorPicker(true)}
          onBlur={(e) => console.log(e)}
        />
        {displayColorPicker ? (
          <Block
            className="absolute z-2 float drop-shadow-md translate-y-2"
            color={color}
            onChange={updateColor}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ColorPicker;
