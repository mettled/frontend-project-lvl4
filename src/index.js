// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import gon from 'gon';
import app from './Components';
import initLocalization from './localization';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

initLocalization()
  .then(() => {
    try {
      app(gon);
    } catch (e) {
      console.log(e.message);
    }
  })
  .catch(() => {
    console.log('Something went wrong during initialization');
  });
