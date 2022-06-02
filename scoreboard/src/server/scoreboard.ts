import { APIResponse } from "./types";

export type ScoreboardItem = {
  id: number;
  name: string;
  score: number;
  solves: number;
  fails: number;
};

export async function fetchScoreboard() {
  const result: APIResponse<ScoreboardItem[]> = await fetch(
    `${process.env.CTFD_API_URL}/valorant/standings`
  ).then((res) => res.json());
  return result.data;
}
