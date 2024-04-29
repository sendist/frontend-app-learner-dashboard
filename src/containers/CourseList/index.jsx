import React from "react";

import { useIntl } from "@edx/frontend-platform/i18n";
import { Pagination } from "@edx/paragon";
import { Button } from "@edx/paragon";
import { baseAppUrl } from "data/services/lms/urls";

import { reduxHooks } from "hooks";
import {
  ActiveCourseFilters,
  CourseFilterControls,
} from "containers/CourseFilterControls";
import CourseCard from "containers/CourseCard";
import NoCoursesView from "./NoCoursesView";
import handIcon from "../../assets/waving_hand.svg";
import searchIcon from "../../assets/search.svg";

import { useCourseListData, useIsCollapsed } from "./hooks";

import messages from "./messages";

export const CourseList = () => {
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  const { formatMessage } = useIntl();
  const hasCourses = reduxHooks.useHasCourses();
  const { filterOptions, setPageNumber, numPages, showFilters, visibleList } =
    useCourseListData();
  const isCollapsed = useIsCollapsed();
  return (
    <div className="course-list-container">
      <div className="course-list-heading-container">
        {/* <h2 className="course-list-title">{formatMessage(messages.myCourses)}</h2>
        <div className="course-filter-controls-container">
          <CourseFilterControls {...filterOptions} />
        </div> */}
      </div>
      {hasCourses ? (
        <>
          {showFilters && (
            <div id="course-list-active-filters-container">
              <ActiveCourseFilters {...filterOptions} />
            </div>
          )}
          <div className="flex flex-col lg:flex-row-reverse">
            <div className="flex-1 mx-auto p-2">
              <div className="flex items-center justify-center lg:justify-start">
                <h1 className="text-3xl lg:text-4xl font-semibold mt-2 mr-3">
                  Selamat Datang!
                </h1>
                <img src={handIcon} alt="Hand Icon" className="h-8 lg:h-9" />
              </div>
              <div>
                <h3 className="font-semibold mb-5 text-center lg:text-left text-gray-500">
                  Selamat Belajar Courses!
                </h3>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 w-full">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-5">
                  <h3 className="text-xl font-semibold ml-4">Courses</h3>
                  <div className="ml-auto">
                    <Button
                      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-8 rounded-xl text-xs"
                      href={baseAppUrl(courseSearchUrl)}
                    >
                      Tambah Course
                    </Button>
                    {/* <input
                      type="text"
                      placeholder="Search from courses..."
                      className="border px-2 py-1 rounded-lg focus:outline-none w-full"
                    />
                    <img
                      src={searchIcon}
                      alt="Search"
                      className="absolute top-1/2 transform -translate-y-1/2 right-2 h-4 pointer-events-none"
                    /> */}
                  </div>
                </div>
                <div className="d-flex flex-column flex-grow-1">
                  {visibleList.map(({ cardId }) => (
                    <CourseCard key={cardId} cardId={cardId} />
                  ))}
                  {numPages > 1 && (
                    <Pagination
                      variant={isCollapsed ? "reduced" : "secondary"}
                      paginationLabel="Course List"
                      className="mx-auto mb-2"
                      pageCount={numPages}
                      onPageSelect={setPageNumber}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <NoCoursesView />
      )}
    </div>
  );
};

CourseList.propTypes = {};

export default CourseList;
