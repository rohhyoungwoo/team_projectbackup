const postSearch = document.querySelector('#mng-search');
const postSize = 10; //한 페이지당 표시될 게시물 수
const totalPost = 20; //서버에서 모든 게시물 수 가져오기
let currentPageNumber = 1;
const moveFirst = document.querySelector('.icon-angle-double-left');
const moveLast = document.querySelector('.icon-angle-double-right');
const movePrev = document.querySelector('.icon-left-open');
const moveNext = document.querySelector('.icon-right-open');


const posts = [];
for (let i = 1; i <= 100; i++) {
  posts.push({
    number: `${i}`,
    member: `노란상어`,
    tier: `그랜드 마스터`,
    writeTime: `대기중`,
    postId: `게시글${i}`
  });
}
const totalPages = Math.ceil(posts.length / postSize);

const bottomNumber = document.querySelector('.mng-page-number-button');
const postContainer = document.querySelector('.mng-list');
const postBottomNumberContainer = document.querySelector('.mng-page-numbers');

function getPost(page) {
  postContainer.innerHTML = '';
  const start = (page - 1) * postSize;
  const end = page * postSize;
  const postDisplay = posts.slice(start, end);
  postDisplay.forEach(post => {
    const postItem = document.createElement('li');
    postItem.classList.add('mng-list-item');
    postItem.innerHTML = `
      <input type="checkbox" id="mng-list-check">
      <div class="mng-list-number">${post.number}</div>
      <div class="mng-list-member">${post.member}</div>
      <div class="mng-list-tier">${post.tier}</div>
      <div class="mng-list-write-time">${post.writeTime}</div>
    `;
    const postLine = document.createElement('hr');
    postLine.classList.add('mng-list-item-line');
    postContainer.appendChild(postItem);
    postContainer.appendChild(postLine);
    postItem.addEventListener('click', () => {
      alert(`해당 게시글 : ${post.postId}`);
    });
  });
}

function postBottomNumber() {
  postBottomNumberContainer.innerHTML = '';
  const numberStart = Math.floor((currentPageNumber - 1) / 10) * 10 + 1;
  const numberEnd = Math.min(numberStart + 9, totalPages);

  for (let i = numberStart; i <= numberEnd; i++) {
    const numbers = document.createElement('p');
    numbers.textContent = i;

    if (i === currentPageNumber) {
      numbers.classList.add('mng-page-numbers-selector');
    } else {
      numbers.classList.add('mng-page-numbers-unSelector');
    }

    numbers.disabled = i === currentPageNumber;
    numbers.addEventListener('click', () => movePost(i));
    postBottomNumberContainer.appendChild(numbers);
  }
}

function movePost(post) {
  if (post < 1 || post > totalPages) return;
  currentPageNumber = post;
  getPost(currentPageNumber);
  postBottomNumber();
}





// 이전 페이지로 이동
movePrev.addEventListener('click', () => movePost(currentPageNumber - 1));

// 다음 페이지로 이동
moveNext.addEventListener('click', () => movePost(currentPageNumber + 1));

// 첫 페이지로 이동
moveFirst.addEventListener('click', () => movePost(1));

// 마지막 페이지로 이동
moveLast.addEventListener('click', () => movePost(totalPages));




getPost(currentPageNumber);
postBottomNumber();








writeBtn.addEventListener("click", function () {
  var link = '../../html/mng/mngWriteing.html';
  location.href = link;
  // location.replace(link);
  window.open(link);
});

postSearch.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 기본 동작(새 줄 추가) 방지
    alert(`${postSearch.value}의 내용을 검색합니다`);
  }
});

/* 체크박스 체크 시 해당 리스트 삭제*/
const list = document.querySelectorAll("#mng-list-checkbox"); //체크박스
const del = document.querySelector(".icon-trash"); //삭제버튼

del.onclick = () => {
  alert("선택 항목을 정말 삭제하시겠습니까?");
  for (let i = 0; i < list.length; i++) {
    if (list[i].checked) {
      list[i].parentElement.remove();
    }
  }
};