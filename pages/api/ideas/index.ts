import { NextApiRequest, NextApiResponse } from "next";
import StoryblokClient from "storyblok-js-client";
import Cors from "cors";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await runMiddleware(req, res, cors);

    try {
      const Storyblok = new StoryblokClient({
        oauthToken: process.env.NEXT_STORYBLOK_OAUTH_TOKEN,
      });

      const response = await Storyblok.get(
        `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/ideas/`
      );

      res.status(200).send({ response });
    } catch (err) {
      res.status(500).send({ error: "failed", err });
    }
  } else {
    return res.status(405).send({ error: "method not allowed" });
  }
}
