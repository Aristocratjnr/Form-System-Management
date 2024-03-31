// page.tsx
'use client'
import React, { ChangeEvent } from 'react';
import './globals.css'; // Import global.css file
import { IoIosCloseCircle } from "react-icons/io";
import Head from 'next/head';


<Head>
  <link rel="icon" href="src/app/favicon.ico" />
</Head>

interface FormField {
  type: string;
  name: string;
  technicalName: string;
  required: boolean;
}

interface FormFieldCreatorProps {}

interface FormFieldCreatorState {
  isOpen: boolean;
  fieldType: string;
  fieldName: string;
  isRequired: boolean;
  formFields: FormField[];
  dob: string;
  filePreview: string | null;
  errors: { [key: string]: string };
}

class FormFieldCreator extends React.Component<FormFieldCreatorProps, FormFieldCreatorState> {
  constructor(props: FormFieldCreatorProps) {
    super(props);
    this.state = {
      isOpen: false,
      fieldType: '',
      fieldName: '',
      isRequired: false,
      formFields: [],
      dob: '',
      filePreview: null,
      errors: {},
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  handleFieldTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ fieldType: e.target.value });
  };

  handleFieldNameChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const fieldType = this.state.fieldType;

    if (fieldType === 'email') {
      this.setState({ fieldName: value });
    } else {
      this.setState({ fieldName: value.toLowerCase().replace(/\s+/g, '_') });
    }
  };

  handleIsRequiredChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ isRequired: e.target.checked });
  };

  handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ filePreview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  handleDobChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ dob: e.target.value });
  };

   handleSaveConfiguration = () => {
    const { fieldType, fieldName, isRequired, formFields } = this.state;

    if (!fieldType || !fieldName) {
      this.setState({ errors: { fieldName: 'Field name and type are required!' } });
      return;
    }

    if (isRequired && !fieldName) {
      this.setState({ errors: { fieldName: 'Field name is required' } });
      return;
    }

    const newField: FormField = {
      type: fieldType,
      name: fieldName,
      technicalName: fieldName,
      required: isRequired,
    };

    this.setState((prevState) => ({
      formFields: [...prevState.formFields, newField],
      isOpen: false, // Close modal after saving configuration
      fieldType: '',
      fieldName: '',
      isRequired: false,
      filePreview: null,
      errors: {},
    }));

    // Remove overlay by resetting the state's isOpen property
    setTimeout(() => {
      this.setState({ isOpen: false });
    }, 300); // Adjust the timeout as per your transition duration
  };

  render() {
    const { isOpen, fieldType, fieldName, isRequired, formFields, filePreview, errors } = this.state;

    return (
      <div className="relative p-4 ">
          <div className="flex flex-col justify-center items-center mb-4  ">
            <center><h1 className="text-4xl font-bold ">Form Management System</h1><code><sub>InkrisCompass.</sub></code></center>
          </div><br/><br/><br/><br/><br/><br/><br/>
        <div className='z-10'>
          <center>
            <button
              onClick={this.toggleModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  bottom-4 right-4"
            >
              Add your form
            </button>
          </center>
        </div>

        {isOpen && (
          <div className=" absolute top-0 left-0 w-full z-50  h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg w-96 ">
            <div className='w-80 flex h-12 bg-red-500 justify-end'>
            <button 
            onClick={()=>{
                this.setState({
                  isOpen:false
                })
            }}>
            <IoIosCloseCircle color='red' />

            </button>
            </div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={this.toggleModal}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <h2 className="text-xl font-bold mb-4 text-center">Your details</h2>
              <div className="mb-4">
                <label htmlFor="fieldType" className="block font-bold mb-1">
                  Your Field Type:
                </label>
                <select
                  id="fieldType"
                  value={fieldType}
                  onChange={this.handleFieldTypeChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Field Type</option>
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="number">Telephone</option>
                  <option value="file">File Upload</option>
                  <option value="textarea">Textarea</option>
                  <option value="date">DateOfbirth</option>
                </select>
              </div>
              {fieldType && (
                <div>
                  <label htmlFor="fieldName" className="block font-bold mb-1">
                    FieldName(e.g.firstname):
                  </label>
                  <input
                    type="text"
                    id="fieldName"
                    value={fieldName}
                    onChange={this.handleFieldNameChange}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                </div>
              )}
              {fieldType === 'file' && (
                <div className="mb-4">
                  <label htmlFor="fileUpload" className="block font-bold mb-1">
                    File Upload:
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={this.handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {filePreview && (
                    <img src={filePreview} alt="Uploaded File" className="mt-2 rounded-full h-20 w-20 object-cover" />
                  )}
                </div>
              )}
              <center><button
                onClick={this.handleSaveConfiguration}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
              >
                Save Configuration
              </button></center>
              {errors.fieldName && (
                <p className="text-red-500 text-sm mt-2">{errors.fieldName}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 absolute bottom-4 right-4">
          {formFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block font-bold mb-1">{field.name}:</label>
              <input
                type={field.type}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={field.name}
                required={field.required}
              />
              {field.required && <span className="text-red-500 text-sm"> *</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FormFieldCreator;
