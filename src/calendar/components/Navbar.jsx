import { useAuthStore } from "../../hooks";
import { ToggleButton } from "./atoms/ToggleButton";

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <div className="flex justify-between bg-gray-900 text-end py-3 px-4">
      <div className="flex space-x-3 items-center">
        <span className="text-2xl text-white">
          <i className="fas fa-calendar-alt"></i>
          &nbsp; {user.name}
        </span>
        {/* <div className="text-white text-sm h-8 flex items-center">
          <span className="cursor-pointer">EN</span>
          &nbsp;
          <span>I</span>
          &nbsp;
          <span className="cursor-pointer">ES</span>
        </div> */}
      </div>
      <div className="flex space-x-3 items-center">
        {/* <ToggleButton /> */}
        <button
          onClick={startLogout}
          className="mx-2 rounded-md text-2xl text-red-600"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span> Exit </span>
        </button>
      </div>
    </div>
  );
};
