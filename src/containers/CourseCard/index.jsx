import React from "react";
import PropTypes from "prop-types";

import { useIsCollapsed } from "./hooks";
import CourseCardBanners from "./components/CourseCardBanners";
import CourseCardImage from "./components/CourseCardImage";
import CourseCardMenu from "./components/CourseCardMenu";
import CourseCardActions from "./components/CourseCardActions";
import CourseCardDetails from "./components/CourseCardDetails";
import CourseCardTitle from "./components/CourseCardTitle";

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const CustomHeaderic = ({ actions }) => (
  <div className="absolute top-0 right-0 m-4">{actions}</div>
);

const CustomHeader = ({ children }) => (
  <div className="flex justify-between items-center p-2">{children}</div>
);

const CustomSection = ({ children }) => <div className="p-2">{children}</div>;

export const CourseCard = ({ cardId }) => {
  const isCollapsed = useIsCollapsed();
  const colors = ["#E1E2F6", "#F8EFE2", "#EFF7E2"];

  return (
    <div
      id={cardId}
      data-testid="CourseCard"
      className={`flex ${
        isCollapsed ? "flex-col" : "flex-row"
      } justify-between rounded-lg p-5 mb-6 hover:shadow-lg w-full relative`}
      style={{ backgroundColor: colors[hashCode(cardId) % colors.length] }}
    >
      <CustomHeaderic actions={<CourseCardMenu cardId={cardId} />} />
      <CourseCardImage
        cardId={cardId}
        orientation={isCollapsed ? "vertical" : "horizontal"}
      />
      <div className="flex-1 flex">
        <div className="flex-grow">
          <CustomHeader>
            <CourseCardTitle cardId={cardId} />
          </CustomHeader>
          <CustomSection>
            <CourseCardDetails cardId={cardId} />
          </CustomSection>
          <div className="flex justify-between items-center mt-10">
            <CourseCardBanners cardId={cardId} />
            <CourseCardActions cardId={cardId} />
          </div>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCard;
