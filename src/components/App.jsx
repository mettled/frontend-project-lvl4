import React from 'react';
import InputMessageForm from './InputMessageForm';
import ChannelsBox from './ChannelsBox';
import MessageList from './MessageList';
import Modal from './modal';
import Header from './Header';

const App = () => (
  <>
    <div className="d-flex h-100">
      <div className="d-flex flex-column text-white bg-dark w-25">
        <ChannelsBox />
      </div>
      <div className="d-flex flex-grow-1 flex-column justify-content-between w-75">
        <div className="d-flex justify-content-between align-items-center bg-light p-3">
          <Header />
        </div>
        <MessageList />
        <div className="p-3">
          <InputMessageForm />
        </div>
      </div>
    </div>
    <Modal />
  </>
);

export default App;
