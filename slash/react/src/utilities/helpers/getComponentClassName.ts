import classNames from "classnames";

const getLastClassName = (classNameToUse: string) => {
  if (!classNameToUse) {
    return null;
  }

  return classNameToUse.split(" ").filter(Boolean).at(-1);
};

const listClassModifier = (classModifier?: string) => {
  if (!classModifier) {
    return [];
  }

  return classModifier.split(" ");
};

export const getComponentClassName = (
  className?: string,
  classModifier?: string,
  defaultClassName?: string,
) => {
  const classNameToUse = className || defaultClassName;

  // Fail fast, when no className or defaultClassName we don't want to loop on modifier
  if (!classNameToUse) {
    return "";
  }

  const classWithoutModifier = getLastClassName(classNameToUse);
  const modifiers = listClassModifier(classModifier);

  const modifiersObject = modifiers
    .filter((it) => /\S/.test(it))
    .map((it) => {
      return `${classWithoutModifier}--${it}`;
    });

  return classNames(classNameToUse, modifiersObject);
};
