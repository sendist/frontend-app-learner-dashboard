import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "@edx/frontend-platform/i18n";

import EmailSettingsModal from "containers/EmailSettingsModal";
import UnenrollConfirmModal from "containers/UnenrollConfirmModal";
import { reduxHooks } from "hooks";
import SocialShareMenu from "./SocialShareMenu";

import {
  useEmailSettings,
  useUnenrollData,
  useOptionVisibility,
} from "./hooks";

import messages from "./messages";
import MenuIcon from "../../../../assets/menu_icon.svg";

export const CourseCardMenu = ({ cardId }) => {
  const { formatMessage } = useIntl();
  const [showUnenrollModal, setShowUnenrollModal] = useState(false);

  const emailSettings = useEmailSettings();
  const { isMasquerading } = reduxHooks.useMasqueradeData();
  const { isEmailEnabled } = reduxHooks.useCardEnrollmentData(cardId);
  const { shouldShowUnenrollItem, shouldShowDropdown } =
    useOptionVisibility(cardId);

  if (!shouldShowDropdown) {
    return null;
  }

  return (
    <div>
      <button
        id={`course-actions-dropdown-${cardId}`}
        className="p-2"
        onClick={() => setShowUnenrollModal(true)}
        aria-label={formatMessage(messages.dropdownAlt)}
      >
        {/* Use the SVG as an image source */}
        <img src={MenuIcon} alt="Actions" />
      </button>
      {shouldShowUnenrollItem && showUnenrollModal && (
        <UnenrollConfirmModal
          show={showUnenrollModal}
          closeModal={() => setShowUnenrollModal(false)}
          cardId={cardId}
        />
      )}
      {isEmailEnabled && (
        <EmailSettingsModal
          show={emailSettings.isVisible}
          closeModal={emailSettings.hide}
          cardId={cardId}
        />
      )}
      <SocialShareMenu cardId={cardId} emailSettings={emailSettings} />
    </div>
  );
};

CourseCardMenu.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardMenu;
