import useWeb3 from '../../hooks/useWeb3';
import { useEffect, useState } from 'react';
import useMessengerFunction from '../../hooks/useMessengerFunctions';

export default function Home() {
  const { wallet } = useWeb3();
  const { message, allMessages, viewAllMessages } = useMessengerFunction();
  const [text, setText] = useState('');

  useEffect(() => {
    wallet.connect();
    if (wallet.address) {
      viewAllMessages();
    }
  }, [wallet.address]);

  return (
    <>
      {wallet.address && wallet.address ? (
        <>
          <div className='container'>
            <div className='header'>
              <h3
                style={{
                  backgroundColor: '#0e0d0d',
                  width: '240px',
                  borderRadius: '5px',
                  padding: '5px',
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                BNB CHAIN {'</'}MESSENGER{'>'}
              </h3>
              <div className='header-address'>
                <span
                  style={{
                    fontSize: '15px',
                    backgroundColor: '#0e0d0d',
                    padding: '5px',
                    borderRadius: '5px',
                    marginRight: '3px',
                    marginTop: '5px',
                    position: 'relative',
                    float: 'left',
                  }}
                >
                  {wallet.address}
                </span>{' '}
                <button className='disconnect-btn'>Disconnect</button>
              </div>
            </div>
            <div className='main'>
              {allMessages?.map((user) => (
                <>
                  <div key={user.messageID} className='message-box'>
                    <span
                      style={{
                        backgroundColor: '#0e0d0d',
                        padding: '3px',
                        borderRadius: '3px',
                      }}
                    >
                      ID :{user.messageID}
                    </span>
                    {'   '}
                    <span className='address'>{user.Address}</span>
                    <div className='user-messages'>{user.Message}</div>
                  </div>
                </>
              ))}
            </div>
            <div className='text-input'>
              <textarea
                placeholder='say hi..'
                onChange={(e) => setText(e.target.value)}
                typeof='text'
                maxLength={250}
                className='textarea'
                value={text}
              ></textarea>
              <button
                className='send'
                onClick={() => {
                  message(text);
                  setText('');
                }}
              >
                Send
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className='connect-body'>
          <span
            style={{
              position: 'absolute',
              marginTop: '250px',
              fontSize: '45px',
              color: '#fff',
              fontWeight: 'bold',
              marginLeft: '-150px',
            }}
          >
            Please Connect Wallet!
          </span>
          <button className='connect-btn' onClick={() => wallet.connect()}>
            Connect
          </button>
        </div>
      )}
    </>
  );
}
