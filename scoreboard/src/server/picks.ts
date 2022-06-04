import { APIResponse } from "./types";

export type AgentChoice = {
  id: number;
  agent_name: string;
  team_id: number;
  team_name: string;
};

export async function fetchAgentPicks(): Promise<Record<string, string>> {
  const result: APIResponse<AgentChoice[]> = await fetch(
    `${process.env.CTFD_API_URL}/valorant/picks`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CTFD_API_KEY}`,
      },
    }
  ).then((res) => res.json());
  return Object.fromEntries(
    result.data?.map(({ team_name, agent_name }) => [team_name, agent_name]) ?? []
  );
}
