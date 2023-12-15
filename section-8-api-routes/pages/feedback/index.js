import { useState } from 'react';

import { buildAndExtractFeedback } from '../api/feedback';

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const detailsHandler = async (id) => {
    const response = await fetch(`/api/${id}`);
    const data = await response.json();
    setFeedbackData(data.feedback);
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => detailsHandler(item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps = async () => {
  const data = buildAndExtractFeedback();

  return { props: { feedbackItems: data } };
};

export default FeedbackPage;
