const showPopup = (popupData) => {
    if (!popupData || popupData.length === 0) {
      console.warn('No popup data available');
      return;
    }
  
    popupData.forEach(popup => {
      // Create popup container
      const popupContainer = document.createElement('div');
      Object.assign(popupContainer.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: popup.headerBg || '#FFFFFF',
        padding: '20px',
        border: '1px solid #000',
        zIndex: 1000,
      });
  
      // Create header
      const header = document.createElement('h2');
      header.textContent = popup.headerText;
      header.style.color = popup.headerTextColor || '#000';
      popupContainer.appendChild(header);
  
      // Create content
      const content = document.createElement('div');
      content.innerHTML = popup.contentHtml;
      Object.assign(content.style, {
        color: popup.fontColor || '#000',
        fontSize: popup.font || '14px',
      });
      popupContainer.appendChild(content);
  
      // Create action button
      const actionButton = document.createElement('button');
      actionButton.textContent = popup.actionButtonText || 'Close';
      Object.assign(actionButton.style, {
        backgroundColor: popup.actionButtonColor || '#CCC',
      });
      actionButton.addEventListener('click', () => {
        document.body.removeChild(popupContainer); // Remove popup when button is clicked
      });
      popupContainer.appendChild(actionButton);
  
      // Append the popup to the document body
      document.body.appendChild(popupContainer);
    });
  };
  
  export default showPopup;
  