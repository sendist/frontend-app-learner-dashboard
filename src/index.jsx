/* eslint-disable import/prefer-default-export */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route, Navigate, Routes, Outlet
} from 'react-router-dom';

import {
  AppProvider,
  ErrorPage,
  PageWrap,
} from '@edx/frontend-platform/react';
import store from 'data/store';
import {
  APP_READY,
  APP_INIT_ERROR,
  initialize,
  subscribe,
  mergeConfig,
} from '@edx/frontend-platform';

import { configuration } from './config';

import messages from './i18n';

import App from './App';
import "./index.css";
import NoticesWrapper from './components/NoticesWrapper';

import Discussion from "./components/custom/Discussion";
import ThreadList from "./components/custom/ThreadList";
import ReportList from "./components/custom/ReportList";
import { DiscussionProvider } from "./DiscussionContext";


const Layout = () => {
  return (
    <div className="container text-left mx-auto p-4">
      {/* Judul "Forum Diskusi" */}
      <h1 className="text-4xl font-semibold mb-5">Forum Diskusi</h1>
      <Outlet />
    </div>
  );
};

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <NoticesWrapper>
        <DiscussionProvider>
          <Routes>
            <Route path="/" element={<PageWrap><App /></PageWrap>} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/discussion" element={<PageWrap><Layout /></PageWrap>}>
              <Route index element={<ThreadList />} />
              <Route path="/discussion/:threadId" element={<Discussion />} />
              <Route path="/discussion/report-list" element={<ReportList/>} />
            </Route>
          </Routes>
        </DiscussionProvider>
      </NoticesWrapper>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById('root'),
  );
});

export const appName = 'LearnerHomeAppConfig';

initialize({
  handlers: {
    config: () => {
      mergeConfig(configuration, appName);
    },
  },
  messages,
  requireAuthenticatedUser: true,
});
