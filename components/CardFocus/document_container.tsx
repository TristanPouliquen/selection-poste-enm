import React, {
  CSSProperties,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Document, Position } from "@/types/types";
import {
  BaseDirectory,
  BinaryFileContents,
  createDir,
  exists,
  readBinaryFile,
  removeFile,
  writeBinaryFile,
} from "@tauri-apps/api/fs";
import { useDropzone } from "react-dropzone";
import { useDocumentActions } from "@/_state/document";
import { Cross1Icon, EyeOpenIcon, FileTextIcon } from "@radix-ui/react-icons";
import prettyBytes from "pretty-bytes";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { createPortal } from "react-dom";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface IProps {
  position: Position;
}

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};
const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const getFolderName = (position: Position) => `positions/${position.id}`;

interface IDocumentProps {
  document: Document;
  onTogglePreview: (document: Document) => void;
}

const DocumentIcon = ({ document, onTogglePreview }: IDocumentProps) => {
  const { remove } = useDocumentActions();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    await removeFile(document.path, { dir: BaseDirectory.AppData });
    remove(document);
  };

  return (
    <div className="bordered rounded-lg bg-base-200/30 hover:bg-base-15 hover:text-base-content/25 p-2 pt-0 w-28 mr-6 flex flex-col items-center text-center mb-4 relative">
      <div
        className="badge badge-outline z-20 px-1 border-base-200 bg-base-200/50 hover:bg-base-200 hover:cursor-pointer absolute -top-2 -right-2"
        onClick={onClick}
      >
        <Cross1Icon className="h-2 w-2 text-base-content" />
      </div>
      <FileTextIcon className="h-8 w-8 mt-2 mb-3" />
      <span className="text-xs">
        {`${document.name} (${prettyBytes(document.size, { locale: "fr" })})`}
      </span>
      <div className="absolute rounded-lg z-10 w-full h-full flex items-center justify-center bg-neutral-content/30 opacity-0 hover:opacity-100">
        <EyeOpenIcon
          className="h-8 w-8 opacity-100 text-base-content cursor-pointer"
          onClick={() => onTogglePreview(document)}
        />
      </div>
    </div>
  );
};

const DocumentModal = ({ document, onTogglePreview }: IDocumentProps) => {
  const [fileContents, setFileContents] = useState<Uint8Array>();
  useEffect(() => {
    readBinaryFile(document.path, { dir: BaseDirectory.AppData }).then(
      (content) => {
        setFileContents(content);
      }
    );
  }, [readBinaryFile, setFileContents]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="bg-base-100 flex flex-col overflow-hidden fixed top-0 left-0 h-full w-full fixed z-100">
      <div className="flex items-center bg-base-300/50 p-2">
        <div className="mr-auto">{document.name}</div>
        <button
          className="btn btn-sm btn-primary rounded cursor-pointer"
          onClick={() => onTogglePreview(document)}
        >
          Fermer
        </button>
      </div>
      <div className="grow overflow-auto">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.js">
          {fileContents && (
            <Viewer
              fileUrl={fileContents}
              plugins={[defaultLayoutPluginInstance]}
            />
          )}
        </Worker>
      </div>
    </div>
  );
};
const DocumentContainer = ({ position }: IProps) => {
  const [previewed, setPreviewed] = useState<Document | undefined>(undefined);
  const onTogglePreview = (document: Document) =>
    setPreviewed(previewed ? undefined : document);
  const { getAll, create } = useDocumentActions();
  useEffect(() => {
    if (position.documents === undefined) {
      getAll(position);
    }
  }, [position, getAll]);

  useEffect(() => {
    const createFolder = async () => {
      await createDir(getFolderName(position), {
        dir: BaseDirectory.AppData,
        recursive: true,
      });
    };
    exists(getFolderName(position), { dir: BaseDirectory.AppData }).then(
      (result) => {
        if (!result) {
          createFolder();
        }
      }
    );
  }, [position]);
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      try {
        const path = `${getFolderName(position)}/${file.name}`;
        const reader = new FileReader();
        reader.onabort = () => console.error("file reading was aborted");
        reader.onerror = () => console.error("file reading has failed");
        reader.onload = async () => {
          const binaryStr = reader.result;
          await writeBinaryFile(
            {
              path: path,
              contents: binaryStr as BinaryFileContents,
            },
            {
              dir: BaseDirectory.AppData,
            }
          );
          await create({
            name: file.name,
            path,
            size: file.size,
            positionId: position.id,
          });
        };
        reader.readAsArrayBuffer(file);
      } catch (e) {
        console.error(e);
      }
    });
  };
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
    });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <div>
      <h2 className="font-bold mb-2">Fichiers joints</h2>
      <div className="flex flex-row">
        {(position.documents ?? []).map((document) => (
          <DocumentIcon
            document={document}
            onTogglePreview={onTogglePreview}
            key={`document_icon_${document.id}`}
          />
        ))}
      </div>
      <div {...getRootProps({ style })} className="hover:cursor-pointer">
        <input {...getInputProps()} />
        Cliquez ou glissez-déposez de nouveaux PDF ici pour les ajouter à la
        fiche.
      </div>
      {previewed &&
        createPortal(
          <DocumentModal
            key={`document_modal_${previewed.id}`}
            document={previewed}
            onTogglePreview={onTogglePreview}
          />,
          document.body
        )}
    </div>
  );
};

export default DocumentContainer;
