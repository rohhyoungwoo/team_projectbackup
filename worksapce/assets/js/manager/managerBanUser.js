const banSearch = document.querySelector('#manager-ban-user-search');
let banSize = 10; //한 페이지당 표시될 게시물 수
let totalban = 20; //서버에서 모든 게시물 수 가져오기
let currentPageNumber = 1;
const moveFirst = document.querySelector('.icon-angle-double-left');
const moveLast = document.querySelector('.icon-angle-double-right');
const movePrev = document.querySelector('.icon-left-open');
const moveNext = document.querySelector('.icon-right-open');
const resetButtonSearch = document.querySelector('.reset-search-button');


//날짜 및 시간 포멧 지정(지금은 현재시간 가져오는데 추후 데베에서 가져오기)
const upLoadTime = new Date();
const year = upLoadTime.getFullYear();
let month = upLoadTime.getMonth() + 1;
month = String(month).padStart(2, '0');
let day = upLoadTime.getDate();
day = String(day).padStart(2, '0');
let hours = upLoadTime.getHours();
hours = String(hours).padStart(2, '0');
let minutes = upLoadTime.getMinutes();
minutes = String(minutes).padStart(2, '0');

const banUserList = [];
for (let i = 1; i <= 205; i++) { //게시글 총합 가져오기(페이지수에 따라 하단 숫자 바뀜)
  banUserList.push({
    banUserId: `userId${i}`,
    banNickName: `유저이름${i}`,
    banText: `게시물 제목 ${i}`,
    banStart: `${year}-${month}-${day}`,
    banEnd: `${year}-${month}-${day}`
    // banEnd: `${year}-${month}-${day} ${hours}:${minutes}`
  });
}
let totalPages = Math.ceil(banUserList.length / banSize);

const bottomNumber = document.querySelector('.manager-ban-user-page-number-button');
const banContainer = document.querySelector('.manager-ban-user-list');
const banBottomNumberContainer = document.querySelector('.manager-ban-user-page-numbers');

function getban(page) {
  banContainer.innerHTML = '';
  const start = (page - 1) * banSize;
  const end = page * banSize;
  const banDisplay = banUserList.slice(start, end);
  banDisplay.forEach(ban => {
    const banItem = document.createElement('li');
    banItem.classList.add('manager-ban-user-list-item');

    const countStartDate = new Date(ban.banStart);
    const countEndDate = new Date('2025-01-25');
    const mulDate = countEndDate - countStartDate;
    const countDate = mulDate / (1000 * 60 * 60 * 24);
    banItem.innerHTML = `
      <div class="manager-ban-user-list-ban-userId">${ban.banUserId}</div>
      <div class="manager-ban-user-list-ban-nickName">${ban.banNickName}</div>
      <div class="manager-ban-user-list-ban-text">${ban.banText}</div>
      <div class="ban-list-date">
      <div class="manager-ban-user-list-ban-start-date">${ban.banStart}</div>
      <div class="manager-ban-user-list-ban-end-date">2025-01-25</div>
      <div class="manager-ban-user-list-ban-date-count">${countDate}일</div>
      </div>
      <button type="submit" class="ban-controll">밴 취소</button>
    `;
    // <div class="manager-ban-user-list-ban-start-date">${ban.banEnd}</div> //서버에서 종료날짜 가져오기
    const banLine = document.createElement('hr');
    banLine.classList.add('manager-ban-user-list-item-line');
    banContainer.appendChild(banItem);
    banContainer.appendChild(banLine);
    const banControllButton = banItem.querySelector(".ban-controll");
    banControllButton.addEventListener('click', () => {
      const checkUnBan = confirm(`${ban.banNickName} 유저를 바로 밴 해제 하시겠습니까?`);
      if (checkUnBan) {
        const indexToRemove = banUserList.findIndex(user => user.banUserId === ban.banUserId);
        if (indexToRemove !== -1) {
          banUserList.splice(indexToRemove, 1); // 해당 Index의 유저 제거
          totalban = banUserList.length; // 유저 삭제 후 총 게시물 수 갱신
          totalPages = Math.ceil(totalban / banSize); // 페이지 수 갱신
          if (currentPageNumber > totalPages) { //유저를 삭제한 후 현재 페이지가 더 이상 유효하지 않으면 이전 페이지로 이동
            currentPageNumber = totalPages;
          }

          alert(`${ban.banUserId} 유저를 밴 해제 했습니다.`);
          getban(currentPageNumber); // 현재 페이지로 갱신
          banBottomNumber(); // 하단 페이지 번호 갱신
        }
      } else {
        alert('작업이 취소되었습니다');
      }
    });
  });
}

function banBottomNumber() {
  banBottomNumberContainer.innerHTML = '';
  const numberStart = Math.floor((currentPageNumber - 1) / 10) * 10 + 1;
  const numberEnd = Math.min(numberStart + 9, totalPages);

  for (let i = numberStart; i <= numberEnd; i++) {
    const numbers = document.createElement('p');
    numbers.textContent = i;

    if (i === currentPageNumber) {
      numbers.classList.add('manager-ban-user-page-numbers-selector');
    } else {
      numbers.classList.add('manager-ban-user-page-numbers-unSelector');
    }

    numbers.disabled = i === currentPageNumber;
    numbers.addEventListener('click', () => moveban(i));
    banBottomNumberContainer.appendChild(numbers);
  }
}

function moveban(ban) {
  if (ban < 1 || ban > totalPages) return;
  currentPageNumber = ban;
  getban(currentPageNumber);
  banBottomNumber();
}





// 이전 페이지로 이동
movePrev.addEventListener('click', () => moveban(currentPageNumber - 1));

// 다음 페이지로 이동
moveNext.addEventListener('click', () => moveban(currentPageNumber + 1));

// 첫 페이지로 이동
moveFirst.addEventListener('click', () => moveban(1));

// 마지막 페이지로 이동
moveLast.addEventListener('click', () => moveban(totalPages));

getban(currentPageNumber);
banBottomNumber();

banSearch.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 기본 동작(새 줄 추가) 방지
    alert(`${banSearch.value}의 내용을 검색합니다`);
  }
});

resetButtonSearch.addEventListener("click", function() {
  banSearch.value = '';
});