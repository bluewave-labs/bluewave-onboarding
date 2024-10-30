import PropTypes from "prop-types";
import React from "react";

const HelperLinksPage = ({
  helpers,
  setCurrentHelper,
  setHelpers,
  setShowLinksPage,
}) => {
  return (
    <div>
      <h1>Helper link</h1>
    </div>
  );
};

HelperLinksPage.propTypes = {
  helpers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      headerBackgroundColor: PropTypes.string,
      linkFontColor: PropTypes.string,
      iconColor: PropTypes.string,
    })
  ),
  setCurrentHelper: PropTypes.func,
  setHelpers: PropTypes.func,
  setShowLinksPage: PropTypes.func,
};
export default HelperLinksPage;
