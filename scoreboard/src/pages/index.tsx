import { GetServerSideProps } from "next";

import "@/core/SoundDispatcher";

import { fetchTeams } from "@/server/teams";
import { fetchAgentPicks } from "@/server/picks";

import { PickStageInitialData, PickStageWidget } from "@/widgets/PickStage";

export const getServerSideProps: GetServerSideProps<
  PickStageInitialData
> = async () => {
  const [teams, agentPicks] = await Promise.all([
    fetchTeams().then((res) => Array(10).fill(res).flat(1)),
    fetchAgentPicks(),
  ]);
  return {
    props: {
      teams,
      agentPicks,
    },
  };
};

function HomePage(initialData: PickStageInitialData) {
  return <PickStageWidget initialData={initialData} />;
}

export default HomePage;
