export default function decorate(block) {
  const picture = block.querySelector('picture');

  if (!picture) {
    block.classList.add('no-image');
    return;
  }

  // Move picture outside of the content div for background positioning
  const firstDiv = block.querySelector(':scope > div');
  if (firstDiv && picture.closest('div') === firstDiv) {
    block.appendChild(picture);
  }

  // Wrap all content (except picture) in a content container
  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-vision-content';

  // Move all divs (but not the picture) into the content container
  const divs = Array.from(block.querySelectorAll(':scope > div'));
  divs.forEach(div => {
    contentDiv.appendChild(div);
  });

  block.appendChild(contentDiv);
}
