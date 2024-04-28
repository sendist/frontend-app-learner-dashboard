import React from "react";
import { useIntl } from "@edx/frontend-platform/i18n";
import { Button, Image } from "@edx/paragon";
import { Search } from "@edx/paragon/icons";
import { baseAppUrl } from "data/services/lms/urls";

import emptyCourseSVG from "assets/empty-course.svg";
import handIcon from "../../../assets/waving_hand.svg";
import addCourse from "../../../assets/add_course.svg";
import searchIcon from "../../../assets/search.svg";
import addJadwal from "../../../assets/add_jadwal.svg";
import { reduxHooks } from "hooks";

import messages from "./messages";

export const NoCoursesView = () => {
  const { formatMessage } = useIntl();
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();
  // return (
  //   <div
  //     id="no-courses-content-view"
  //     className="d-flex align-items-center justify-content-center mb-4.5"
  //   >
  //     <Image src={emptyCourseSVG} alt={formatMessage(messages.bannerAlt)} />
  //     <h1>
  //       {formatMessage(messages.lookingForChallengePrompt)}
  //     </h1>
  //     <p>
  //       {formatMessage(messages.exploreCoursesPrompt)}
  //     </p>
  //     <Button
  //       variant="brand"
  //       as="a"
  //       href={baseAppUrl(courseSearchUrl)}
  //       iconBefore={Search}
  //     >
  //       {formatMessage(messages.exploreCoursesButton)}
  //     </Button>
  //   </div>
  // );
  return (
    <div className="flex flex-col lg:flex-row-reverse">
      {" "}
      <div className="lg:w-80 lg:mr-4 mt-10 lg:mt-0">
        {" "}
        <div className="flex flex-col items-center h-full mt-2"></div>
      </div>
      <div className="flex-1 text-left mx-auto p-2 lg:order-2">
        {" "}
        <div className="flex items-center">
          {" "}
          <h1 className="text-4xl font-semibold mt-2 mr-3">Selamat Datang!</h1>
          <img src={handIcon} alt="Hand Icon" className="h-9 mt-0" />
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-gray-500">Selamat Belajar!</h3>
        </div>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {" "}
          <div style={{ width: "904px", height: "568px" }}>
            {" "}
            <div
              className="bg-gray-100  rounded-lg p-4"
              style={{ height: "100%" }}
            >
              {" "}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold mr-3">Courses</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search from courses..."
                    className="border border-white-400 px-2 py-1 rounded-lg focus:outline-none"
                    style={{ width: "250px", fontSize: "12px", color: "gray" }}
                  />
                  <img
                    src={searchIcon}
                    alt="Search"
                    className="absolute top-1/2 transform -translate-y-1/2 ml-56 h-4 pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-full ">
                <img src={addCourse} alt="Add Course" className="mb-3 " />
                <h2 className="font-semibold text-gray-500">
                  Belum ada course yang diikuti
                </h2>
                <Button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-8 rounded-xl text-xs mt-3"
                  href={baseAppUrl(courseSearchUrl)}
                >
                  Tambah Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoCoursesView;
