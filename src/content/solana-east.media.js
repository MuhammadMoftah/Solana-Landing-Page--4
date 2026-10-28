/**
 * Solana East — image registry.
 *
 * Every project image used by the site is imported here once, with its alt
 * text, caption and gallery category. Components import from this module
 * instead of importing image files directly.
 *
 * All images are architectural visualizations supplied with the project.
 * `rightsStatus` mirrors `assetManifest.itemSchema` in solana-east.content.js.
 * `position` (optional) is a CSS object-position used when cropping, e.g. to
 * keep labels baked into a render ("Building A") out of gallery tiles.
 */
import aerialMasterplan from '../assets/imgs/solana-by-ora-web-2.jpg';
import buildingA from '../assets/imgs/Building A.jpg';
import buildingA2 from '../assets/imgs/Building A 2.jpg';
import buildingA3 from '../assets/imgs/Building A 3.jpg';
import buildingA4 from '../assets/imgs/Building A 4.jpg';
import buildingA5 from '../assets/imgs/Building A 5.jpg';
import buildingA6 from '../assets/imgs/Building A 6.jpg';
import buildingA7 from '../assets/imgs/Building A 7.jpg';
import bathroom from '../assets/imgs/views/BATHROOM.jpg';
import bedroom from '../assets/imgs/views/bedroom 1.jpg';
import closeView from '../assets/imgs/views/CLOSE-VIEW.jpg';
import diningRoom from '../assets/imgs/views/DINNING-ROOM.jpg';
import gardenView from '../assets/imgs/views/GARDEN-VIEW.jpg';
import gardenView1 from '../assets/imgs/views/GARDEN_VIEW_1.jpg';
import gardenView2 from '../assets/imgs/views/GARDEN_VIEW_2.jpg';
import livingRoom from '../assets/imgs/views/HOUSE_LIVING-ROOM.jpg';
import livingKitchen from '../assets/imgs/views/LIVING-KITCHEN.jpg';
import streetView from '../assets/imgs/views/STREET_VIEW.jpg';
import villaPool1 from '../assets/imgs/views/villa_pool_1.jpg';
import villaPool2 from '../assets/imgs/views/villa_pool_2.jpg';
import villaPool3 from '../assets/imgs/views/villa_pool_3.jpg';
import villaPool4 from '../assets/imgs/views/villa_pool_4.jpg';
import oraLogo from '../assets/grey-logo.png';

