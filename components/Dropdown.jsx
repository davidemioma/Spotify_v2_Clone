import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  ChevronDownIcon,
  LogoutIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

const Dropdown = () => {
  const { data: session } = useSession();

  const [openBtn, setOpenBtn] = useState(false);

  return (
    <>
      <div
        className="flex items-center space-x-2 rounded-full cursor-pointer text-sm bg-black opacity-90 hover:opacity-80 p-1 pr-2"
        onClick={() => setOpenBtn(!openBtn)}
      >
        <img
          className="w-7 h-7 rounded-full"
          src={
            session?.user?.image ||
            "https://thedesignhouse.ie/wordpress/wp-content/themes/makery/images/avatar.png"
          }
          alt=""
        />

        <p className="whitespace-nowrap text-xs sm:text-sm">
          {session?.user?.name}
        </p>

        {openBtn ? (
          <ChevronDownIcon className="h-5 w-5" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" />
        )}
      </div>

      {openBtn && (
        <button
          className="absolute text-white mt-7 top-3 right-0 bg-[#1a1a1a] flex items-center p-2 w-56 rounded-md shadow-lg tracking-wide hover:bg-[#3E3E3E]"
          onClick={() => signOut()}
        >
          <LogoutIcon className="w-5 h-5 mr-2" />

          <p className="text-sm">Log Out</p>
        </button>
      )}
    </>
  );
};

export default Dropdown;
