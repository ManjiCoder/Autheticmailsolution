// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import emailChk from 'email-chk';

import verifier from 'email-exist';

type Data = {
  status: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  const { slug } = req.query;
  if (method !== 'GET') {
    return res.status(400).json({ status: 'error', message: `Not allowed` });
  }
  verifier.verify(slug, function (err: any, info: any) {
    if (err) {
      console.log(err);
      return res.status(200).json({
        status: 'error',
        message: `slug not checked!`,
      });
    } else {
      // console.log('Success: ' + info.success);
      // console.log('Info: ' + info.info);
      // console.log('Response from smtp: ' + info.response);
      return res.status(200).json({
        status: 'ok',
        message: info.info,
      });
    }
  });
  // try {
  //   const isExists = await emailChk(slug);

  //   res.status(200).json({
  //     status: 'ok',
  //     message: `${slug} is ${isExists ? 'valid' : 'invalid'} email.`,
  //   });
  // } catch (err) {
  //   console.error(err);
  //   res.status(400).json({ status: 'error', message: `some error occurred.` });
  //   // connection refused or server error occurred
  // }
}
