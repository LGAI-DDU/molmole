document.addEventListener("DOMContentLoaded", function () {
  setMolecules('journal_demo/p3');
  setReactions('CA3026592A1_reaction_sample2 1/p1');
  hideMolecules();
  hideReactions();
});

async function loadTxts(path) {
  const response = await fetch(path);
  const text = await response.text();
  return text;
}

async function loadMoleculeJsons(folder) {
  const molecules = [];
  let index = 0;
  while (true) {
    try {
      const response = await fetch(`static/data/${folder}/molecule${index}.json`);
      if (!response.ok) break;
      const data = await response.json();
      molecules.push(data);
    } catch (error) {
      console.warn(`Failed to load molecule${index}.json: ${error.message}`);
    }
    index++;
  }
  return molecules;
}

function setMolecules(folder) {
  const page = document.getElementById("switcher-image-molecule");
  const key = folder.split('/')[1];
  page.src = `static/data/${folder}/${key}.png`;
  page.dataset.originalSrc = `static/data/${folder}/${key}.png`;
  updateMolecules(folder);
  overlayMolecules(folder);
}

async function loadMolecules(folder) {
  const data = await loadMoleculeJsons(folder);
  const molecules = data.map((item, idx) => ({
    input: `static/data/${folder}/molecule${idx}_input.png`,
    output: `static/data/${folder}/molecule${idx}_intermediate_input.png`,
    smiles: item.smiles,
    molfile: item.layout_preserving_mol,
    bbox: item.bbox
  }));
  return molecules;
}

async function updateMolecules(folder) {
  const molecules = await loadMolecules(folder);
  const container = document.getElementById("images-molecule");
  container.innerHTML = '';
  container.style.overflowY = 'auto';
  container.style.maxHeight = '600px';
  molecules.forEach(image => {
    const div = document.createElement('div');
    div.className = 'image-pair';

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'clickable-image-wrapper';
    imgWrapper.onclick = () => highlightMolecules(image.bbox);

    const img1 = document.createElement('img');
    img1.src = image.input;
    img1.alt = 'Molecule Input';
    img1.className = 'clickable-image';

    const img2 = document.createElement('img');
    img2.src = image.output;
    img2.alt = 'Molecule Intermediate Input';
    img2.className = 'clickable-image';

    imgWrapper.appendChild(img1);
    imgWrapper.appendChild(img2);
    div.appendChild(imgWrapper);

    const smilesText = document.createElement('p');
    smilesText.className = 'molecule-text';
    smilesText.innerText = image.smiles;
    div.appendChild(smilesText);

    const molfileButton = document.createElement('button');
    molfileButton.className = 'button is-small';
    molfileButton.innerText = 'MOL';
    molfileButton.onclick = () => toggleMolfile(div, image.molfile);
    div.appendChild(molfileButton);

    container.appendChild(div);
  });
}

async function overlayMolecules(folder) {
  const molecules = await loadMolecules(folder);
  const img = document.getElementById("switcher-image-molecule");
  const { width: imgWidth, height: imgHeight } = img.getBoundingClientRect();
  const originalImage = new Image();
  originalImage.src = img.dataset.originalSrc;
  originalImage.onload = () => {
    const scaleX = imgWidth / originalImage.naturalWidth;
    const scaleY = imgHeight / originalImage.naturalHeight;
    const overlayContainer = document.getElementById("overlay-molecule");
    overlayContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const ctx = canvas.getContext('2d');
    molecules.forEach(item => {
      const [x, y, width, height] = item.bbox.map((val, i) => val * (i % 2 === 0 ? scaleX : scaleY));
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
    });
    overlayContainer.appendChild(canvas);
    overlayContainer.style.display = 'block';
  }
}

