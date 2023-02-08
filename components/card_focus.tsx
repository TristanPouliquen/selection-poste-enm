import React, { MouseEvent, useEffect, useState } from "react";
import { formatDuration } from "date-fns";
import { fr } from "date-fns/locale";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { Position } from "@/types/types";
import { Controller, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import {
  BackpackIcon,
  BookmarkIcon,
  CheckCircledIcon,
  Cross2Icon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { usePositionsActions } from "@/_state";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface IProps {
  position?: Position;
}

interface IFormValues {
  notes?: string;
}

const CardFocus = ({ position }: IProps) => {
  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // @ts-ignore
        document.getElementById("modal").checked = false;
      }
    };
    document.addEventListener("keydown", closeOnEsc, false);

    return () => document.removeEventListener("keydown", closeOnEsc, false);
  });
  const [editing, setEditing] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<IFormValues>();
  const editNotes = (e: MouseEvent) => {
    e.preventDefault();
    setEditing(true);
  };
  const { update } = usePositionsActions();
  const onSubmit = (values: IFormValues) => {
    if (position !== undefined) {
      update({ ...position, ...values }).then(() => setEditing(false));
    }
  };

  return position ? (
    <label htmlFor="modal" className="modal">
      <label
        htmlFor=""
        className="modal-box h-5/6 w-11/12 max-w-7xl flex flex-col"
      >
        <h1 className="mx-2 text-4xl font-bold flex flex-row justify-between items-baseline">
          <div className="flex flex-row">
            {position.role?.name}{" "}
            <BackpackIcon className="ml-4 mr-2 h-10 w-10" />{" "}
            {position.tribunal?.name}
          </div>
          <label className="float-right cursor-pointer" htmlFor="modal">
            <Cross2Icon className="h-8 w-8" />
          </label>
        </h1>
        <div className="divider"></div>
        <div className="grow">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold mb-3">Commentaires</h2>
            {editing ? (
              <div
                className="btn btn-sm -btn-accent no-animation w-36 flex justify-start"
                onClick={handleSubmit(onSubmit)}
              >
                <CheckCircledIcon className="h-5 w-5 mr-1" />
                Enregistrer
              </div>
            ) : (
              <div
                className="btn btn-sm btn-ghost no-animation w-36 flex justify-start"
                onClick={editNotes}
              >
                <Pencil1Icon className="h-5 w-5 mr-2" />
                Modifier
              </div>
            )}
          </div>
          {editing ? (
            <form>
              <Controller
                render={({ field }) => <MDEditor defaultValue="" {...field} />}
                name="notes"
                control={control}
              />
            </form>
          ) : (
            <div>
              <ReactMarkdown>
                {position.notes ?? "*Aucun commentaire pour le moment.*"}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <h3 className="text-lg font-bold text-base-300">
          {position.tribunal?.name}
        </h3>
        <p>Cour d&apos;appel: {position.tribunal?.appealCourt?.name}</p>
        <p>Groupe: {position.tribunal?.group?.name}</p>
        <p>
          Temps de trajet:{" "}
          {position.tribunal?.timeTo
            ? formatDuration(
                { minutes: position.tribunal.timeTo },
                { locale: fr }
              )
            : "Non renseigné"}
        </p>
        <div className="divider"></div>
        <div>
          <h3 className="text-lg font-bold flex items-center">
            <BookmarkIcon className="h-4 w-4" />
            Tags
          </h3>
        </div>
      </label>
    </label>
  ) : null;
};

export default CardFocus;
