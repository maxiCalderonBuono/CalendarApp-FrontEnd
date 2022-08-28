import { addHours } from "date-fns";
import { useCalendarStore, useUiStore, useAuthStore } from "../../../hooks";

export const FabAddNew = () => {
  const { openEventModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  const { user } = useAuthStore();

  const handleClick = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        uid: user.uid,
      },
    });
    openEventModal();
  };

  return (
    <button
      onClick={handleClick}
      className={`z-10 rounded-full w-14 h-14 fixed bg-sky-500 bottom-6 right-6 text-white text-xl hover:bg-sky-600 hover:-translate-y-0.5 transform transition focus:outline-none focus:ring focus: ring-offset-2 focus:ring-sky-500 focus: ring-opacity-50 active:bg-sky-700`}
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};
