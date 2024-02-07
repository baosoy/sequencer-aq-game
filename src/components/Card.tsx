import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  background?: keyof typeof bgs;
  title?: string;
  helperText?: string;
}

const bgs = {
  brown: "bg-brown-500",
  green: "bg-green-500",
  gray: "bg-gray-500",
};

const Card: React.FC<Props> = ({ helperText, background, title, children }) => {
  const bg = bgs[background ?? "gray"];
  return (
    <div
      className={[
        "px-4 py-4 text-brand-black flex h-[220px] flex-col justify-between flicker",
        bg,
      ].join(" ")}
    >
      <div>
        {title ? <h2 className="underline uppercase mb-1">{title}</h2> : null}
        <p className="opacity-75">{helperText}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
