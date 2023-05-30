import { useWeb3React } from '@web3-react/core';
import { RPC_URLS, injected } from '../helpers/Connector';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import {Web3Provider}  from '@ethersproject/providers';

const Web3ReactConnectionComponent = (props) => {

	//connector, library, chainId, account, activate, deactivate
	const web3reactContext = useWeb3React(); 
	const { account, library } = useWeb3React(); // Accessing the account and library from the Web3ReactContext
	const [balance, setBalance] = useState('');

	useEffect(() => {
		//for the connected account balance
		const fetchBalance = async () => {
		  try {
			if (window.ethereum) {
				const web3 = new Web3(window.ethereum);
				const accountAddress = account; // Replace with the actual Ethereum account address
				web3.eth.getBalance(accountAddress, (error, balance) => {
				  if (error) {
					console.log('Error fetching balance:', error);
				  } else {
					const balance = web3.utils.fromWei(balance, 'ether');
					setBalance(balance);
					console.log('Account Balance:', balanceInEther, 'BNB');
				  }
				});
			  
			} else {
			  console.log('No Ethereum provider found');
			}
		  } catch (error) {
			console.log('Error fetching balance:', error);
		  }
		};
	
		fetchBalance();
	  }, []);

	const disconnectMetamaskSimple = () => {
		try {
			web3reactContext.deactivate();
		} catch (ex) {
			console.log(ex);
		}
	};

	//web3react context
	const checkInfoSimple = async () => {
		try {
			console.log('web3reactContext');
			console.log(web3reactContext);
		} catch (ex) {
			console.log(ex);
		}
	};

	//web3react metamask
	const connectMetamaskSimple = async () => {
		try {
			await web3reactContext.activate(injected);
		} catch (ex) {
			console.log(ex);
		}
	};



	return (
		<div className="flex flex-col space-y-7 items-start pt-10 w-1/2 border-2 border-yellow-300">
			<h2>Web3React Control</h2>
{/* for the account and chainId */}
			{web3reactContext.account ? <div>
				<p>Account: {web3reactContext.account}</p>
				<p>ChainId: {web3reactContext.chainId}</p>
				</div>: <p>Not connected</p>}
				<div>
				{/* for the balance	 */}
				{balance !== '' ? (
					<p>Account Balance: {balance} ETH</p>
				) : (
					<p>Loading balance...</p>
				)}
    </div>
			<div className="flex space-x-3">

				<button
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={checkInfoSimple}
				>
					Check web3react Context
				</button>
				<button
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={disconnectMetamaskSimple}
				>
					Disconnect Web3React
				</button>
			</div>
			<div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectMetamaskSimple}
				>
					Connect Metamask Via Web3-React
				</button>
			</div>
		</div>
	);
};
export default Web3ReactConnectionComponent;
