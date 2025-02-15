export const getIncrementedFileName = (name: string, count: number) => {
  if (!count) {
    return name;
  }

  return `${name} (${++count})`;
};
