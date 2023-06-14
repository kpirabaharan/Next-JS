import { useRef } from 'react';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const text = feedbackInputRef.current.value;

    fetch();
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
        <button>Send Feedback</button>
      </form>
    </div>
  );
}

export default HomePage;
