import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import parse from "html-react-parser";
import moment from "moment";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

interface ThreadCardProps {
  threadId: string;
  authorName: string;
  createdTime: string;
  title: string;
  anonymous: boolean;
  content: string;
  commentCount: number;
  thread_tag: {
    tag: {
      id: string;
      nama_tag: string;
    }
  }[];
}

const ThreadCard = ({
  threadId,
  authorName,
  createdTime,
  title,
  anonymous,
  content,
  commentCount,
  thread_tag,
}: ThreadCardProps) => {
  const timeAgo = moment(createdTime).fromNow();
  return (
    <Link to={`/discussion/${threadId}`}>
      {" "}
      {/* Wrap content for redirection */}
      <Card className="mb-5 bg-[#F5F7F9]">
        {" "}
        <CardHeader className="py-4">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              {" "}
              <CardTitle className="text-base font-normal text-black">
                {anonymous ? "*****" : authorName} •{" "}
                <span className="text-gray-600">{timeAgo}</span>
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-sm pb-2">
          <div className="font-medium mb-3 text-[#1F1D39]">{title}</div>
          <div className="text-[#676767]">{parse(content)}</div>
        </CardContent>
        <CardFooter className="pb-4">
          <div className="flex-row justify-between">
            <div className="pb-2">
              {thread_tag.length > 0 ? ( 
                thread_tag.map((tag) => (
                  <span key={tag.tag.id} className="text-xs font-medium rounded-md p-1 px-2 mr-2 bg-[#F9A682] text-[#B23E19]">
                    {tag.tag.nama_tag}
                  </span>
                ))
              ) : (
                <p>no tags</p>
              )}
            </div>
            <div className="flex items-center mt-1 text-[#676767]">
              <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.39296 16.0716L0.821533 17.3574L2.46439 13.5002V1.92878C2.46439 1.58778 2.63748 1.26076 2.94557 1.01964C3.25367 0.778525 3.67153 0.643066 4.10725 0.643066H20.5358C20.9715 0.643066 21.3894 0.778525 21.6975 1.01964C22.0055 1.26076 22.1787 1.58778 22.1787 1.92878V14.7859C22.1787 15.1269 22.0055 15.454 21.6975 15.6951C21.3894 15.9361 20.9715 16.0716 20.5358 16.0716H7.39296Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.39307 6.42871H17.2502" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.39307 10.2861H13.9645" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="ml-2">{commentCount} Balasan</p>
            </div>
          </div>
        </CardFooter>
      </Card>

    </Link>
  );
};

export default ThreadCard;
