/* eslint-disable no-nested-ternary,react/destructuring-assignment */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
import VotingContext from "../contexts/votingProposal";

const BackDropLoading = ({ active, children, initializing, error }) => {

  const context = useContext(VotingContext);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(active || !!error || !!context.error);
  }, [active, error, context.error]);

  // this is a little bit messy, basically the content of the overlay will be, if there is an error,
  // that error message, if the app is initializing, will be Initializing App otherwise will be Fetching User
  const content = context.error
    ? context.error.message
    : error
      ? error.message
      : initializing
        ? "Initializing App"
        : "Fetching User";

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
};

BackDropLoading.propTypes = {
  active: PropTypes.bool.isRequired,
  initializing: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
  children: PropTypes.node.isRequired,
};

BackDropLoading.defaultProps = {
  error: null
};

export default BackDropLoading;