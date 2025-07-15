import React, { createContext, useContext, useState } from "react";
import Popup from "../components/Popup"; // Reusable UI

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showPopup = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); // Hide after 3 seconds
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {message && <Popup message={message} />}
    </PopupContext.Provider>
  );
};
