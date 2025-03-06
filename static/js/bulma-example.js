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

// 작은 이미지 세트를 업데이트하는 함수 (설명 추가)
function updateSmallImages(section, folder) {
  const smallImages = {
    'jp3': [
      { src: 'static/images/jp3/molecule0_zoom_image.png', bbox: [338, 70, 99, 46], caption: 'OC(C1C=CC(=CC=1)NC1=NC2=CCCC=C2N%91C1N%92)N1CCOCC1.[*]%91%92' },
      { src: 'static/images/jp3/molecule1_zoom_image.png', bbox: [338, 204, 134, 48], caption: 'CN1C=NC(=C1)C(=O)N1CCN(CC1)C(O)C1C=CC(=CC=1)NC1=NC2=CC=CC=C2N(N)C1=N' }
    ],
    'pp2': [
      { src: 'static/images/pp2/molecule0_zoom_image.png', bbox: [279, 481, 185, 92], caption: 'SMILES' },
      { src: 'static/images/pp2/molecule1_zoom_image.png', bbox: [280, 289, 163, 92], caption: 'SMILES' }
    ],
    'wp2': [
      { src: 'static/images/wp2/molecule0_zoom_image.png', bbox: [456, 257, 107, 100], caption: 'O=C(/C%91=C%92/C1=NNC2=CC=CC=C21)N%93F.[*:5]%94.[*:4]/%92.[*:3]\%91.[*:2]%93.[*]%94' },
      { src: 'static/images/wp2/molecule1_zoom_image.png', bbox: [315, 237, 104, 91], caption: 'OC(=O)/C%91=C%92/C1=NNC2=CC=CC=C21.[*:5]%93.[*:4]/%92.[*:3]\%91.[*]%93' }
    ]
  };

  const container = document.getElementById(`small-images-${section}`);
  container.innerHTML = '';
  smallImages[folder].forEach(image => {
    const div = document.createElement('div');
    div.className = 'image-paragraph';

    // 이미지 요소 생성
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = 'Small Image';
    img.className = 'clickable-image';
    img.dataset.bbox = image.bbox.join(',');
    img.onclick = function (event) {
      showOverlay(section, event);
    };

    // 설명 (Markdown 스타일 텍스트)
    const caption = document.createElement('p');
    caption.className = 'markdown-caption';
    caption.innerText = image.caption;

    div.appendChild(img);
    div.appendChild(caption);
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