'use client'
import React, { useState } from 'react';
import ConfigModal from '@/components/Modal'; 

interface FormField {
  id: string;
  type: string;
  name: string;
  technicalName: string;
  required: boolean;
}

const FormFieldCreator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldType, setFieldType] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFieldTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFieldType(e.target.value);
  };

  const handleFieldNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      if (fieldType === 'email') {
          setFieldName(value);
      } else {
          setFieldName(value.toLowerCase().replace(/\s+/g, '_'));
      }
  };

  const handleIsRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsRequired(e.target.checked);
  };

  const handleSaveConfiguration = () => {
      if (!fieldType || !fieldName) {
          setErrors({ fieldName: 'Field name and type are required!' });
          return;
      }

      const newField: FormField = {
          id: Math.random().toString(36).substring(7),
          type: fieldType,
          name: fieldName,
          technicalName: fieldName,
          required: isRequired,
      };

      setFormFields(prevFormFields => [...prevFormFields, newField]);
      setIsOpen(false);
      setFieldType('');
      setFieldName('');
      setIsRequired(false);
      setErrors({});
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.dataTransfer.setData('id', id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedId = e.dataTransfer.getData('id');
      const draggedField = formFields.find(field => field.id === droppedId);
      if (draggedField) {
          const newFormFields = formFields.filter(field => field.id !== droppedId);
          setFormFields([...newFormFields, draggedField]);
      }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
  };

  return (
      <div className="container p-4">
          <center>
              <button
                  onClick={() => setIsOpen(true)}
                  disabled={isOpen}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  bottom-4 right-4"
              >
                  add field
              </button>
          </center>
          <div className="mt-8 w-96" onDrop={handleDrop} onDragOver={handleDragOver}>
              {formFields.map((field, index) => (
                  <div key={field.id} className="mb-4" draggable onDragStart={(e) => handleDragStart(e, field.id)}>
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
              <ConfigModal isOpen={isOpen} setIsOpen={setIsOpen}>
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
                              onChange={handleFieldNameChange}
                              className="w-full p-2 border border-gray-300 rounded mb-4"
                          />
                      </div>
                  )}

                  <div>
                      <input
                          type="checkbox"
                          id="isRequired"
                          checked={isRequired}
                          onChange={handleIsRequiredChange}
                          className="mr-2"
                      />
                      <label htmlFor="isRequired">Required</label>
                  </div>

                  <button
                      onClick={handleSaveConfiguration}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                  >
                      Save Configuration
                  </button>

                  {errors.fieldName && <p className="text-red-500 text-sm mt-2">{errors.fieldName}</p>}
              </ConfigModal>
          </div>
      </div>
  );
};

export default FormFieldCreator;
