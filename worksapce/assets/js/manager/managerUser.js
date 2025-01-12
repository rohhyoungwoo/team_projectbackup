/* 체크박스 체크 시 해당 리스트 삭제*/
const list = document.querySelectorAll("#mng-checkbox"); //체크박스
const del = document.querySelector(".icon-trash"); //삭제버튼

del.onclick = () => {
  alert("선택 항목을 정말 삭제하시겠습니까?");
  for (let i = 0; i < list.length; i++) {
    if (list[i].checked) {
      list[i].parentElement.remove();
    }
  }
<<<<<<< HEAD
}
=======
}




>>>>>>> cb530c79f96879acb2e94b4bc79bbed8e6374a09
