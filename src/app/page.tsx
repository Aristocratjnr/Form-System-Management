'use client'
import React, { useEffect, useState } from "react";
import ConfigModal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { CiTextAlignLeft } from "react-icons/ci";

interface FormField {
  id: string;
  type: string;
  name: string;
  technicalName: string;
  required: boolean;
  value: string;
}

const FormFieldCreator: React.FC = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [fieldType, setFieldType] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFieldTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldType(e.target.value);
  };

  const handleFieldNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    if (fieldType === "email") {
      setFieldName(value);
    } else {
      setFieldName(value.toLowerCase().replace(/\s+/g, "_"));
    }
  };

  const oldvalue = async () => {
    const rawData = await localStorage.getItem("dataValue");
    setFormFields(rawData && JSON.parse(rawData));
  };
  const handleSubmit = () => {
    // Define the accumulator with an index signature
    const fieldsValues = formFields.reduce<{ [key: string]: string }>(
      (acc, field) => {
        acc[field.name] = field.value;
        return acc;
      },
      {}
    );

    // console.log(fieldsValues);
    if (fieldsValues) {
      localStorage.setItem("dataKey", JSON.stringify(fieldsValues));
      localStorage.setItem("dataValue", JSON.stringify(formFields));
      // console.log(formFields)
      router.push(`/details`, fieldsValues);
    }
  };

  const handleInputChange = (id: string, inputValue: string) => {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, value: inputValue } : field
      )
    );
  };

  const handleIsRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRequired(e.target.checked);
  };

  const handleSaveConfiguration = () => {
    if (!fieldType || !fieldName) {
      setErrors({ fieldName: "Field name and type are required!" });
      return;
    }

    const newField: FormField = {
      id: Math.random().toString(36).substring(7),
      type: fieldType,
      name: fieldName,
      technicalName: fieldName,
      required: isRequired,
      value: "",
    };

    setFormFields((prevFormFields) => [...prevFormFields, newField]);
    setIsOpen(false);
    setFieldType("");
    setFieldName("");
    setIsRequired(false);
    setErrors({});
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("id", id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData("id");
    const draggedField = formFields.find((field) => field.id === droppedId);
    if (draggedField) {
      const newFormFields = formFields.filter(
        (field) => field.id !== droppedId
      );
      setFormFields([...newFormFields, draggedField]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    oldvalue();
  }, []);

  // Function to convert snake_case to spaced out capitalized words
  function getFieldDisplayName(name: string): string {
    return name
      .split('_')

      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div
      style={{
        backgroundImage: `url('bg.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="  h-[100vh]  grid grid-cols-1 place-items-center"
    >
      <div className="flex flex-col  lg:justify-between lg:flex-row-reverse  bg-white shadow-lg w-8/12 h-5/6 rounded-lg">
        <center className="lg:flex lg:items-center lg:flex-col justify-center lg:w-6/12 p-4 lg:p-0">
        <div className=" w-9/12 gap-1 grid">
              <div className="mb-4">
                <label htmlFor="fieldType" className="block font-light mb-1">
                  Field Type:
                </label>
                <select
                  id="fieldType"
                  value={fieldType}
                  onChange={handleFieldTypeChange}
                  className="select select-bordered w-full "
                >
                  <option disabled selected>
                    Select Field Type
                  </option>
                  <option value="">Select Field Type</option>
                  <option value="text">Text</option>
                  <option value="email">Email_Address</option>
                  <option value="number">Number</option>
                  <option value="file">Upload</option>
                  <option value="textarea">Description</option>
                  <option value="date">Date</option>
                </select>
              </div>

              {fieldType && (
                <div>
                  <label htmlFor="fieldName" className="block font-bold mb-1">
                    Field name:
                  </label>
                  <input
                    type="text"
                    id="fieldName"
                    value={fieldName}
                    onChange={handleFieldNameChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                </div>
              )}

              <button
                onClick={handleSaveConfiguration}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
              >
                Save Configuration
              </button>

              {errors.fieldName && (
                <p className="text-red-500 text-sm mt-2">{errors.fieldName}</p>
              )}
          </div>

        </center>
        <div
          id="hide-scrollbar:"
          className=" bg-blue-200 hide-scrollbar lg:w-6/12 h-full flex flex-col items-center p-4 overflow-scroll"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h1>Generated Fields</h1>
          {formFields.map((field, index) => (
            <div
              key={field.id}
              className="mb-4 w-10/12  "
              draggable
              onDragStart={(e) => handleDragStart(e, field.id)}
            >
              <label className="block font-semibold text-sm mb-1">
                {/* Modify the label to display spaced out capitalized field name */}
                {getFieldDisplayName(field.name)}
              </label>
              <div className="w-full bg-white flex items-center rounded-lg">
               
                <input
                  type={field.type}
                  className="input  w-full "
                  // placeholder={field.name}
                  required={field.required}
                  value={field.value}
                  onChange={(e) => handleInputChange(field.id, e.target.value)} // Update on change
                />
                 {field.type === "email" ? (
                  <div className="pr-2 ">
                    <IoIosMail size={24} color="gray" />
                  </div>
                ) : field.type === "number" ? (
                  <div className="pr-2 ">
                    <FaPhoneAlt size={24} color="gray" />
                  </div>
                ) : (
                  field.type === "text" && (
                    <div className="pr-2 ">
                      <CiTextAlignLeft size={24} color="gray" />
                    </div>
                  )
                )}
              </div>
              {field.required && (
                <span className="text-red-500 text-sm"> *</span>
              )}
            </div>
          ))}
          {formFields.length > 0 && (
            <div>
              <button
                onClick={handleSubmit}
                className="p-2 text-white rounded-lg hover:bg-blue-700 bg-blue-500"
              >
                Submit
              </button>
            </div>
          )}
        </div>
   
      </div>
    </div>
  );
};

export default FormFieldCreator;
