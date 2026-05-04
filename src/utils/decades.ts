import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { dateSortKey } from './date';

export type WorkEntry = CollectionEntry<'works'>;

export function getDecadeKey(dateStr: string): string {
    const match = dateStr.match(/\d{4}/);
    if (!match) return 'unknown';
    const year = parseInt(match[0]);
    const decadeStart = Math.floor(year / 10) * 10;
    return `${decadeStart}s`;
}

export function groupWorksByDecade(works: WorkEntry[]): Map<string, WorkEntry[]> {
    const decadesMap = new Map<string, WorkEntry[]>();
    works.forEach(work => {
        const key = getDecadeKey(work.data.date);
        if (!decadesMap.has(key)) decadesMap.set(key, []);
        decadesMap.get(key)!.push(work);
    });
    for (const list of decadesMap.values()) {
        list.sort((a, b) => dateSortKey(a.data.date) - dateSortKey(b.data.date));
    }
    return decadesMap;
}

export async function getWorksByDecade(): Promise<Map<string, WorkEntry[]>> {
    const allWorks = await getCollection('works');
    return groupWorksByDecade(allWorks);
}
