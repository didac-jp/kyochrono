import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
    loader: glob({
        base: 'src/content/works',
        pattern: ['**/*.{md,mdx}', '!**/_*/**/*.{md,mdx}', '!**/_*.{md,mdx}'],
    }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        descriptionEs: z.string().optional(),
        img: image(),
        link: z.string().url(),
        imgLink: image(),
        date: z.string(),
        tags: z.array(z.string()),
        anilist: z.union([z.string().url(), z.literal(''), z.null()]).optional(),
        series: z.string().optional(),
        videos: z.array(z.object({
            id: z.string(),
            title: z.string(),
            type: z.enum(['youtube', 'animethemes']),
        })).optional(),
        hashtag: z.string().optional(),
        hashtag_lnk: z.string().optional(),
        bso: z.object({
            ytmusic: z.array(z.string()).optional(),
        }).optional(),
    }),
});

export const collections = { works };