function highlightMolecules(bbox) {
  const img = document.getElementById("switcher-image-molecule");
  const { width: imgWidth, height: imgHeight } = img.getBoundingClientRect();
  const originalImage = new Image();
  originalImage.src = img.dataset.originalSrc;
  originalImage.onload = () => {
    const scaleX = imgWidth / originalImage.naturalWidth;
    const scaleY = imgHeight / originalImage.naturalHeight;
    const [x, y, width, height] = bbox.map((val, i) => val * (i % 2 === 0 ? scaleX : scaleY));
    const block = document.getElementById("highlight-molecule");
    block.className = 'molecule-bounding-box';
    Object.assign(block.style, {
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
      display: 'block'
    });
  };
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

function hideMolecules() {
  document.getElementById("overlay-molecule").style.display = 'none';
  document.getElementById("highlight-molecule").style.display = 'none';
}

function changeMoleculePage(folder) {
  setMolecules(folder);
  hideMolecules();
}

async function loadReactionJsons(folder) {
  const reactions = [];
  let index = 0;
  while (true) {
    try {
      const response = await fetch(`static/data/${folder}/reaction${index}.json`);
      if (!response.ok) break;
      const data = await response.json();
      reactions.push(data);
    } catch (error) {
      console.warn(`Failed to load reaction${index}.json: ${error.message}`);
    }
    index++;
  }
  return reactions;
}

function setReactions(folder) {
  const page = document.getElementById("switcher-image-reaction");
  const key = folder.split('/')[1];
  page.src = `static/data/${folder}/${key}.png`;
  page.dataset.originalSrc = `static/data/${folder}/${key}.png`;
  overlayReactions(folder);
  updateReactions(folder);
}

async function loadReaction(folder) {
  const data = await loadReactionJsons(folder);
  const reactions = await Promise.all(data.map(async (reaction) => {
    const reactants = await Promise.all(reaction.reactants.map(async (item) => ({
      name: "Reactant",
      category: item.category,
      smiles: await loadTxts(`/static/data/${folder}/molecule${item.matching_idx[1]}_smiles.txt`),
      bbox: item.bbox
    })));
    const conditions = reaction.conditions.map((item) => ({
      name: "Condition",
      category: item.category,
      smiles: "SMILES",
      bbox: item.bbox
    }));
    const products = await Promise.all(reaction.products.map(async (item) => ({
      name: "Product",
      category: item.category,
      smiles: await loadTxts(`/static/data/${folder}/molecule${item.matching_idx[1]}_smiles.txt`),
      bbox: item.bbox
    })));
    return [...reactants, ...conditions, ...products];
  }));
  return reactions;
}

async function updateReactions(folder) {
  const reactions = await loadReaction(folder);
  const container = document.getElementById('texts-reaction');
  container.innerHTML = '';
  container.style.overflowY = 'auto';
  container.style.maxHeight = '600px';
  reactions.forEach((reaction, index) => {
    const block = document.createElement('div');
    block.className = 'reaction-block';

    const title = document.createElement('p');
    title.innerText = `Reaction ${index + 1}`;
    title.className = 'reaction-title';
    block.appendChild(title);

    const table = document.createElement('table');
    table.className = 'reaction-table';

    reaction.forEach(item => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.innerText = item.name;
      row.appendChild(nameCell);

      const categoryCell = document.createElement('td');
      categoryCell.innerText = item.category;
      categoryCell.className = 'reaction-category';
      row.appendChild(categoryCell);

      const smilesCell = document.createElement('td');
      smilesCell.innerText = item.smiles;
      smilesCell.className = 'reaction-smiles';
      row.appendChild(smilesCell);

      table.appendChild(row);
    });

    block.appendChild(table);
    block.onclick = () => highlightReactions(reaction);
    container.appendChild(block);
  });
}

async function overlayReactions(folder) {
  const reactions = await loadReaction(folder);
  const img = document.getElementById('switcher-image-reaction');
  const { width: imgWidth, height: imgHeight } = img.getBoundingClientRect();
  const originalImage = new Image();
  originalImage.src = img.dataset.originalSrc;
  originalImage.onload = () => {
    const scaleX = imgWidth / originalImage.naturalWidth;
    const scaleY = imgHeight / originalImage.naturalHeight;
    const overlayContainer = document.getElementById("overlay-reaction");
    overlayContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const ctx = canvas.getContext('2d');
    reactions.forEach(reaction => {
      reaction.forEach(item => {
        const [x, y, width, height] = item.bbox.map((val, i) =>
          val * (i % 2 === 0 ? scaleX : scaleY)
        );
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
      });
    });

    overlayContainer.appendChild(canvas);
    overlayContainer.style.display = 'block';
  };
}

function highlightReactions(reactions) {
  const img = document.getElementById('switcher-image-reaction');
  const { width: imgWidth, height: imgHeight } = img.getBoundingClientRect();
  const originalImage = new Image();
  originalImage.src = img.dataset.originalSrc;

  originalImage.onload = () => {
    const scaleX = imgWidth / originalImage.naturalWidth;
    const scaleY = imgHeight / originalImage.naturalHeight;
    const block = document.getElementById("overlay-reaction");
    const coloredOverlays = block.querySelectorAll('.reaction-bounding-box');
    coloredOverlays.forEach(overlay => overlay.remove());
    reactions.forEach(item => {
      const [x, y, width, height] = item.bbox.map((val, i) => val * (i % 2 === 0 ? scaleX : scaleY));
      const overlay = document.createElement('div');
      overlay.className = 'reaction-bounding-box';
      overlay.setAttribute('data-type', item.name);
      Object.assign(overlay.style, { left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px`, display: 'block' });
      block.appendChild(overlay);
    });
    block.style.display = 'block';
  };
}

function hideReactions() {
  document.getElementById("overlay-reaction").style.display = 'none';
  document.getElementById("highlight-reaction").style.display = 'none';
}

function changeReactionPage(folder) {
  setReactions(folder);
  hideReactions();
}