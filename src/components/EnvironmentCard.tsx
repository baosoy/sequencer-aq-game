import useStore from "../state/store";
import Card from "./Card";

const EnvironmentCard = () => {
  const {
    environment: {
      values: { pm10, pm2_5, sound, temperature, timestamp },
    },
  } = useStore();
  return (
    <Card background="brown" title="Environment Status">
      <ul className="flex flex-col gap-1 leading-none uppercase mb-4">
        <li>Temperature: {temperature.toFixed(1)} C</li>
        <li>PM_2_5: {Math.round(pm2_5)}</li>
        <li>PM_10: {Math.round(pm10)}</li>
        <li>Sound: {sound.toFixed(1)}V</li>
        <li>Last Reading: {timestamp}</li>
      </ul>
    </Card>
  );
};

export default EnvironmentCard;
