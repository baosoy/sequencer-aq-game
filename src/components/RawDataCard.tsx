import useStore from "../state/store";
import Card from "./Card";

const RawDataCard = () => {
  const {
    bytes: { perSequence, total, price, perOrder, buyBytes },
    funds,
  } = useStore();
  return (
    <Card background="green" title="Raw Data">
      <ul className="flex flex-col gap-1 leading-none uppercase mb-4">
        <li>Raw Data Bytes: {total} B</li>
        <li>Bytes Per Sequence: {perSequence} B</li>
        <li>Bytes Per Order: {perOrder} B</li>
      </ul>
      <button disabled={funds < price} onClick={buyBytes}>
        Buy Raw Data Bytes ({price.toFixed(2)} €)
      </button>
    </Card>
  );
};

export default RawDataCard;
