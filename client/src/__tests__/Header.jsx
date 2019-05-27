import React from 'react';
import { render, fireEvent, waitForElement, cleanup } from 'test-utils';
import 'jest-dom/extend-expect';
import Header from '../components/Header';

beforeEach(cleanup);

test('Should render a header with a title', async () => {
  // Arrange
  const userLoggedIn = 'hello';

  const {getByText, asFragment} = render(
    <Header
      userLoggedIn={userLoggedIn}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByText(/hello/i)).not.toBeNull();
});