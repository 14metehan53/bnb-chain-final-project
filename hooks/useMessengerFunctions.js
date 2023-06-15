import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import useContract from './useContract';
import { messengeradress } from '../config';
import messengerjson from '../artifacts/contracts/messenger.sol/Messenger.json';

const useMessengerFunction = () => {
  const [allMessages, setAllMessages] = useState([]);

  const Messenger = useContract(messengeradress, messengerjson.abi);

  const message = async (_msg) => {
    const txn = await Messenger.addMessage(_msg);
    await txn.wait();
    viewAllMessages();
  };

  const viewAllMessages = async () => {
    const data = await Messenger.listMessage();
    setAllMessages(data);
  };

  return {
    message,
    allMessages,
    viewAllMessages,
  };
};

export default useMessengerFunction;
