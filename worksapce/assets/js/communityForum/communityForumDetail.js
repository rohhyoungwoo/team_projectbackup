// 함수나 기능 정의하기 위해 HTML선택
const communityForumDetailTitle = document.querySelector('.communityForumDetail-title-content');                //게시글 제목
const communityForumDetailWriterUserName = document.querySelector('.communityForumDetail-writer-userName');     //게시글 작성자
const communityForumDetailContent = document.querySelector('.communityForumDetail-content-text');               //게시글 내용
const communityForumDetailUploadTime = document.querySelector('.communityForumDetail-writer-uploadTime');       //게시글 시간
const communityForumDetailTypeText = document.querySelector('.communityForumDetail-title-text');                //공략, 자유
let communityForumDetailType = 2;                                                                               //공략, 자유 구분을 위해 숫자
const communityForumDetailContentImage = document.querySelector('.communityForumDetail-content-images');        //게시글 사진
let imageUrl = null;                                                                                            //이미지 경로
const communityForumIndexButton = document.querySelector('.communityForumDetail-communityForum-index-button');  //목록 버튼
const communityForumEditButton = document.querySelector('.communityForumDetail-edit-button');                   //수정 버튼
const communityForumDeleteButton = document.querySelector('.communityForumDetail-delete-button');               //삭제 버튼
const communityForumDetailCommentTextInput = document.querySelector('.communityForumDetail-comment-list-container');//댓글작성하는 요소의 부모 
const CommentInput = communityForumDetailCommentTextInput.querySelector('input');                               //댓글 인풋 특정하기
const commentAddButton = communityForumDetailCommentTextInput.querySelector('button');                          //등록하기 특정하기
const commentList = document.querySelector('.communityForumDetail-comment-list');
const commentDeleteButton = document.querySelector('.communityForumDetail-comment-delete');

// 함수나 기능 정의하기

//1. 게시글 정보 불러오기(제목, 내용, 시간, 작성자, 사진 링크 등등)
function getCommunityForumDetailValue() {
    communityForumDetailTitle.innerText = "데베에서 게시글 타이틀 가져오기";
    communityForumDetailWriterUserName.innerText = "데베에서 게시글 작성자 가져오기";
    communityForumDetailUploadTime.innerText = "데베에서 게시글 시간 가져오기";
    communityForumDetailContent.innerText = "데베에서 게시글 내용 가져오기";
    communityForumDetailContentImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoAGhKZZ5fYXELfJZDfeFyou9MgSeUplBp3Q&s'; //해당 사진을 데베에서 링크로 할당해주기

    if (communityForumDetailType === 1) {
        communityForumDetailTypeText.innerText = "공략";
    } else {
        communityForumDetailTypeText.innerText = "자유";
    }
}
function getCommunityForumComment() {
    // 서버에서 댓글 가져오기
}
//2. 댓글 작성하기(작성자, 내용, 시간, 본인글이면 삭제)
function addCommentList(text) {
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

    let communityForumCommentList = document.createElement("li");
    let communityForumCommentDiv = document.createElement("div");
    let communityForumCommentUserName = document.createElement('p');
    let communityForumCommentColon = document.createElement('p');
    let communityForumCommentContent = document.createElement('p');
    let communityForumCommentTime = document.createElement('p');
    let communityForumCommentHr = document.createElement('hr');
    let communityForumCommentDeleteButton = document.createElement('button');


    communityForumCommentList.classList.add("communityForumDetail-comment-list-item");
    communityForumCommentDiv.classList.add("communityForumDetail-comment-list-details");

    // 닉네임 DOM
    communityForumCommentUserName.classList.add("communityForumDetail-comment-list-userName");
    communityForumCommentUserName.textContent = '티모 뺨 후려치기';
    communityForumCommentDiv.appendChild(communityForumCommentUserName);
    //콜론 DOM
    communityForumCommentColon.classList.add("communityForumDetail-comment-list-colon");
    communityForumCommentColon.textContent = ":";
    communityForumCommentDiv.appendChild(communityForumCommentColon);
    //내용 DOM
    communityForumCommentContent.classList.add("communityForumDetail-comment-list-content");
    communityForumCommentContent.textContent = text;
    communityForumCommentDiv.appendChild(communityForumCommentContent);
    //날짜 DOM
    communityForumCommentTime.classList.add("communityForumDetail-comment-list-time");
    communityForumCommentTime.textContent = `${year}-${month}-${day} ${hours}:${minutes}`;
    communityForumCommentDiv.appendChild(communityForumCommentTime);
    //삭제 DOM
    communityForumCommentDeleteButton.classList.add("communityForumDetail-comment-delete");
    communityForumCommentDeleteButton.textContent = "삭제";
    communityForumCommentDiv.appendChild(communityForumCommentDeleteButton);
    //구분선 DOM
    communityForumCommentHr.classList.add("communityForumDetail-comment-line-line");
    //리스트에 담기
    communityForumCommentList.appendChild(communityForumCommentDiv);
    communityForumCommentList.appendChild(communityForumCommentHr);
    //댓글 아이템 추가
    commentList.appendChild(communityForumCommentList);
}

//3. 각 버튼들의 이벤트(목록, 수정, 삭제 등)
communityForumIndexButton.addEventListener("click", function () {
    var link = '../../html/communityForum/communityForum.html';
    location.href = link;
    window.open(link);
});
communityForumEditButton.addEventListener("click", function () {
    var link = '../../html/communityForum/communityForumEdit.html';
    location.href = link;
    window.open(link);
});
communityForumDeleteButton.addEventListener("click", function () {
    if (confirm("해당 게시글을 삭제하시겠습니까?")) {
        alert("삭제되었습니다");
        var link = '../../html/communityForum/communityForum.html';
        location.href = link;
        location.replace(link);
        window.open(link);
    } else {

    }
});
commentAddButton.addEventListener("click", function () { //댓글, 빈값과 값이 없을떄 제한
    let input = CommentInput.value.trim();
    if (input === '') {
        alert('댓글을 입력해 주세요.');
    } else {
        addCommentList(input);
        alert('댓글 등록이 완료 되었습니다');
        CommentInput.value = '';
    }
});
document.querySelector('.communityForumDetail-comment-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('communityForumDetail-comment-delete')) {
        const commentItem = event.target.closest('li');
        if (commentItem) {
            commentItem.remove();
        }
    }
});

// 정의한 함수나 기능 호출하기
getCommunityForumDetailValue();