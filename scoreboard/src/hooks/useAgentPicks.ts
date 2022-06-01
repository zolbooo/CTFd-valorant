import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { SoundDispatcher } from "@/core/SoundDispatcher";

export function useAgentPicks({
  initialAgentPicks,
}: {
  initialAgentPicks: Record<string, string>;
}) {
  const [agentPicks, setAgentPicks] = useState(initialAgentPicks);
  useEffect(() => {
    const soundDispatcher = new SoundDispatcher();

    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string);
    socket.on("agent-selected", async (data) => {
      await soundDispatcher.playSound(`${data.agent}/pick`);
      setAgentPicks((picks) => ({ ...picks, [data.team]: data.agent }));
    });

    return () => {
      socket.close();
    };
  }, []);
  return { agentPicks };
}
