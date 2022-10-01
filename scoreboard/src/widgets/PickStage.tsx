import { Team } from "@/server/teams";

import { AgentPick } from "@/components/AgentPick";
import { useAgentPicks } from "@/hooks/useAgentPicks";

export type PickStageInitialData = {
  teams: Team[];
  agentPicks: Record<string, string>;
};

export function PickStageWidget({
  initialData: { teams, agentPicks: initialAgentPicks },
}: {
  initialData: PickStageInitialData;
}) {
  const { agentPicks } = useAgentPicks({ initialAgentPicks });
  return (
    <div className="w-screen h-screen bg-valorant bg-cover backdrop-blur-xl">
      <div className="w-full h-full bg-white/5 backdrop-blur-sm">
        <div className="p-5 h-full flex flex-row flex-wrap justify-between items-center">
          {teams.map((team) => (
            <AgentPick
              layout="rtl"
              key={team.name}
              team={team}
              agent={agentPicks[team.name] ?? null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
