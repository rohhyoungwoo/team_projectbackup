document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소 가져오기
  const loginForm = document.getElementById("adminLogin-form");
  const loginIdInput = document.getElementById("adminLogin-id");
  const loginPasswordInput = document.getElementById("adminLogin-password");
  const loginButton = document.querySelector(".adminLogin-button");

  // 테스트용 저장된 아이디와 비밀번호 (실제로는 서버와 통신해야 합니다)
  const storedUser = {
    id: "testuser", // 테스트용 아이디
    password: "test1234*" // 테스트용 비밀번호
  };

  // 로그인 폼 제출 이벤트
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const enteredId = loginIdInput.value.trim(); // 입력된 아이디
    const enteredPassword = loginPasswordInput.value.trim(); // 입력된 비밀번호

    // 아이디와 비밀번호 비교
    if (enteredId === storedUser.id && enteredPassword === storedUser.password) {
      alert("로그인 성공!"); 
      // 실제 이동 코드 추가
      // window.location.href = "home.html"; // 이동할 페이지로 리디렉션
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다."); 
    }
  });
});