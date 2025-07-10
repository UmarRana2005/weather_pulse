"use client";
import React from "react";
import { Button } from "./ui/button";
import { SideBarFunc } from "./SideBar";

interface SlideBarBtnProps {
  children: React.ReactNode;
  type: SideBarFunc;
  extraClasses?: string;
  onClicked: (type: SideBarFunc) => void;
  active: SideBarFunc;
}

const SlideBarBtn = ({
  children,
  type,
  extraClasses,
  onClicked,
  active,
}: SlideBarBtnProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-lg hover:bg-orange-300 hover:text-white shadow-lg ${
        active === type ? "bg-orange-300 text-white" : "bg-none"
      } ${extraClasses || ""}`}
      onClick={() => onClicked(type)}
    >
      {children}
    </Button>
  );
};

export default SlideBarBtn;
