document.addEventListener("DOMContentLoaded", function () {
  setInitialMolecule('jp3');
  setInitialReaction('cp1');
  hideBoundingBox();
});

function hideBoundingBox() {
  document.getElementById("overlay-molecule").style.display = 'none';
  document.getElementById("overlay-reaction").style.display = 'none';
}

function setInitialMolecule(folder) {
  const contentMap = {
    'jp3': { imageSrc: 'static/data/journal_demo/p3/p3.png'},
    'pp2': { imageSrc: 'static/data/patent_demo 1/p2/p2.png'},
  };

  const sectionData = contentMap[folder];
  if (sectionData) {
    const imgElement = document.getElementById("switcher-image-molecule");
    imgElement.src = sectionData.imageSrc;
    imgElement.dataset.originalSrc = sectionData.imageSrc;
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
    molfileText.textContent = molfile;
    molfileText.style.whiteSpace = 'pre';
    molfileText.style.overflowX = 'auto';
    molfileText.style.maxWidth = '100%';
    container.appendChild(molfileText);
  }
}

async function loadSmiles(filePath) {
  const response = await fetch(filePath);
  const smiles = await response.text();
  return smiles;
}

async function loadMolfile(filePath) {
  const response = await fetch(filePath);
  const molfile = await response.text();
  return molfile;
}

