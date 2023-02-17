import React from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, RawDraftContentState } from "draft-js";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
interface IProps {
  onChangeCallback: (value: string) => Promise<void>;
  value: string | undefined;
}
const ReactEditorForm = ({ onChangeCallback, value }: IProps) => {
  const onChange = (contentState: RawDraftContentState) => {
    onChangeCallback(JSON.stringify(contentState));
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <h3 className="font-bold mb-3">Commentaires</h3>
      </div>
      <form className="min-h-[100px]">
        <Editor
          defaultContentState={
            value
              ? JSON.parse(value)
              : convertToRaw(ContentState.createFromText(""))
          }
          toolbarOnFocus
          onContentStateChange={onChange}
          wrapperClassName="hover:bg-base-200/25 focus-within:bg-base-100"
          editorClassName="p-2 hover:cursor-text focus-within:border focus-within:rounded focus-within:border-base-200"
          toolbarClassName="border rounded border-base-200"
        />
      </form>
    </>
  );
};

export default ReactEditorForm;
