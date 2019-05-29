import React, { useEffect, useContext, useState } from 'react';
import PropTypes from "prop-types";
import ThumbsUp from '../assets/ThumbsUp.svg';
import ThumbsDown from '../assets/ThumbsDown.svg';

import VotingContext from '../contexts/votingProposal';

const Feed = ({ contract }) => {

  const [eventEmit, setEventEmit] = useState(null);
  const context = useContext(VotingContext);
  const { voter: {address}, messages } = context;

  const onData = result => {
    const {returnValues: {_from, _vote, _totalVotes}} = result;
    context.addMessage({_from, _vote, _totalVotes});
  };

  const subscribeToVoteEvents = async (contract, address) => {
    if (contract && address) {
      setEventEmit(contract.events.VoteReceived({fromBlock: '0', toBlock: 'latest'}));
    }
  };

  useEffect(() => {
      subscribeToVoteEvents(contract, address);
  }, [contract, address]);

  useEffect(() => {
    if (eventEmit) {
      eventEmit
        .on('data', onData)
        .on('error', err => {
          context.setError(err);
        });

      return async () => {
        await eventEmit.unsubscribe();
      }
    }
  }, [eventEmit]);

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

  return (
    <div className="proposal-info">
      {messagesStack}
    </div>
  );
};

Feed.propTypes = {
  contract: PropTypes.shape(),
};

Feed.defaultProps = {
  contract: null
};

export default Feed;
