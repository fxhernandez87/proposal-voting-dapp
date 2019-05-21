import React, {useContext, useEffect} from 'react';
import ThumbsUp from '../assets/ThumbsUp.svg';
import ThumbsDown from '../assets/ThumbsDown.svg';
import ThumbDisabled from '../assets/ThumbDisabled.svg';
import ThumbDisabledDown from '../assets/ThumbDisabledDown.svg';
import VotingContext from "../contexts/votingProposal";
import {useAuth} from "../hooks/auth";
import VoteIcon from './VoteIcon';

export default ({ web3 }) => {

  const [signedInAddress, contract] = useAuth(web3);
  const context = useContext(VotingContext);

  const getMyVote = async () => {

    if (contract && signedInAddress) {
      const hasVoted = await contract.methods.hasVoted.call({ from: signedInAddress });
      const myVote = hasVoted ? await contract.methods.getVote.call({ from: signedInAddress }) : 0;

      context.setVoter({
        hasVoted,
        vote: myVote,
        address: signedInAddress
      });
    }
  };

  useEffect(() => {
    getMyVote();
  }, [contract, signedInAddress]);

  const upVoteProposal = async () => {
    await contract.methods.upVote.send({ from: context.voter.address, value: web3.utils.toWei("0.01", "ether")});
  };

  const downVoteProposal = async () => {
    await contract.methods.downVote.send({ from: context.voter.address, value: web3.utils.toWei("0.01", "ether")});
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
}
