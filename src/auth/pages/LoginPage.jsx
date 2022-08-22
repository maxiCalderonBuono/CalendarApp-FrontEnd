import { Link } from "react-router-dom";
import { useAuthStore } from "../../hooks";
import { Error } from "../../calendar";
import { useForm } from "react-hook-form";
import { LoadingButton } from "../components/LoadingButton";

// const loginFields = {
//   email: "",
//   password: "",
// };

export const LoginPage = () => {
  // const { email, password, onInputChange } = useForm(loginFields);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { startLogin, errorMsg, status } = useAuthStore();

  // const loginSubmit = (e) => {
  //   e.preventDefault();
  //   startLogin({ email, password });
  // };
  return (
    <section className="flex flex-col justify-center lg:flex-row w-[90%] h-screen mx-auto  items-center">
      <div className="w-3/4 lg:w-1/2 flex flex-col items-center justify-center">
        <p className="text-5xl text-center font-bold italic">Calenly</p>
        <img
          className="w-3/4"
          src="https://res.cloudinary.com/dvqlenul5/image/upload/v1656419993/accounts___user_users_profile_account_man_people_website_browser_webpage_mn77ws.svg"
          alt="user_account"
        />
      </div>
      <div className="w-full lg:w-1/2 lg:h-full flex items-center justify-center">
        <div
          className={`bg-white w-full lg:w-3/4 lg:py-10 flex flex-col justify-center items-center rounded-xl py-6 mt-4 ${
            errorMsg?.type === "login"
              ? "drop-shadow-[0_30px_45px_rgba(250,98,127,0.30)]"
              : "drop-shadow-[0_30px_45px_rgba(22,22,22,0.10)]"
          }`}
        >
          <form
            className="w-3/4 rounded-lg flex-col items-center space-y-8"
            onSubmit={handleSubmit(startLogin)}
          >
            <div className="relative">
              <input
                id="email"
                className={`peer w-full h-10 px-6 border-b-2 mb-2 outline-none ${
                  errors.email ? "focus:border-red-400" : "focus:border-sky-500"
                } focus:border-sky-500 focus:border-b-[3px] border-gray-300 placeholder-gray-600 invalid:border-b-[3px] focus:invalid:no-underline focus:invalid:outline-none disabled:border-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-500 placeholder-transparent`}
                placeholder="Email address"
                autoComplete="off"
                {...register("email", {
                  required: "This is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please insert a valid email address.",
                  },
                })}
                // value={email}
                // required
                // onChange={onInputChange}
              />
              <div className="h-5 w-ful flex content-center">
                {errors.email && (
                  <span className="text-red-400 text-sm italic font-bold">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <label
                htmlFor="email"
                className="text-sm text-gray-600 absolute px-6 left-0 -top-3.5 peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-base peer-placeholer-shown:text-gray-400 transition-all"
              >
                Email address
              </label>
            </div>

            <div className="flex flex-col items-end">
              <div className="w-full relative">
                <input
                  id="password"
                  type="password"
                  className={`peer w-full h-10 px-6 border-b-2 outline-none ${
                    errors.password
                      ? "focus:border-red-400"
                      : "focus:border-sky-500"
                  } focus:border-sky-500 focus:border-b-[3px] border-gray-300 placeholder-gray-600 invalid:border-b-[3px] focus:invalid:no-underline focus:invalid:outline-none disabled:border-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-500 placeholder-transparent`}
                  placeholder="Password"
                  {...register("password", { required: "This is required" })}
                  // required
                  // value={password}
                  // onChange={onInputChange}
                />
                <div className="h-6 w-ful">
                  {errors.password && (
                    <span className="text-red-400 text-sm mt-2 italic font-bold">
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
              <button type="reset" className="p-3 -mr-3 w-max">
                <span className="text-sm tracking-wide text-blue-600">
                  Forgot password ?
                </span>
              </button>
            </div>
            <div className="space-y-4">
              {status === "checking" ? (
                <LoadingButton />
              ) : (
                <button
                  type="submit"
                  className=" block px-6 py-3 rounded-xl bg-sky-500 w-full hover:bg-sky-600 focus:bg-sky-700 active:bg-sky-500 disabled:pointer-events-none disabled:opacity-40 disabled:bg-gray-400"
                >
                  <span className="text-lg text-white ">Login</span>
                </button>
              )}
              <Link to="/auth/register" className="block w-max p-3 -ml-3">
                <span className="text-sm tracking-wide text-blue-600">
                  Create new account
                </span>
              </Link>
            </div>
          </form>
          <div className="w-full mt-4 pt-6 border-t space-y-6">
            <div className="w-full h-12">
              {errorMsg?.type === "login" && <Error msg={errorMsg.error} />}
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
