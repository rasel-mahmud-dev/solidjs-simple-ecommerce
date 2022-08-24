import { Component, ComponentProps, JSX, splitProps } from "solid-js";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: Component<Props> = (props) => {
  const [pr, buttonProps] = splitProps(props, ["class", "children"]);
  return (
    <button
      {...buttonProps}
      class={`flex items-center mt-4 bg-green-500 transition-colors hover:bg-green-600 text-white font-medium text-[15px] px-4 py-2 rounded ${pr.class}`}
    >
      {pr.children}
    </button>
  );
};

export default Button;
