import { GetServerSideProps } from "next";

import { fetchTeams } from "@/server/teams";
import { fetchCTFStatus } from "@/server/status";
import { fetchAgentPicks } from "@/server/picks";
import { fetchScoreboard } from "@/server/scoreboard";

import { PickStageInitialData, PickStageWidget } from "@/widgets/PickStage";
import { ScoreboardInitialData, ScoreboardWidget } from "@/widgets/Scoreboard";
import { getSoundManifest } from "@/server/sounds";

type HomePageInitialData =
  | {
      started: false;
      initialData: PickStageInitialData;
    }
  | {
      started: true;
      initialData: ScoreboardInitialData;
    };

export const getServerSideProps: GetServerSideProps<
  HomePageInitialData
> = async () => {
  const [{ started }, agentPicks] = await Promise.all([
    fetchCTFStatus(),
    fetchAgentPicks(),
  ]);
  if (!started) {
    const teams = await fetchTeams();
    return {
      props: {
        started: false,
        initialData: {
          teams,
          agentPicks,
        },
      },
    };
  }

  const [sounds, scoreboard] = await Promise.all([
    getSoundManifest(),
    fetchScoreboard(),
  ]);
  return {
    props: {
      started: true,
      initialData: {
        sounds,
        scoreboard,
        agentPicks,
      },
    },
  };
};

function HomePage({ started, initialData }: HomePageInitialData) {
  if (!started) {
    return <PickStageWidget initialData={initialData} />;
  }
  return <ScoreboardWidget initialData={initialData} />;
}

export default HomePage;
