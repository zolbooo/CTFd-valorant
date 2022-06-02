import { GetServerSideProps } from "next";

import "@/core/SoundDispatcher";

import { fetchTeams } from "@/server/teams";
import { fetchAgentPicks } from "@/server/picks";
import astra from '../../public/assets/agents/astra/icon.png';

import { PickStageInitialData, PickStageWidget } from "@/widgets/PickStage";
import Image from 'next/image'

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
  return (
    <div className="w-screen h-screen bg-valorant bg-cover backdrop-blur-xl">
      <div className="w-full h-full bg-white/5 backdrop-blur-sm">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-3/4">
            {/* tag */}
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

            {/* agent */}
            <div className="w-full h-16 mt-[2px] bg-teal-600 bg-opacity-60 grid grid-flow-row-dense grid-cols-5 items-center">
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>

            <div className="w-full h-16 mt-[2px] bg-rose-700 bg-opacity-50 grid grid-flow-row-dense grid-cols-5 items-center">            
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>
            <div className="w-full h-16 mt-[2px] bg-teal-600 bg-opacity-60 grid grid-flow-row-dense grid-cols-5 items-center">
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>

            <div className="w-full h-16 mt-[2px] bg-rose-700 bg-opacity-50 grid grid-flow-row-dense grid-cols-5 items-center">            
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>
            <div className="w-full h-16 mt-[2px] bg-teal-600 bg-opacity-60 grid grid-flow-row-dense grid-cols-5 items-center">
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>

            <div className="w-full h-16 mt-[2px] bg-rose-700 bg-opacity-50 grid grid-flow-row-dense grid-cols-5 items-center">            
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>
            <div className="w-full h-16 mt-[2px] bg-teal-600 bg-opacity-60 grid grid-flow-row-dense grid-cols-5 items-center">
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>

            <div className="w-full h-16 mt-[2px] bg-rose-700 bg-opacity-50 grid grid-flow-row-dense grid-cols-5 items-center">            
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>
            <div className="w-full h-16 mt-[2px] bg-teal-600 bg-opacity-60 grid grid-flow-row-dense grid-cols-5 items-center">
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>

            <div className="w-full h-16 mt-[2px] bg-rose-700 bg-opacity-50 grid grid-flow-row-dense grid-cols-5 items-center">            
              <div className="h-full flex flex-row items-center col-span-2">
                <div className=" w-16">
                  <Image
                    className="opacity-100"
                    src={astra}
                  />
                </div>
                <p className="px-8 text-white">ASTRA</p>
              </div>
              <p className="text-white opacity-100 text-center">234</p>
              <p className="text-white opacity-100 text-center">00</p>
              <p className="text-white opacity-100 text-center">00</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;