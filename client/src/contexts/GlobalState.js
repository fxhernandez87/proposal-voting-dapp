import React, { useReducer } from 'react';

import VotingContext from './votingProposal';
import { voteReducer, ADD_MESSAGE, SET_PROPOSAL, SET_VOTER } from './reducers';

const GlobalState = ({ children }) => {

  const [mainState, dispatch] = useReducer(voteReducer, { proposal: {}, messages: [], voter: {} });

  const addMessage = message => {
      dispatch({ type: ADD_MESSAGE, message });
  };

  const setProposal = proposal => {
      dispatch({ type: SET_PROPOSAL, proposal });
  };

  const setVoter = voter => {
      dispatch({ type: SET_VOTER, voter });
  };

  return (
    <VotingContext.Provider
      value={{
        proposal: mainState.proposal,
        messages: mainState.messages,
        voter: mainState.voter,
        addMessage,
        setProposal,
        setVoter
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export default GlobalState;
