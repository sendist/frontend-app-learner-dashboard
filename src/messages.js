import { StrictDict } from 'utils';

export const messages = StrictDict({
  loadingSR: {
    id: 'learner-dash.loadingSR',
    description: 'Page loading screen-reader text',
    defaultMessage: 'Loading...',
  },
  errorMessage: {
    id: 'learner-dash.error-page-message',
    defaultMessage: 'If you experience repeated failures, please email support at {supportEmail}',
    description: 'Error page message',
  },
  pageTitle: {
    id: 'learner-dash.title',
    description: 'Page title: Sakau Belajar',
    defaultMessage: 'Sakau Belajar',
  },
});

export default messages;
