import React, {MouseEvent, useEffect, useState} from "react"
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import {Position} from "@/types/types";
import {
    BuildingLibraryIcon,
    ClipboardDocumentCheckIcon, ClipboardDocumentIcon, TagIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import {Controller, useForm} from "react-hook-form";
import ReactMarkdown from "react-markdown";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false}
)

interface IProps {
    position?: Position,
}

interface IFormValues {
    notes?: string
}

const CardFocus: React.FC<IProps> = ({ position }) => {
    const closeOnEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            // @ts-ignore
            document.getElementById("modal").checked = false
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", closeOnEsc, false)

        return () => document.removeEventListener("keydown", closeOnEsc, false)
    }, [closeOnEsc])
    const [editing, setEditing] = useState<boolean>(false)
    const { handleSubmit, control} = useForm<IFormValues>()
    const editNotes = (e: MouseEvent) =>  {
        e.preventDefault()
        setEditing(true)
    }
    const onSubmit = (values: IFormValues) => {
        setEditing(false)
        console.log(values)
    }

    return position
        ? <label htmlFor="modal" className="modal">
            <label htmlFor="" className="modal-box relative h-5/6 w-11/12 max-w-7xl flex flex-col">
                <h1 className="mx-2 text-4xl font-bold flex flex-row justify-between items-baseline">
                    <div className="flex flex-row">{position.role_id} <BuildingLibraryIcon className="h-10 w-10"/> {position.tribunal_id}</div>
                    <label className="float-right cursor-pointer" htmlFor="modal"><XMarkIcon className="h-8 w-8" /></label>
                </h1>
                <div className="divider"></div>
                <div className="grow">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold mb-3">Commentaires</h2>
                        {
                            editing
                                ? <div className="btn btn-sm -btn-accent no-animation w-36 flex justify-start" onClick={handleSubmit(onSubmit)}>
                                    <ClipboardDocumentCheckIcon className="h-5 w-5 mr-1"  />
                                    Enregistrer
                                </div>
                                : <div className="btn btn-sm btn-ghost no-animation w-36 flex justify-start" onClick={editNotes}>
                                    <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
                                    Modifier
                                </div>
                        }
                    </div>
                    {
                        editing
                        ? <form>
                                <Controller
                                    render={({field}) => <MDEditor defaultValue="" {...field} />}
                                    name="notes"
                                    control={control}
                                />
                            </form>
                        : <div>
                                <ReactMarkdown>{position.notes ?? "*Aucun commentaire pour le moment.*"}</ReactMarkdown>
                        </div>
                    }
                </div>
                <div className="divider"></div>
                <div>
                    <h3 className="text-lg font-bold flex items-center">
                        <TagIcon className="h-4 w-4" />
                        Tags
                    </h3>
                </div>
                </label>
            </label>
        : null
}

export default CardFocus
