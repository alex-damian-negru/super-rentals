import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { resolve } from 'rsvp';

const DUMMY_ELEMENT = {};

module('Unit | Service | map-element', function(hooks) {
  setupTest(hooks);

  test('creates a new map if one isn\'t cached for location', async function(assert) {
    assert.expect(5);

    let stubMapService = {
      createMap(element, coords) {
        assert.ok(element, 'createMap called with element');
        assert.deepEqual(coords, [0, 0], 'createMap given coordinates');
        return DUMMY_ELEMENT;
      }
    }
    
    let stubGeocodeService = {
      fetchCoordinates(location) {
        assert.equal(location, 'San Francisco', 'fetchCoordinates called with location');
        return resolve([0, 0]);
      }
    }

    let mapService = this.owner.factoryFor('service:map-element').create({ map: stubMapService, geocode: stubGeocodeService });
    let element = await mapService.getMapElement('San Francisco');
    
    assert.deepEqual(element, DUMMY_ELEMENT, 'element fetched from cache');
  });  
});
