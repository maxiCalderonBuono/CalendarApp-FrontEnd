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
  const [deletetable, setDeletetable] = useState(false);

  const { user } = useAuthStore();

  const { openEventModal } = useUiStore();

  const { events, setActiveEvent, startLoadingEvents, activeEvent } =
    useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (event) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    if (isMyEvent) {
      openEventModal();
    }
  };

  const onSelect = (event) => {
    setActiveEvent(event);
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    if (isMyEvent) {
      setDeletetable(true);
    } else {
      setDeletetable(false);
    }
  };
  const onChangeView = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      cursor: isMyEvent ? "pointer" : "not-allowed",
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
      {deletetable && <FabDelete />}
    </>
  );
};
