import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);

  const updateFormData = (newData) => {
    setIsFormDirty(true);
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const resetFormData = () => {
    setFormData({});
    setIsFormDirty(false);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData, isFormDirty, setIsFormDirty }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
