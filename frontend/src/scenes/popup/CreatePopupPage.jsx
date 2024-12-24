import React, { useEffect, useState } from 'react';
import Turndown from 'turndown';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import PopupComponent from '../../products/Popup/PopupComponent';
import {
  addPopup,
  editPopup,
  getPopupById,
} from '../../services/popupServices';
import GuideTemplate from '../../templates/GuideTemplate/GuideTemplate';
import { useDialog } from '../../templates/GuideTemplate/GuideTemplateContext';
import { emitToastError } from '../../utils/guideHelper';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../utils/toastEmitter';
import PopupAppearance from './PopupPageComponents/PopupAppearance/PopupAppearance';
import PopupContent from './PopupPageComponents/PopupContent/PopupContent';
import PropTypes from 'prop-types';

const CreatePopupPage = ({
  autoOpen = false,
  isEdit,
  itemId,
  setItemsUpdated,
}) => {
  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    if (autoOpen) {
      // auto open dialog to run tests
      openDialog();
    }
  }, [autoOpen, openDialog]);

  const [activeButton, setActiveButton] = useState(0);

  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('#F8F9F8');
  const [headerColor, setHeaderColor] = useState('#101828');
  const [textColor, setTextColor] = useState('#344054');
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#7F56D9');
  const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF');

  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');

  const markdownContent = new Turndown().turndown(content);
  const [url, setUrl] = useState('https://');
  const [actionButtonUrl, setActionButtonUrl] = useState('https://');
  const [actionButtonText, setActionButtonText] = useState(
    'Take me to subscription page'
  );
  const [buttonAction, setButtonAction] = useState('No action');
  const [popupSize, setPopupSize] = useState('Small');
  const [stablePopupSize, setStablePopupSize] = useState('');

  const resetState = () => {
    setHeaderBackgroundColor('#F8F9F8');
    setHeaderColor('#101828');
    setTextColor('#344054');
    setButtonBackgroundColor('#7F56D9');
    setButtonTextColor('#FFFFFF');
    setHeader('');
    setContent('');
    setUrl('https://');
    setActionButtonUrl('https://');
    setActionButtonText('Take me to subscription page');
    setButtonAction('No action');
    setPopupSize('Small');
    setActiveButton(0);
  };

  useEffect(() => {
    if (popupSize) {
      setStablePopupSize(popupSize); // prevent passing empty string to PopupComponent
    }
  }, [popupSize]);

  const stateList = [
    {
      stateName: 'Header Background Color',
      state: headerBackgroundColor,
      setState: setHeaderBackgroundColor,
    },
    { stateName: 'Header Color', state: headerColor, setState: setHeaderColor },
    { stateName: 'Text Color', state: textColor, setState: setTextColor },
    {
      stateName: 'Button Background Color',
      state: buttonBackgroundColor,
      setState: setButtonBackgroundColor,
    },
    {
      stateName: 'Button Text Color',
      state: buttonTextColor,
      setState: setButtonTextColor,
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const fetchPopupData = async () => {
        try {
          const popupData = await getPopupById(itemId);

          // Update the state with the fetched data
          setHeaderBackgroundColor(
            popupData.headerBackgroundColor || '#F8F9F8'
          );
          setHeaderColor(popupData.headerColor || '#101828');
          setTextColor(popupData.textColor || '#344054');
          setButtonBackgroundColor(
            popupData.buttonBackgroundColor || '#7F56D9'
          );
          setButtonTextColor(popupData.buttonTextColor || '#FFFFFF');
          setHeader(popupData.header || '');
          setContent(popupData.content || '');
          setActionButtonUrl(popupData.actionUrl || 'https://');
          setUrl(popupData.url || 'https://');
          setActionButtonText(
            popupData.actionButtonText || 'Take me to subscription page'
          );
          setButtonAction(popupData.closeButtonAction || 'No action');
          setPopupSize(popupData.popupSize || 'Small');
        } catch (error) {
          emitToastError(error);
        }
      };

      fetchPopupData();
    }
  }, [isEdit, itemId]);

  const onSave = async () => {
    const popupData = {
      popupSize: popupSize.toLowerCase(),
      url,
      actionUrl: actionButtonUrl,
      actionButtonText,
      headerBackgroundColor,
      headerColor,
      textColor,
      buttonBackgroundColor,
      buttonTextColor,
      closeButtonAction: buttonAction.toLowerCase(),
      header,
      content,
    };
    try {
      const response = isEdit
        ? await editPopup(itemId, popupData)
        : await addPopup(popupData);
      const toastMessage = isEdit ? 'You edited this popup' : 'New popup Saved';

      toastEmitter.emit(TOAST_EMITTER_KEY, toastMessage);
      setItemsUpdated((prevState) => !prevState);
      resetState();
      closeDialog();
    } catch (error) {
      emitToastError(error);
    }
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const previewComponent = () => (
    <PopupComponent
      header={header}
      content={markdownContent}
      previewBtnText={actionButtonText}
      headerBackgroundColor={headerBackgroundColor}
      headerColor={headerColor}
      textColor={textColor}
      buttonBackgroundColor={buttonBackgroundColor}
      buttonTextColor={buttonTextColor}
      popupSize={stablePopupSize}
    />
  );

  const rightContent = () => (
    <RichTextEditor
      previewComponent={previewComponent}
      header={header}
      setHeader={setHeader}
      setContent={setContent}
      content={content}
      resetState={resetState}
      sx={{
        minWidth: '400px',
        maxWidth: '700px',
        marginLeft: '2.5rem',
        marginTop: '1rem',
      }}
    />
  );

  const leftContent = () => (
    <PopupContent
      actionButtonUrl={actionButtonUrl}
      setActionButtonText={setActionButtonText}
      setActionButtonUrl={setActionButtonUrl}
      actionButtonText={actionButtonText}
      setButtonAction={setButtonAction}
      buttonAction={buttonAction}
      url={url}
      setUrl={setUrl}
    />
  );

  const leftAppearance = () => (
    <PopupAppearance
      data={stateList}
      setPopupSize={setPopupSize}
      popupSize={popupSize}
    />
  );

  return (
    <GuideTemplate
      title={isEdit ? 'Edit Popup' : 'New Popup'}
      activeButton={activeButton}
      handleButtonClick={handleButtonClick}
      onSave={onSave}
      rightContent={rightContent}
      leftContent={leftContent}
      leftAppearance={leftAppearance}
    />
  );
};

export default CreatePopupPage;

CreatePopupPage.propTypes = {
  autoOpen: PropTypes.bool,
  isEdit: PropTypes.bool,
  itemId: PropTypes.string,
  setItemsUpdated: PropTypes.func,
};
