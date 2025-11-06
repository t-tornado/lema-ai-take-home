export const generate = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const validate = (id: string) => {
  return /^[0-9a-f]{32}$/.test(id);
};

export const idHelper = {
  generate,
  validate,
};
