import { delay } from '../../../shared/utils/delay';

export async function saveOptimisticItem(label: string) {
  await delay(400);
  return { id: crypto.randomUUID(), label };
}
