// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';

// @ts-ignore
import gon from 'gon';
import app from './Components';
import initLocalization from './localization';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

initLocalization()
  .then(() => {
    app(gon);
  })
  .catch(() => {
    console.log('Something went wrong during initialization');
  });
