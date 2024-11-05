import React, { createContext, useContext, useState } from "react";

const GuideTemplateContext = createContext();

export const useDialog = () => useContext(GuideTemplateContext);

export const GuideTemplateProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <GuideTemplateContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </GuideTemplateContext.Provider>
  );
};
