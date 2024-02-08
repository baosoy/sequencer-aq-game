import { useEffect } from "preact/hooks";
import Header from "./components/Header";
import useStore from "./state/store";
import OverviewCard from "./components/OverviewCard";
import RawDataCard from "./components/RawDataCard";
import SalesCard from "./components/SalesCard";
import AutosequencerCard from "./components/AutosequencerCard";
import EnvironmentCard from "./components/EnvironmentCard";
import EnvironmentImpactCard from "./components/EnvironmentImpactCard";
import AutopurchaserCard from "./components/AutopurchaserCard";
import EnvironmentExplore from "./components/EnvironmentExplore";

export function App() {
  const store = useStore();
  const {
    ticker,
    reset,
    environment: { fetchNewReadings },
  } = store;

  useEffect(() => {
    const interval = setInterval(ticker, 250);
    const environmentFetcher = setInterval(fetchNewReadings, 1000 * 60 * 2);
    fetchNewReadings();
    return () => {
      clearInterval(interval);
      clearInterval(environmentFetcher);
    };
  }, []);

  return (
    <>
      <div class="min-h-screen flex flex-col">
        <div class="flex-1">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Header />
            <div id="col-1" className="flex flex-col gap-4">
              <OverviewCard />

              <SalesCard />
              <RawDataCard />
            </div>
            <div id="col-2" className="flex flex-col gap-4">
              <AutosequencerCard />
              <AutopurchaserCard />(
              <div class="lg:hidden">
                <EnvironmentCard />
              </div>
              <div class="lg:hidden">
                <EnvironmentImpactCard />
              </div>
            </div>
            <div id="col-3" className="flex-col gap-4 hidden lg:flex">
              <EnvironmentCard />
              <EnvironmentImpactCard />
              <EnvironmentExplore />
            </div>
          </div>
        </div>
        <footer class="border-t container mx-auto text-white py-4 flex justify-between items-center px-4">
          <button onClick={reset} class="border-gray-500">
            Reset Game
          </button>
          <span>Made by Kerim Hudson</span>
        </footer>
      </div>
    </>
  );
}
