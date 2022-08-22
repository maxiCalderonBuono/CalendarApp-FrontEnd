import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";

import { localizer, getMessages } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { useEffect } from "react";

export const CalendarPage = () => {
  const { user } = useAuthStore();

  const { openEventModal } = useUiStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (event) => {
    openEventModal();
  };
  const onSelect = (event) => {
    setActiveEvent(event);
  };
  const onChangeView = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = user.uid === event.user._id || user.uid === event.user.id;

    const style = {
      backgroundColor: isMyEvent ? "#0284C7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 56px )" }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onChangeView}
        onSelectSlot={(slotInfo) => {
          console.log(slotInfo);
        }}
      />

      <CalendarModal />
      <FabAddNew />
      {localStorage.getItem("token") && <FabDelete />}
    </>
  );
};
