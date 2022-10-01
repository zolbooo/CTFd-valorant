import fs from "fs";
import path from "path";

import agentData from "@/data/agents.json";

function countSpecialSounds(filenames: string[]) {
  return filenames.filter((filename) => filename.endsWith("special.mp3"))
    .length;
}
function countRegularSounds(filenames: string[]) {
  return (
    filenames.filter((filename) => filename.endsWith(".mp3")).length -
    countSpecialSounds(filenames)
  );
}

const agents = Object.keys(agentData);

export type SoundsManifest = Record<
  keyof typeof agentData,
  {
    flag: {
      regular: number;
      special: number;
    };
    lead: {
      regular: number;
      special: number;
    };
    interactions: Record<
      keyof typeof agentData,
      {
        regular: number;
        special: number;
      }
    >;
  }
>;

export async function getSoundManifest(): Promise<SoundsManifest> {
  const soundsPath = path.join(process.cwd(), "public/assets/sounds");
  return Object.fromEntries(
    await Promise.all(
      agents.map(async (agentId) => {
        const agentSoundsPath = path.join(soundsPath, agentId);
        const [flagSounds, interactionSounds, leadSounds] = await Promise.all([
          fs.promises.readdir(path.join(agentSoundsPath, "flag")),
          fs.promises.readdir(path.join(agentSoundsPath, "interaction")),
          fs.promises.readdir(path.join(agentSoundsPath, "lead")),
        ]);

        // Interaction sounds are in format "<agent>-<id>.mp3"
        const interactions = agents.map((interactionAgent) => {
          const sounds = interactionSounds.filter((filename) =>
            filename.startsWith(`${interactionAgent}-`)
          );
          return [
            interactionAgent,
            {
              regular: countRegularSounds(sounds),
              special: countSpecialSounds(sounds),
            },
          ];
        });
        return [
          agentId,
          {
            flag: {
              regular: countRegularSounds(flagSounds),
              special: countSpecialSounds(flagSounds),
            },
            lead: {
              regular: countRegularSounds(leadSounds),
              special: countSpecialSounds(leadSounds),
            },
            interactions: Object.fromEntries(interactions),
          },
        ];
      })
    )
  );
}
