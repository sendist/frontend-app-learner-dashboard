import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "@edx/frontend-platform/i18n";
import constants from "../constants";
import messages from "./messages";

export const ReasonPane = ({ reason }) => {
  const { formatMessage } = useIntl();

  const option = (key) => (
    <div className="flex items-center mb-2">
      <input
        type="radio"
        id={key}
        name="unenrollReason"
        value={key}
        onChange={reason.selectOption}
        checked={reason.selected === key}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <label htmlFor={key} className="ml-2 text-sm font-medium text-gray-900">
        {formatMessage(constants.messages[key])}
      </label>
    </div>
  );

  return (
    <>
      <h4 className="text-lg font-semibold mb-4">
        {formatMessage(messages.reasonHeading)}
      </h4>
      <div>
        {constants.order.map(option)}
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="custom"
            name="unenrollReason"
            value={constants.reasonKeys.custom}
            onChange={reason.selectOption}
            checked={reason.selected === constants.reasonKeys.custom}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <input
            type="text"
            {...reason.customOption}
            placeholder={formatMessage(constants.messages.customPlaceholder)}
            className="ml-2 p-1 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          type="button"
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={reason.handleSkip}
        >
          {formatMessage(messages.reasonSkip)}
        </button>
        <button
          type="button"
          disabled={!reason.hasReason}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          onClick={reason.handleSubmit}
        >
          {formatMessage(messages.reasonSubmit)}
        </button>
      </div>
    </>
  );
};

ReasonPane.propTypes = {
  reason: PropTypes.shape({
    selectOption: PropTypes.func,
    selected: PropTypes.string,
    customOption: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    handleSkip: PropTypes.func,
    hasReason: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
  }).isRequired,
};

export default ReasonPane;
