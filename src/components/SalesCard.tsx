import useStore from "../state/store";
import Card from "./Card";

const SalesCard = () => {
  const {
    sequences: { demand, price, priceDiff, unsold, raisePrice, lowerPrice },
    funds,
  } = useStore();
  return (
    <Card background="green" title="Sales">
      <ul className="flex flex-col gap-1 leading-none uppercase mb-4">
        <li>Demand: {Math.round(demand * 100)} %</li>
        <li>Sale Price: {price.toFixed(2)} €</li>
        <li>Unsold Sequences: {unsold}</li>
        <li>Funds: {funds.toFixed(2)} €</li>
      </ul>
      <div className="flex gap-2">
        <button disabled={price <= priceDiff} onClick={lowerPrice}>
          Decrease Price (-{priceDiff} €)
        </button>
        <button disabled={price >= 10} onClick={raisePrice}>
          Increase Price (+{priceDiff} €)
        </button>
      </div>
    </Card>
  );
};

export default SalesCard;
