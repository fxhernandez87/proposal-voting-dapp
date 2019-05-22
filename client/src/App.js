import React from "react";
import GlobalState from './contexts/GlobalState';
import { useWeb3, useAuth } from './hooks/customHooks';
import Proposal from './components/Proposal';
import VotingBooth from './components/VotingBooth';
import Feed from './components/Feed';
import BackDropLoading from './components/BackDropLoading';
import Header from './components/Header';

import "./App.scss";

const App = () => {

  const [error, web3] = useWeb3();
  const [authError, userLoggedIn, contract] = useAuth(web3);
  const finalError = error || authError;

  const initializing = !web3 && !finalError;
  return (
    <GlobalState>
      <BackDropLoading
        active={!userLoggedIn}
        initializing={initializing}
        error={!web3 && finalError}
      >
        <div className="App">
          <Header userLoggedIn={userLoggedIn} />
          <div className="App-content">
            <div className="content">
              <Proposal contract={contract} />
              <VotingBooth
                web3={web3}
              />
            </div>
          </div>
          <div className="App-feed">
            <div className="content">
              <Feed
                contract={contract}
                userLoggedIn={userLoggedIn}
              />
            </div>
          </div>
        </div>
      </BackDropLoading>
    </GlobalState>
  );
};

export default App;
