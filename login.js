import { USER_DATA } from './userData.js';

const emailForm = document.querySelector('#email');
const pwForm = document.querySelector('#password');
const loginButton = document.querySelector('.btnLogin'); 
const pwError = document.querySelector('#PW-error')
const emailError = document.querySelector('#email-error')

// 유효성 검사
emailForm.addEventListener('focusin', function (){
  emailForm.style.border = '2px solid var(--primary-color)';
  emailError.style.display = 'none'
})

emailForm.addEventListener('focusout', function (){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 유효성 검사 정규식

  if (!emailForm.value) { //아무것도 없으면
  emailForm.style.border = "2px solid red"
  emailError.style.display = 'block'
  emailError.textContent = "이메일을 입력해주세요."
  } else if( !emailRegex.test(emailForm.value)) {
    emailForm.style.border = "2px solid red"
    emailError.style.display = 'block'
    emailError.textContent = "잘못된 이메일 형식입니다."
  } else { // ✅ 올바른 이메일일 때
    emailForm.style.backgroundColor = "#f3f4f6";
  }
})

pwForm.addEventListener('focusin', function (){
  pwForm.style.border = '2px solid var(--primary-color)';
  pwError.style.display = 'none'
})

pwForm.addEventListener('focusout', function (){
  if (!pwForm.value) { //아무것도 없으면
    pwForm.style.border = "2px solid red"
    pwError.style.display = 'block'
    pwError.textContent = "비밀번호를 입력해주세요."
  } else if( pwForm.value.length < 8 ) {
    pwForm.style.border = "2px solid red"
    pwError.style.display = 'block'
    pwError.textContent = "비밀번호를 8자 이상 입력해주세요"
  } else { 
    pwForm.style.backgroundColor = "#f3f4f6";
  }
})



// 버튼 활성화
emailForm.addEventListener('keyup', activeEvent);
pwForm.addEventListener('keyup', activeEvent);

function activeEvent() {
  if (emailForm.value && pwForm.value) {
    loginButton.disabled = false;
    loginButton.classList.add('active');
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove('active');
  }
} 


//눈아이콘
document.querySelector('.toggle-password').addEventListener('click', function(event) {
  togglePassword('password', event);
});

function togglePassword(inputId, event) {
  const input = document.getElementById(inputId);
  const icon = event.target; // 클릭된 아이콘 가져오기

  if (input.type === "password") {
      input.type = "text";
      icon.textContent = "visibility"; // 열린 눈 아이콘
  } else {
      input.type = "password";
      icon.textContent = "visibility_off"; // 닫힌 눈 아이콘
  }
}



// 로그인 버튼 클릭 이벤트 추가
loginButton.addEventListener('click', function () {
  const email = emailForm.value.trim(); // 공백 제거
  const password = pwForm.value.trim();

  // 이메일이 USER_DATA에 존재하는지 확인
  const user = USER_DATA.find(user => user.email === email);

  if (!user) { // 이메일이 존재하지 않음
      alert("비밀번호가 일치하지 않습니다.");
  } else if (user.password !== password) { // 이메일은 맞지만 비밀번호 틀림
      alert("비밀번호가 일치하지 않습니다.");
  } else { // 이메일 & 비밀번호 모두 일치
    window.location.href = "./item.html";
  }
});