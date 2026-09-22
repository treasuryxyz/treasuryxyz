const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const plain = new Intl.NumberFormat("en-US");

export function formatUsd(value: number) {
  return usd.format(value);
}

export function formatCompactUsd(value: number) {
  return compactUsd.format(value);
}

export function formatCount(value: number) {
  return plain.format(value);
}

/**
 * Native-asset amounts. Unit prices need their own precision — running them
 * through a balance formatter rounds small asks down to nothing.
 */
export function formatNative(value: number) {
  const digits = value >= 100 ? 1 : value >= 1 ? 2 : 4;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
