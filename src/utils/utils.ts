/**
 * Changes the body attribute
 */
const changeBodyAttribute = (attribute: string, value: string): void => {
  if (document.body) document.body.setAttribute(attribute, value);
};

// eslint-disable-next-line import/prefer-default-export
export { changeBodyAttribute };
