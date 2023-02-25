import React from "react";
import { Position, Tag } from "@/types/types";
import { usePositionsActions } from "@/_state";

interface IProps {
  position: Position;
  tag: Tag,
  isRemovable: boolean
}

const TagBadge = ({position, tag, isRemovable}: IProps) => {
  const {removeTag} = usePositionsActions();
  const onRemove = () => removeTag(position, tag);

  return <div className="badge badge-outline" style={{color: `${tag.color}`}}>{tag.name}</div>
}

export default TagBadge;