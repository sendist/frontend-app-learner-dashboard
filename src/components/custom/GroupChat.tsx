import React, { useContext, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { AppContext } from "@edx/frontend-platform/react";
import { reduxHooks } from "hooks";
import FormDialog from "../custom/FormDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";

const GroupChat = () => {
  const { authenticatedUser } = useContext(AppContext);
  // const { bannerImgSrc } = reduxHooks.useCardCourseData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [channels, setChannels] = useState<
    {
      id: number;
      channel_id: String;
      server_id: String;
      channel_name: string;
      channel_image_url: string;
    }[]
  >([]);
  // const [activeSwitch, setActiveSwitch] = useState(false);

  console.log(channels);

  const fetchChannel = async () => {
    try {
      const response = await fetch(
        "http://194.233.93.124:3030/teman/discordChannels"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch channels, status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched channel data:", data);
      if (!data || !Array.isArray(data)) {
        console.error("Data is not an array", data);
        return;
      }
      setChannels(data);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  const openFormDialog = () => {
    setIsFormOpen(true);
  };

  const closeFormDialog = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = () => {
    closeFormDialog();
  };

  // const handleSwitchChange = (activeSwitch) => {
  //     if (activeSwitch === true) {
  //         setActiveSwitch(false);
  //     } else {
  //         setActiveSwitch(true);
  //     }
  // };

  return (
    <div className="mb-5 text-left">
      <div className="flex justify-between items-center mb-5">
        <Button
          className="bg-[#38B0AB] hover:bg-teal-700 text-gray-100 px-4 py-2 rounded-md flex items-center"
          onClick={() => console.log("Button clicked")}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2 text-lg" />
          Tambah
        </Button>
      </div>

      <section className="grid grid-cols-2 gap-4 py-4 px-4 justify-between">
        {channels.map((channel) => (
          <Link
            to={`/groupchat/${encodeURIComponent(channel.channel_name)}`}
            state={{
              channel_id: channel.channel_id,
              server_id: channel.server_id,
            }}
            className="inline-flex items-center justify-center p-4 space-x-4 shadow-md rounded-lg overflow-hidden text-base font-medium text-gray-900 rounded-lg bg-[#F5F7F9] hover:text-[#B23E19] hover:bg-[#F9A682]"
          >
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={channel.channel_image_url} />
                <AvatarFallback>DC</AvatarFallback>
              </Avatar>
            </div>
            <span className="w-full">{channel.channel_name}</span>
            <svg
              class="w-4 h-4 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        ))}
        <FormDialog
          isOpen={isFormOpen}
          onClose={closeFormDialog}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  );
};

export default GroupChat;
