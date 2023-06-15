import React from 'react';

import { buildAndExtractFeedback } from '../api/feedback';

const FeedbackPage = (props) => {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const data = buildAndExtractFeedback();

  return { props: { feedbackItems: data } };
};

export default FeedbackPage;
