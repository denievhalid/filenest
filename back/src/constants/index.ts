export enum Tariff {
  Basic = "basic",
  Max = "max",
  Pro = "pro",
  ProPlus = "proPlus",
}

export const tariffSizes = {
  [Tariff.Basic]: 32212254720,
  [Tariff.Max]: 107374182400,
  [Tariff.Pro]: 1073741824000,
  [Tariff.ProPlus]: 2147483648000,
};
