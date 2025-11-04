/**
 * Anchor Navigation Block
 * Converts a simple list of links into styled navigation tabs
 * for anchor/jump links within the page
 */
export default function decorate(block) {
  // The block already contains the list structure from markdown
  // Just add the appropriate styling class
  const ul = block.querySelector('ul');
  if (ul) {
    ul.classList.add('anchor-nav-list');
  }
}
