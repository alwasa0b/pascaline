export function isNumeric(str: string) {
  debugger;
  if (typeof str !== "string") return false;
  return isFinite(Number(str));
}
