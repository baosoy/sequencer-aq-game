import useStore from "../state/store";
import Card from "./Card";

const EnvironmentImpactCard = () => {
  const {
    autosequencer: { productivity },
    environment: {
      impact: { pm10, pm2_5, sound, temperature },
    },
  } = useStore();

  const demandScore = Math.round(100 * (0.5 - (sound + pm10 + pm2_5)));

  return (
    <Card
      background="brown"
      title="Environment Impact"
      helperText="Current environmental conditions can impact the productivity of sequencing, cost of raw bytes, and the purchase demand."
    >
      <ul className="flex flex-col gap-1 leading-none uppercase mb-4">
        <li>Productivity: {Math.round(100 * productivity)} %</li>

        <li>Demand: {demandScore} %</li>
        <li>
          Raw Bytes Price Impact:{" "}
          {Math.floor(((1 - temperature) / 6 + sound) * 100)} %
        </li>
      </ul>
    </Card>
  );
};

export default EnvironmentImpactCard;
