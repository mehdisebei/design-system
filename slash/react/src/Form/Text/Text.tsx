import "@axa-fr/design-system-slash-css/dist/Form/Text/Text.scss";
import { ComponentPropsWithRef, forwardRef } from "react";
import { getComponentClassName } from "../../utilities";

type Props = Omit<ComponentPropsWithRef<"input">, "required"> & {
  classModifier?: string;
};

const Text = forwardRef<HTMLInputElement, Props>(
  ({ className, classModifier, ...otherProps }, inputRef) => {
    const componentClassName = getComponentClassName(
      className,
      classModifier,
      "af-form__input-text",
    );

    return (
      <input
        className={componentClassName}
        type="text"
        ref={inputRef}
        {...otherProps}
      />
    );
  },
);

Text.displayName = "Text";

export { Text };
