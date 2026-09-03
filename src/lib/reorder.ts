import { supabase } from '@/lib/supabase';

interface Sortable {
  id: string;
  sort_order: number;
}

/**
 * Moves the item at `index` up or down by swapping its sort_order with its
 * neighbor, both locally (for instant UI feedback) and in Supabase.
 * Returns the reordered array, or the original array unchanged if the move
 * is out of bounds (e.g. pressing up on the first item).
 */
export async function reorderItem<T extends Sortable>(
  table: 'cars' | 'rigs' | 'parts' | 'project_cars',
  items: T[],
  index: number,
  direction: -1 | 1
): Promise<T[]> {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= items.length) return items;

  const current = items[index];
  const target = items[targetIndex];

  const next = [...items];
  next[index] = { ...target, sort_order: current.sort_order };
  next[targetIndex] = { ...current, sort_order: target.sort_order };
  next.sort((a, b) => a.sort_order - b.sort_order);

  await Promise.all([
    supabase.from(table).update({ sort_order: target.sort_order }).eq('id', current.id),
    supabase.from(table).update({ sort_order: current.sort_order }).eq('id', target.id),
  ]);

  return next;
}