const media = {
  aerialMasterplan: {
    src: aerialMasterplan,
    alt: 'Aerial rendering of low-rise homes set among landscaped gardens, trees and an open-air amphitheatre',
    caption: 'Landscape-led community spaces',
    category: 'exteriors',
  },
  buildingA: {
    src: buildingA,
    alt: 'Street-side rendering of a three-storey apartment building with white frames and bronze panels',
    caption: 'Apartment building — street elevation',
    category: 'exteriors',
    position: '100% 50%',
  },
  buildingA2: {
    src: buildingA2,
    alt: 'Residents on upper-floor balconies overlooking a landscaped courtyard with play areas',
    caption: 'Courtyard views from the balconies',
    category: 'exteriors',
  },
  buildingA3: {
    src: buildingA3,
    alt: 'Mid-rise apartment buildings with wide balconies around a park with walking paths',
    caption: 'Apartments around shared green space',
    category: 'exteriors',
  },
  buildingA4: {
    src: buildingA4,
    alt: 'Low-rise residential building with timber-look cladding and planted balconies on a quiet street',
    caption: 'Walkable residential streets',
    category: 'exteriors',
  },
  buildingA5: {
    src: buildingA5,
    alt: 'Paved promenade lined with ornamental grasses and trees between apartment buildings at golden hour',
    caption: 'Green corridors between neighbourhoods',
    category: 'exteriors',
  },
  buildingA6: {
    src: buildingA6,
    alt: 'Dusk rendering of a stepped four-storey apartment building with warm interior lighting',
    caption: 'Apartment building at dusk',
    category: 'exteriors',
    position: '100% 50%',
  },
  buildingA7: {
    src: buildingA7,
    alt: 'Apartment buildings framed by mature trees and a wide lawn',
    caption: 'Apartment buildings set in mature landscape',
    category: 'exteriors',
    position: '100% 50%',
  },
  bathroom: {
    src: bathroom,
    alt: 'Travertine bathroom with a walk-in shower, double vanity and freestanding bathtub',
    caption: 'Bathroom interior',
    category: 'interiors',
  },
  bedroom: {
    src: bedroom,
    alt: 'Master bedroom with a textured feature wall, upholstered bed and floor-to-ceiling window',
    caption: 'Bedroom interior',
    category: 'interiors',
  },
  closeView: {
    src: closeView,
    alt: 'Two-storey white villa with glass balustrades and outdoor lounge beside a large pool',
    caption: 'Villa terrace and pool',
    category: 'exteriors',
  },
  diningRoom: {
    src: diningRoom,
    alt: 'Dining room opening onto a glazed courtyard planted with trees',
    caption: 'Dining room and courtyard',
    category: 'interiors',
  },
  gardenView: {
    src: gardenView,
    alt: 'Single-storey villa with travertine walls, a pool and a lawn planted with desert species',
    caption: 'Single-storey villa garden',
    category: 'exteriors',
  },
  gardenView1: {
    src: gardenView1,
    alt: 'Two-storey cubic villa with a pool, outdoor seating and palm trees',
    caption: 'Villa garden and pool',
    category: 'exteriors',
  },
  gardenView2: {
    src: gardenView2,
    alt: 'Row of townhouses with deep white frames and glass balconies facing a natural meadow garden',
    caption: 'Townhouses facing the garden',
    category: 'exteriors',
  },
  livingRoom: {
    src: livingRoom,
    alt: 'Living room with an L-shaped sofa beside a glass-enclosed indoor olive-tree courtyard',
    caption: 'Living room with indoor courtyard',
    category: 'interiors',
  },
  livingKitchen: {
    src: livingKitchen,
    alt: 'Open-plan living and dining space with brass pendants and sliding doors to a pool terrace',
    caption: 'Open-plan living and dining',
    category: 'interiors',
  },
  streetView: {
    src: streetView,
    alt: 'Townhouse row with white frame volumes and timber cladding along a cobbled street',
    caption: 'Townhouse street view',
    category: 'exteriors',
  },
  villaPool1: {
    src: villaPool1,
    alt: 'Two-storey villa with cantilevered white volumes, an olive tree and a pool surrounded by palms',
    caption: 'Villa with pool',
    category: 'exteriors',
  },
  villaPool2: {
    src: villaPool2,
    alt: 'Symmetrical two-storey villa with a continuous glass balcony overlooking a pool',
    caption: 'Villa facade and pool',
    category: 'exteriors',
  },
  villaPool3: {
    src: villaPool3,
    alt: 'Open-air internal courtyard with trees in gravel beds and a narrow water channel',
    caption: 'Internal garden courtyard',
    category: 'interiors',
  },
  villaPool4: {
    src: villaPool4,
    alt: 'Single-storey courtyard villa with a long white roof and an infinity pool',
    caption: 'Courtyard villa and infinity pool',
    category: 'exteriors',
  },
  oraLogo: {
    src: oraLogo,
    alt: 'ORA Developers',
    caption: 'ORA Developers logo',
    category: 'brand',
  },
};

export const galleryCategories = [
  { id: 'exteriors', label: 'Exteriors' },
  { id: 'interiors', label: 'Interiors' },
];

/**
 * Curated gallery order (featured image + thumbnails). Images used as large
 * section visuals are left out; circle thumbnails in the masterplan may repeat.
 */
export const galleryOrder = [
  'closeView',
  'livingKitchen',
  'gardenView',
  'bedroom',
  'villaPool3',
  'diningRoom',
  'gardenView1',
  'bathroom',
  'buildingA7',
  'buildingA6',
  'buildingA',
  'buildingA5',
];

export const rightsStatus = 'verify-before-use';

export default media;
