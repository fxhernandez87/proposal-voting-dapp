import update from 'immutability-helper';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_PROPOSAL = 'SET_PROPOSAL';
export const SET_VOTER = 'SET_VOTER';

const addMessageToFeed = (message, state) => {
  const voteProperty = message._vote === 1 ? "positiveVotes" : "negativeVotes";
  return update(state, {
    messages: { $push: [message] },
    proposal: {
      totalVotes: { $set: message._totalVotes },
      [voteProperty]: { $set: state.proposal[voteProperty] + 1 }
    }
  })
};

const setProposalInfo = (proposal, state) => {
  return update(state, {
    proposal: {
      text: { $set: proposal.text },
      positiveVotes: { $set: proposal.positiveVotes },
      negativeVotes: { $set: proposal.negativeVotes },
      totalVotes: { $set: proposal.positiveVotes - proposal.negativeVotes },
    }
  })
};

const setVotingInfo = (payload, state) => {
  return update(state, {
    voter: {
      address: { $set: payload.address },
      vote: { $set: payload.vote },
      hasVoted: { $set: payload.hasVoted }
    }
  })
};

export const voteReducer = (state, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return addMessageToFeed(action.message, state);
    case SET_PROPOSAL:
      return setProposalInfo(action.proposal, state);
    case SET_VOTER:
      return setVotingInfo(action.voter, state);
    default:
      return state;
  }
};
