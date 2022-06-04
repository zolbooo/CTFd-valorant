import { GetServerSideProps } from "next";

import { fetchTeams } from "@/server/teams";
import { fetchCTFStatus } from "@/server/status";
import { fetchAgentPicks } from "@/server/picks";
import { fetchScoreboard } from "@/server/scoreboard";

import { useCTFTime } from "@/hooks/useCTFTime";

import { getSoundManifest } from "@/server/sounds";
import { PickStageInitialData, PickStageWidget } from "@/widgets/PickStage";
import { ScoreboardInitialData, ScoreboardWidget } from "@/widgets/Scoreboard";

type HomePageInitialData = {
  startAt: number;
  endAt: number;
} & (
  | {
      started: false;
      initialData: PickStageInitialData;
    }
  | {
      started: true;
      initialData: ScoreboardInitialData;
    }
);

export const getServerSideProps: GetServerSideProps<
  HomePageInitialData
> = async () => {
  const [{ started, startAt, endAt }, agentPicks] = await Promise.all([
    fetchCTFStatus(),
    fetchAgentPicks(),
  ]);
  if (!started) {
    const teams = await fetchTeams();
    return {
      props: {
        startAt,
        endAt,
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
      startAt,
      endAt,
      started: true,
      initialData: {
        sounds,
        scoreboard,
        agentPicks,
      },
    },
  };
};

function HomePage({
  started,
  startAt,
  endAt,
  initialData,
}: HomePageInitialData) {
  useCTFTime({ startAt });
  if (!started) {
    return <PickStageWidget initialData={initialData} />;
  }
  return <ScoreboardWidget initialData={initialData} endAt={endAt} />;
}

export default HomePage;
