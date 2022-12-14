export function updateArrayOrder<T = any>(arraySource: T[], fromIndex: number, toIndex: number): T[] {

  function clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }

  const array = [...arraySource];
  const from = clamp(fromIndex, array.length - 1);
  const to = clamp(toIndex, array.length - 1);

  if (from === to) {
    return [];
  }

  const target = array[from];
  const delta = to < from ? -1 : 1;

  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }

  array[to] = target;
  return array.map((item, i: number) => {
    return {
      ...item,
      order: i,
    };
  });
}
