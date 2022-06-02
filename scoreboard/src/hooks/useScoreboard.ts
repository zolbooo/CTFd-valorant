import { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

import { ScoreboardItem } from "@/server/scoreboard";

import { useTaskQueue } from "@/contexts/TaskQueueContext";

export function useScoreboard({
  agentPicks,
  initialScoreboard,
}: {
  agentPicks: Record<string, string>;
  initialScoreboard: ScoreboardItem[];
}) {
  const [scoreboard, setScoreboard] = useState(initialScoreboard);

  const scoreboardRef = useRef(scoreboard);
  useEffect(() => {
    scoreboardRef.current = scoreboard;
  }, [scoreboard]);
  const agentPicksRef = useRef(agentPicks);
  useEffect(() => {
    agentPicksRef.current = agentPicks;
  }, [agentPicks]);

  const taskQueue = useTaskQueue();
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string);
    socket.on(
      "submission",
      async (submission: {
        success: boolean;
        team: { id: number; name: string };
      }) => {
        if (!submission.success) {
          setScoreboard((scoreboard) =>
            scoreboard.map((standing) => {
              if (standing.id === submission.team.id) {
                return { ...standing, fails: standing.fails + 1 };
              }
              return standing;
            })
          );
          return;
        }

        const newScoreboard: ScoreboardItem[] = await fetch(
          "/api/scoreboard"
        ).then((res) => res.json());
        // TODO: Play sound
        // * Use scoreboardRef and agentPicksRef to get the latest scoreboard and agentPicks
        setScoreboard(newScoreboard);
      }
    );
    return () => {
      socket.close();
    };
  }, [taskQueue]);

  return { scoreboard };
}
