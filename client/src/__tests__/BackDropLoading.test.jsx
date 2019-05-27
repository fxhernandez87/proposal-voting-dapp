import React from 'react';
import { render, fireEvent, waitForElement, cleanup } from 'test-utils';
import 'jest-dom/extend-expect';
import BackDropLoading from '../components/BackDropLoading';

beforeEach(cleanup);

test('Should create an overlay that says Initializing App', async () => {
  // Arrange
  const active = true;
  const children = <div />;
  const initializing = true;
  const error = false;

  const {queryByText, getByText, asFragment} = render(
    <BackDropLoading
      active={active}
      children={children}
      initializing={initializing}
      error={error}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByText(/Initializing App/i)).not.toBeNull();
  expect(queryByText(/_loading-overlay-transition-exit-active/i)).toBeNull();
});

test('Should create an overlay that says Fetching User', async () => {
  // Arrange
  const active = true;
  const children = <div />;
  const initializing = false;
  const error = false;

  const {queryByText, getByText, asFragment} = render(
    <BackDropLoading
      active={active}
      children={children}
      initializing={initializing}
      error={error}
    />,
  );

  expect(asFragment()).toMatchSnapshot();
  expect(queryByText(/_loading-overlay-transition-exit-active/i)).toBeNull();
  expect(getByText(/Fetching User/i)).not.toBeNull();
});


test('Should not show an overlay', async () => {
  // Arrange
  const active = false;
  const children = <div />;
  const initializing = false;
  const error = false;

  const {queryByText, asFragment} = render(
    <BackDropLoading
      active={active}
      children={children}
      initializing={initializing}
      error={error}
    />,
  );

  expect(asFragment()).toMatchSnapshot();
  expect(queryByText(/_loading_overlay_wrapper--active/i)).toBeNull();
});



test('Should fade overlay out on click', async () => {
  // Arrange
  const active = true;
  const children = <div />;
  const initializing = false;
  const error = false;

  const {getByText, getByTestId, asFragment} = render(
    <BackDropLoading
      active={active}
      children={children}
      initializing={initializing}
      error={error}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByText(/Fetching User/i)).not.toBeNull();
  await waitForElement(() =>
    getByTestId('wrapper')
  );

  fireEvent.click(getByText('Fetching User'));

  expect(asFragment()).toMatchSnapshot();
  expect(getByTestId('overlay')).toHaveClass('_loading-overlay-transition-exit-active');
});

test('Should show an error without spinner', async () => {
  // Arrange
  const active = false;
  const children = <div />;
  const initializing = false;
  const error = new Error('Test Error');

  const {getByText, queryByText, asFragment} = render(
    <BackDropLoading
      active={active}
      children={children}
      initializing={initializing}
      error={error}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByText(/Test Error/i)).not.toBeNull();
  expect(queryByText(/_loading_overlay_spinner/i)).toBeNull();
});

