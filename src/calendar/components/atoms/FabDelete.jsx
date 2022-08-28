import { useCalendarStore, useUiStore, useAuthStore } from "../../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { isEventModalOpen } = useUiStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      onClick={handleDelete}
      className={`${
        hasEventSelected && !isEventModalOpen ? "" : "hidden"
      } rounded-full z-10 w-14 h-14 fixed bg-red-500 bottom-6 left-6 text-white text-xl hover:bg-red-600 hover:-translate-y-0.5 transform transition focus:outline-none focus:ring focus: ring-offset-2 focus:ring-red-500 focus: ring-opacity-50 active:bg-red-700`}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
