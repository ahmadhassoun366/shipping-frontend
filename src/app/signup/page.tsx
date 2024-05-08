"use client";
import Image from "next/image";
import man1 from "../../../public/img/man.png";
import HeaderComponent from "../layout/header/header.component";
import Footer from "../layout/footer/footer.component";
import QueryApi from "@/shared/query-api";
import { useFormik } from "formik";
import * as yup from "yup";
import { redirect } from "next/navigation";
import ROUTES from "@/static/router.data";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUP() {
  const router = useRouter();
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm password is required"),
    type: yup
      .string()
      .oneOf(["Customer", "Receiver","Employee"], "Type is required")
      .required("You must select a type"),
  });

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await QueryApi.signup(
          values.name,
          values.email,
          values.password,
          values.type
        );
        console.log("Signup Success:", response);
        toast.success("Registered Successfully !", {
          position: "top-right",
          theme: "dark",
        });
        router.push(ROUTES.signIn);
      } catch (error) {
        console.error("Registration Failed", error);
        toast.error("Registration Failed !", {
          position: "top-right",
          theme: "dark",
        });
      }
    },
  });

  return (
    <>
      <HeaderComponent />
      <section className="my-8 min-w-screen flex items-center justify-center">
        <div className="w-3/4 flex items-center justify-center bg-gray-50 rounded-3xl text-white">
          <div className="w-2/4">
            <Image className="w-full rounded-l-3xl" alt="" src={man1} />
          </div>
          <div className="md:flex flex flex-col justify-center w-2/4 md:px-10 space-y-4">
            <div className="text-center space">
              <h1 className="text-4xl font-medium uppercase text-red-500">
                REGISTER
              </h1>
              <p className="text-gray-500">
                Enter your information to register
              </p>
            </div>

            <form
              className="flex flex-col -mx-3 text-gray-900"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                  placeholder="Full Name"
                />
              </div>
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                  placeholder="Email"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>
              <div className="w-full px-3 mb-5 flex gap-4">
                <div className="w-2/4">
                  <label className="text-xs font-semibold px-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500">{formik.errors.password}</div>
                  )}
                </div>
                <div className="w-2/4">
                  <label className="text-xs font-semibold px-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                    placeholder="Confirm Password"
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className="text-red-500">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
              </div>
              <div className="w-full px-3 mb-5"></div>
              <div className="w-full px-3 mb-5">
                <label className="text-xs font-semibold px-1">Type</label>
                <select
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                >
                  <option value="Customer">Customer</option>
                  <option value="Receiver">Receiver</option>
                  <option value="Employee">Employee</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                  <div className="text-red-500">{formik.errors.type}</div>
                )}
              </div>
              <div className="w-full px-3">
                <button
                  type="submit"
                  className="block w-full max-w-xs mx-auto bg-neutral-900 hover:bg-red-500 focus:bg-neutral-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  REGISTER NOW
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
