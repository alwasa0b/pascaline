export function isNumeric(str: string) {
  if (typeof str !== "string") return false;
  return isFinite(Number(str));
}
