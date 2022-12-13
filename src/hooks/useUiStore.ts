import { useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal, RootState } from "../store";
import { useAppDispatch } from "./dispatchSelector";

export const useUiStore = () => {
  const dispatch = useAppDispatch();
  const { isDateModalOpen } = useSelector((state: RootState) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => dispatch(onCloseDateModal());

  return {
    //* Properties
    isDateModalOpen,

    //*Methods
    openDateModal,
    closeDateModal,
  };
};
