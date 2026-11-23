const items = [];

function addItem({ name, place, contact }) {
  if (!name || !place) {
    throw new Error('name and place are required');
  }
  const item = { id: items.length + 1, name, place, contact: contact || '', found: false };
  items.push(item);
  return item;
}

function listItems() {
  return items;
}

function markFound(id) {
  const item = items.find((i) => i.id === Number(id));
  if (!item) return null;
  item.found = true;
  return item;
}

module.exports = { addItem, listItems, markFound };
