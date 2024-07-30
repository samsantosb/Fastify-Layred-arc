export function getStackTrace() {
  const { stack } = new Error();

  return stack!
    .replace(/.*[\\/]node_modules[\\/].*/gm, "")
    .replace(/\n+/g, "\n");
}
