import { useRef, useState } from 'react';

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const text = feedbackInputRef.current.value;

    const reqBody = { email, text };

    const response = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const loadFeebackHandler = async (event) => {
    const response = await fetch('/api/feedback');
    const data = await response.json();

    setFeedbackItems(data.feedback);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form type='email'>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback </label>
          <textarea id='feedback' rows='5' ref={feedbackInputRef} />
        </div>
        <button onClick={submitFormHandler}>Send Feedback</button>
        <hr />
      </form>
      <button onClick={loadFeebackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
