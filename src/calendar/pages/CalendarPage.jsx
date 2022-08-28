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
import { isToday } from "date-fns";

export const CalendarPage = () => {
  const [deletetable, setDeletetable] = useState(false);

  const { user } = useAuthStore();

  const { openEventModal, isLanguageChanging } = useUiStore();

  const { events, setActiveEvent, startLoadingEvents, activeEvent } =
    useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (event) => {
    openEventModal();
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

  const dayPropGetter = (date) => {
    const dateToChange = isToday(date);

    const style = {
      backgroundColor: dateToChange ? "rgba(92,150,249,0.4)" : "",
    };

    return {
      style,
    };
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "3px",
      outlineColor: isSelected ? "#EC4899" : " ",
      outlineWidth: "3px",
      outlineOffset: "0.2rem",
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
        culture={isLanguageChanging ? "es" : ""}
        dayPropGetter={dayPropGetter}
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 56px )" }}
        messages={isLanguageChanging ? getMessages() : ""}
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
