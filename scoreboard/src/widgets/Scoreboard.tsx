import Image from "next/image";
import classNames from "classnames";

import { ScoreboardItem } from "@/server/scoreboard";

import agentData from "@/data/agents.json";
import { useAgentPicks } from "@/hooks/useAgentPicks";
import { useScoreboard } from "@/hooks/useScoreboard";
import { SoundsManifest } from "@/server/sounds";

export type ScoreboardInitialData = {
  agentPicks: Record<string, string>;
  scoreboard: ScoreboardItem[];
  sounds: SoundsManifest;
};

export function ScoreboardWidget({
  initialData: { scoreboard: initialScoreboard, agentPicks: initialAgentPicks },
}: {
  initialData: ScoreboardInitialData;
}) {
  const { agentPicks } = useAgentPicks({ initialAgentPicks });
  const { scoreboard } = useScoreboard({
    agentPicks,
    initialScoreboard,
  });
  return (
    <div className="w-screen h-screen bg-split bg-cover backdrop-blur-xl">
      <div className="w-full h-full bg-white/5 backdrop-blur-sm">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-3/4">
            <div className="w-full h-8 grid grid-flow-row-dense grid-cols-5 my-2">
              <div className="h-full col-span-2 text-white bg-gray-100 bg-opacity-20 flex justify-center items-center">
                <p>TEAMS</p>
              </div>
              <div className="h-full text-white bg-gray-100 bg-opacity-20 flex justify-center items-center ml-[2px]">
                <p>COMBAT SCORE</p>
              </div>
              <div className="h-full text-white bg-gray-100 bg-opacity-20 flex justify-center items-center mx-[2px]">
                <p>KILLS</p>
              </div>
              <div className="h-full text-white bg-gray-100 bg-opacity-20 flex justify-center items-center">
                <p>DEATHS</p>
              </div>
            </div>
            {scoreboard.map((team, index) => (
              <div
                key={team.name}
                className={classNames(
                  "w-full h-16 mt-[2px] bg-opacity-60 grid grid-flow-row-dense grid-cols-5 items-center",
                  index % 2 === 0 ? "bg-teal-600" : "bg-rose-700"
                )}
              >
                <div className="h-full flex flex-row items-center col-span-2">
                  <div className="w-16">
                    {agentPicks[team.name] && (
                      <Image
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        className="opacity-100"
                        src={`/assets/agents/${agentPicks[team.name]}/icon.png`}
                        alt={`${agentPicks[team.name]} icon`}
                      />
                    )}
                  </div>
                  <p className="px-8 text-white">
                    {agentPicks[team.name]
                      ? `${team.name} - ${
                          agentData[
                            agentPicks[team.name] as keyof typeof agentData
                          ].name
                        }`
                      : team.name}
                  </p>
                </div>
                <p className="text-white opacity-100 text-center">
                  {scoreboard.find((listing) => listing.name === team.name)
                    ?.score ?? 0}
                </p>
                <p className="text-white opacity-100 text-center">
                  {team.solves.toString().padStart(2, "0")}
                </p>
                <p className="text-white opacity-100 text-center">
                  {team.fails.toString().padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
