import { useCalendarStore } from "../../../hooks";
import "./FabDelete.scss";
export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const handleClickDelete = async () => {
    await startDeletingEvent();
  };
  return (
    <button
      data-testid="fab-delete"
      onClick={handleClickDelete}
      className="btn btn-danger fab-danger"
      style={{
        display: hasEventSelected ? "" : "none",
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
