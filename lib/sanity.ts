import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

/**
 * Sanity client configuration.
 * The projectId is taken from your Sanity project dashboard.
 * The dataset is typically 'production'.
 */
export const sanityClient = createClient({
  projectId: '5wffbxhz', // From your Sanity project
  dataset: 'production',
  apiVersion: '2024-03-11', // Use a recent date in YYYY-MM-DD format
  useCdn: true, // `false` if you want to ensure fresh data on every load
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Helper function to generate image URLs from Sanity image assets.
 * @param source The image asset data from Sanity.
 * @returns An image URL builder instance.
 */
export function urlFor(source: any) {
  return builder.image(source);
}
