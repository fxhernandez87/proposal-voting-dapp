import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

export default ({ active, children }) => (
  <LoadingOverlay
    active={active}
    spinner
    text='Loading content...'
  >
    {children}
  </LoadingOverlay>
);