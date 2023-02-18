import React, { useState } from "react";
import Block from "@uiw/react-color-block";
import { ColorResult } from "@uiw/color-convert";

interface IProps {
  value: string;
  onChange: (color: string) => void;
}
const ColorPicker = ({ value, onChange }: IProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const onColorChanged = (color: ColorResult) => {
    setDisplayColorPicker(false);
    onChange(color.hex);
  };
  return (
    <div>
      <input
        className="input input-bordered input-xs max-w-xs"
        value={value}
        readOnly={true}
        onFocus={() => setDisplayColorPicker(true)}
        onBlur={(e) => console.log(e)}
      />
      {displayColorPicker ? (
        <Block
          style={{ position: "absolute" }}
          className="absolute z-2 drop-shadow-md"
          color={value}
          onChange={onColorChanged}
        />
      ) : null}
    </div>
  );
};

export default ColorPicker;
