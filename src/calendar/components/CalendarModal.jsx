import { useState, Fragment, useMemo, useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInSeconds } from "date-fns";
import { useCalendarStore, useUiStore, useAuthStore } from "../../hooks";

export const CalendarModal = () => {
  registerLocale("es", es);

  const { isEventModalOpen, closeEventModal, isLanguageChanging } =
    useUiStore();

  const { user } = useAuthStore();

  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmitted, setformSubmitted] = useState(false);

  const [formValues, setformValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: null,
  });

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setformValues({
      ...formValues,
      [changing]: event,
    });
  };

  const handleSubmit = async (e) => {
    setformSubmitted(true);
    e.preventDefault();

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        icon: "error",
        title: "Check your data...",
        text: "Something is wrong with your dates!",
      });

      return;
    }

    if (formValues.title.length <= 0) {
      return;
    }
    await startSavingEvent(formValues);
    closeEventModal();
  };

  const isMyEvent =
    user.uid === activeEvent?.user._id || user.uid === activeEvent?.user.uid;

  const settingClass = useMemo(() => {
    if (!formSubmitted) return " ";

    return formValues.title.length > 0 ? "" : "border-red-400 mb-1";
  }, [formSubmitted, formValues.title]);

  useEffect(() => {
    if (activeEvent !== null) {
      setformValues({ ...activeEvent });
    }
  }, [activeEvent]);

  return (
    <Transition show={isEventModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30  flex flex-row items-center justify-center overflow-y-auto backdrop-blur-[5px]"
        onClose={() => closeEventModal()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative flex flex-col items-center m-1 w-[500px] min-h-[660px] md:min-h-[660px] lg:min-h-[630px] md:h-[65%] bg-white rounded-md">
            <Dialog.Title
              as="h1"
              className="absolute mt-3 md:mt-8 lg:mt-4 text-2xl font-bold border-b-2 w-[80%] text-center"
            >
              {formValues.title ? formValues.title : "New Event"}
            </Dialog.Title>
            <Dialog.Description
              as="p"
              className="absolute px-4 mt-2 text-sm text-center top-12 md:top-16"
            >
              {isMyEvent &&
                (isLanguageChanging
                  ? "Por favor completa todos los campos"
                  : "Please fill in the information")}
            </Dialog.Description>

            <form
              onSubmit={handleSubmit}
              className="absolute flex flex-col items-center w-full top-28 px-3 space-y-5 mb-3"
            >
              <div className="flex flex-col w-full items-center space-y-2 border-b-2 pb-5">
                <label
                  htmlFor="email"
                  className="w-full text-left text-text-primary font-bold"
                >
                  {isLanguageChanging
                    ? "Fecha y hora de inicio"
                    : "Start date and time"}
                </label>

                <DatePicker
                  selected={formValues.start}
                  minDate={formValues.start}
                  disabled={!isMyEvent}
                  isClearable
                  showTimeSelect
                  preventOpenOnFocus
                  className="shadow-sm w-full h-10 border-2 border-solid outline-none border-text-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus: ring-opacity-50 focus: ring-offset-2 focus: ring-offset-blue-400 focus: ring-blue-300"
                  onChange={(event) => onDateChange(event, "start")}
                  dateFormat="Pp"
                  locale={isLanguageChanging ? "es" : ""}
                  timeCaption={isLanguageChanging ? "Hora" : "Time"}
                />
                <span className="w-full text-left text-text-primary font-bold">
                  {isLanguageChanging
                    ? "Fecha y hora de finalización"
                    : "End date and time"}
                </span>
                <DatePicker
                  selected={formValues.end}
                  minDate={formValues.start}
                  disabled={!isMyEvent}
                  isClearable
                  showTimeSelect
                  className="shadow-sm w-full h-10 border-2 border-solid outline-none border-text-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus: ring-opacity-50 focus: ring-offset-2 focus: ring-offset-blue-400 focus: ring-blue-300"
                  onChange={(event) => onDateChange(event, "end")}
                  dateFormat="Pp"
                  locale={isLanguageChanging ? "es" : ""}
                  timeCaption={isLanguageChanging ? "Hora" : "Time"}
                />
              </div>
              <div className="flex flex-col w-full items-center">
                <span className="w-full text-left text-text-primary font-bold">
                  Title and notes
                </span>
                <input
                  id="title"
                  type="text"
                  name="title"
                  disabled={!isMyEvent}
                  autoComplete="off"
                  placeholder="Title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  className={`${settingClass} shadow-sm w-full h-10 border-2 border-solid outline-none border-text-secondary rounded-md mb-4 p-2 focus:outline-none focus:ring-2 focus: ring-opacity-50 focus: ring-offset-2 focus: ring-offset-blue-400 focus: ring-blue-300 focus:border-none`}
                />
                {settingClass && formSubmitted && (
                  <p className="text-red-500 text-xs italic text-left w-full mb-4">
                    Please fill out this field.
                  </p>
                )}

                <label className="w-full text-left text-text-primary font-bold">
                  Short description
                </label>
                <textarea
                  type="text"
                  className="shadow-sm border-2 rounded-md w-full lg:h-36 focus:outline-none focus:ring-2 focus: ring-opacity-50 focus: ring-offset-2 focus: ring-offset-blue-400 focus: ring-blue-300"
                  placeholder="Notas"
                  rows="7"
                  disabled={!isMyEvent}
                  name="notes"
                  value={formValues.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {isMyEvent && (
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="border-2 p-1 rounded-md border-blue-300 text-blue-500"
                  >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                  </button>
                  <button
                    className="border-2 p-1 rounded-md border-red-200 text-red-400"
                    onClick={closeEventModal}
                  >
                    <span>Cancelar</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
