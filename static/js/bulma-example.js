window.onload = function () {
  setInitialContent('molecule', 'jp3');
  setInitialContent('reaction', 'jp3');
  hideBoundingBox('molecule');
  hideBoundingBox('reaction');
};

// 섹션의 초기 콘텐츠 및 이미지 설정
function setInitialContent(section, folder) {
  const contentMap = {
    'jp3': { imageSrc: 'static/images/jp3/p3.png', content: 'JP3 Content.' },
    'pp2': { imageSrc: 'static/images/pp2/p2.png', content: 'PP2 Content.' },
    'wp2': { imageSrc: 'static/images/wp2/p2.png', content: 'WP2 Content.' }
  };

  const sectionData = contentMap[folder];
  if (sectionData) {
    document.getElementById(`switcher-image-${section}`).src = sectionData.imageSrc;
    document.getElementById(`markdown-content-${section}`).innerText = sectionData.content;
    updateSmallImages(section, folder);
  }
}

function updateSmallImages(section, folder) {
  const smallImages = {
    'jp3': [
      { src: 'static/images/jp3/molecule0_zoom_image.png', bbox: [338, 70, 99, 46], smiles: 'SMILES', molfile: 'Molfile 데이터 1' },
      { src: 'static/images/jp3/molecule1_zoom_image.png', bbox: [338, 204, 134, 48], smiles: 'SMILES', molfile: 'Molfile 데이터 2' }
    ],
    'pp2': [
      { src: 'static/images/pp2/molecule0_zoom_image.png', bbox: [279, 481, 185, 92], smiles: 'SMILES', molfile: 'Molfile 데이터 3' },
      { src: 'static/images/pp2/molecule1_zoom_image.png', bbox: [280, 289, 163, 92], smiles: 'SMILES', molfile: 'Molfile 데이터 4' }
    ],
    'wp2': [
      { src: 'static/images/wp2/molecule0_zoom_image.png', bbox: [456, 257, 107, 100], smiles: 'SMILES', molfile: 'Molfile 데이터 5' },
      { src: 'static/images/wp2/molecule1_zoom_image.png', bbox: [315, 237, 104, 91], smiles: 'SMILES', molfile: 'Molfile 데이터 6' }
    ]
  };

  const container = document.getElementById(`small-images-${section}`);
  container.innerHTML = '';
  smallImages[folder].forEach((image, index) => {
    const div = document.createElement('div');
    div.className = 'image-paragraph';

    // 이미지 생성
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = 'Small Image';
    img.className = 'clickable-image';
    img.dataset.bbox = image.bbox.join(',');
    img.onclick = function (event) {
      showOverlay(section, event);
    };

    // SMILES 캡션 (항상 고정)
    const caption = document.createElement('p');
    caption.className = 'markdown-caption';
    caption.innerText = 'SMILES';

    // 토글 버튼 (▶ MOL / ▼ MOL)
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-button';
    toggleButton.innerHTML = '▶ MOL';
    toggleButton.onclick = function () {
      const details = document.getElementById(`details-${section}-${index}`);
      const isHidden = details.style.display === 'none';
      details.style.display = isHidden ? 'block' : 'none';
      toggleButton.innerHTML = isHidden ? '▼ MOL' : '▶ MOL';
    };

    // Molfile 상세 설명 (초기에는 숨김)
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

// 큰 이미지를 변경하는 함수
function changeImage(section, folder) {
  setInitialContent(section, folder);
  hideBoundingBox(section);
}

// 이미지를 클릭했을 때 Bounding Box를 표시하는 함수 (원본 이미지 크기 사용)
function showOverlay(section, event) {
  const img = document.getElementById(`switcher-image-${section}`);
  const imgRect = img.getBoundingClientRect();  // 현재 이미지의 위치와 크기 정보

  const imgWidth = imgRect.width;  // 현재 화면에서 보이는 이미지의 너비
  const imgHeight = imgRect.height;  // 현재 화면에서 보이는 이미지의 높이

  const bbox = event.target.dataset.bbox.split(',').map(Number);  // 클릭한 작은 이미지의 바운딩 박스 좌표 (x, y, width, height)

  // 원본 이미지 크기 가져오기
  const originalImage = new Image();
  originalImage.src = img.src;  // 큰 이미지의 src를 사용하여 원본 이미지 로드
  originalImage.onload = function() {
    const originalImageWidth = originalImage.naturalWidth;  // 원본 이미지의 너비
    const originalImageHeight = originalImage.naturalHeight;  // 원본 이미지의 높이

    // 비율 계산
    const scaleX = imgWidth / originalImageWidth;
    const scaleY = imgHeight / originalImageHeight;

    // 비율을 적용하여 바운딩 박스의 위치 및 크기 계산
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
// Bounding Box 숨기기 함수
function hideBoundingBox(section) {
  document.getElementById(`overlay-${section}`).style.display = 'none';
}