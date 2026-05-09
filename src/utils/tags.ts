import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { tagToSlug } from './routes';

export type WorkEntry = CollectionEntry<'works'>;
export const CATALOG_TAG_SLUG_PREFIX = 'catalog/tag/';

export function catalogTagCatchallSlug(tagSlug: string): string {
	return `${CATALOG_TAG_SLUG_PREFIX}${tagSlug}`;
}

export async function getTagCatalogEntries(): Promise<
	Array<{ tagSlug: string; tagLabel: string; works: WorkEntry[] }>
> {
	const all = await getCollection('works');
	const tagMap = new Map<string, { label: string; works: WorkEntry[] }>();

	for (const work of all) {
		for (const tag of work.data.tags) {
			const slug = tagToSlug(tag);
			if (!slug) continue;
			if (!tagMap.has(slug)) {
				tagMap.set(slug, { label: tag, works: [] });
			}
			const entry = tagMap.get(slug)!;
			if (!entry.works.some((w) => w.id === work.id)) {
				entry.works.push(work);
			}
		}
	}

	return [...tagMap.entries()].map(([tagSlug, { label, works }]) => ({
		tagSlug,
		tagLabel: label,
		works,
	}));
}
