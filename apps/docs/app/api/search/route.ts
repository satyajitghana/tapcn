import { source } from '@/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

export const { GET } = createFromSource(source);
