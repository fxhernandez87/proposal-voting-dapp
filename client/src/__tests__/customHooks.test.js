// useCounter.test.js
import { renderHook } from 'react-hooks-testing-library'
import { useWeb3 } from '../hooks/customHooks';
import Web3 from "web3";

describe('testing web3 hook', () => {
  test('should get an instance of web3 object', () => {
    const { result } = renderHook(() => useWeb3());
    expect(result.current).toBeInstanceOf(Array);
    const [error, web3Instance] = result.current;

    expect(error).toBe(null);
    expect(web3Instance).toBeInstanceOf(Web3);
  });

  test('should get an invalid provider error', async () => {
    window.tempEth = window.ethereum;
    window.ethereum = {
      enable: jest.fn(() => {
        throw new Error("error");
      })
    };
    const { result } = renderHook(() => useWeb3());
    expect(result.current).toBeInstanceOf(Array);
    const [error, web3Instance] = result.current;
    expect(error).not.toBe(null);
    expect(error.message).toBe('Invalid provider injected!');
    expect(web3Instance).toBe(null);

    window.ethereum = window.tempEth;
  });
});
