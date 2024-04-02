"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa6";
import { CiTextAlignLeft } from "react-icons/ci";
function page() {
  const router = useRouter();

  const [receivedData, setReceivedData] = useState<any>({});
  const [data, setData] = useState<any>([]);
  //    {}=router

  const getvalues = async () => {
    const rawData = await localStorage.getItem("dataKey");
    const key = await localStorage.getItem("dataValue");
    const parsedData: any = key ? JSON.parse(key) : null;
    const parsedData2: any = rawData ? JSON.parse(rawData) : null;

    const newData: { [key: string]: any } = {}; // Initialize an empty object

    let newKeyName = 0;

    // Iterate over the keys of the parsedData object
    for (const key in parsedData2) {
      if (parsedData2.hasOwnProperty(key)) {
        // Generate a new key name dynamically (for example, add a prefix or suffix)

        // Assign the value from the original object to the new key in the newData object
        newData[newKeyName++] = parsedData2[key];
      }
    }

    setReceivedData(newData);
    // setReceivedData(parsedData2);
    // console.log(key)
    // console.log(key)
    setData(parsedData);
  };

  useEffect(() => {
    console.log();
    getvalues();
  }, [data, receivedData]);

  return (
    <div
      style={{
        backgroundImage: `url('bg.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="  h-[100vh]  grid grid-cols-1 place-items-center"
    >
      <div className="flex flex-col items-center  bg-white shadow-lg w-8/12 h-5/6 rounded-lg">
        <div className=" grid md:grid-cols-2  w-full place-items-center p-4 gap-4">
          {data &&
            data.map((value: any, index: number) => {
              return (
                <div key={index} className="md:w-10/12 w-full bg-blue-200 p-4 rounded-lg shadow-lg">
                  <h1>

                  {value.name}: {receivedData[index]}
                  </h1>

                  {value.type === "email" ? (
                  <div className="pr-2 ">
                    <IoIosMail size={24} color="gray" />
                  </div>
                ) : value.type === "number" ? (
                  <div className="pr-2 ">
                    <FaPhoneAlt size={24} color="gray" />
                  </div>
                ) : (
                  value.type === "text" ? (
                    <div className="pr-2 ">
                      <CiTextAlignLeft size={24} color="gray" />
                    </div>
                  ):
                  (
                    value.type==="date"?
                    <div className="pr-2 ">
                      <FaRegCalendar size={24} color="gray"/>
</div>
:
null
                  )
                )}
                </div>
              );
            })}
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

export default page;
