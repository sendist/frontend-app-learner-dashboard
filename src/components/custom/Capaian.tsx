import React from "react";

interface TemanbelajarProps {
  nama: string;
  enrollment_date: string;
  course_name: string;
  meta: string;
}

const Temanbelajar: React.FC<TemanbelajarProps> = ({
  nama,
  enrollment_date,
  course_name,
  meta,
}) => {
  return (
    <div className="flex p-5 overflow-x-scroll xl:overflow-hidden justify-center">
      <div className="w-full bg-white rounded-md shadow-md p-5 flex items-center relative mx-auto flex-1">
        <img src={meta} alt="Foto" className="mr-5 w-12 h-12" />
        <div className="flex flex-col">
          <p className="text-sm absolute top-5 right-5">
            {enrollment_date}
          </p>
          <p className="text-lg text-gray-700 pb-2">{nama}</p>
          <p className="text-lg text-gray-500 pb-2">
            Telah Mengikuti Course
          </p>
          <div className="bg-gray-200 rounded-md p-2 mb-2">
            <p className="text-lg font-bold">{course_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temanbelajar;
