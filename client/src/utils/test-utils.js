import React from "react";
import { render } from 'react-testing-library'
import GlobalState from '../contexts/GlobalState';

const AllTheProviders = ({ children }) => {
  return (
    <GlobalState>
        {children}
    </GlobalState>
  )
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }