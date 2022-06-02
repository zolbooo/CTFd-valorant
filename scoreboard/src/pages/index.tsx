import { GetServerSideProps } from "next";

import "@/core/SoundDispatcher";

import { fetchTeams } from "@/server/teams";
import { fetchCTFStatus } from "@/server/status";
import { fetchAgentPicks } from "@/server/picks";
import { fetchScoreboard } from "@/server/scoreboard";

import { PickStageInitialData, PickStageWidget } from "@/widgets/PickStage";
import { ScoreboardInitialData, ScoreboardWidget } from "@/widgets/Scoreboard";

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
  const [{ started }, teams, agentPicks] = await Promise.all([
    fetchCTFStatus(),
    fetchTeams(),
    fetchAgentPicks(),
  ]);
  if (!started) {
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

  const scoreboard = await fetchScoreboard();
  return {
    props: {
      started: true,
      initialData: {
        teams,
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
