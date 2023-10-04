export default function uid(): string {
  return Math.random().toString(16).slice(2);
}
