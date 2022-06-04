import { APIResponse } from "./types";

export type CTFStatus = {
  started: boolean;
  ended: boolean;
  startAt: number;
  endAt: number;
};

export async function fetchCTFStatus() {
  const result: APIResponse<CTFStatus> = await fetch(
    `${process.env.CTFD_API_URL}/valorant/ctf-status`
  ).then((res) => res.json());
  return result.data;
}
