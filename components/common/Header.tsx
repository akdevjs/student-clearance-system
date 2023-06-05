import React, { useState } from "react";
import userAtom from "@/GlobalStates";
import { stdAtom } from "@/GlobalStates";
import { useAtom } from "jotai/react";
import { useRouter } from "next/router";

const Header = ({ role }: { role: any }) => {
  const [user, setUser] = useAtom(userAtom);
  const [std, setStd] = useAtom(stdAtom);

  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
    if (router.pathname.includes("faculity")) {
      setUser({
        role: "",
        signedIn: false,
      });
    } else {
      setStd({
        reg: "",
        signedIn: false,
      });
    }
  };

  return (
    <header className="flex items-center text-white justify-between p-4 bg-blue-600">
      <div>
        {router.pathname.includes("faculity") ? (
          <h1 className="text-xl font-bold">
            Faculty Portal - {role?.toUpperCase()}
          </h1>
        ) : (
          <h1 className="text-xl font-bold">
            Student Portal - {role?.toUpperCase()}
          </h1>
        )}
      </div>
      <div className="relative ml-auto"></div>
      <button
        onClick={handleLogout}
        className="text-sm bg-white p-2 rounded-lg hover:bg-gray-200 text-blue-500 hover:text-blue-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
