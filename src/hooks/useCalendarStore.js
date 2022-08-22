import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { dateConverter } from "../helpers";
import {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((store) => store.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (event) => {
    dispatch(onSetActiveEvent(event));
  };

  const startSavingEvent = async (event) => {
    try {
      if (event.id) {
        await calendarApi.put(`/events/${event.id}`, event);
        dispatch(onUpdateEvent({ ...event, user }));
        return;
      }

      const { data } = await calendarApi.post("/events", event);

      dispatch(onAddNewEvent({ ...event, id: data.event.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error saving", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");

      const events = dateConverter(data.events);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingEvent = async (event) => {
    try {
      await calendarApi.delete(`events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error deleting", error.response.data.msg, "error");
    }
  };

  return {
    //Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
