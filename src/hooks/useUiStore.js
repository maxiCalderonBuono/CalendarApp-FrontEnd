import { useSelector, useDispatch } from "react-redux";
import { onOpenEventModal, onCloseEventModal } from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isEventModalOpen } = useSelector((store) => store.ui);

  const openEventModal = () => {
    dispatch(onOpenEventModal());
  };

  const closeEventModal = () => {
    dispatch(onCloseEventModal());
  };

  return {
    //Properties
    isEventModalOpen,

    //Methods

    openEventModal,
    closeEventModal,
  };
};
