/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useFormik } from "formik";
import { animated, useSpring } from "@react-spring/web";
import userAtom from "./GlobalStates";
import { stdAtom } from "./GlobalStates";
import { useAtom } from "jotai";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

interface ErrorType {
  username?: string;
  password?: string;
}
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [std, setStd] = useAtom(stdAtom);
  const router = useRouter();
  

  const formAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "Student",
    },

    validate: (values) => {
      const errors: ErrorType = {};

      if (!values.username) {
        errors.username = "Username is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },

    onSubmit: async (values) => {
      setLoading(true);
      const { username, password, role } = values;
      let status = true;
      if (role === "Faculty") {
        const querySnapshot = await getDocs(collection(db, "faculity"));
        querySnapshot.forEach((doc) => {
          if (
            doc.data().email === username &&
            doc.data().password === password
          ) {
            status = false;
            setUser({
              role: doc.data().role,
              signedIn: true,
            });
            router.push(`/faculity/${doc.data().role}`);
          }
        });
      } else {
        const querySnapshot = await getDocs(collection(db, "students"));
        querySnapshot.forEach((doc) => {
          if (
            doc.data().registrationNumber === username &&
            doc.data().password === password
          ) {
            status = false;
            setStd({
              reg: doc.data().registrationNumber,
              signedIn: true,
            });
            router.push(`/student/${doc.data().registrationNumber}`);
          }
        });
      }
      if (status) {
        formik.setFieldError("password", "Invalid username or password");
      }
      setLoading(false);
    },
  });

  return (
    <animated.div style={formAnimation}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-sm">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <img
              className="mx-auto mb-6"
              src="/img/kicsit-logo.png"
              alt="University Logo"
            />
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                {...formik.getFieldProps("username")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...formik.getFieldProps("password")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Role
              </label>
              <select
                id="role"
                {...formik.getFieldProps("role")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </animated.div>
  );
};

export default LoginPage;
