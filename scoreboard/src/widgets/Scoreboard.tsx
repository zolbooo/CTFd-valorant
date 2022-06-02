import Image from "next/image";

export function ScoreboardWidget() {
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
            <div className="w-full h-16 mt-[2px] bg-teal-600 bg-opacity-60 grid grid-flow-row-dense grid-cols-5 items-center">
              <div className="h-full flex flex-row items-center col-span-2">
                <div className="w-16">
                  <Image
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
                <div className="w-16">
                  <Image
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                    className="opacity-100"
                    src="/assets/agents/astra/icon.png"
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
