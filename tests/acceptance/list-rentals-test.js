import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  click,
  currentURL,
  visit
} from '@ember/test-helpers';

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

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

  test('filters the list of rentals by city', async function(assert) {});

  test('show details for a selected rental', async function(assert) {});
});
