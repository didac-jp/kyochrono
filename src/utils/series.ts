import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const SERIES_HUES: Record<string, number> = {
    'Kobayashi-san Chi no Maid Dragon':  15,
    'Kyoukai no Kanata':                 45,
    'Tsurune':                           75,
    'Full Metal Panic!':                105,
    'Clannad':                          135,
    'Hibike! Euphonium':                165,
    'Free!':                            195,
    'Violet Evergarden':                225,
    'K-On!':                            255,
    'Chuunibyou demo Koi ga Shitai!':   285,
    'Tamako Market':                    315,
    'Suzumiya Haruhi':                  345,
};

function hashSeries(series: string): number {
    let h = 0;
    for (let i = 0; i < series.length; i++) {
        h = (Math.imul(31, h) + series.charCodeAt(i)) >>> 0;
    }
    return h;
}

export function seriesHue(series: string): number {
    return SERIES_HUES[series] ?? hashSeries(series) % 360;
}

type WorkEntry = CollectionEntry<'works'>;

export function groupWorksBySeries(works: WorkEntry[]): Map<string, WorkEntry[]> {
    const map = new Map<string, WorkEntry[]>();
    for (const work of works) {
        const key = work.data.series ?? '_standalone';
        const list = map.get(key);
        if (list) list.push(work);
        else map.set(key, [work]);
    }
    return map;
}

export async function getWorksBySeries(): Promise<Map<string, WorkEntry[]>> {
    const allWorks = await getCollection('works');
    return groupWorksBySeries(allWorks);
}
