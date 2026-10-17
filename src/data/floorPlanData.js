// image: null shows a placeholder. Real plan images will be added later,
// uploaded by the client through the admin area.
export const floorPlanGroups = [
  {
    id: 'apartments',
    title: 'Apartments (Blocks A, B, C)',
    plans: [
      { name: 'BLOCK-A-2BHK', facing: null, bedrooms: 2, bathrooms: 2, balconies: 2, image: null },
      { name: 'BLOCK-A-3BHK', facing: null, bedrooms: 3, bathrooms: 3, balconies: 3, image: null },
      { name: 'BLOCK-B-2BHK', facing: null, bedrooms: 2, bathrooms: 2, balconies: 2, image: null },
      { name: 'BLOCK-B-3BHK', facing: null, bedrooms: 3, bathrooms: 3, balconies: 3, image: null },
      { name: 'BLOCK-C-2BHK', facing: null, bedrooms: 2, bathrooms: 2, balconies: 2, image: null },
      { name: 'BLOCK-C-3BHK', facing: null, bedrooms: 3, bathrooms: 3, balconies: 3, image: null },
    ],
  },
  {
    id: 'sky-villas',
    title: 'Sky Villas (Triplex)',
    plans: [
      { name: 'SKY-VILLA-E1', facing: 'EAST', bedrooms: 4, bathrooms: 5, balconies: 4, image: null },
      { name: 'SKY-VILLA-E2', facing: 'EAST', bedrooms: 4, bathrooms: 5, balconies: 4, image: null },
      { name: 'SKY-VILLA-W1', facing: 'WEST', bedrooms: 4, bathrooms: 5, balconies: 4, image: null },
      { name: 'SKY-VILLA-W2', facing: 'WEST', bedrooms: 4, bathrooms: 5, balconies: 4, image: null },
    ],
  },
  {
    id: 'garden-villas',
    title: 'Garden Villas (Duplex)',
    plans: [
      { name: 'GARDEN-VILLA-E', facing: 'EAST', bedrooms: 3, bathrooms: 4, balconies: 3, image: null },
      { name: 'GARDEN-VILLA-W', facing: 'WEST', bedrooms: 3, bathrooms: 4, balconies: 3, image: null },
    ],
  },
  {
    id: 'corner-villas',
    title: 'Corner Villas',
    plans: [
      { name: 'CORNER-VILLA-E', facing: 'EAST', bedrooms: 3, bathrooms: 4, balconies: 3, image: null },
      { name: 'CORNER-VILLA-W', facing: 'WEST', bedrooms: 3, bathrooms: 4, balconies: 3, image: null },
    ],
  },
]