async function updateSmallImages(folder) {
  const jp3smi0 = await loadSmiles('static/data/journal_demo/p3/molecule0_smiles.txt');
  const jp3mol0 = await loadMolfile('static/data/journal_demo/p3/molecule0_layout_mol.mol');
  const moleculeImages = {
    'jp3': [
      { src: 'static/data/journal_demo/p3/molecule0_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule0_intermediate_input.png', bbox: [1411, 294, 410, 190], smiles: jp3smi0, molfile: jp3mol0 },
      { src: 'static/data/journal_demo/p3/molecule1_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule1_intermediate_input.png', bbox: [1411, 849, 558, 198], smiles: 'SMILES', molfile: 'MOLFILE' },
      { src: 'static/data/journal_demo/p3/molecule2_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule2_intermediate_input.png', bbox: [496, 844, 498, 209], smiles: 'SMILES', molfile: 'MOLFILE' },
      { src: 'static/data/journal_demo/p3/molecule3_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule3_intermediate_input.png', bbox: [497, 290, 340, 195], smiles: 'SMILES', molfile: 'MOLFILE' }
    ],
    'pp2': [
      { src: 'static/data/patent_demo 1/p2/molecule0_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule0_intermediate_input.png', bbox: [265, 805, 685, 382], smiles: 'SMILES', molfile: 'MOLFILE' },
      { src: 'static/data/patent_demo 1/p2/molecule1_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule1_intermediate_input.png', bbox: [1168, 1206, 680, 377], smiles: 'SMILES', molfile: 'MOLFILE' }
    ]
  };

  const container = document.getElementById("small-images-molecule");
  container.innerHTML = '';
  container.style.overflowY = 'auto';
  container.style.maxHeight = '800px';

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
      
      const img2 = document.createElement('img');
      img2.src = image.intermediateSrc;
      img2.alt = 'Molecule Intermediate Input';
      img2.className = 'clickable-image';

      imgWrapper.appendChild(img1);
      imgWrapper.appendChild(img2);
      div.appendChild(imgWrapper);

      const smilesText = document.createElement('p');
      smilesText.innerText = `${image.smiles}`;
      div.appendChild(smilesText);

      const molfileButton = document.createElement('button');
      molfileButton.className = 'button';
      molfileButton.innerText = 'MOL';
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

function changeMoleculePage(folder) {
  setInitialMolecule(folder);
  hideBoundingBox();
}

function setInitialReaction(folder) {
  const contentMap = {
    'cp1': { imageSrc: 'static/data/CA3026592A1_reaction_sample2 1/p1/p1.png'},
    'wp2': { imageSrc: 'static/data/WO2005011681A1_removed 2/p2/p2.png'},
  };

  const sectionData = contentMap[folder];
  if (sectionData) {
    const imgElement = document.getElementById("switcher-image-reaction");
    imgElement.src = sectionData.imageSrc;
    imgElement.dataset.originalSrc = sectionData.imageSrc;
    updateSmallTexts(folder);
  }
}

function updateSmallTexts(folder) {
  const reactionTexts = {
      'cp1': [
          [
              { name: 'reactant', bbox: [433, 1181, 276, 254], class: 'mol', smiles: 'COC1=CC(OC)=C(Cl)C(N)=C1Cl' },
              { name: 'condition', bbox: [724, 1291, 266, 40], class: 'txt', smiles: 'SMILES' },
              { name: 'product', bbox: [999, 1193, 254, 254], class: 'mol', smiles: 'COC1=CC(OC)=C(Cl)C(I)=C1Cl' }
          ],
          [
              { name: 'reactant', bbox: [999, 1193, 254, 254], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [1311, 1168, 210, 152], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [1308, 1402, 261, 98], class: 'txt', smiles: 'SMILES'  },
              { name: 'product', bbox: [1599, 1163, 393, 301], class: 'mol', smiles: 'SMILES' }
          ],
          [
              { name: 'reactant', bbox: [1599, 1163, 393, 301], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [426, 1711, 260, 40], class: 'txt', smiles: 'SMILES' },
              { name: 'product', bbox: [670, 1553, 368, 280], class: 'mol', smiles: 'SMILES' }
          ],
          [
              { name: 'reactant', bbox: [670, 1553, 368, 280], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [1085, 1682, 163, 33], class: 'txt', smiles: 'SMILES' },
              { name: 'product', bbox: [1315, 1558, 441, 280], class: 'mol', smiles: 'SMILES' }
          ]
      ],
      'wp2': [
          [
              { name: 'reactant', bbox: [584, 663, 267, 182], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [941, 673, 122, 122], class: 'txt', smiles: 'SMILES' },
              { name: 'product', bbox: [1185, 619, 264, 236], class: 'mol', smiles: 'SMILES' }
          ],
          [
              { name: 'reactant', bbox: [1185, 619, 264, 236], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [1472, 670, 231, 42], class: 'txt', smiles: 'SMILES' },
              { name: 'condition', bbox: [1495, 758, 183, 82], class: 'mol', smiles: 'SMILES' },
              { name: 'product', bbox: [1751, 612, 293, 238], class: 'mol', smiles: 'SMILES' }
          ]
      ]
  };

  const container = document.getElementById('small-texts-reaction');
  container.innerHTML = '';
  container.style.overflowY = 'auto';
  container.style.maxHeight = '800px';

  if (reactionTexts[folder]) {
    reactionTexts[folder].forEach((reactionSet, index) => {
        const block = document.createElement('div');
        block.className = 'reaction-block';

        const title = document.createElement('p');
        title.innerText = `Reaction ${index + 1}`;
        title.style.fontWeight = 'bold';
        title.style.fontSize = '1.2em';
        title.className = 'reaction-title';
        block.appendChild(title);

        const table = document.createElement('table');
        table.className = 'reaction-table';

        reactionSet.forEach(item => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.innerText = item.name;
            row.appendChild(nameCell);

            const indexCell = document.createElement('td');
            indexCell.innerText = index + 1;
            row.appendChild(indexCell);

            const classCell = document.createElement('td');
            classCell.innerText = item.class;
            classCell.className = 'reaction-class';
            row.appendChild(classCell);

            const smilesCell = document.createElement('td');
            smilesCell.innerText = item.smiles;
            smilesCell.className = 'reaction-smiles';
            row.appendChild(smilesCell);

            table.appendChild(row);
        });

        block.appendChild(table);
        block.onclick = () => showReactionOverlay(reactionSet);
        container.appendChild(block);
    });
  }
}

function showReactionOverlay(reactionSet) {
  const img = document.getElementById('switcher-image-reaction');
  const { width: imgWidth, height: imgHeight } = img.getBoundingClientRect();
  const originalImage = new Image();
  originalImage.src = img.dataset.originalSrc;

  originalImage.onload = () => {
    const scaleX = imgWidth / originalImage.naturalWidth;
    const scaleY = imgHeight / originalImage.naturalHeight;
    const overlayContainer = document.getElementById("overlay-reaction");
    overlayContainer.innerHTML = '';
    reactionSet.forEach(item => {
      const [x, y, width, height] = item.bbox.map((val, i) => val * (i % 2 === 0 ? scaleX : scaleY));
      const overlay = document.createElement('div');
      overlay.className = 'reaction-bounding-box';
      overlay.setAttribute('data-type', item.name);
      Object.assign(overlay.style, { left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`, display: 'block' });
      overlayContainer.appendChild(overlay);
    });
    overlayContainer.style.display = 'block';
  };
}

function changeReactionPage(folder) {
  setInitialReaction(folder);
  hideBoundingBox();
}