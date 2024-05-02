import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Cart, Chat, Notification } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor, activeMenu, setActiveMenu,
    isClicked, setIsClicked, handleClick,
    setScreenSize, screenSize } = useStateContext();
  
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton /*Button for opening and closing the navigation bar */
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="#0F172A"
        icon={<FiMenu />}
      />
      <div className="flex">
        <NavButton
          title="Notifications"
          dotColor="#03C9D7"
          customFunc={() => handleClick("notification")}
          color="#0F172A"
          icon={<RiNotification3Line />}
        />

        {isClicked.notification && <Notification />}
      </div>
    </div>
  );
};

export default Navbar;
