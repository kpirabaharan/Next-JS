import feedback, { buildAndExtractFeedback } from './feedback';

export default (req, res) => {
  const feedbackId = req.query.feedbackId;
  const feedbackData = buildAndExtractFeedback();

  const selectedFeedback = feedbackData.find((item) => item.id === feedbackId);

  res.status(200).json({ feedback: selectedFeedback });
};
