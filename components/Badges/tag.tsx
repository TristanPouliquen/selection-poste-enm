import React from "react";
import { Tag } from "@/types/types";

interface IProps {
  tag: Tag;
}

const TagBadge = ({ tag }: IProps) => {
  return (
    <div
      className="badge rounded-lg badge-outline mr-2"
      style={{ color: `${tag.color}` }}
    >
      {tag.name}
    </div>
  );
};

export default TagBadge;
