import React, { useState } from 'react';

const CallWithoutExoNum = () => {
  const [callSid, setCallSid] = useState('');
  const [callFrom, setCallFrom] = useState('');
  const [created, setCreated] = useState(getFormattedDateTime());
  const [successMessage, setSuccessMessage] = useState('');

  function getFormattedDateTime() {
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
  
    const dateTime = new Date();
    return new Intl.DateTimeFormat('en-US', options).format(dateTime);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
        const response = await fetch(
          `https://ivr.plts-dev.com/v5/greetings?CallSid=${callSid}&CallFrom=${callFrom}&Created=${created}`
        );
  
        if (response.ok) {
        
          setSuccessMessage('Call has been successfully completed');
  
          setCallSid('');
          setCallFrom('');
          setCreated(getFormattedDateTime());
        } else {
          const errorData = await response.json();
          console.error(errorData);
          setSuccessMessage('Call failed. Please try again.'); 
        }
      } catch (error) {
        console.error(error);
        setSuccessMessage('Call failed. Please try again.'); 
      }
  };


  return (
    <div className="container mx-auto mt-8">
          <h1 className=' text-center text-3xl font-bold'>Demo Mock Call to IVR</h1>
          <hr />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-[100px]">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="callSid">
            CallSid:
          </label>
          <input
            type="text"
            id="callSid"
            className="border rounded w-full py-2 px-3"
            value={callSid}
            onChange={(e) => setCallSid(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="callFrom">
            CallFrom:
          </label>
          <input
            type="text"
            id="callFrom"
            className="border rounded w-full py-2 px-3"
            value={callFrom}
            onChange={(e) => setCallFrom(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className=" text-gray-400 text-sm font-bold mb-2 flex" htmlFor="created">
            <p>Called Time</p>
          </label>
          <input
            type="text"
            id="created"
            className="border text-gray-400 rounded w-full py-2 px-3"
            value={created}
            onChange={(e) => setCreated(e.target.value)}
            readOnly
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-[100%] py-2 rounded hover:bg-blue-700"
        >
          Call Now
        </button>
        {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CallWithoutExoNum;
