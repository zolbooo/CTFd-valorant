import { NextApiRequest, NextApiResponse } from "next";

import { fetchScoreboard } from "@/server/scoreboard";

const scoreboardHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  res.send(await fetchScoreboard());
};

export default scoreboardHandler;
