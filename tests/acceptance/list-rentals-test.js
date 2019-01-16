import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  click,
  currentURL,
  visit,
  fillIn,
  triggerKeyEvent
} from '@ember/test-helpers';
import { resolve } from 'rsvp';

let StubMapsService = Service.extend({
  getMapElement() {
    return resolve(document.createElement('div'));
  }
});

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:map-element', StubMapsService);
  });

  test('shows rentals as the home page', async function(assert) {
    await visit('/');
    assert.equal(
      currentURL(), 
      '/rentals', 
      'redirects automatically');
  });

  test('links to information about the compnay', async function(assert) {
    await visit('/');
    await click(".menu-about");
    assert.equal(
      currentURL(), 
      '/about', 
      'navigates to about');
  });

  test('links to contact information', async function(assert) {
    await visit('/');
    await click(".menu-contact");
    assert.equal(
      currentURL(), 
      '/contact', 
      'navigates to contact');
  });

  test('lists available rentals', async function(assert) {
    await visit('/');
    assert.equal(this.element
      .querySelectorAll('.listing')
      .length, 3, 
      'displays 3 listings');
  });

  test('filters the list of rentals by city', async function(assert) {
    await visit('/');
    await fillIn('.list-filter input', 'Seattle');
    await triggerKeyEvent('.list-filter input', 'keyup', 69);

    assert.equal(this.element.querySelectorAll('.results .listing').length, 1, 'displays 1 listing');
    assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'), 'contains 1 listing with location Seattle');
  });

  test('shows details for a selected rental', async function(assert) {
    await visit('/rentals');
    await click('.grand-old-mansion');
    assert.equal(currentURL(), '/rentals/grand-old-mansion', 'navigates to show route');
    assert.ok(this.element.querySelector('.show-listing h2').textContent.includes('Grand Old Mansion'), 'should list rental title');
    assert.ok(this.element.querySelector('.show-listing .description'), 'lists a description of the property');
  });
});
