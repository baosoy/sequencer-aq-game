import useStore from "../state/store";

const Header = () => {
  const ticks = useStore((state) => state.ticks);
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-between items-center pb-4 border-b pt-4 text-gray-500">
      <div class="flex items-center gap-2">
        <div class="grid w-10 h-10 grid-cols-3 gap-0.5 items-center justify-center grid-rows-3">
          <div class="w-2 h-2 bg-lime-200 rounded-full" />
          <div class="w-2 h-2 bg-lime-200 rounded-full" />
          <div class="w-2 h-2 bg-lime-200 rounded-full" />
          <div class="w-1 h-1 bg-lime-200 rounded-full animate-pulse" />
          <div class="w-2 h-2 bg-lime-200 rounded-full" />
          <div class="w-1 h-1 bg-lime-200 rounded-full animate-pulse" />
          <div class="w-2 h-2 bg-lime-200 rounded-full" />
          <div class="w-2 h-2 bg-lime-200 rounded-full" />
          <div class="w-2 h-2 bg-lime-200 rounded-full" />
        </div>
        <div class="flex flex-col">
          <h1 className="uppercase text-base font-medium leading-none mb-1">
            Sequencer
          </h1>
          <span class="text-xs leading-none">Byte Sequencing Factory</span>
        </div>
      </div>
      <div className="text-xs flex items-start gap-4">
        <div className="pt-[5px]">
          <div className="w-1.5 h-1.5 rounded-full bg-lime-200 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span className="text-xs">All systems operational</span>
          </div>
          <div className="pr-3">Ticker: {ticks}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
