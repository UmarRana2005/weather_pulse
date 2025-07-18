"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import { LogOut, LayoutDashboard, MapPinPlus, Settings } from "lucide-react";
import SlideBarBtn from "./SlideBarBtn";

export enum SideBarFunc {
  dashboard = "Dashboard",
  location = "Location",
  setting = "Setting",
  logout = "Logout",
}
const SideBar = () => {
  const [func, setFunc] = useState(SideBarFunc.dashboard);
  const handleSlideBarBtn = (type: SideBarFunc) => {
    console.log(type);
    setFunc(type);
  };
  return (
    <div className="hidden lg:flex flex-col max-w-fit min-h-full items-center gap-16 p-2">
      <div className="size-12 grid place-content-center p-2 relative">
        <Image
          src={logo}
          alt="WeatherPulse"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col items-center gap-5">
        <SlideBarBtn
          active={func}
          type={SideBarFunc.dashboard}
          onClicked={handleSlideBarBtn}
        >
          <LayoutDashboard />
        </SlideBarBtn>
        <SlideBarBtn
          active={func}
          type={SideBarFunc.location}
          onClicked={handleSlideBarBtn}
        >
          <MapPinPlus />
        </SlideBarBtn>
        <SlideBarBtn
          active={func}
          type={SideBarFunc.setting}
          onClicked={handleSlideBarBtn}
        >
          <Settings />
        </SlideBarBtn>
      </div>
      <SlideBarBtn
        active={func}
        type={SideBarFunc.logout}
        extraClasses="mt-auto mb-6"
        onClicked={handleSlideBarBtn}
      >
        <LogOut />
      </SlideBarBtn>
    </div>
  );
};

export default SideBar;
