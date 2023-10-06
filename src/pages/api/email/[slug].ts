// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import emailChk from 'email-chk';

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  const { slug } = req.query;
  if (method !== 'GET') {
    return res.status(400).json({ message: `Not allowed` });
  }
  try {
    const isExists = await emailChk(slug);

    res
      .status(200)
      .json({ result: `${slug} is ${isExists ? 'valid' : 'invalid'} email.` });
  } catch (err) {
    console.error(err);
    res.status(400).json({ result: `some error occurred.` });
    // connection refused or server error occurred
  }
}
