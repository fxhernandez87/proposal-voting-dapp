import React, {useContext, useEffect} from 'react';
import PropTypes from "prop-types";
import ThumbsUp from '../assets/ThumbsUp.svg';
import ThumbsDown from '../assets/ThumbsDown.svg';
import ThumbDisabled from '../assets/ThumbDisabled.svg';
import ThumbDisabledDown from '../assets/ThumbDisabledDown.svg';
import VotingContext from "../contexts/votingProposal";
import { useAuth } from "../hooks/customHooks";
import VoteIcon from './VoteIcon';

const VotingBooth = ({ web3 }) => {

  const [authError, signedInAddress, contract] = useAuth(web3);
  const context = useContext(VotingContext);

  const getMyVote = async () => {

    if (contract && signedInAddress) {
      try {
        const hasVoted = await contract.methods.hasVoted.call({from: signedInAddress});
        const myVote = hasVoted ? await contract.methods.getVote.call({from: signedInAddress}) : 0;

        context.setVoter({
          hasVoted,
          vote: myVote,
          address: signedInAddress
        });
      } catch (err) {
        context.setError(err);
      }
    }
  };

  useEffect(() => {
    getMyVote();
    if (authError) {
      context.setError(authError);
    }
  }, [contract, signedInAddress, authError]);

  const upVoteProposal = async () => {
    try {
      await contract.methods.upVote.send({ from: context.voter.address, value: web3.utils.toWei("0.01", "ether")});
    } catch (err) {
      context.setError(err);
    }
  };

  const downVoteProposal = async () => {
    try {
      await contract.methods.downVote.send({ from: context.voter.address, value: web3.utils.toWei("0.01", "ether")});
    } catch (err) {
      context.setError(err);
    }
  };
  const { proposal: {positiveVotes, negativeVotes}, voter: {hasVoted, vote} } = context;
  return typeof hasVoted !== "undefined" && (
    <div className="buttons">
      <VoteIcon
        isPositive={false}
        hasVoted={hasVoted}
        icon={ThumbsDown}
        iconDisabled={ThumbDisabledDown}
        title={negativeVotes}
        handleClick={downVoteProposal}
        isActive={vote === -1}
      />
      <VoteIcon
        isPositive
        hasVoted={hasVoted}
        icon={ThumbsUp}
        iconDisabled={ThumbDisabled}
        title={positiveVotes}
        handleClick={upVoteProposal}
        isActive={vote === 1}
      />
    </div>
  );
};

VotingBooth.propTypes = {
  web3: PropTypes.shape()
};

VotingBooth.defaultProps = {
  web3: null
};

export default VotingBooth;
