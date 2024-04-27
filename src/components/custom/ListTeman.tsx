import React from "react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Minat from "../ui/minat";

interface ListTemanProps {
  nama: string;
  bio: string;
  meta: string;
  isFollowed: boolean;
  phone_number: string;
  onToggleFollow: () => void; // Function to toggle follow status
}

const Temanbelajar: React.FC<ListTemanProps> = ({ nama, bio, meta, phone_number,isFollowed, onToggleFollow }) => {
  const handleButtonClick = () => {
    window.location.href = `https://wa.me/${phone_number}`; // Use `window.open` if you want to open in a new tab
  };

  return (
    <div>
      <div className="flex p-5 overflow-x-scroll xl:overflow-hidden justify-center">
        <div className="w-full bg-gray-100 rounded-md shadow-md p-5 flex items-center relative mx-auto flex-1">
          <img src={meta} alt="Foto" className="mr-5 w-12 h-12" />
          <div className="flex flex-col flex-1">
            <p className="text-lg text-gray-700 pb-2">{nama}</p>
          </div>
          <Minat minat={bio} />
          <div className="ml-auto">
            <Button className="mr-4 bg-[#38B0AB] hover:bg-teal-700 text-gray-100 px-4 py-2 rounded-md flex items-center"
            onClick={handleButtonClick}
            >
              <img
                src="public\wa.svg"
                alt="Deskripsi gambar"
                className="mr-2 w-6 h-6"
              />
            </Button>
          </div>
          <div className="ml-auto">
            <Button
              className={`ml-auto ${isFollowed ? 'bg-[#C7C8CC] hover:bg-gray-700' : 'bg-[#38B0AB] hover:bg-teal-700'} text-gray-100 px-4 py-2 rounded-md flex items-center justify-center`}
              style={{ width: '120px' }}  
              onClick={onToggleFollow}
            >
              <FontAwesomeIcon icon={isFollowed ? faMinus : faPlus} className="mr-2 text-lg" />
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temanbelajar;
