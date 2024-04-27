import React from "react";
import { NavLink } from "react-router-dom";
import logoSakau from "../../assets/logo-sakau.png";
import dashboardIcon from "../../assets/dashboard-icon.svg";
import quizIcon from "../../assets/quiz-icon.svg";
import studynotesIcon from "../../assets/studynotes-icon.svg";
import disscussionIcon from "../../assets/discussion-icon.svg";
import reportsIcon from "../../assets/reports-icon.svg";
import inboxIcon from "../../assets/inbox-icon.svg";
import findfriendsIcon from "../../assets/findfriends-icon.svg";
import settingsIcon from "../../assets/settings-icon.svg";

interface IMenuItem {
  name: string;
  iconSrc: string;
  path: string;
  notifications?: number;
}

const menuItems: IMenuItem[] = [
  { name: "Dashboard", iconSrc: dashboardIcon, path: "/" },
  { name: "Quiz", iconSrc: quizIcon, path: "/quiz" },
  { name: "Study Notes", iconSrc: studynotesIcon, path: "/studynotes" },
  { name: "Discussion Forum", iconSrc: disscussionIcon, path: "/discussion" },
  { name: "Reports", iconSrc: reportsIcon, path: "/reports" },
  { name: "Group Chat", iconSrc: inboxIcon, path: "/groupchat" },
  { name: "Find Friends", iconSrc: findfriendsIcon, path: "/findfriends" },
  { name: "Settings", iconSrc: settingsIcon, path: "/settings" },
];

const Sidebar: React.FC = () => {
  return (
    <aside
      className="sidebar w-72 bg-gray-100 fixed inset-y-0 left-0 z-50"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-6 px-10 h-full">
        <img
          src={logoSakau}
          alt="Sakau Belajar Logo"
          className="h-9 mb-9 mt-5"
        />
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 text-base font-normal rounded-lg transition-colors duration-150 ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <img src={item.iconSrc} alt={item.name} className="w-5 h-5" />
                <span className="ml-3">{item.name}</span>
                {item.notifications ? (
                  <span className="ml-auto inline-block text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-1">
                    {item.notifications > 99 ? "99+" : item.notifications}
                  </span>
                ) : null}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
