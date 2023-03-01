import { Position, Document } from "@/types/types";
import { invoke } from "@tauri-apps/api/tauri";
import { useRecoilState } from "recoil";
import { positionsAtom } from "@/_state/positions";

const useDocumentActions = () => {
  const [positions, setPositions] = useRecoilState(positionsAtom);
  const getAll = async (position: Position) => {
    const result = await invoke<Document[]>("get_position_documents", {
      position,
    });
    setPositions(
      positions.map((pos) =>
        position.id === pos.id ? { ...pos, documents: result } : pos
      )
    );
  };
  const create = async (document: Partial<Document>) => {
    const result = await invoke<Document>("create_document", { document });
    const position = positions.find((pos) => pos.id === result.positionId);
    if (position) {
      await getAll(position);
    }
  };

  const remove = async (document: Document) => {
    const result = await invoke<boolean>("delete_document", { document });
    const position = positions.find((pos) => pos.id === document.positionId);
    if (result && position) {
      await getAll(position);
    }
  };

  return { getAll, create, remove };
};

export { useDocumentActions };
