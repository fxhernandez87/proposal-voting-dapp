import React, { useState, useEffect, useContext } from 'react';
import ThumbsUp from '../assets/ThumbsUp.svg';
import ThumbsDown from '../assets/ThumbsDown.svg';

import VotingContext from '../contexts/votingProposal';

export default ({ contract }) => {
  const context = useContext(VotingContext);
  const { voter: {address}, messages } = context;
  const [error, setError] = useState(null);

  const subscribeToVoteEvents = async () => {
    contract.events.VoteReceived({fromBlock: 'latest', toBlock: 'latest'}).on('data', result => {
      const {returnValues: {_from, _vote, _totalVotes}} = result;
      context.addMessage({_from, _vote, _totalVotes});
      if (context.voter.address.toUpperCase() === _from.toUpperCase() && !context.voter.hasVoted) {
        context.setVoter({
          ...context.voter,
          vote: _vote,
          hasVoted: true
        });
      }
    }).on('error', err => {
        setError(err);
    });
  };



  useEffect(() => {
    if (contract && address) {
      subscribeToVoteEvents();
    }
  }, [contract, address]);

  const messagesStack = messages.reverse().map(ev => {
    const icon = ev._vote === 1 ? ThumbsUp : ThumbsDown;
    const vote = ev._vote === 1 ? "positive" : "negative";
    return (
      <div className="notification" key={ev._from}>
        <p>{ev._from}</p>
        <img src={icon} alt={`user-vote-${vote}`} width={24} />
      </div>
    );
  });

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className="proposal-info">
      {messagesStack}
    </div>
  );
}
