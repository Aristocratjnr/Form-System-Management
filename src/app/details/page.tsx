'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import { CiTextAlignLeft } from "react-icons/ci";
import { CiTextAlignCenter } from "react-icons/ci";

function Page() {
  const router = useRouter();

  const [receivedData, setReceivedData] = useState<any>({});
  const [data, setData] = useState<any>([]);

  const getValues = async () => {
    // Your existing implementation
  };

  useEffect(() => {
    getValues();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('bg.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="  h-[100vh]  grid grid-cols-1 place-items-center"
    >
      <div className="flex flex-col items-center overflow-scroll hide-scrollbar  bg-white shadow-lg w-8/12 h-5/6 rounded-lg">
        <div className=" grid md:grid-cols-2  w-full place-items-center p-4 gap-4">
          {data &&
            data.map((value: any, index: number) => (
              <div key={index} className="md:w-10/12 w-full bg-blue-200 p-4 rounded-lg shadow-lg">
                <h1>{value.name}: {receivedData[index]}</h1>
                {value.type === "email" ? (
                  <div className="pr-2 ">
                    <IoIosMail size={24} color="gray" />
                  </div>
                ) : value.type === "number" ? (
                  <div className="pr-2 ">
                    <FaPhoneAlt size={24} color="gray" />
                  </div>
                ) : value.type === "text" ? (
                  <div className="pr-2 ">
                    <CiTextAlignLeft size={24} color="gray" />
                  </div>
                  ) : value.type === "textarea" ? (
                    <div className="pr-2 ">
                      <CiTextAlignCenter size={24} color="gray" />
                    </div>
                ) : value.type === "date" ? (
                  <div className="pr-2 ">
                    <FaRegCalendar size={24} color="gray" />
                  </div>
                ) : null}
              </div>
            ))}
        </div>

        <button
          onClick={() => {
            router.push("/");
          }}
          className="w-20 p-2 text-white rounded bg-blue-500"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default Page;
