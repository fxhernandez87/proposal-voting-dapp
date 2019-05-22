import React from 'react';

export default React.createContext({
  proposal: {
    text: "",
    positiveVotes: 0,
    negativeVotes: 0,
    totalVotes: 0
  },
  messages: [],
  voter: {},
  error: null,
});
