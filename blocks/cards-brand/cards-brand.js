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

    // For multi-column layouts with h4 headings, restructure to dl/dt/dd:
    // Create separate dl elements for each column (matching original site structure)
    const cardBodies = li.querySelectorAll('.cards-brand-card-body');
    if (cardBodies.length > 1) {
      // Clear li and create dl elements for each column
      li.innerHTML = '';

      cardBodies.forEach((cardBody) => {
        // Create a dl element for this column
        const dl = document.createElement('dl');
        dl.className = 'cards-brand-dl';

        // Extract h4 as dt
        const h4 = cardBody.querySelector('h4');
        if (h4) {
          const dt = document.createElement('dt');
          dt.textContent = h4.textContent;
          dl.appendChild(dt);
        }

        // Create dd for content
        const dd = document.createElement('dd');

        // Move all remaining content (after removing h4) to dd
        [...cardBody.children].forEach((child) => {
          if (child.tagName !== 'H4') {
            dd.appendChild(child.cloneNode(true));
          }
        });

        dl.appendChild(dd);
        li.appendChild(dl);
      });
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
