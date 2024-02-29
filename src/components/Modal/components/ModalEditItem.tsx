/* VENDOR */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* APPLICATION */
import { Modal } from "../Modal";
import { ModalHeader } from "../ui/ModalHeader";
import { ModalRow } from "../ui/ModalRow";
import { ModalInput } from "../ui/ModalInput";
import { ModalTextarea } from "../ui/ModalTextarea";
import { ModalFooter } from "../ui/ModalFooter";
import { tasksUpdated } from "../../Lists/Tasks/tasksSlice";
import { categoriesUpdated } from "../../Lists/Categories/categoriesSlice";

interface ModalEditItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalEditItem: React.FC<ModalEditItemProps> = ({
  item,
  active,
  setActive,
}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isCategories = pathname.includes("categories");
  const [name, setName] = useState(item.name);
  const [selected, setSelected] = useState(item.category || "");
  const [description, setDescription] = useState(item.description);

  const handleSubmit = () => {
    if  (!name) {
      return alert("Имя обязательно")
    }
    if  (isCategories) {
      dispatch(categoriesUpdated({ id: item.id, name, description }))
    } else {
      dispatch(tasksUpdated({
        id: item.id,
        name,
        description,
        category: selected,
      }))
    }
    setActive(false);
  }

  return (
    <Modal item={item} active={active} setActive={setActive}>
      <ModalHeader
        setActive={setActive}
        title={
          isCategories ? "Редактирование категории" : "Редактирование задачи"
        }
      />
      {isCategories ? (
        <ModalInput name={name} setName={setName} size="large" />
      ) : (
        <ModalRow
          name={name}
          setName={setName}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <ModalTextarea
        description={description}
        setDescription={setDescription}
      />
      <ModalFooter
        setActive={setActive}
        submitBtnText="Сохранить"
        size="large"
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
