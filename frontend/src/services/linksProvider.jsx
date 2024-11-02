import { createContext, useMemo, useState } from "react";

export const HelperLinkContext = createContext({});

const HelperLinkProvider = ({ children }) => {
  const [helper, setHelper] = useState({});
  const [links, setLinks] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deletedLinks, setDeletedLinks] = useState([]);
  const [linkToEdit, setLinkToEdit] = useState(null);

  const toggleSettings = (e, link = null) => {
    if (e.target.closest("#delete") || e.target.closest("#drag")) return;
    if (showSettings) {
      renderLinks();
    }
    if (!showSettings && link) {
      localStorage.setItem("newLink", JSON.stringify(link));
    }
    setShowSettings(!showSettings); // Toggle the settings visibility
  };

  const value = useMemo(
    () => ({
      helper,
      setHelper,
      links,
      setLinks,
      showSettings,
      setShowSettings,
      toggleSettings,
      itemToDelete,
      setItemToDelete,
      isPopupOpen,
      setIsPopupOpen,
      deletedLinks,
      setDeletedLinks,
      linkToEdit,
      setLinkToEdit,
    }),
    [helper, links, showSettings, isPopupOpen, linkToEdit]
  );
  return (
    <HelperLinkContext.Provider value={value}>
      {children}
    </HelperLinkContext.Provider>
  );
};

export default HelperLinkProvider;
