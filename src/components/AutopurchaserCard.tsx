import useStore from "../state/store";
import Card from "./Card";

const AutopurchaserCard = () => {
  const {
    autopurchaser: {
      purchaseAutopurchaser,
      purchased,
      active,
      toggleAutopurchaser,
      price,
    },

    funds,
  } = useStore();
  return (
    <Card
      background="gray"
      title="Autopurchaser"
      helperText="Autopurchaser allows you to automatically purchase bytes when supplies run out"
    >
      <ul className="flex flex-col gap-1 leading-none uppercase mb-4">
        <li>Autopurchaser available: {purchased ? "true" : "false"}</li>
        <li>Autopurchaser active: {active ? "true" : "false"}</li>
      </ul>
      <div className="">
        {!purchased ? (
          <button disabled={funds < price} onClick={purchaseAutopurchaser}>
            Purchase Autopurchaser ({price.toFixed(2)} €)
          </button>
        ) : null}
        {purchased ? (
          <button onClick={toggleAutopurchaser}>Toggle Autopurchaser</button>
        ) : null}
      </div>
    </Card>
  );
};

export default AutopurchaserCard;
