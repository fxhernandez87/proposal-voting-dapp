import React from 'react';
import PropTypes from "prop-types";

const VoteIcon = ({ hasVoted, handleClick, icon, iconDisabled, title, isActive, isPositive }) => {
  return !hasVoted || typeof hasVoted === "undefined" ? (
    <div className="no-vote">
      <button type="button" onClick={handleClick}>
        <img src={icon} alt="thumbs-vote" />
      </button>
      <p>{title}</p>
    </div>
  ) : (
    <div className={isActive ? `active ${isPositive ? 'pos' : 'neg'}` :  undefined}>
      <img src={isActive ? icon : iconDisabled} alt="thumbs-vote" />
      <p>{title}</p>
    </div>

  );
};

VoteIcon.propTypes = {
  hasVoted: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  iconDisabled: PropTypes.string.isRequired,
  title: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPositive: PropTypes.bool.isRequired,
};

VoteIcon.defaultProps = {
};

export default VoteIcon;
