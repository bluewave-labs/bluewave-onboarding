import { React, useEffect, useState } from "react";
import {
  addBanner,
  editBanner,
  getBannerById,
} from "../../services/bannerServices";
import GuideTemplate from "../../templates/GuideTemplate/GuideTemplate";
import { emitToastError } from "../../utils/guideHelper";
import toastEmitter, { TOAST_EMITTER_KEY } from "../../utils/toastEmitter";
import BannerLeftAppearance from "./BannerPageComponents/BannerLeftAppearance/BannerLeftAppearance";
import BannerLeftContent from "./BannerPageComponents/BannerLeftContent/BannerLeftContent";
import BannerPreview from "./BannerPageComponents/BannerPreview/BannerPreview";
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";

const BannerPage = ({ isEdit, itemId, setItemsUpdated }) => {
  const defaultState = {
    backgroundColor: "#F9F5FF",
    fontColor: "#344054",
    activeButton: 0,
    isTopPosition: true,
    bannerText: "",
    url: "",
    actionUrl: "",
    buttonAction: "No action",
  };

  const [state, setState] = useState(defaultState);
  const { closeDialog } = useDialog();

  const resetState = () => {
    setState(defaultState);
  };

  const handleButtonClick = (index) => {
    setState((prev) => ({ ...prev, activeButton: index }));
  };

  useEffect(() => {
    if (isEdit) {
      const fetchBannerData = async () => {
        try {
          const bannerData = await getBannerById(itemId);
          setState((prev) => ({
            ...prev,
            backgroundColor: bannerData.backgroundColor || defaultState.backgroundColor,
            fontColor: bannerData.fontColor || defaultState.fontColor,
            bannerText: bannerData.bannerText || "",
            url: bannerData.url || "",
            actionUrl: bannerData.actionUrl || "",
            buttonAction: bannerData.closeButtonAction || defaultState.buttonAction,
            isTopPosition: bannerData.position === "top",
          }));
        } catch (error) {
          emitToastError(error);
        }
      };

      fetchBannerData();
    }
  }, [isEdit, itemId]);

  const onSave = async () => {
    const bannerData = {
      backgroundColor: state.backgroundColor,
      fontColor: state.fontColor,
      url: state.url,
      actionUrl: state.actionUrl,
      position: state.isTopPosition ? "top" : "bottom",
      closeButtonAction: state.buttonAction.toLowerCase(),
      bannerText: state.bannerText,
    };

    try {
      const response = isEdit
        ? await editBanner(itemId, bannerData)
        : await addBanner(bannerData);
      const toastMessage = isEdit
        ? "You edited this banner"
        : "New banner saved";
      toastEmitter.emit(TOAST_EMITTER_KEY, toastMessage);
      setItemsUpdated((prevState) => !prevState);
      handleCloseDialog();
    } catch (error) {
      emitToastError(error);
    }
  };

  const handleCloseDialog = () => {
    closeDialog();
    resetState();
  };

  return (
    <GuideTemplate
      title={isEdit ? "Edit Banner" : "New Banner"}
      activeButton={state.activeButton}
      handleButtonClick={handleButtonClick}
      onSave={onSave}
      onClose={handleCloseDialog}
      rightContent={() => (
        <BannerPreview
          backgroundColor={state.backgroundColor}
          color={state.fontColor}
          isTopPosition={state.isTopPosition}
          bannerText={state.bannerText}
          setBannerText={(text) =>
            setState((prev) => ({ ...prev, bannerText: text }))
          }
        />
      )}
      leftContent={() => (
        <BannerLeftContent
          state={state}
          updateState={(updates) => setState((prev) => ({ ...prev, ...updates }))}
        />
      )}
      leftAppearance={() => (
        <BannerLeftAppearance
          state={state}
          updateState={(updates) => setState((prev) => ({ ...prev, ...updates }))}
        />
      )}
    />
  );
};

export default BannerPage;