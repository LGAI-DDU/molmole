document.addEventListener("DOMContentLoaded", function () {
  setInitialMolecule('jp3');
  setInitialReaction('cp1');
  hideBoundingBox();
});

function hideBoundingBox() {
  const overlayMolecule = document.getElementById("overlay-molecule");
  const overlayReaction = document.getElementById("overlay-reaction");
  overlayMolecule.style.display = 'none';
  overlayReaction.style.display = 'none';
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
  const jp3smi1 = await loadSmiles('static/data/journal_demo/p3/molecule1_smiles.txt');
  const jp3smi2 = await loadSmiles('static/data/journal_demo/p3/molecule2_smiles.txt');
  const jp3smi3 = await loadSmiles('static/data/journal_demo/p3/molecule3_smiles.txt');

  const jp3mol0 = await loadMolfile('static/data/journal_demo/p3/molecule0_layout_mol.mol');
  const jp3mol1 = await loadMolfile('static/data/journal_demo/p3/molecule1_layout_mol.mol');
  const jp3mol2 = await loadMolfile('static/data/journal_demo/p3/molecule2_layout_mol.mol');
  const jp3mol3 = await loadMolfile('static/data/journal_demo/p3/molecule3_layout_mol.mol');

  const pp2smi0 = await loadSmiles('static/data/patent_demo 1/p2/molecule0_smiles.txt');
  const pp2smi1 = await loadSmiles('static/data/patent_demo 1/p2/molecule1_smiles.txt');
  const pp2smi2 = await loadSmiles('static/data/patent_demo 1/p2/molecule2_smiles.txt');
  const pp2smi3 = await loadSmiles('static/data/patent_demo 1/p2/molecule3_smiles.txt');
  const pp2smi4 = await loadSmiles('static/data/patent_demo 1/p2/molecule4_smiles.txt');
  const pp2smi5 = await loadSmiles('static/data/patent_demo 1/p2/molecule5_smiles.txt');
  const pp2smi6 = await loadSmiles('static/data/patent_demo 1/p2/molecule6_smiles.txt');
  const pp2smi7 = await loadSmiles('static/data/patent_demo 1/p2/molecule7_smiles.txt');
  const pp2smi8 = await loadSmiles('static/data/patent_demo 1/p2/molecule8_smiles.txt');
  const pp2smi9 = await loadSmiles('static/data/patent_demo 1/p2/molecule9_smiles.txt');
  const pp2smi10 = await loadSmiles('static/data/patent_demo 1/p2/molecule10_smiles.txt');

  const pp2mol0 = await loadMolfile('static/data/patent_demo 1/p2/molecule0_layout_mol.mol');
  const pp2mol1 = await loadMolfile('static/data/patent_demo 1/p2/molecule1_layout_mol.mol');
  const pp2mol2 = await loadMolfile('static/data/patent_demo 1/p2/molecule2_layout_mol.mol');
  const pp2mol3 = await loadMolfile('static/data/patent_demo 1/p2/molecule3_layout_mol.mol');
  const pp2mol4 = await loadMolfile('static/data/patent_demo 1/p2/molecule4_layout_mol.mol');
  const pp2mol5 = await loadMolfile('static/data/patent_demo 1/p2/molecule5_layout_mol.mol');
  const pp2mol6 = await loadMolfile('static/data/patent_demo 1/p2/molecule6_layout_mol.mol');
  const pp2mol7 = await loadMolfile('static/data/patent_demo 1/p2/molecule7_layout_mol.mol');
  const pp2mol8 = await loadMolfile('static/data/patent_demo 1/p2/molecule8_layout_mol.mol');
  const pp2mol9 = await loadMolfile('static/data/patent_demo 1/p2/molecule9_layout_mol.mol');
  const pp2mol10 = await loadMolfile('static/data/patent_demo 1/p2/molecule10_layout_mol.mol');

  const moleculeImages = {
    'jp3': [
      { src: 'static/data/journal_demo/p3/molecule0_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule0_intermediate_input.png', bbox: [1411, 294, 410, 190], smiles: jp3smi0, molfile: jp3mol0 },
      { src: 'static/data/journal_demo/p3/molecule1_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule1_intermediate_input.png', bbox: [1411, 849, 558, 198], smiles: jp3smi1, molfile: jp3mol1 },
      { src: 'static/data/journal_demo/p3/molecule2_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule2_intermediate_input.png', bbox: [496, 844, 498, 209], smiles: jp3smi2, molfile: jp3mol2 },
      { src: 'static/data/journal_demo/p3/molecule3_input.png', intermediateSrc: 'static/data/journal_demo/p3/molecule3_intermediate_input.png', bbox: [497, 290, 340, 195], smiles: jp3smi3, molfile: jp3mol3 }
    ],
    'pp2': [
      { src: 'static/data/patent_demo 1/p2/molecule0_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule0_intermediate_input.png', bbox: [265, 805, 685, 382], smiles: pp2smi0, molfile: pp2mol0 },
      { src: 'static/data/patent_demo 1/p2/molecule1_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule1_intermediate_input.png', bbox: [1168, 1206, 680, 377], smiles: pp2smi1, molfile: pp2mol1 },
      { src: 'static/data/patent_demo 1/p2/molecule2_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule2_intermediate_input.png', bbox: [1167, 407, 649, 379], smiles: pp2smi2, molfile: pp2mol2 },
      { src: 'static/data/patent_demo 1/p2/molecule3_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule3_intermediate_input.png', bbox: [1168, 806, 680, 378], smiles: pp2smi3, molfile: pp2mol3 },
      { src: 'static/data/patent_demo 1/p2/molecule4_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule4_intermediate_input.png', bbox: [267, 1205, 685, 382], smiles: pp2smi4, molfile: pp2mol4 },
      { src: 'static/data/patent_demo 1/p2/molecule5_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule5_intermediate_input.png', bbox: [1167, 2004, 769, 383], smiles: pp2smi5, molfile: pp2mol5 },
      { src: 'static/data/patent_demo 1/p2/molecule6_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule6_intermediate_input.png', bbox: [267, 2005, 778, 384], smiles: pp2smi6, molfile: pp2mol6 },
      { src: 'static/data/patent_demo 1/p2/molecule7_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule7_intermediate_input.png', bbox: [1179, 1606, 776, 377], smiles: pp2smi7, molfile: pp2mol7 },
      { src: 'static/data/patent_demo 1/p2/molecule8_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule8_intermediate_input.png', bbox: [265, 1604, 685, 384], smiles: pp2smi8, molfile: pp2mol8 },
      { src: 'static/data/patent_demo 1/p2/molecule9_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule9_intermediate_input.png', bbox: [1489, 2402, 683, 385], smiles: pp2smi9, molfile: pp2mol9 },
      { src: 'static/data/patent_demo 1/p2/molecule10_input.png', intermediateSrc: 'static/data/patent_demo 1/p2/molecule10_intermediate_input.png', bbox: [267, 406, 653, 379], smiles: pp2smi10, molfile: pp2mol10 }
    ]
  };

  const container = document.getElementById("small-images-molecule");
  container.innerHTML = '';
  container.style.overflowY = 'auto';
  container.style.maxHeight = '750px';

  if (moleculeImages[folder]) {
    moleculeImages[folder].forEach(image => {
      const div = document.createElement('div');
      div.className = 'image-pair';
      
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'clickable-image-wrapper';
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
      molfileButton.className = 'button is-small';
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
    const block = document.getElementById("overlay-molecule");
    block.className = 'molecule-bounding-box';
    Object.assign(block.style, { left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`, display: 'block' });
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

async function updateSmallTexts(folder) {
  const cp1smi1r1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule3_smiles.txt');
  const cp1smi1p1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule6_smiles.txt');
  const cp1smi2r1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule6_smiles.txt');
  const cp1smi2p1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule0_smiles.txt');
  const cp1smi3r1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule0_smiles.txt');
  const cp1smi3p1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule7_smiles.txt');
  const cp1smi4r1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule7_smiles.txt');
  const cp1smi4p1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule1_smiles.txt');
  const cp1smi5r1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule11_smiles.txt');
  const cp1smi5c2 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule10_smiles.txt');
  const cp1smi5p1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule8_smiles.txt');
  const cp1smi6r1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule8_smiles.txt');
  const cp1smi6p1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule9_smiles.txt');
  const cp1smi7r1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule9_smiles.txt');
  const cp1smi7p1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule5_smiles.txt');
  const cp1smi8r1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule5_smiles.txt');
  const cp1smi8p1 = await loadSmiles('static/data/CA3026592A1_reaction_sample2 1/p1/molecule2_smiles.txt');

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
          ],
          [
              { name: 'reactant', bbox: [415, 2012, 246, 150], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [691, 2030, 189, 42], class: 'txt', smiles: 'SMILES' },
              { name: 'condition', bbox: [665, 2132, 219, 119], class: 'mol', smiles: 'SMILES' },
              { name: 'product', bbox: [897, 1984, 410, 215], class: 'mol', smiles: 'SMILES' }
          ],
          [
              { name: 'reactant', bbox: [897, 1984, 410, 215], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [1294, 2044, 125, 38], class: 'txt', smiles: 'SMILES' },
              { name: 'product', bbox: [1407, 1968, 405, 214], class: 'mol', smiles: 'SMILES' }
          ],
          [
              { name: 'reactant', bbox: [1407, 1968, 405, 214], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [1764, 2021, 132, 33], class: 'txt', smiles: 'SMILES' },
              { name: 'product', bbox: [404, 2337, 518, 287], class: 'mol', smiles: 'SMILES' }
          ],
          [
              { name: 'reactant', bbox: [404, 2337, 518, 287], class: 'mol', smiles: 'SMILES' },
              { name: 'condition', bbox: [915, 2421, 55, 31], class: 'txt', smiles: 'SMILES' },
              { name: 'product', bbox: [1113, 2319, 793, 310], class: 'mol', smiles: 'SMILES' }
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
  container.style.maxHeight = '750px';

  if (reactionTexts[folder]) {
    reactionTexts[folder].forEach((reactionSet, index) => {
        const block = document.createElement('div');
        block.className = 'reaction-block';

        const title = document.createElement('p');
        title.innerText = `Reaction ${index + 1}`;
        title.className = 'reaction-title';
        block.appendChild(title);

        const table = document.createElement('table');
        table.className = 'reaction-table';

        reactionSet.forEach(item => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.innerText = item.name;
            row.appendChild(nameCell);

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