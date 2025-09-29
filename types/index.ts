// A simplified type definition for a Sanity image asset.
// This helps with type-checking in our components.
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Type definition for the 'Team Member' content type we expect from Sanity.
export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: SanityImage;
  wide?: boolean; // Optional flag for a wider layout card
}
