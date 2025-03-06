window.onload = function () {
  setInitialContent('molecule', 'jp3');
  setInitialContent('reaction', 'wp2');
  hideBoundingBox('molecule');
  hideBoundingBox('reaction');
};

function setInitialContent(section, folder) {
  const contentMap = {
    'cp1': { imageSrc: 'static/data/CA3026592A1_reaction_sample2 1/p1/p1.png', content: 'CP1 Content.' },
    'jp3': { imageSrc: 'static/data/journal_demo/p3/p3.png', content: 'JP3 Content.' },
    'pp2': { imageSrc: 'static/data/patent_demo 1/p2/p2.png', content: 'PP2 Content.' },
    'wp2': { imageSrc: 'static/data/WO2005011681A1_removed 2/p2/p2.png', content: 'WP2 Content.' }
  };

  const sectionData = contentMap[folder];
  if (sectionData) {
    const imgElement = document.getElementById(`switcher-image-${section}`);
    imgElement.src = sectionData.imageSrc;
    imgElement.dataset.originalSrc = sectionData.imageSrc;
    document.getElementById(`markdown-content-${section}`).innerText = sectionData.content;
    updateSmallImages(section, folder);
  }
}

function updateSmallImages(section, folder) {
  const smallImages = {
    'cp1': [
      { src: 'static/data/CA3026592A1_reaction_sample2 1/p1/molecule0_zoom_image.png', bbox: [1599, 1164, 419, 339], smiles: 'SMILES', molfile: 'Molfile' },
      { src: 'static/data/CA3026592A1_reaction_sample2 1/p1/molecule1_zoom_image.png', bbox: [1315, 1559, 464, 295], smiles: 'SMILES', molfile: 'Molfile' }
    ],
    'jp3': [
      { src: 'static/data/journal_demo/p3/molecule0_zoom_image.png', bbox: [1411, 294, 410, 190], smiles: 'SMILES', molfile: 'Molfile' },
      { src: 'static/data/journal_demo/p3/molecule1_zoom_image.png', bbox: [1411, 849, 558, 198], smiles: 'SMILES', molfile: 'Molfile' }
    ],
    'pp2': [
      { src: 'static/data/patent_demo 1/p2/molecule0_zoom_image.png', bbox: [265, 805, 685, 382], smiles: 'SMILES', molfile: 'Molfile' },
      { src: 'static/data/patent_demo 1/p2/molecule1_zoom_image.png', bbox: [1168, 1206, 680, 377], smiles: 'SMILES', molfile: 'Molfile' }
    ],
    'wp2': [
      { src: 'static/data/WO2005011681A1_removed 2/p2/molecule0_zoom_image.png', bbox: [1314, 990, 433, 377], smiles: 'SMILES', molfile: 'Molfile' },
      { src: 'static/data/WO2005011681A1_removed 2/p2/molecule1_zoom_image.png', bbox: [1075, 2190, 227, 282], smiles: 'SMILES', molfile: 'Molfile' }
    ]
  };

  const container = document.getElementById(`small-images-${section}`);
  container.innerHTML = '';
  smallImages[folder].forEach((image, index) => {
    const div = document.createElement('div');
    div.className = 'image-paragraph';
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = 'Small Image';
    img.className = 'clickable-image';
    img.dataset.bbox = image.bbox.join(',');
    img.onclick = function (event) {
      showOverlay(section, event);
    };
    const caption = document.createElement('p');
    caption.className = 'markdown-caption';
    caption.innerText = 'SMILES';
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-button';
    toggleButton.innerHTML = '▶ MOL';
    toggleButton.onclick = function () {
      const details = document.getElementById(`details-${section}-${index}`);
      const isHidden = details.style.display === 'none';
      details.style.display = isHidden ? 'block' : 'none';
      toggleButton.innerHTML = isHidden ? '▼ MOL' : '▶ MOL';
    };
    const details = document.createElement('div');
    details.id = `details-${section}-${index}`;
    details.className = 'markdown-details';
    details.innerText = image.molfile;
    details.style.display = 'none';

    div.appendChild(img);
    div.appendChild(caption);
    div.appendChild(toggleButton);
    div.appendChild(details);
    container.appendChild(div);
  });
}

function changeImage(section, folder) {
  setInitialContent(section, folder);
  hideBoundingBox(section);
}

function showOverlay(section, event) {
  const img = document.getElementById(`switcher-image-${section}`);
  const imgRect = img.getBoundingClientRect();
  const imgWidth = imgRect.width;
  const imgHeight = imgRect.height;
  const bbox = event.target.dataset.bbox.split(',').map(Number);
  const originalImage = new Image();
  originalImage.src = img.dataset.originalSrc;
  originalImage.onload = function () {
    const originalImageWidth = originalImage.naturalWidth;
    const originalImageHeight = originalImage.naturalHeight;
    const scaleX = imgWidth / originalImageWidth;
    const scaleY = imgHeight / originalImageHeight;
    const scaledX = bbox[0] * scaleX;
    const scaledY = bbox[1] * scaleY;
    const scaledWidth = bbox[2] * scaleX;
    const scaledHeight = bbox[3] * scaleY;
    const overlay = document.getElementById(`overlay-${section}`);
    overlay.style.left = `${scaledX}px`;
    overlay.style.top = `${scaledY}px`;
    overlay.style.width = `${scaledWidth}px`;
    overlay.style.height = `${scaledHeight}px`;
    overlay.style.display = 'block';
  };
}

function hideBoundingBox(section) {
  document.getElementById(`overlay-${section}`).style.display = 'none';
}