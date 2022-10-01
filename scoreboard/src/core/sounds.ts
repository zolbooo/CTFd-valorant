import agentData from "@/data/agents.json";

import { SoundsManifest } from "@/server/sounds";
import { ScoreboardItem } from "@/server/scoreboard";

type AgentId = keyof typeof agentData;

function pickSoundFromManifest(manifest: {
  regular: number;
  special: number;
}): {
  id: string;
  special: boolean;
} {
  const totalSounds = manifest.regular + manifest.special;
  const randomIndex = Math.floor(Math.random() * totalSounds);
  // When the random index is less than the number of regular sounds,
  // we pick a random regular sound.
  if (randomIndex < manifest.regular) {
    return { id: `${randomIndex + 1}`, special: false };
  }
  return {
    id: `${randomIndex - manifest.regular + 1}.special`,
    special: true,
  };
}

export function pickSound({
  team,
  agentPicks,
  soundManifest,
  oldScoreboard,
  newScoreboard,
}: {
  team: string;
  agentPicks: Record<string, string>;
  soundManifest: SoundsManifest;
  oldScoreboard: ScoreboardItem[];
  newScoreboard: ScoreboardItem[];
}): { id: string; special: boolean } {
  const agent = agentPicks[team] as AgentId;

  // Should we pick only a flag sound?
  const teamStandingIndex = newScoreboard.findIndex(
    (standing) => standing.name === team
  );
  if (teamStandingIndex === newScoreboard.length - 1) {
    const sound = pickSoundFromManifest(soundManifest[agent].flag);
    return {
      id: `${agent}/flag/${sound.id}`,
      special: sound.special,
    };
  }

  // Should we use lead sound?
  const oldTeamStandingIndex = oldScoreboard.findIndex(
    (standing) => standing.name === team
  );
  if (oldTeamStandingIndex >= 3 && teamStandingIndex < 3) {
    const sound = pickSoundFromManifest(soundManifest[agent].lead);
    return {
      id: `${agent}/lead/${sound.id}`,
      special: sound.special,
    };
  }

  const prevTeamAgent = agentPicks[
    newScoreboard[teamStandingIndex + 1].name
  ] as AgentId | undefined;
  // Can pick an interaction?
  const isInteractionAvailable =
    prevTeamAgent &&
    (soundManifest[agent].interactions[prevTeamAgent].regular > 0 ||
      soundManifest[agent].interactions[prevTeamAgent].special > 0);
  if (isInteractionAvailable) {
    // Choose between interaction and flag sound
    const shouldUseInteraction = Math.random() < 0.5;
    if (shouldUseInteraction) {
      const sound = pickSoundFromManifest(
        soundManifest[agent].interactions[prevTeamAgent]
      );
      return {
        id: `${agent}/interaction/${prevTeamAgent}-${sound.id}`,
        special: sound.special,
      };
    }
  }

  const sound = pickSoundFromManifest(soundManifest[agent].flag);
  return {
    id: `${agent}/flag/${sound.id}`,
    special: sound.special,
  };
}
