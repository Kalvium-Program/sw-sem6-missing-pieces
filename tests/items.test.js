const test = require('node:test');
const assert = require('node:assert');
const { addItem, markFound } = require('../src/items');

test('adds an item with name and place', () => {
  const item = addItem({ name: 'Blue water bottle', place: 'Library' });
  assert.strictEqual(item.found, false);
});

test('rejects an item without a place', () => {
  assert.throws(() => addItem({ name: 'Umbrella' }));
});

test('marks an item as found', () => {
  const item = addItem({ name: 'ID card', place: 'Canteen' });
  assert.strictEqual(markFound(item.id).found, true);
});
