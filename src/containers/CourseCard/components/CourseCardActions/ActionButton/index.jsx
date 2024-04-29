import React from "react";
import { Button } from "../../../../../components/ui/button";

import useIsCollapsed from "./hooks";

export const ActionButton = (props) => {
  const isSmall = useIsCollapsed();
  return (
    <Button
      {...props}
      {...(isSmall && { size: "sm" })}
      className="text-white bg-[#38B0AB] hover:bg-[#32a295] font-semibold rounded mt-buttonds"
    />
  );
};

export default ActionButton;
