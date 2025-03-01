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

import Discussion from "./components/Discussion/Discussion";
import ThreadList from "./components/Discussion/ThreadList";
import ReportList from "./components/Discussion/ReportList";
import GroupChat from "./components/custom/GroupChat";
import DiscordChannel from "./components/custom/DiscordChannel";
import { DiscussionProvider } from "./DiscussionContext";
import QuizKreatif from './components/custom/QuizKreatif';
import TambahQuiz from './components/custom/TambahQuiz';
import EditQuiz from './components/custom/EditQuiz';
import MyQuiz from './components/custom/MyQuiz';
import { QuizProvider } from "./QuizContext";
import Sidebar from "./components/custom/Sidebar";
import LayoutRekomendasiTeman from "./components/custom/LayoutRekomendasiTeman";
import TimelineLayout from "./components/custom/LayoutTimeline";
import CatatanLayout from "./components/custom/LayoutCatatan";

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

const ForumLayout = () => (
  <div className="flex">
    <div className="main-content">
      <Sidebar />
      <div className="flex-1 text-left mx-auto p-4">
        <App />
        <h1 className="text-4xl font-semibold mb-5">Discussion Forum</h1>
        <Outlet />
      </div>
    </div>
  </div>
);

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
              path="/"
              element={
                <PageWrap>
                  <Layout />
                </PageWrap>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="quiz" element={
                <QuizProvider>
                  <QuizKreatif />
                </QuizProvider>
              } />
              <Route path="/tambah-quiz" element={
                <QuizProvider>
                  <TambahQuiz />
                </QuizProvider>
              } />
              <Route path="/edit-quiz" element={
                <QuizProvider>
                  <EditQuiz />
                </QuizProvider>
              } />
              <Route path="/my-quiz" element={
                <QuizProvider>
                  <MyQuiz />
                </QuizProvider>
              } />
              <Route path="studynotes" element={<CatatanLayout />} />
              <Route path="report-list" element={<ReportList />} />
              <Route path="findfriends" element={<Outlet />}>
                <Route index element={<LayoutRekomendasiTeman />} />
                <Route path="timeline" element={<TimelineLayout />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="discussion" element={<ForumLayout />}>
              <Route index element={<ThreadList />} />{' '}
              <Route path=":threadId" element={<Discussion />} />
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
