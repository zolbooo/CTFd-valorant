import { APIResponse } from "./types";

export type ScoreboardItem = {
  pos: number;
  account_id: number;
  name: string;
  score: number;
};

export async function fetchScoreboard() {
  const result: APIResponse<ScoreboardItem[]> = await fetch(
    `${process.env.CTFD_API_URL}/scoreboard`
  ).then((res) => res.json());
  return result.data;
}
