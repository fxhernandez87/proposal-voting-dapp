import React from 'react';

export default ({ hasVoted, handleClick, icon, iconDisabled, title, isActive, isPositive }) => {
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
}