/* VENDOR */
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* APPLICATION */
import { Modal } from "../Modal";
import { ModalHeader } from "../ui/ModalHeader";
import { ModalText } from "../ui/ModalText";
import { ModalFooter } from "../ui/ModalFooter";
import { tasksRemoved, tasksClearedCategories } from "../../Lists/Tasks/tasksSlice";
import { categoriesRemoved } from "../../Lists/Categories/categoriesSlice";

interface ModalRemoveItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalRemoveItem: React.FC<ModalRemoveItemProps> = ({
  item,
  active,
  setActive,
}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isCategories = pathname.includes("categories");
  const title = `Удаление ${isCategories ? "категории" : "задачи"}`
  const text = `Вы уверены, что хотите удалить ${isCategories ? "категорию" : "задачу"} "${item.name}"?`;

  const handleSubmit = () => {
    if (isCategories) {
      dispatch(categoriesRemoved(item.id));
      dispatch(tasksClearedCategories(item.id));
    } else {
      dispatch(tasksRemoved(item.id))
    }
  }

  return (
    <Modal item={item} active={active} setActive={setActive}>
      <ModalHeader setActive={setActive} title={title} />
      <ModalText text={text} />
      <ModalFooter
        setActive={setActive}
        submitBtnText="Да"
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
