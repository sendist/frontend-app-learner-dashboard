import React from "react";
import PropTypes from "prop-types";
import { Dialog } from "../../components/ui/dialog";
import { nullMethod } from "utils";

import ConfirmPane from "./components/ConfirmPane";
import ReasonPane from "./components/ReasonPane";
import FinishedPane from "./components/FinishedPane";

import { useUnenrollData, modalStates } from "./hooks";

export const UnenrollConfirmModal = ({ closeModal, show, cardId }) => {
  const { confirm, reason, closeAndRefresh, close, modalState } =
    useUnenrollData({ closeModal, cardId });
  const showFullscreen = modalState === modalStates.reason;

  return (
    <Dialog
      isOpen={show}
      onClose={nullMethod}
      hasCloseButton={false}
      isFullscreenOnMobile={showFullscreen}
      title=""
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div
        className={`bg-white p-4 rounded-lg ${
          showFullscreen ? "" : "shadow-lg"
        } mx-auto mt-12 max-w-md md:max-w-lg`}
        style={{ textAlign: "start" }}
      >
        {modalState === modalStates.confirm && (
          <ConfirmPane handleClose={close} handleConfirm={confirm} />
        )}
        {modalState === modalStates.finished && (
          <FinishedPane
            handleClose={closeAndRefresh}
            gaveReason={!reason.isSkipped}
          />
        )}
        {modalState === modalStates.reason && <ReasonPane reason={reason} />}
      </div>
    </Dialog>
  );
};

UnenrollConfirmModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default UnenrollConfirmModal;
