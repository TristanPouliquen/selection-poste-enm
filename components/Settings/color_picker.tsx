import React, { useEffect, useState } from "react";
import Block from "@uiw/react-color-block";
import { ColorResult } from "@uiw/color-convert";

interface IProps {
  id: string;
  value: string;
  onChange: (color: string) => void;
}
const isDescendant = (el: HTMLElement, parentId: string): boolean => {
  if (el.id === parentId) {
    //is this the element itself?
    return true;
  }
  const parentElement = el.parentElement;
  if (el == parentElement) {
    return false;
  }
  return parentElement ? isDescendant(parentElement, parentId) : false;
};

const ColorPicker = ({ id, value, onChange }: IProps) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const onColorChanged = (color: ColorResult) => {
    setDisplayColorPicker(false);
    onChange(color.hex);
  };
  useEffect(() => {
    const closeOnBlur = (event: MouseEvent) => {
      if (
        event.target == null ||
        !isDescendant(event.target as HTMLElement, id)
      ) {
        setDisplayColorPicker(false);
      } else {
        event.stopPropagation();
      }
    };
    document.addEventListener("click", closeOnBlur);
    return () => document.removeEventListener("click", closeOnBlur);
  });
  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDisplayColorPicker(false);
      }
    };
    document.addEventListener("keypress", closeOnEsc, false);
    return document.removeEventListener("keypress", closeOnEsc, false);
  });
  return (
    <div id={id}>
      <input
        className="input input-bordered input-sm max-w-xs ml-2"
        value={value}
        readOnly={true}
        onFocus={() => setDisplayColorPicker(true)}
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
