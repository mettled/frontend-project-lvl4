import React from 'react';
import InputMessage from './InputMessage';
import Channels from './Channels';
import MessageList from './MessageList';
import Modals from './modals';
import Header from './Header';


const App = () => (
  <>
    <div className="d-flex h-100">
      <div className="d-flex flex-column text-white bg-dark w-25">
        <Channels />
      </div>
      <div className="d-flex flex-grow-1 flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-center bg-light p-3">
          <Header />
        </div>
        <div className="d-flex flex-column flex-grow-1 overflow-auto p-3">
          <MessageList />
        </div>
        <div className="p-3">
          <InputMessage />
        </div>
      </div>
    </div>
    <Modals />
  </>
);

export default App;
