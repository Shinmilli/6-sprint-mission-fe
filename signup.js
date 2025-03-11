import { USER_DATA } from './userData.js';

const emailForm = document.querySelector('#email');
const nameForm = document.querySelector('#userName');
const pwForm = document.querySelector('#password');
const checkPwForm = document.querySelector('#checkPW');
const signupButton = document.querySelector('button[type="submit"]');

const pwError = document.querySelector('#PW-error')
const emailError = document.querySelector('#email-error')
const pwValidateError = document.querySelector('#PW-validate-error')


// 유효성검사
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

checkPwForm.addEventListener('focusin', function (){
  checkPwForm.style.border = '2px solid var(--primary-color)';
  pwValidateError.style.display = 'none'
})

checkPwForm.addEventListener('focusout', function (){
  const pwMatch = pwForm.value === checkPwForm.value;

  if (!checkPwForm.value) { //아무것도 없으면
    checkPwForm.style.border = "2px solid red"
    pwValidateError.style.display = 'block'
    pwValidateError.textContent = "비밀번호를 재확인 해주세요."
  } else if( !pwMatch ) {
    checkPwForm.style.border = "2px solid red"
    pwValidateError.style.display = 'block'
    pwValidateError.textContent = "비밀번호가 일치하지 않습니다."
  } else {
    checkPwForm.style.backgroundColor = "#f3f4f6";
  }
})



// button activate
emailForm.addEventListener('keyup', validateForm);
nameForm.addEventListener('keyup', validateForm);
pwForm.addEventListener('keyup', validateForm);
checkPwForm.addEventListener('keyup', validateForm);

function validateForm() {
  const allFilled = emailForm.value && nameForm.value && pwForm.value && checkPwForm.value;
  const pwMatch = pwForm.value === checkPwForm.value;

  if (allFilled && pwMatch) {
    signupButton.disabled = false;
    signupButton.classList.add('active'); // Add active class for styling
  } else {
    signupButton.disabled = true;
    signupButton.classList.remove('active');
  }
}


// 비밀번호 표시/숨김 토글 기능
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
signupButton.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  const email = emailForm.value.trim();
  const name = nameForm.value.trim();
  const password = pwForm.value.trim();

  // 이메일이 존재하는지 확인
  const existingUser = USER_DATA.find(user => user.email === email);

  if (existingUser) {
    alert("사용 중인 이메일입니다.");
    return;
  }
  USER_DATA.push({ email, name, password });
  alert("회원가입이 완료되었습니다!");
  window.location.href = "./login.html";
});