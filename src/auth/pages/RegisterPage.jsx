import { useRef } from "react";
import { Link } from "react-router-dom";
// import { useForm } from "../../hooks";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks";
import { Error } from "../../calendar";
import { LoadingButton } from "../components/LoadingButton";

const registerFields = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

export const RegisterPage = () => {
  // const { name, email, password, password2, onInputChange } =
  //   useForm(registerFields);

  const { startRegister, errorMsg, status } = useAuthStore();

  console.log(errorMsg);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef();

  password.current = watch("password", "");

  // const registerSubmit = () => {
  //   console.log({ name, email, password, password2 });
  // };
  return (
    <section className="flex flex-col justify-center lg:flex-row w-[90%] h-screen mx-auto  items-center">
      <div className="lg:w-1/2 w-[60%]  flex flex-col items-center justify-center">
        <p className="text-3xl md:text-5xl text-center font-bold italic">
          Calenly
        </p>
        <img
          className="w-3/4"
          src="https://res.cloudinary.com/dvqlenul5/image/upload/v1656419993/accounts___user_users_profile_account_man_people_website_browser_webpage_mn77ws.svg"
          alt="user_account"
        />
      </div>
      <div className="w-full lg:w-1/2 lg:h-full flex items-center justify-center">
        <div
          className={`bg-white w-full lg:w-3/4 lg:py-10 flex flex-col justify-center items-center rounded-xl pt-6 pb-2 md:pt-8 md:pb-6 ${
            errorMsg?.type === "login"
              ? "drop-shadow-[0_30px_45px_rgba(250,98,127,0.30)]"
              : "drop-shadow-[0_30px_45px_rgba(22,22,22,0.10)]"
          }`}
        >
          <form
            className="w-3/4 rounded-lg flex-col items-center space-y-6 "
            onSubmit={handleSubmit(startRegister)}
          >
            <div className="relative">
              <input
                id="name"
                type="text"
                autoComplete="off"
                className={`peer w-full h-10 px-6 border-b-2 outline-none ${
                  errors.name ? "focus:border-red-400" : "focus:border-sky-500"
                } focus:border-sky-500 focus:border-b-[3px] border-gray-300 placeholder-gray-600 invalid:border-b-[3px] focus:invalid:no-underline focus:invalid:outline-none disabled:border-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-500 placeholder-transparent`}
                placeholder="Name"
                {...register("name", {
                  required: "This is required",
                })}
                // name="name"
                // value={name}
                // onChange={onInputChange}
              />
              <label
                htmlFor="name"
                className="text-sm text-gray-600 absolute px-6 left-0 -top-3.5 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-placeholer-shown:text-gray-400 transition-all"
              >
                Name
              </label>
              <div className="h-5 w-ful flex content-center">
                {errors.name && (
                  <span className="text-red-400 text-sm italic font-bold">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="relative">
              <input
                id="email"
                type="string"
                autoComplete="off"
                className={`peer w-full h-10 px-6 border-b-2 outline-none ${
                  errors.email ? "focus:border-red-400" : "focus:border-sky-500"
                } focus:border-sky-500 focus:border-b-[3px] border-gray-300 placeholder-gray-600 invalid:border-b-[3px] focus:invalid:no-underline focus:invalid:outline-none disabled:border-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-500 placeholder-transparent`}
                placeholder="Your email"
                {...register("email", {
                  required: "This is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please insert a valid email address.",
                  },
                })}
                // value={email}
                // onChange={onInputChange}
              />
              <label
                htmlFor="email"
                className="text-sm text-gray-600 absolute px-6 left-0 -top-3.5 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-placeholer-shown:text-gray-400 transition-all"
              >
                Email
              </label>
              <div className="h-5 w-ful flex content-center">
                {errors.email && (
                  <span className="text-red-400 text-sm italic font-bold">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="relative">
              <input
                id="password"
                type="password"
                autoComplete="off"
                className={`peer w-full h-10 px-6 border-b-2 outline-none ${
                  errors.password
                    ? "focus:border-red-400"
                    : "focus:border-sky-500"
                } focus:border-sky-500 focus:border-b-[3px] border-gray-300 placeholder-gray-600 invalid:border-b-[3px] focus:invalid:no-underline focus:invalid:outline-none disabled:border-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-500 placeholder-transparent`}
                placeholder="Password"
                // value={password}
                // onChange={onInputChange}
                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
              />
              <div className="h-5 w-ful flex content-center">
                {errors.password && (
                  <span className="text-red-400 text-sm italic font-bold">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <label
                htmlFor="password"
                className="text-sm text-gray-600 absolute px-6 left-0 -top-3.5 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-placeholer-shown:text-gray-400 transition-all"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password_repeat"
                type="password"
                autoComplete="off"
                className={`peer w-full h-10 px-6 border-b-2 outline-none ${
                  errors.password
                    ? "focus:border-red-400"
                    : "focus:border-sky-500"
                } focus:border-sky-500 focus:border-b-[3px] border-gray-300 placeholder-gray-600 invalid:border-b-[3px] focus:invalid:no-underline focus:invalid:outline-none disabled:border-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-500 placeholder-transparent`}
                placeholder="Repeat password"
                name="password_repeat"
                // value={password2}
                // onChange={onInputChange}
                {...register("password_repeat", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              <div className="h-5 w-ful flex content-center">
                {errors.password_repeat && (
                  <span className="text-red-400 text-sm italic font-bold">
                    {errors.password_repeat.message}
                  </span>
                )}
              </div>
              <label
                htmlFor="password_repeat"
                className="text-sm text-gray-600 absolute px-6 left-0 -top-3.5 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-placeholer-shown:text-gray-400 transition-all"
              >
                Confirm password
              </label>
            </div>
            <div className="space-y-4">
              {status === "checking" ? (
                <LoadingButton />
              ) : (
                <button
                  type="submit"
                  className=" block px-6 py-2 md:py-3 rounded-xl bg-sky-500 w-full hover:bg-sky-600 focus:bg-sky-700 active:bg-sky-500 disabled:pointer-events-none disabled:opacity-40 disabled:bg-gray-400"
                >
                  <span className="text-md md:text-lg text-white ">
                    Register
                  </span>
                </button>
              )}
              <p>
                Already have an account?
                <Link to="/auth" className="p-3">
                  <span className="tracking-wide text-blue-600">
                    Login instead!
                  </span>
                </Link>
              </p>
            </div>
          </form>
          <div className="w-3/4 mt-12 pt-6 border-t space-y-6">
            <div className="w-full h-2">
              {errorMsg?.type === "register" && <Error msg={errorMsg.error} />}
            </div>
            <span className="block text-center text-gray-500">
              Organize your time in a simple way
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
