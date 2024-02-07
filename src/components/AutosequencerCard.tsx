import useStore from "../state/store";
import Card from "./Card";

const AutosequencerCard = () => {
  const {
    autosequencer: { productivity, buyAutosequencer, level, price, total },

    funds,
  } = useStore();
  return (
    <Card
      background="gray"
      title="Autosequencer"
      helperText="Autosequencers allow you to generate sequences automatically"
    >
      <ul className="flex flex-col gap-1 leading-none uppercase mb-4">
        <li>Autosequencers: {total}</li>
        <li>
          Production Rate: {(productivity * level).toFixed(2)}
          <span className="lowercase">x</span>
        </li>
      </ul>
      <div className="">
        <button disabled={funds < price} onClick={buyAutosequencer}>
          Purchase Autosequencer ({price.toFixed(2)} €)
        </button>
      </div>
    </Card>
  );
};

export default AutosequencerCard;
