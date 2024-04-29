import React, { useState } from "react";
import { Button } from "../ui/button";
import RichTextEditor from "./RichTextEditor";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Switch from "./Switch";
import { AppContext } from '@edx/frontend-platform/react';

interface FormCommentProps {
  onSubmit: (content: string, anonymous: boolean) => void;
}

const FormComment: React.FC<FormCommentProps> = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [contentLength, setContentLength] = useState(0);
  const { authenticatedUser } = React.useContext(AppContext);

  const handleContentChange = (value: string) => {
    setContent(value);
    setContentLength(value.replace(/(<([^>]+)>)/gi, "").length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content, anonymousMode);
    setContent("");
    setAnonymousMode(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col space-y-4">
        {/* User Avatar and Name */}
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="text-base font-semibold text-black">
              { authenticatedUser.name ? authenticatedUser.name : authenticatedUser.username }
            </div>
          </div>
        </div>

        {/* React Quill Editor */}
        <div>
          <RichTextEditor
            value={content}
            onChange={handleContentChange}
            placeholder="Add a comment.."
            descriptionText="Add your comment here. Max. 500 Characters"
            containerWidth="100vw"
          />
        </div>

        {/* Switch for Anonymous Mode */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <Switch checked={anonymousMode} onChange={setAnonymousMode} />
            <Label htmlFor="anonymous-mode" className="ml-2 cursor-pointer">Anonymous Mode</Label>
          </div>

          </div>
          <Button
            type="submit"
            className={`bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md ${
              !content.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!content.trim()}
          >
            Balas
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormComment;
