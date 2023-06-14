import { useRef } from 'react';

function HomePage() {
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
      </form>
    </div>
  );
}

export default HomePage;
