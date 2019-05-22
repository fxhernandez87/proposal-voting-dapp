import React, { useEffect, useContext } from 'react';
import PropTypes from "prop-types";
import StarRatings from 'react-star-ratings';
import VotingContext from '../contexts/votingProposal';

const Proposal = ({ contract }) => {

  const context = useContext(VotingContext);

  const fetchProposalInfo = async () => {
    try {
      const proposal = await contract.methods.proposal.call();
      context.setProposal({
        text: proposal.text,
        positiveVotes: proposal.positiveVotes.toNumber(),
        negativeVotes: proposal.negativeVotes.toNumber(),
      });
    } catch (error) {
      context.setError(error);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchProposalInfo();
    }
  }, [contract]);

  const { proposal: {positiveVotes, negativeVotes} } = context;
  const totalVotes = positiveVotes + negativeVotes;
  const rating = totalVotes ? (positiveVotes * 5) / totalVotes : 0;
  return (
    <div>
      <h3>Remake Game of Thrones Season 8 with competent writers.</h3>
      <div className="rating">
        <StarRatings
          rating={rating}
          starDimension="28px"
          starRatedColor="#7AC943"
          starEmptyColor="#4D4D4D"
          numberOfStars={5}
          name='rating'
        />
      </div>
      <p className="proposal">
        David Benioff and D.B. Weiss have proven themselves to be woefully incompetent writers when they have no source material (i.e. the books) to fall back on.
        <br />
        <br />
        This series deserves a final season that makes sense.
        <br />
        <br />
        Subvert my expectations and make it happen, HBO!
      </p>
    </div>
  );
};


Proposal.propTypes = {
  contract: PropTypes.shape(),
};

Proposal.defaultProps = {
  contract: null
};

export default Proposal;
