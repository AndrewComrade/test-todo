/* VENDOR */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* APPLICATION */
import { Modal } from "./Modal";
import { ModalHeader } from "./ui/ModalHeader";
import { ModalInput } from "./ui/ModalInput";
import { ModalRow } from "./ui/ModalRow";
import { ModalTextarea } from "./ui/ModalTextarea";
import { ModalFooter } from "./ui/ModalFooter";
import { tasksAdded } from "../../store/slices/tasksSlice";
import { categoriesAdded } from "../../store/slices/categoriesSlice";

interface ModalCreateItemProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCreateItem: React.FC<ModalCreateItemProps> = ({
  active,
  setActive,
}) => {
  const dispatch = useDispatch(),
    { pathname } = useLocation(),
    isCategories = pathname.includes("categories"),
    [name, setName] = useState(""),
    [selected, setSelected] = useState(""),
    [description, setDescription] = useState("");

  function clearState() {
    setName("");
    setDescription("");
    setSelected("");
  }

  const handleSubmit = () => {
    if  (!name) {
      return alert("Имя обязательно")
    }

    if (isCategories) {
      dispatch(categoriesAdded({ name, description }))
    } else {
      dispatch(tasksAdded({
        name,
        description,
        category: setSelected,
      }))
    }
    clearState();
    setActive(false);
  }

  return (
    <Modal active={active} setActive={setActive} clearState={clearState}>
      <ModalHeader
        clearState={clearState}
        setActive={setActive}
        title={isCategories ? "Создание категории" : "Создание задачи"}
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
        clearState={clearState}
        submitBtnText="Создать"
        size="large"
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};