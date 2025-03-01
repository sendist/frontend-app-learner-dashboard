import React from "react";
import PropTypes from "prop-types";

import { reduxHooks } from "hooks";

import UpgradeButton from "./UpgradeButton";
import SelectSessionButton from "./SelectSessionButton";
import BeginCourseButton from "./BeginCourseButton";
import ResumeButton from "./ResumeButton";
import ViewCourseButton from "./ViewCourseButton";

export const CourseCardActions = ({ cardId }) => {
  const { isEntitlement, isFulfilled } =
    reduxHooks.useCardEntitlementData(cardId);
  const { isVerified, hasStarted, isExecEd2UCourse } =
    reduxHooks.useCardEnrollmentData(cardId);
  const { isArchived } = reduxHooks.useCardCourseRunData(cardId);

  return (
    <div
      className="flex justify-center items-center"
      data-test-id="CourseCardActions"
    >
      {isEntitlement &&
        (isFulfilled ? (
          <ViewCourseButton cardId={cardId} />
        ) : (
          <SelectSessionButton cardId={cardId} />
        ))}
      {isArchived && !isEntitlement && <ViewCourseButton cardId={cardId} />}
      {!isArchived &&
        !isEntitlement &&
        (hasStarted ? (
          <ResumeButton cardId={cardId} />
        ) : (
          <BeginCourseButton cardId={cardId} />
        ))}
    </div>
  );
};

CourseCardActions.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardActions;
