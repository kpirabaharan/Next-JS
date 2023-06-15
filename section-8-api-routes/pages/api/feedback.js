import fs from 'fs';
import path from 'path';

const buildAndExtractFeedback = () => {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

export default (req, res) => {
  if (req.method === 'POST') {
    const { email, text } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    const data = buildAndExtractFeedback();
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success', feedback: newFeedback });
  } else {
    const data = buildAndExtractFeedback();
    res.status(200).json({ feedback: data });
  }
};
