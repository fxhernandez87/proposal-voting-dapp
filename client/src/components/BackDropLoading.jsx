/* eslint-disable no-nested-ternary,react/destructuring-assignment */
import React, { useContext, useState, useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import VotingContext from "../contexts/votingProposal";

export default ({ active, children, initializing, error }) => {

  const context = useContext(VotingContext);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(active || !!error || !!context.error);
  }, [active, error, context.error]);

  const content = context.error ? context.error.message : initializing ? "Initializing App" : "Fetching User";
  const handleClick = () => {
    setIsActive(false);
    if (context.error) {
      context.setError(null);
    }
  };
  return (
    <LoadingOverlay
      active={isActive}
      spinner={!error && !context.error}
      text={content}
      onClick={handleClick}
    >
      {children}
    </LoadingOverlay>
  );
}