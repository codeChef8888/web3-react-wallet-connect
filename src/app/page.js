'use client';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Web3ReactConnectionComponent from './Components/Web3ReactConnectionComponent'

export default function Home() {
  const getLibrary = (provider) => {
		const library = new Web3Provider(provider, 'any');
		library.pollingInterval = 15000;
		return library;
	};
  return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ReactConnectionComponent/>
      </Web3ReactProvider>
  )
}
