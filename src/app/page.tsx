// page.tsx
'use client'
import React, { ChangeEvent } from 'react';
import './globals.css'; // Import global.css file
import { IoIosCloseCircle } from "react-icons/io";
import Head from 'next/head';
import ConfigModal from '@/components/Modal';


<Head>
  <link rel="icon" href="src/app/favicon.ico" />
</Head>

interface FormField {
  type: string;
  name: string;
  technicalName: string;
  required: boolean;
}

interface FormFieldCreatorProps { }

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
      <div className="container p-4">

        <button
          onClick={() => (document.getElementById('config-modal') as HTMLDialogElement)?.showModal()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  bottom-4 right-4">
          Add your form
        </button>

        <div className="mt-8 w-96">
          {formFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block font-bold mb-1">{field.name}:</label>
              <input
                type={field.type}
                className="input input-bordered w-full max-w-xs"
                placeholder={field.name}
                required={field.required}
              />
              {field.required && <span className="text-red-500 text-sm"> *</span>}
            </div>
          ))}
        </div>

        <div className="my-8">

          <ConfigModal >


            <div className="mb-4">
              <label htmlFor="fieldType" className="block font-light mb-1">
                Field Type:
              </label>

              <select
                id="fieldType"
                value={fieldType}
                onChange={this.handleFieldTypeChange}
                className="select select-bordered w-full ">
                <option disabled selected>Select Field Type</option>
                <option value="">Select Field Type</option>
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Telephone</option>
                <option value="file">File Upload</option>
                <option value="textarea">Text Area</option>
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
                  onChange={this.handleFieldNameChange}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
              </div>
            )}

            <button onClick={this.handleSaveConfiguration} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block">
              Save Configuration
            </button>

            {errors.fieldName && (
              <p className="text-red-500 text-sm mt-2">{errors.fieldName}</p>
            )}


          </ConfigModal>
        </div>
      </div>
    );
  }
}

export default FormFieldCreator;
