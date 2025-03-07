document.addEventListener("DOMContentLoaded", function () {
  setInitialContent('jp3');
  hideBoundingBox();
});

function setInitialContent(folder) {
  const contentMap = {
    'jp3': { imageSrc: 'static/data/journal_demo/p3/p3.png', content: 'JP3 Content.' },
    'pp2': { imageSrc: 'static/data/patent_demo 1/p2/p2.png', content: 'PP2 Content.' },
  };

  const sectionData = contentMap[folder];
  if (sectionData) {
    const imgElement = document.getElementById("switcher-image-molecule");
    imgElement.src = sectionData.imageSrc;
    imgElement.dataset.originalSrc = sectionData.imageSrc;
    document.getElementById("markdown-content-molecule").innerText = sectionData.content;
    updateSmallImages(folder);
  }
}

function toggleMolfile(container, molfile) {
  const existingMolfile = container.querySelector('.molfile');
  if (existingMolfile) {
    existingMolfile.remove();
  } else {
    const molfileText = document.createElement('pre');
    molfileText.className = 'molfile';
    molfileText.innerText = molfile;
    container.appendChild(molfileText);
  }
}

function updateSmallImages(folder) {
  const moleculeImages = {
    'jp3': [
      { src: 'static/data/journal_demo/p3/molecule0_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule0_intermediate_input.png', bbox: [1411, 294, 410, 190], smiles: 'SMILES', molfile: 'MOLFILE' },
      { src: 'static/data/journal_demo/p3/molecule1_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule1_intermediate_input.png', bbox: [1411, 849, 558, 198], smiles: 'SMILES', molfile: 'MOLFILE' }
    ],
    'pp2': [
      { src: 'static/data/patent_demo 1/p2/molecule0_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule0_intermediate_input.png', bbox: [265, 805, 685, 382], smiles: 'SMILES', molfile: 'MOLFILE' },
      { src: 'static/data/patent_demo 1/p2/molecule1_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule1_intermediate_input.png', bbox: [1168, 1206, 680, 377], smiles: 'SMILES', molfile: 'MOLFILE' }
    ]
  };

  const container = document.getElementById("small-images-molecule");
  container.innerHTML = '';

  if (moleculeImages[folder]) {
    moleculeImages[folder].forEach(image => {
      const div = document.createElement('div');
      div.className = 'image-pair';
      
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'clickable-image-wrapper';
      imgWrapper.style.display = 'flex';
      imgWrapper.style.justifyContent = 'center';
      imgWrapper.style.gap = '10px';
      imgWrapper.onclick = () => showOverlayMolecule(image.bbox);

      const img1 = document.createElement('img');
      img1.src = image.src;
      img1.alt = 'Molecule Input';
      img1.className = 'clickable-image';
      img1.style.width = '48%';
      
      const img2 = document.createElement('img');
      img2.src = image.intermediateSrc;
      img2.alt = 'Molecule Intermediate Input';
      img2.className = 'clickable-image';
      img2.style.width = '48%';

      imgWrapper.appendChild(img1);
      imgWrapper.appendChild(img2);
      div.appendChild(imgWrapper);

      const smilesText = document.createElement('p');
      smilesText.innerText = `${image.smiles}`;
      div.appendChild(smilesText);

      const molfileButton = document.createElement('button');
      molfileButton.className = 'button is-light';
      molfileButton.innerText = 'MOLFILE';
      molfileButton.onclick = () => toggleMolfile(div, image.molfile);
      div.appendChild(molfileButton);

      container.appendChild(div);
    });
  }
}

function showOverlayMolecule(bbox) {
  const img = document.getElementById("switcher-image-molecule");
  const { width: imgWidth, height: imgHeight } = img.getBoundingClientRect();
  const originalImage = new Image();
  originalImage.src = img.dataset.originalSrc;
  originalImage.onload = () => {
    const scaleX = imgWidth / originalImage.naturalWidth;
    const scaleY = imgHeight / originalImage.naturalHeight;
    const [x, y, width, height] = bbox.map((val, i) => val * (i % 2 === 0 ? scaleX : scaleY));
    const overlay = document.getElementById("overlay-molecule");
    Object.assign(overlay.style, { left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`, display: 'block' });
  };
}

function hideBoundingBox() {
  document.getElementById("overlay-molecule").style.display = 'none';
}

function changeMoleculePage(folder) {
  setInitialContent(folder);
  hideBoundingBox();
}
