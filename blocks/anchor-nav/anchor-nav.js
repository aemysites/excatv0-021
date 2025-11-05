/**
 * Anchor Navigation Block
 * Converts a table of links into styled navigation tabs
 * for anchor/jump links within the page
 */
export default function decorate(block) {
  // Convert the block structure (rows of single-cell divs) into a ul/li list
  const ul = document.createElement('ul');

  // Get all rows (each row has a single cell with a link)
  const rows = [...block.children];
  rows.forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const li = document.createElement('li');
      li.appendChild(link);
      ul.appendChild(li);
    }
  });

  // Replace block content with the ul
  block.textContent = '';
  block.appendChild(ul);
}
