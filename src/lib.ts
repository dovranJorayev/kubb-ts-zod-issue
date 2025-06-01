const camelize = (input: string) => {
  return input.split("_").flatMap((el) => el.split("-"));
};

/**
 * Custom kebab case function that handles camel case and pascal case.
 * Same to lodash kebabCase but with number and strings sequence processing.
 * @param input - The input string to convert to kebab case.
 * @returns The kebab case string.
 */
export const customKebabCase = (input: string) => {
  return camelize(input).join("-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") /** insert dash between lowercase/number and uppercase */
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") /** handle consecutive capitals */
    .toLowerCase();
};

export const customUpperCamelCase = (input: string) => {
  const tokens = camelize(input).map((el) => el.charAt(0).toUpperCase() + el.slice(1));
  return tokens.join("");
};

export const customLowerCamelCase = (input: string) => {
  const tokens = camelize(input).map((el, idx) => (idx === 0 ? el.charAt(0).toLocaleLowerCase() + el.slice(1) : el.charAt(0).toUpperCase() + el.slice(1)));
  return tokens.join("");
};

export const isMutationOperation = (operation: unknown) => {
  if (typeof operation !== "object" || operation === null) {
    return false;
  }

  return "method" in operation && (operation.method === "post" || operation.method === "put" || operation.method === "delete" || operation.method === "patch");
};

export const isQueryOperation = (operation: unknown) => {
  if (typeof operation !== "object" || operation === null) {
    return false;
  }

  return "method" in operation && operation.method === "get";
};