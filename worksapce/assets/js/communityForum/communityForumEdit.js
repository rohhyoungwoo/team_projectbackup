const communityForumEditTitle = document.getElementById('title');
const communityForumEditContent = document.querySelector('.communityForumEdit-content-text-content');
let communityForumEditSelectFile = document.querySelector('.icon-file-image');
const communityForumEditCancel = document.querySelector('.communityForumEdit-editCancel-button');
const communityForumEditComplete = document.querySelector('.communityForumEdit-editComplete-button');

const editCategoryFree = document.getElementById('free');
const editCategoryStrategy = document.getElementById('strategy');
let categoryType = 1; //서버에서 타입 종류 받아오기

function getCategoryType() {

    if (categoryType === 1) {
        editCategoryStrategy.checked = true;
    } else {
        editCategoryFree.checked = true;
    }
    communityForumEditTitle.value = "데베에서 게시글 타이틀 가져오기";
    communityForumEditContent.innerText = "데베에서 게시글 내용 가져오기";

    // if (communityForumDetailType === 1) {
    //     communityForumDetailTypeText.innerText = "공략";
    // } else {
    //     communityForumDetailTypeText.innerText = "자유";
    // }

}

communityForumEditSelectFile.addEventListener("click", function () {
    document.querySelector('.communityForumEdit-file-select-button').click();
});

function selectFile() {
    const imageDisplay = new FileReader();
    const img = document.createElement('img');
    const selectFileButton = document.querySelector('.communityForumEdit-file-select-button');
    const selectFileName = document.querySelector('.communityForumEdit-file-select');
    const contentDiv = document.querySelector('.communityForumEdit-content-text-content');
    const replaceImage = contentDiv.querySelector('img');
    if (replaceImage) {
        contentDiv.removeChild(replaceImage);
        selectFileName.textContent = '선택된 파일 없음(40MB 이하)';
        selectFileButton.value = '';
    }


    if (selectFileButton.files.length > 0) {
        const fileSeletor = selectFileButton.files[0];
        selectFileName.textContent = `${selectFileButton.files[0].name}`;
        imageDisplay.onload = function (event) {
            img.src = event.target.result;
            img.style.maxWidth = '235px';
            img.style.maxHeight = '173px';
            img.alt = '이미지 추가 오류';
            contentDiv.appendChild(img);
        };
        imageDisplay.readAsDataURL(fileSeletor);
    } else {
        selectFileName.textContent = '선택된 파일 없음(40MB 이하)';
    }
}
communityForumEditCancel.addEventListener("click", function () {
    var link = '../../html/communityForum/communityForum.html'; //이전 페이지의 값
    location.href = link;
    location.replace(link);
    window.open(link);
});
communityForumEditComplete.addEventListener("click", function () {
    console.log(communityForumEditTitle.value);
    let contentTitle = communityForumEditTitle.value.trim();
    // let contentText = communityForumEditContent.value.trim();
    if (contentTitle === '') {
        alert("제목을 입력해 주세요");
    // } else if (contentText.value == '') {
        // alert("내용을 입력해 주세요");
    } else {
        alert("게시글 수정이 완료 되었습니다.");
        var link = '../../html/communityForum/communityForum.html'; //수정 후 게시글의 링크
        // location.href = link;
        // location.replace(link);
        // window.open(link);
    }

});



getCategoryType();
selectFile();
