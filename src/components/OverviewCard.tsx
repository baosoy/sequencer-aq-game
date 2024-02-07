import useStore from "../state/store";
import Card from "./Card";

const OverviewCard = () => {
  const {
    sequences: { demand, price, unsold, createSequence },
    bytes: { perSequence, total },

    funds,
  } = useStore();
  return (
    <Card background="green" title="Status">
      <ul className="flex flex-col gap-1 leading-none uppercase mb-4">
        <li>Demand: {Math.round(demand * 100)}%</li>
        <li>Sale Price: {price.toFixed(2)} €</li>
        <li>Unsold Sequences: {unsold}</li>
        <li>Funds: {funds.toFixed(2)} €</li>
        <li>Raw Data Bytes: {total} B</li>
      </ul>
      <button onClick={createSequence} disabled={total < perSequence}>
        Generate Sequence ({perSequence}B)
      </button>
    </Card>
  );
};

export default OverviewCard;
