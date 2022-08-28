import { useSelector, useDispatch } from "react-redux";
import {
  onOpenEventModal,
  onCloseEventModal,
  onChangeLanguage,
} from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isEventModalOpen, isLanguageChanging } = useSelector(
    (store) => store.ui
  );

  const openEventModal = () => {
    dispatch(onOpenEventModal());
  };

  const closeEventModal = () => {
    dispatch(onCloseEventModal());
  };

  const changeLanguage = () => {
    dispatch(onChangeLanguage());
  };

  return {
    //Properties
    isEventModalOpen,
    isLanguageChanging,

    //Methods

    openEventModal,
    closeEventModal,
    changeLanguage,
  };
};
