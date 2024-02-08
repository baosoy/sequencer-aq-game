import Card from "./Card";
import useStore from "../state/store";
import { useEffect } from "react";

const locations = [
  {
    id: 152,
    city: "London",
  },
  {
    id: 4769,
    city: "Berlin",
  },
  {
    id: 72211,
    city: "New Delhi",
  },
  {
    id: 5243,
    city: "São Paulo",
  },
  {
    id: 2352,
    city: "Bangkok",
  },
  {
    id: 7239,
    city: "Kraków",
  },
  {
    id: 1894641,
    city: "Lahore",
  },
  {
    id: 2334,
    city: "Los Angeles",
  },
  {
    id: 6161,
    city: "Stockholm",
  },
];

const EnvironmentExplore = () => {
  const { environment } = useStore();

  useEffect(() => {
    let interval: any;

    if (environment.local) {
      interval = setInterval(environment.fetchNewReadings, 3 * 60 * 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [environment.local]);

  return (
    <Card
      background="brown"
      title="Explore Environments"
      helperText="Toggle between using your own air quality monitor, and exploring averages from cities around the world."
    >
      <div class="flex">
        <button
          onClick={() =>
            environment.updateEnvironmentType({
              local: true,
              id: null,
              city: null,
            })
          }
          class={[
            "-mr-0.5",
            environment.local ? "bg-black text-white" : "",
          ].join(" ")}
        >
          Local Sensor
        </button>
        <button
          onClick={() =>
            environment.updateEnvironmentType({
              local: false,
              id: locations[0].id,
              city: locations[0].city,
            })
          }
          class={[
            "-mr-0.5",
            !environment.local ? "bg-black text-white" : "",
          ].join(" ")}
        >
          Explore cities
        </button>
      </div>
      {!environment.local ? (
        <div class="mt-4">
          <select
            onChange={(e) =>
              environment.updateEnvironmentType({
                local: false,
                id: Number(e.currentTarget.value),
                city: locations.filter(
                  (i) => i.id === Number(e.currentTarget.value)
                )[0].city,
              })
            }
            class="rounded-none bg-transparent appearance-none py-2 px-2 border w-full border-black"
          >
            {locations.map((location) => (
              <option value={location.id}>{location.city}</option>
            ))}
          </select>
        </div>
      ) : null}
    </Card>
  );
};

export default EnvironmentExplore;
