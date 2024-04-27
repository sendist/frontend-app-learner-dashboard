/* eslint-disable import/prefer-default-export */
import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";

import { AppProvider, ErrorPage, PageWrap } from "@edx/frontend-platform/react";
import store from "data/store";
import {
  APP_READY,
  APP_INIT_ERROR,
  initialize,
  subscribe,
  mergeConfig,
} from "@edx/frontend-platform";

import { configuration } from "./config";

import messages from "./i18n";

import App from "./App";
import Dashboard from "./Dashboard";
import "./index.css";
import NoticesWrapper from "./components/NoticesWrapper";

import Discussion from "./components/custom/Discussion";
import ThreadList from "./components/custom/ThreadList";
import ReportList from "./components/custom/ReportList";
import GroupChat from "./components/custom/GroupChat";
import DiscordChannel from "./components/custom/DiscordChannel";
import { DiscussionProvider } from "./DiscussionContext";
import Sidebar from "./components/custom/Sidebar";
import LayoutRekomendasiTeman from "./components/custom/LayoutRekomendasiTeman";
import TimelineLayout from "./components/custom/LayoutTimeline";

const Layout = () => {
  return (
    <div className="flex">
      <div className="main-content">
        <Sidebar />
        <div className="flex-1 text-left mx-auto p-4">
          <App />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const ForumLayout = () => {
  return (
    <div className="flex">
      <div className="main-content">
        <Sidebar />
        <div className="flex-1 text-left mx-auto p-4">
          <App />
          <h1 className="text-4xl font-semibold mb-5">Forum Diskusi</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const GroupChatLayout = () => {
  return (
    <div className="flex">
      <div className="main-content">
        <Sidebar />
        <div className="flex-1 text-left mx-auto p-4">
          <App />
          <h1 className="text-4xl font-semibold mb-5">Group Chat</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <NoticesWrapper>
        <DiscussionProvider>
          <Routes>
            <Route
              path=""
              element={
                <PageWrap>
                  <Layout />
                </PageWrap>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="quiz" element={<div>Quiz Component</div>} />
              <Route
                path="studynotes"
                element={<div>Study Notes Component</div>}
              />
              <Route path="reports" element={<div>Reports Component</div>} />
              <Route path="findfriends" element={<Outlet />}>
                <Route index element={<LayoutRekomendasiTeman />} />
                <Route path="timeline" element={<TimelineLayout />} />
              </Route>
              <Route path="settings" element={<div>Settings Component</div>} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="discussion" element={<ForumLayout />}>
              <Route index element={<ThreadList />} />{" "}
              <Route path=":threadId" element={<Discussion />} />
              <Route path="report-list" element={<ReportList />} />
            </Route>
            <Route path="groupchat" element={<GroupChatLayout />}>
              <Route index element={<GroupChat />} />
              <Route path=":channelName" element={<DiscordChannel />} />
            </Route>
          </Routes>
        </DiscussionProvider>
      </NoticesWrapper>
    </AppProvider>,
    document.getElementById("root")
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById("root")
  );
});

export const appName = "LearnerHomeAppConfig";

initialize({
  handlers: {
    config: () => {
      mergeConfig(configuration, appName);
    },
  },
  messages,
  requireAuthenticatedUser: true,
});
