import React, { useState } from "react";
import Block from "@uiw/react-color-block";
import { ColorResult } from "@uiw/color-convert";

interface IProps {
  name: string;
  color: string;
  onColorChanged: (color: ColorResult) => void;
}
const ColorPicker = ({ name, color, onColorChanged }: IProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const onChange = (color: ColorResult) => {
    setDisplayColorPicker(false);
    onColorChanged(color);
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
            className="absolute z-2 top-2 drop-shadow-md"
            color={color}
            onChange={onChange}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ColorPicker;
