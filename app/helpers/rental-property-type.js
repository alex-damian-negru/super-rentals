import { helper } from '@ember/component/helper';

const communityPropertyTypers = [
  'Condo',
  'Townhouse',
  'Apartment'
];

export function rentalPropertyType([propertyType]) {
  if (communityPropertyTypers.includes(propertyType)) {
    return 'Community';
  }

  return 'Standalone';
}

export default helper(rentalPropertyType);
