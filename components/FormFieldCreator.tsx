'use client'
import React, { ChangeEvent } from 'react';

interface FormField {
  type: string;
  name: string;
  technicalName: string;
}

interface FormFieldCreatorProps {}

interface FormFieldCreatorState {
  isOpen: boolean;
  fieldType: string;
  fieldName: string;
  formFields: FormField[];
}

class FormFieldCreator extends React.Component<FormFieldCreatorProps, FormFieldCreatorState> {
  constructor(props: FormFieldCreatorProps) {
    super(props);
    this.state = {
      isOpen: false,
      fieldType: '',
      fieldName: '',
      formFields: [],
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  handleFieldTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ fieldType: e.target.value });
  };

  handleFieldNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ fieldName: e.target.value.toLowerCase().replace(/\s+/g, '_') });
  };

  handleSaveConfiguration = () => {
    const { fieldType, fieldName, formFields } = this.state;
    const formattedFieldName = fieldName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const newField: FormField = {
      type: fieldType,
      name: formattedFieldName,
      technicalName: fieldName,
    };

    this.setState({
      formFields: [...formFields, newField],
      isOpen: false,
      fieldType: '',
      fieldName: '',
    });
  };

  render() {
    const { isOpen, fieldType, fieldName, formFields } = this.state;

    return (
      <div className="p-4">
        <div className="flex justify-center">
          <h2 className="text-xl font-bold mb-4">Form Management System</h2>
        </div>

        <div className="flex justify-center">
          <button
            onClick={this.toggleModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Field
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg">
              <center><h2 className="text-xl font-bold mb-4">Add New Field</h2></center>
              <div className="mb-4">
                <label htmlFor="fieldType" className="block font-bold mb-1">
                  Field Type:
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
                  <option value="tel">Telephone</option>
                  <option value="file">File Upload</option>
                  <option value="textarea">Textarea</option>
                </select>
              </div>
              {fieldType && (
                <div>
                  <label htmlFor="fieldName" className="block font-bold mb-1">
                    Field Name:
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
              <button
                onClick={this.handleSaveConfiguration}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Configuration
              </button>
            </div>
          </div>
        )}

        <div className="mt-8">
          {formFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block font-bold mb-1">{field.name}:</label>
              <input
                type={field.type}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={field.name}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FormFieldCreator;
