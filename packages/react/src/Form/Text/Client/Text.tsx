import "@axa-fr/design-system-css/dist/Form/Text/Client/Text.client.scss";
import { ComponentPropsWithRef, forwardRef } from "react";

import { getComponentClassName } from "../../core";

type Props = Omit<ComponentPropsWithRef<"input">, "required"> & {
  description?: string;
  label?: string;
  required?: boolean;
};

const Text = forwardRef<HTMLInputElement, Props>(
  ({ className, ...otherProps }, inputRef) => {
    const componentClassName = getComponentClassName(
      className,
      "",
      "af-form__input-text",
    );

    const { id, label, required, disabled, description } = otherProps;

    return (
      <div className="af-form__input-container">
        <label htmlFor={id} className="af-form__input-label">
          {label} {required && <span> *</span>}
        </label>
        {description && (
          <span className="af-form__input-description">{description}</span>
        )}
        <input
          className={componentClassName}
          type="text"
          ref={inputRef}
          required={required}
          disabled={disabled}
          {...otherProps}
        />
      </div>
    );
  },
);

Text.displayName = "Text";

export { Text };
