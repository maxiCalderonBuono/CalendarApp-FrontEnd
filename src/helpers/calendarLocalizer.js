import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { useUiStore } from "../hooks/useUiStore";

import enUS from "date-fns/locale/en-US";
import esEs from "date-fns/locale/es";

// const language = () => {
//   const { isLanguageChanging } = useUiStore();
//   return isLanguageChanging ? { "en-US": enUS } : { es: esEs };
// };

const locales = { es: esEs };

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
