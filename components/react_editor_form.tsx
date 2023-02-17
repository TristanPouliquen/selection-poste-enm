import React, { MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { CheckCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
interface IProps {
  onSubmitCallback: (values: IFormValues) => Promise<void>;
  value: string | undefined;
}
export interface IFormValues {
  notes?: string;
}
const ReactEditorForm = ({ onSubmitCallback, value }: IProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<IFormValues>();
  const editNotes = (e: MouseEvent) => {
    e.preventDefault();
    setEditing(true);
  };
  const onSubmit = (values: IFormValues) => {
    onSubmitCallback(values).then(() => setEditing(false));
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <h3 className="font-bold mb-3">Commentaires</h3>
        {editing ? (
          <div
            className="btn btn-sm -btn-accent no-animation w-36 flex justify-start font-normal"
            onClick={handleSubmit(onSubmit)}
          >
            <CheckCircledIcon className="h-5 w-5 mr-1" />
            Enregistrer
          </div>
        ) : (
          <div
            className="btn btn-sm btn-ghost no-animation w-36 flex justify-start font-normal"
            onClick={editNotes}
          >
            <Pencil1Icon className="h-5 w-5 mr-2" />
            Modifier
          </div>
        )}
      </div>
      {editing ? (
        <form className="min-h-[100px]">
          <Controller
            render={({ field }) => <MDEditor defaultValue={value} {...field} />}
            name="notes"
            control={control}
          />
        </form>
      ) : (
        <div>
          <ReactMarkdown>
            {value ?? "*Aucun commentaire pour le moment.*"}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default ReactEditorForm;
