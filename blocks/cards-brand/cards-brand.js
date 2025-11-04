import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Classify divs as card-image or card-body
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-brand-card-image';
      else div.className = 'cards-brand-card-body';
    });

    // For multi-column layouts with h4 headings, restructure:
    // Extract h4 headings as full-width bars, then create columns for content
    const cardBodies = li.querySelectorAll('.cards-brand-card-body');
    if (cardBodies.length > 1) {
      // Collect all h4 headings
      const headings = [];
      cardBodies.forEach((cardBody) => {
        const h4 = cardBody.querySelector('h4');
        if (h4) {
          headings.push(h4.textContent);
          h4.remove();
        }
      });

      // Create full-width heading bar
      const headingBar = document.createElement('div');
      headingBar.className = 'cards-brand-heading-bar';
      headings.forEach((text) => {
        const h4 = document.createElement('h4');
        h4.textContent = text;
        headingBar.appendChild(h4);
      });

      // Create a wrapper for the content columns
      const columnsWrapper = document.createElement('div');
      columnsWrapper.className = 'cards-brand-columns';

      cardBodies.forEach((cardBody) => {
        // Create a column div for the content
        const column = document.createElement('div');
        column.className = 'cards-brand-column';

        // Move all content from cardBody to column
        while (cardBody.firstChild) {
          column.appendChild(cardBody.firstChild);
        }

        columnsWrapper.appendChild(column);
      });

      // Clear li and add heading bar + columns wrapper
      li.innerHTML = '';
      li.appendChild(headingBar);
      li.appendChild(columnsWrapper);
    }

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
