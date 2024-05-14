"use client";
import Image from "next/image";
import HeaderComponent from "../layout/header/header.component";
import Footer from "../layout/footer/footer.component";
import man1 from "../../../public/img/man2.png";
import QueryApi from "@/shared/query-api";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import AuthService from "@/shared/services/authentication/authentication.service";
import { useContext } from "react";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import { useRouter } from "next/navigation";
import ROUTES from "@/static/router.data";

export default function SignIn() {
  const router = useRouter();
  const authService = useContext<AuthService>(AuthenticationSvcContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Step 1: Perform the actual HTTP request via QueryApi
        const response = await QueryApi.signin(values.email, values.password);
        console.log("Sign in Response:", response);

        // Assuming the response contains the token and user type necessary for session management
        if (response && response.data.token && response.data.type) {
          // Step 2: Use AuthService to manage session with the received token
          authService.login(
            response.data.token,
            response.data.type,
            response.data.id
          );
          console.log("authSvc", authService.userId);

          // Optional: Log success or perform additional tasks
          console.log("Sign in Success:", response);
          toast.success("Signed in successfully!", {
            position: "top-right",
            theme: "dark",
          });

          // Step 3: Redirect to dashboard or another route
          router.push(ROUTES.dashboard);
        } else {
          throw new Error("Invalid login response");
        }
      } catch (error) {
        // Handle errors from either the sign-in request or credential handling
        console.error("Sign in Error:", error);
        toast.error(
          "Failed to sign in. Please check your credentials and try again.",
          {
            position: "top-right",
            theme: "dark",
          }
        );
      }
    },
  });
  return (
    <>
      <HeaderComponent />
      <section
        className="
           my-8 min-w-screen  flex items-center justify-center"
      >
        <div className="w-3/4 flex  items-center justify-center bg-neutral-50 rounded-3xl text-white   space-x-4">
          <form
            className="flex flex-col w-2/4 items-center rounded-l-3x space-y-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col items-center space-y-4 text-center  w-full">
              <h1 className="text-4xl font-bold uppercase text-black">
                Sign{" "}
                <span className="text-4xl font-bold uppercase text-red-500">
                  In
                </span>
              </h1>
              <h1 className="text-gray-700">Enter your email and password</h1>
              <button className="bg-gray-200 w-3/4 flex items-center justify-center  py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                <Image
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt=""
                  width={20}
                  height={20}
                />
                <h1 className="text-black">Sign in with Google</h1>
              </button>
            </div>
            <div className="flex items-center mb-3 w-3/4">
              <hr className="h-0 border-b border border-gray-300 grow" />
              <p className="mx-4 text-gray-600">or</p>
              <hr className="h-0 border-b border border-gray-300 grow" />
            </div>
            <div className="space-y-8 w-3/4">
              <div className="flex -mx-3">
                <div className="w-full px-3 space-y-2">
                  <label className="text-xs font-semibold px-1 text-gray-900">
                    Email*
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="fa-regular fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="w-full text-black -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="john@example.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                  )}
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 space-y-2">
                  <label className="text-xs font-semibold px-1  text-gray-900">
                    Password
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="fa-regular fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type="password"
                      name="password"
                      className="w-full -ml-10 text-black pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500">{formik.errors.password}</div>
                  )}
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    type="submit"
                    className="block w-full max-w-xs mx-auto bg-neutral-900 hover:bg-red-500 focus:bg-neutral-700 text-white rounded-lg px-3 py-3 font-semibold"
                  >
                    SIGN IN NOW
                  </button>
                  {/* already have an account */}
                  <div className="text-center mt-6">
                    <p className="text-gray-600">
                      Don&apos;t have an account?{" "}
                      <a
                        href="/signup"
                        className="text-gray-800 font-bold hover:text-red-500"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="w-2/4 ">
            <Image className="w-full rounded-r-3xl" alt="" src={man1} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
