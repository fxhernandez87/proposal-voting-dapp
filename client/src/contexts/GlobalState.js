import React, { useReducer } from 'react';

import VotingContext from './votingProposal';
import { voteReducer, ADD_MESSAGE, SET_PROPOSAL, SET_VOTER, SET_ERROR } from './reducers';

const GlobalState = ({ children }) => {

  const initialState = { proposal: {}, messages: [], voter: {}, error: null};

  const [mainState, dispatch] = useReducer(voteReducer, initialState);

  const addMessage = message => {
      dispatch({ type: ADD_MESSAGE, message });
  };

  const setProposal = proposal => {
      dispatch({ type: SET_PROPOSAL, proposal });
  };

  const setVoter = voter => {
      dispatch({ type: SET_VOTER, voter });
  };

  const setError = error => {
      dispatch({ type: SET_ERROR, error });
  };

  return (
    <VotingContext.Provider
      value={{
        proposal: mainState.proposal,
        messages: mainState.messages,
        voter: mainState.voter,
        error: mainState.error,
        addMessage,
        setProposal,
        setVoter,
        setError
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export default GlobalState;
