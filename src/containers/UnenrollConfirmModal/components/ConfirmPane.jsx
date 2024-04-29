import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "@edx/frontend-platform/i18n";
import messages from "./messages";

export const ConfirmPane = ({ handleClose, handleConfirm }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <h4 className="text-lg font-semibold">
        {formatMessage(messages.confirmHeader)}
      </h4>
      <div className="flex justify-end space-x-2 mt-4">
        {" "}
        {/* Adjust margins and spacing as needed */}
        <button
          type="button"
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
          onClick={handleClose}
        >
          {formatMessage(messages.confirmCancel)}
        </button>
        <button
          type="button"
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          onClick={handleConfirm}
        >
          {formatMessage(messages.confirmUnenroll)}
        </button>
      </div>
    </>
  );
};

ConfirmPane.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default ConfirmPane;
