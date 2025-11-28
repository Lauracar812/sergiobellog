import React, { createContext, useContext } from 'react';

const ContactModalContext = createContext();

export const ContactModalProvider = ({ children, isOpen, setIsOpen }) => {
  return (
    <ContactModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal debe ser usado dentro de ContactModalProvider');
  }
  return context;
};
