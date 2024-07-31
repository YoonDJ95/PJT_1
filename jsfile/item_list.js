/** 변수 선언 모음 **/
let userType = 'Guest';                                     // 기본 userType은 Guest 지정
let userName = '';                                          // 최초 로그인전 초기값 설정
let cartItems = [];                                         // 장바구니 아이템 리스트를 저장할 배열선언
let cart = {};                                              // cart 변수를 통해 로컬저장
let wishlist = {};                                          // 찜하기 상태를 저장할 변수선언
// 아래 선언은 배열 이름이 저래야 할까 싶은 부분이 있음.
const userCart = {                                          // 장바구니
  Guest: [],
  User1: [],
  User2: []
};
const userWishlist = {                                       // 찜하기
  Guest: {},
  User1: {},
  User2: {}
};
const RecentProducts = {                                      // 최근 본 상품
  Guest: new Set(),
  User1: new Set(),
  User2: new Set()
};




/** HTML 문서가 완전히 로드되고 분석된 후 수행되는 구간 **/
document.addEventListener('DOMContentLoaded', function () {
  initializeData();                                                   // 계정 별 초기값 추가 및 기존값 읽기
  //clearLocalStorage();                                                // 모든 로컬스토리지값을 삭제
  createProducts('전체');                                                   // 상품 생성 및 표시
  initializeUserInfo();                                               // 사용자 목록 새로고침
  userType = loaduserType();                                          // 로컬 스토리지에서 userType 불러오기
  wishlist = loadWishList();                                          // 로컬 스토리지에서 wishlist 불러오기
  setupSignupForm();                                                  // 회원가입 페이지 부문 생성
  displayUserList();                                                  // 사용자 목록 표시
  updateUI();                                                         // UI 업데이트

  /* 계정 생성 기능 */
  const triggerImage = document.getElementById('trigger-image');
  const signupSection = document.getElementById('signup-section');
  const overlay = document.getElementById('overlay');
  triggerImage.addEventListener('click', toggleSignupSection);
  triggerImage.addEventListener('click', removetext_signup);

  function toggleSignupSection() {                                    // trigger-image를 누르면 관련 style이 none, block으로 변하도록
    const isActive = signupSection.style.display === 'block';
    signupSection.style.display = isActive ? 'none' : 'block';
    overlay.style.display = isActive ? 'none' : 'block';
  }

  /* 관리자 메뉴 선택시 기능 */
  const triggerImage2 = document.getElementById('show-management');
  const masterAdmin = document.getElementById('setup-section');
  const overlay2 = document.getElementById('overlay2');
  triggerImage2.addEventListener('click', toggleMasterSection);

  function toggleMasterSection() {                                     // master-section 을 누르면 관련 style이 none, block으로 변하도록
    const masterSection = document.getElementById('master-section');

    let isActive2 = masterAdmin.style.display === 'block';
    masterAdmin.style.display = isActive2 ? 'none' : 'block';
    overlay2.style.display = isActive2 ? 'none' : 'block';

    if (!isActive2) {
      masterSection.style.display = 'block';
      isActive2 = true;
      console.log('isSectionVisible : block으로 설정');
    } else {
      masterSection.style.display = 'none';
      isActive2 = false;
      console.log('isSectionVisible : none으로 설정');
    }
  }

  overlay.addEventListener('click', () => {                           // overlay를 클릭하면 로그인 및 overlay style이 block > none으로 변경
    signupSection.style.display = 'none';
    overlay.style.display = 'none';
  });

  overlay2.addEventListener('click', () => {                          // overlay2를 클릭하면 회원가입 및 overlay2 style이 block > none으로 변경
    masterAdmin.style.display = 'none';
    overlay2.style.display = 'none';
  });

    // 수량 입력 필드의 요소를 가져옵니다.
    let popupQuantityInput = document.getElementById('popup-quantity');

    // 입력값을 확인하고 0 미만이면 1로 고정하는 함수
    function fixQuantity() {
        let currentValue = parseInt(popupQuantityInput.value);

        // 입력값이 숫자가 아니거나 0 미만이면 1로 설정
        if (isNaN(currentValue) || currentValue < 1) {
            popupQuantityInput.value = 1;
        }
    }

    // 페이지 로드시 한번 실행
    fixQuantity();

    // 입력 필드의 input 이벤트를 감지하여 fixQuantity 함수 호출
    popupQuantityInput.addEventListener('input', fixQuantity);



});




/** 로컬스토리지 **/
/* 전체적인 값 저장 및 로드 */
function getData(key) {                                              // 로컬스토리지에서 데이터 가져오기
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};                               // data가 로컬스토리지에 있다면 그 값을 아니면 빈값을 리턴
}
function saveData(key, data) {                                       // 로컬스토리지에서 데이터 저장하기
  localStorage.setItem(key, JSON.stringify(data));
}

/* 로컬스토리지 값 모두 초기화 */
function clearLocalStorage() {
  localStorage.clear();                                               // 모든 localStorage 항목 삭제
}

/* 장바구니 */
function loadCart() {
  return getData(`cart_${userType}`) || [];  // userCart[userType]을 로컬 스토리지에서 로드
}
function saveCart() {
  saveData(`cart_${userType}`, userCart[userType]);  // userCart[userType]을 로컬 스토리지에 저장
}

/* 찜하기 */
function loadWishList() {
  return getData(`wishlist_${userType}`) || {};
}
function saveWishList(list) {
  saveData(`wishlist_${userType}`, list);
}

/* 최근 본 상품 */
function getRecentItems() {
  return getData(`recent_${userType}`) || []; // 현재 사용자 유형에 맞는 최근본 상품 목록 반환
}
function saveRecentItems() {
  saveData(`recent_${userType}`, Array.from(RecentProducts[userType] || []));
}

/* 유저 데이터 불러오기 */
function loaduserType() {
  return localStorage.getItem('userType') || 'Guest';
}

/* 데이터 초기화 */
function initializeData() {
  if (userType === 'Guest') {                                   // userType이 Guest일 경우
    userCart[userType] = [];                                    // 장바구니를 빈 배열로 초기화
    wishlist = {};                                              // 찜하기를 빈 배열로 초기화
    RecentProducts[userType] = new Set();                       // 최근 본 상품을 새로 추가
  } else {                                                      // userType이 Guest가 아닐 경우
    userCart[userType] = loadCart();                            // 로컬스토리지에서 장바구니 값 불러오기
    wishlist = loadWishList();                                  // 로컬스토리지에서 찜하기 값 불러오기
    loadRecentItems();                                          // 로컬 스토리지에서 최근 본 상품 불러오기

    const recentItems = getRecentItems() || [];                 // userType에 따른 최근 본 상품을 로컬스토리지에서 불러와 recentItems로 선언
    if (Array.isArray(recentItems)) {                           // recentItems가 배열로 존재하면
      RecentProducts[userType] = new Set(recentItems);          // 그에 따른 항목을 배열 화
    } else {                                                    // 그외
      RecentProducts[userType] = new Set();                     // 최근 본 상품을 빈 배열로 초기화
    }
  }
}




/** 회원가입 **/
/* 회원가입 페이지 부문 */
function setupSignupForm() {
  const signupForm = document.getElementById('signup-form');  // signup-form id를 가진 html부문을 signupForm으로 변수선언
  if (signupForm) {                                           // 해당부분이 html에 존재 할 경우
    signupForm.addEventListener('submit', function (event) {  // submit 버튼 이벤트가 발생하면 실행한다.
      event.preventDefault();                                 // 창이 새로고침하여 실행되는것 방지
      const userId = document.getElementById('signup-id').value;          // html의 sigup-id의 값을 userId 변수로 지정
      const password = document.getElementById('signup-password').value;  // html의 sigup-의 password값을 password 변수로 지정
      const name = document.getElementById('signup-name').value;          // html의 sigup-name의 값을 name 변수로 지정
      const messageElement = document.getElementById('signup-message');   // html의 signup-message의 값을 messageElement로 지정

      const resultMessage = saveUserInfo(userId, password, name);         // 입력된 id, pw, name의 값을 saveUserInfo 기능을 통해 로컬스토리지에 저장하고 resultMessage 변수에도 저장

      messageElement.textContent = resultMessage;                         // 해당부분은 게정 수정 및 삭제할때 활용됨.
    });
  }
}

function removetext_signup() {                                         // ID와 PW 입력 필드 지우기
  document.getElementById('signup-id').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('signup-name').value = '';
  document.getElementById('signup-message').value = '';
}

/* 계정생성부분 */
function saveUserInfo(userId, password, name) {
  let users = JSON.parse(localStorage.getItem('users') || '{}');  // users 변수를 통해 로컬저장
  console.log('보유중인 계정을 읽습니다.')                          // 디버깅

  if (userId === 'Master') {                               // userId가 'Master'인 경우 userType을 'Master'로 설정
    users[userId] = { password, name };
    localStorage.setItem('users', JSON.stringify(users));  // 입력한 users값을 로컬스토리지에 저장
    displayUserList();                                     // 마스터 계정 생성 후 목록 업데이트
    console.log('마스터 계정이 성공적으로 생성되었습니다.');
    return document.getElementById('signup-message').value = '마스터 계정이 성공적으로 생성되었습니다.';
  }

  if (users[userId]) {                                    // users목록에 userId가 이미 있는경우 출력 [중복확인]
    console.log('이미 존재하는 ID입니다.');
    return document.getElementById('signup-message').value = '이미 존재하는 ID입니다.';
  }


  users[userId] = { password, name };                      // 일반 사용자 계정으로 저장
  localStorage.setItem('users', JSON.stringify(users));   // 입력한 users값을 로컬스토리지에 저장
  displayUserList();                                      // 일반 계정 생성 후 목록 업데이트
  console.log('계정이 성공적으로 생성되었습니다.');
  removetext_signup();
  setTimeout(function () {                                 // 2초 뒤에 메시지 숨기기
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }, 2000);

  return document.getElementById('signup-message').value = '계정이 성공적으로 생성되었습니다.';
}

/* 초기 계정 생성 부문 */
function initializeUserInfo() {                                       // 계정 회원가입과 별개로 생성시키고 값을 불러오는 곳
  console.log('로컬 스토리지 데이터:', localStorage.getItem('users'));  // 디버깅

  const users = getUserList();                                        // 로컬 스토리지에 저장한 사용자 목록을 users 변수로 선언

  if (!users['Master']) {
    saveUserInfo('Master', 'Master', 'Master');                        // Master 계정이 초기에 로컬에 없는 경우 마스터 계정 생성
    // saveUserInfo('ID', 'Pw', 'Name') 양식으로 기존에 계정을 추가 가능.
    displayUserList();                                                 // 목록 업데이트
  } else {
    displayUserList();                                                 // 이미 마스터 계정이 있어도 사용자 목록 표시
  }
}




/** 마스터 계정 **/
/* 계정 불러오기 */
function getUserList() {
  return JSON.parse(localStorage.getItem('users') || '{}');          // 로컬스토리지 users에서 사용자 목록을 getUserList()로 리턴한다.
}

/* 계정을 관리자창에 출력하는 부분 */
function displayUserList() {                                          // 사용자 목록을 화면에 표시
  console.log('displayUserList 호출됨');                              // 디버깅
  const users = getUserList();
  console.log('사용자 데이터:', users);                                // 디버깅

  const userList = document.getElementById('user-list');              // html의 user-list id를 불러와 userList로 선언
  userList.innerHTML = '';                                            // userList 변수 안의 내용을 지움

  // 전체 초기화 버튼 추가
  const clearAllButton = document.createElement('button');
  clearAllButton.textContent = '전체 초기화'; // 버튼 문구 설정
  clearAllButton.className = 'btn btn-3 hover-border-1'; // 버튼 스타일 설정
  clearAllButton.style.marginBottom = '20px'; // 버튼 하단 여백 설정
  clearAllButton.addEventListener('click', () => {
    var result = confirm('정말로 모든 데이터를 초기화하시겠습니까?');
    if (result) { // 사용자가 '확인'을 눌렀을 때
      clearLocalStorage(); // 로컬스토리지 초기화
      alert('모든 데이터가 초기화되었습니다.');
      initializeUserInfo(); // 사용자 목록 새로고침
    } else {
      alert('초기화를 취소했습니다.');
      initializeUserInfo(); // 사용자 목록 새로고침
    }
  });

  userList.appendChild(clearAllButton); // userList에 전체 초기화 버튼 추가



  Object.keys(users).forEach(userId => {                              // users 객체의 모든 키에 대해 반복적으로 작업을 수행
    console.log('userlist 불러온다.');                                 // 디버깅

    const userItem = document.createElement('div');                   // 각 사용자 항목을 생성할 div 요소
    userItem.style.paddingTop = '15px';                               // 위쪽 여백을 설정
    userItem.textContent = `ID: ${userId}, PW: ${users[userId].password}, Name: ${users[userId].name}`;

    const buttonContainer = document.createElement('div');            // 버튼을 담을 컨테이너 div 요소
    buttonContainer.style.marginTop = '15px';                          // 버튼 컨테이너의 위 여백 추가

    const deleteButton = document.createElement('button');            // button 객체 생성 deleteButton 변수 선언
    deleteButton.textContent = '삭제';                                // 삭제 문구 저장
    deleteButton.className = 'btn btn-3 hover-border-1';
    deleteButton.addEventListener('click', () => {                    // 해당 버튼 클릭시 이벤트 동작
      const resultMessage = deleteUser(userId);                       // 할당 userId 에대하여 deleteUser() 기능 수행
      alert(resultMessage);                                           // 삭제 후 알람.
      initializeUserInfo();                                           // 사용자 목록 새로고침
    });

    const updateButton = document.createElement('button');            // button 객체 생성하여 updateButton 변수 선언
    updateButton.textContent = '수정';                                // 수정 문구 저장
    updateButton.className = 'btn btn-3 hover-border-1';
    updateButton.style.marginRight = '5px';                           // 삭제 버튼과 수정 버튼 사이의 여백 추가
    updateButton.addEventListener('click', () => {                    // 해당 버튼 클릭시 이벤트 동작
      const newPassword = prompt('새 비밀번호를 입력하세요:');          // 프롬프트를 띄우고 입력한 값을 newPassword에 저장
      const newName = prompt('새 이름을 입력하세요:');                  // 프롬프트를 띄우고 입력한 값을 newName에 저장
      const resultMessage = updateUser(userId, newPassword, newName); // 새로 입력된 값들을 이용하여 updateUser() 기능을 수행
      alert(resultMessage);                                           // 수정 후 알람.
      initializeUserInfo();                                           // 사용자 목록 새로고침
    });

    buttonContainer.appendChild(updateButton);                        // buttonContainer에 updateButton을 상속시킴
    buttonContainer.appendChild(deleteButton);                        // buttonContainer에 deleteButton을 상속시킴

    userItem.appendChild(buttonContainer);                            // userItem에 buttonContainer를 상속시킴
    userItem.style.backgroundColor = 'rgba(103, 136, 255, 0.2)'       // userItem 별 스타일 지정
    userItem.style.borderRadius = '10px'
    userItem.style.width = '300px'
    userItem.style.height = '100px'
    userItem.style.marginTop = '10px'
    userItem.style.textAlign = 'center'

    userList.appendChild(userItem);                                   // userList에 userItem을 상속시킴.
  });
}

/* 계정 삭제 기능 */
function deleteUser(userId) {
  const users = getUserList(); // 로컬스토리지에서 사용자 목록을 불러옴
  if (!users[userId]) { // 사용자가 존재하지 않으면
    return '사용자가 존재하지 않습니다.';
  }

  // 사용자 데이터 삭제
  delete users[userId]; // 사용자의 데이터를 삭제
  localStorage.setItem('users', JSON.stringify(users)); // 업데이트된 사용자 목록 저장

  // 사용자 관련 데이터 삭제
  removeUserRelatedData(userId);

  return '사용자가 성공적으로 삭제되었습니다.';
}

/** 사용자 관련 데이터 삭제 */
function removeUserRelatedData(userId) {
  // 사용자 장바구니 삭제
  localStorage.removeItem(`cart_${userId}`);

  // 사용자 찜하기 목록 삭제
  localStorage.removeItem(`wishlist_${userId}`);

  // 사용자 최근 본 상품 삭제
  localStorage.removeItem(`recent_${userId}`);

  // 추가로 사용자 관련 데이터를 저장하는 다른 키가 있을 경우 모두 삭제
}

/* 계정 수정 */
function updateUser(userId, newPassword, newName) {           // Id는 유지하며 password와 name값을 수정
  const users = getUserList();                                // 로컬스토리지에서 값을 불러와 users로 선언
  if (!users[userId]) {                                       // userId가 없는데 출력 할 경우 해단부분 수행
    return '사용자가 존재하지 않습니다.';
  }

  users[userId] = { password: newPassword, name: newName };   // userId가 해당되는 항목에 대하여 password와 name을 새로 기입
  localStorage.setItem('users', JSON.stringify(users));       // 수정 이후의 users 변수값을 다시 로컬스토리지에 저장
  return '사용자 정보가 성공적으로 수정되었습니다.';
}




/** 로그인 **/
/* 계정 별 UI */
function updateUI() {                                                    // 로그인 상태를 확인하고 UI를 업데이트하는 함수
  const loginStatus = document.getElementById('login-status');
  const loginSpace = document.getElementById('login_space');
  const loginDropdown = document.getElementById('login-menu');
  const martcart = document.getElementById('market_guest');
  const welcomeMessage = document.getElementById('welcome-message');
  const managementIcon = document.getElementById('management-icon');

  const userType = loaduserType();                                      // 로컬스토리지에서 userType으로 저장된 값 불러오기
  const userName = localStorage.getItem('userName') || '사용자';         // 로컬스토리지에서 userName으로 저장된 값 불러오기

  if (userType === 'Guest') {                         // 게스트 일 경우
    loginStatus.style.display = 'none';                                 // 로그인 상태 영역 none 설정
    loginSpace.style.display = 'block';                                 // 로그인 영역 block 설정
    loginDropdown.classList.add('none');                                // 로그인 드롭박스 감추기
    martcart.style.display = 'none';                                    // 장바구니 none 설정
    managementIcon.style.display = 'none';                              // 관리자버튼 none 설정
    wishlist = {};                                                      // 찜하기 저장값 비우기
    updateWishlistUI();                                                 // 찜하기 값 유무에 따른 UI 업데이트
  } else if (userType === 'Master') {                 // 관리자 일 경우
    console.log('관리자 계정 접속')                                       // 디버깅
    loginStatus.style.display = 'block';                                 // 로그인 상태 영역 block 설정
    loginSpace.style.display = 'none';                                   // 로그인 영역 none 설정
    loginDropdown.classList.remove('show');                              // 로그인 드롭박스 보이기
    martcart.style.display = 'none';                                     // 장바구니 none 설정
    managementIcon.style.display = 'block'                               // 관리자버튼 block 설정
    welcomeMessage.textContent = `관리자계정님, 반갑습니다.`;              // 환영 메시지 출력
    document.getElementById('logout-btn').style.display = 'block';       // 로그아웃 버튼 보이기
  } else {                                            // 그 외
    console.log('일반 계정 접속')
    loginStatus.style.display = 'block';                                 // 로그인 상태 영역 block 설정
    loginSpace.style.display = 'none';                                   // 로그인 영역 none 설정
    martcart.style.display = 'block';                                    // 장바구니 block 설정
    managementIcon.style.display = 'none';                               // 관리자버튼 none 설정
    loginDropdown.classList.remove('show');                              // 로그인 드롭박스 보이기
    welcomeMessage.textContent = `${userName}님, 반갑습니다.`;            // 사용자 이름으로 환영 메시지 업데이트
    document.getElementById('logout-btn').style.display = 'block';       // 로그아웃 버튼 보이기
  }

  /* 로그인 이후 UI 업데이트 */
  updateCartIcon();                                                      // 장바구니 아이콘 업데이트
  updateWishlistUI();                                                    // 찜하기 UI 업데이트
  updateRecentProductsUI();                                              // 최근본상품 UI 업데이트
}

/* 로그인 기능 */
function login(userType) {
  this.userType = userType;
  const id = document.getElementById('login-id').value;                   // login-id에 입력한 값을 id로 저장
  const password = document.getElementById('login-password').value;       // login-password에 입력한 값을 password로 저장
  const users = JSON.parse(localStorage.getItem('users') || '{}');        // 로컬스토리지에서 users에 저장한 값 불러와 users로 선언
  const user = users[id];                                                 // users의 id로 저장된 값을 user로 선언

  if (user && user.password === password) {                               // users에 해당 id가 있고, password도 users에 등록된 password와 일치하면
    setuserType(id, user.name);                                           // seruserType() 기능을 통하여 id와 name 값을 불러옴
    showNotification('로그인 되었습니다.');                                // 알람
    document.getElementById('login-menu').classList.remove('show');       // 로그인 화면 끄기
  } else {                                                                // 일치하지 않으면 로그인하지 않도록 한다.             
    showNotification('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요..');
    document.getElementById('login-id').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('login-menu').classList.add('show');          // 로그인 화면 출력
  }

  initializeData();                                                       // 계정 별 초기값 추가 및 기존값 읽기
  //wishlist = loadWishList();                                            // 로컬 스토리지에서 찜하기 목록 불러오기 (현재 미수행시키기 위해 주석처리)
  updateUI();                                                             // UI 업데이트
}

/* 로그인 계정값 저장 */
function setuserType(userId, name) {
  userType = userId;
  userName = name;
  localStorage.setItem('userType', userId);     // 로컬스토리지에 userId 저장
  localStorage.setItem('userName', name);       // 로컬스토리지에 name 저장
  wishlist = loadWishList();                    // 로그인 후 현재 사용자의 찜하기 목록 불러오기
  cart = loadCart();
  updateUI();                                   // userId에 해당되는 값으로 UI 업데이트
}

/** 로그인 상태 해제 함수 */
function clearLoginState() {
  // 로그인 상태와 관련된 데이터 초기화
  localStorage.removeItem('userType');    // 로그인 상태 초기화
  localStorage.removeItem('userName');    // 사용자 이름 초기화

  userType = 'Guest';
  console.log(`유저타입 : `, userType)
  // 필요한 경우 다른 로그인 관련 데이터를 제거
}

window.addEventListener('load', function () {
  const userType = loaduserType();    // 로컬스토리지에서 사용자 타입을 로드
  if (userType !== 'Guest') {         // 사용자가 로그인 상태인 경우
    console.log(userType)
    clearLoginState();               // 로그인 상태를 초기화
    updateUI();                      // UI를 업데이트하여 로그인 상태를 반영
  }
});


/** 로그아웃 **/
function logout() {
  saveWishList(wishlist);               // 현재 찜하기 상태를 저장
  saveCart(cart);                       // 현재 장바구니 상태를 저장
  clearLoginState();                   // 로그인 상태만 초기화
  userCart['Guest'] = [];              // 장바구니를 빈 배열로 초기화
  wishlist = {};                       // 찜하기 리스트를 빈 객체로 초기화

  RecentProducts['Guest'] = new Set(); // 최근 본 상품 목록을 빈 Set으로 초기화

  showNotification('로그아웃 되었습니다.'); // 알림
  document.getElementById('login-menu').classList.add('show'); // 로그인 드롭박스 보이기
  closeCart();                      // 장바구니 팝업 닫기
  updateUI();                      // UI 업데이트
  removetext();                    // 로그인 창에 입력된 값 지우기
}

function removetext() {                                         // ID와 PW 입력 필드 지우기
  document.getElementById('login-id').value = '';
  document.getElementById('login-password').value = '';
}




/** 제품 목록 생성 **/
let currentCategory = '전체';
let CategoryTitle = document.getElementById('Category_Text')

/* 상품 목록 생성 함수 */
function createProducts(category) {
  // 기존의 상품 리스트를 지우기
  const productList = document.querySelector('.product-list');
  productList.innerHTML = ''; // 모든 자식 요소 제거
  /* 도서 타이틀 */
  const heading = document.getElementById('category-heading');
  heading.textContent = category + " 도서";

  // 새로운 카테고리에 맞는 상품들만 출력
  products.forEach(product => {
    if (category === '전체' || product.Category.includes(category)) {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      productItem.id = `product-${product.id}`;

      const formattedPrice = parseInt(product.price, 10).toLocaleString();

      productItem.innerHTML = `
      <img style="width:218px; height:300px" src="${product.image}">
      <div class="rating">${product.star}</div>
      <h3>${product.title}</h3>
      <p>작가 : ${product.author}</p>
      <p>출판사 : ${product.publisher}</p>
      <p style="text-size:50%; color:gray;">${product.style}</p>
      <p style="text-size:50%;">[ ${formattedPrice}원 ]</p>
      <div class="actions">
        <button class="add-to-wishlist" data-product-id="${product.id}">찜하기 ♡</button>
        <button class="add-to-cart">장바구니</button>
        <button class="open-info-page" data-product-id="${product.id}">상세정보</button>
        <button class="open-preview" data-product-id="${product.id}">미리보기</button>
      </div>
    `;

      productList.appendChild(productItem);

      // 각 버튼에 이벤트 추가
      const toggleWishlistButton = productItem.querySelector('.add-to-wishlist');
      const addToCartButton = productItem.querySelector('.add-to-cart');
      const openInfoPageButton = productItem.querySelector('.open-info-page');
      const openPreviewButton = productItem.querySelector('.open-preview');

      toggleWishlistButton.addEventListener('click', () => toggleWishlist(product.id));
      addToCartButton.addEventListener('click', () => addToCart(product.id));
      openInfoPageButton.addEventListener('click', () => {
        openPopup(product.id);
        addToRecentProducts(product.id);
        updateRecentProductsUI();
      });
      openPreviewButton.addEventListener('click', () => openPreview(product.id));
    }
  });
}

// 초기 실행
createProducts(currentCategory);

// 카테고리가 변할 때 호출할 함수
function changeCategory(newCategory) {
  currentCategory = newCategory;
  createProducts(currentCategory);
}


/* 추가 */
// 팝업 열기 함수
function openPopup(productId) {
  const product = products.find(p => p.id === productId);

  if (product) {
    const titleWithoutBr = product.title.replace(/<br>/gi, ' ');
    // 가격 형식화
    const formattedPrice = parseInt(product.price, 10).toLocaleString();
    // 팝업에 상품 정보 로드
    document.getElementById('popup-book-cover').src = product.image;
    document.getElementById('popup-book-title').textContent = titleWithoutBr;
    document.getElementById('popup-book-author').textContent = `작가: ${product.author}`;
    document.getElementById('popup-book-publisher').textContent = `출판사: ${product.publisher}`;
    document.getElementById('popup-book-genre').textContent = `장르: ${product.style}`;
    document.getElementById('popup-book-rating').textContent = `별점: ${product.star}`;
    document.getElementById('popup-book-price').textContent = `가격: ${formattedPrice}원`;

    document.getElementById('popup-summary-text').textContent = product.summary || '정보 없음';
    document.getElementById('popup-description-text').textContent = product.description || '정보 없음';

    const articlesList = document.getElementById('popup-articles-list');
    articlesList.innerHTML = (product.relatedArticles || []).map(article =>
      `<li><a href="${article.url}" target="_blank">${article.title}</a></li>`
    ).join('');

    // 수량 입력 필드를 1로 초기화
    document.getElementById('popup-quantity').value = 1;


    // 현재 상품 ID를 팝업에 저장
    document.getElementById('popup').dataset.productId = productId;

    // 팝업을 표시합니다.
    document.getElementById('popup').style.display = 'flex'; // display를 'block'에서 'flex'로 변경
  } else {
    console.error('상품을 찾을 수 없습니다. 상품 ID:', productId);
  }
}

function handleAddToCartFromPopup(productId) {
  addToCartFromPopup(productId);
}

// 팝업 닫기 함수
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// 팝업 외부 클릭 시 닫기
document.getElementById('popup').addEventListener('click', function (event) {
  if (event.target === this) {
    closePopup();
  }
});

/* 끝 */





/*** 주요 기능***/
/** 최근 본 상품 **/
/* 최근 본 상품 목록 추가 */
function addToRecentProducts(productId) {
  if (!RecentProducts[userType]) {
    RecentProducts[userType] = new Set();    // userType에 대한 저장값이 없으면 새로 생성
  }
  RecentProducts[userType].add(productId);
  saveRecentItems();                        // 최근 본 상품을 로컬스토리지에 저장
  updateRecentProductsUI();                 // 최근 본 상품UI 업데이트
}

/* 최근 본 상품 UI*/
function updateRecentProductsUI() {
  const recentProductsContainer = document.querySelector('.recent-products');
  recentProductsContainer.innerHTML = '<h3>최근 본 상품</h3>';

  const recentProductIds = Array.from(RecentProducts[userType] || []);    // 최근 본 상품을 배열화 하여 가져오고 recentProductIds로 선언

  recentProductIds.slice(-5).reverse().forEach(productId => {             // '최대 5개'에 대하여 '가장 최근의 이미지를 상단에 출력'하도록 반복
    const product = products.find(p => p.id === productId);
    if (product) {                                                        // productId가 존재하는 경우
      const img = document.createElement('img');
      img.src = product.image || '/api/placeholder/50/75';                // 이미지 출력
      img.alt = product.title;                                            // 제목 출력
      img.style.width = '50px';                                           // 최근 본 상품 이미지 가로 길이
      img.style.height = '75px';                                          // 최근 본 상품 이미지 세로 길이
      img.onclick = () => openPopup(productId);                        // 이미지 클릭 시 상세 페이지로 이동
      recentProductsContainer.appendChild(img);                           // 이미지값을 recentProductsContainer에 상속
    }
    else {                                                                // 그 외
      const title = document.createElement('p');
      title.textContent = product.title;                                  // 제목 출력
      title.onclick = () => openPopup(productId);                      // 클릭 시 상세 페이지로 이동
      recentProductsContainer.appendChild(title);                         // 제목을 recentProductsContainer에 상속
    }
  });
}

/* 최근 본 상품을 로컬 스토리지에서 로드하는 함수 */
function loadRecentItems() {
  const recentItems = getData(`recent_${userType}`);
  if (Array.isArray(recentItems)) {
    RecentProducts[userType] = new Set(recentItems);
  } else {
    RecentProducts[userType] = new Set();
  }
}

/* 쿠폰 적용 기능 */  // 현재 반영 안되어잇음.
function applyCoupon() {
  const couponCode = document.getElementById('coupon-input').value;
  const totalPrice = parseFloat(document.getElementById('total-price').textContent.replace(/,/g, ''));

  if (couponCode === 'DISCOUNT10') {
    const discountedPrice = totalPrice * 0.9; // 10% 할인
    document.getElementById('total-price').textContent = discountedPrice.toLocaleString(); // 천 단위 구분 쉼표 추가
    alert('쿠폰이 적용되었습니다. 10% 할인이 적용됩니다.');
    document.getElementById('coupon-input').value = '';

    // 총합계 텍스트를 할인적용 총합계로 변경
    const totalPriceContainer = document.getElementById('total-price-container');
    totalPriceContainer.innerHTML = `10%할인<br>총합계:<br><span id="total-price">${discountedPrice.toLocaleString()}</span> 원`;
  } else {
    alert('유효하지 않은 쿠폰 코드입니다.');
  }
}

/* 스크롤 탑 기능 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });        // top 0 지점까지 창의 스크롤을 부드럽게 이동시킨다.
}

/* 알림창 표시 함수 */
function showNotification(message) {
  const notification = document.getElementById('notification');

  if (!notification) {
    console.error('Notification element not found.');
    return;
  }

  notification.textContent = message;
  notification.classList.remove('hide');
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hide');
  }, 3000);
}




/** 미리보기 **/
/* 변수 선언 */
let currentPreviewBook = null;                                        // currentPreviewBook 변수 초기값을 null 로 지정
let currentPreviewPage = 0;                                           // currentPreviewPage 변수 초기값을 0으로 지정

/* 미리보기 열기 */
function openPreview(bookId) {
  const book = products.find(product => product.id === bookId);       // product의 product.id를 bookId로 지정
  if (!book) return;                                                  // bookId가 없을 경우 해당 기능을 수행하지 않음

  currentPreviewBook = book;                                          // currentPreviewBook 변수를 bookId로 지정
  currentPreviewPage = 0;                                             // currentPreviewPage 초기값을 다시 0으로 지정

  updatePreviewImage();                                               // 미리보기 페이지 업데이트
  document.querySelector('.preview-modal').style.display = 'block';   // preview-modal class를 block으로 변경

  addToRecentProducts(bookId);                                        // 최근 본 상품에 bookId를 추가
  updateRecentProductsUI();                                           // 최근 본 상품 UI 업데이트
}

/* 미리보기 닫기 */
function closePreview() {
  document.querySelector('.preview-modal').style.display = 'none';    // preview-modal class를 none으로 변경
}

/* 이전페이지 */
function prevPage() {
  if (currentPreviewPage > 0) {                                       // 페이지 수치가 0보다 크다면
    currentPreviewPage--;                                             // 페이지 수치를 1개 차감
  } else {                                                            // 그 외
    currentPreviewPage = currentPreviewBook.previewPages.length - 1;  // 마지막 페이지로 이동
  }
  updatePreviewImage();                                               // 페이지 이미지 업데이트
}

/* 이전 페이지 버튼에 이벤트 리스너 추가 */
document.getElementById('prev-page-btn').addEventListener('click', prevPage);

/* 다음페이지 */
function nextPage() {
  if (currentPreviewPage < currentPreviewBook.previewPages.length - 1) { // 페이지 수치가 최대 페이지보다 작다면
    currentPreviewPage++;                                                // 페이지 수치를 1개 증가
  } else {                                                               // 그 외
    currentPreviewPage = 0;                                              // 첫 번째 페이지로 이동
  }
  updatePreviewImage();                                                  // 페이지 이미지 업데이트
}

/* 다음 페이지 버튼에 이벤트 리스너 추가 */
document.getElementById('next-page-btn').addEventListener('click', nextPage);

/* 페이지 이미지 업데이트 */
function updatePreviewImage() {
  if (!currentPreviewBook) return;                                                                    // bookId가 없다면 해당 기능을 수행하지 않음
  document.getElementById('preview-image').src = currentPreviewBook.previewPages[currentPreviewPage]; // 페이지 별 이미지를 배열마다 삽입.
}

/* 미리보기 HTML 틀  */
const previewModalHTML = `
    <div class="preview-modal" style="display: none;">
        <div class="modal-content">
        <p id="book-title"></p> <!-- 책의 제목을 출력할 요소 -->
            <span class="close-btn" onclick="closePreview()">&times;</span>
            <img id="preview-image" src="" alt="미리보기 이미지" style="width: 1000px; height: 700px;">
            <div class="page-navigation">
                <button id="prev-page-btn" onclick="prevPage()">이전</button>
                <button id="next-page-btn" onclick="nextPage()">다음</button>
            </div>
        </div>
    </div>
`;

/* 모달 창을 대상요소 바로 뒤 문서에 추가 */
document.body.insertAdjacentHTML('beforeend', previewModalHTML);




/** 장바구니 기능 **/
/* 장바구니 추가 */
function addToCart(productId, quantity = 1) {
  console.log(`상품 ${productId.split('_')[1]}을 장바구니에 추가합니다.`); // 디버깅

  if (userType === 'Guest') { // 게스트라면 로그인 하라는 알람 출력
    alert('로그인이 필요합니다.');
    return;
  }

  console.log('Current userType:', userType);

  if (!Array.isArray(userCart[userType])) {
    console.error('userCart[userType] is not an array. Initializing to an empty array.');
    userCart[userType] = [];
  }

  // 장바구니에서 기존 아이템 찾기
  const existingItem = userCart[userType].find(item => item.id === productId);
  if (existingItem) { // 이미 존재하는 아이템이면 수량 증가
    existingItem.quantity += quantity;
    showNotification('장바구니에 기존 상품 수량 추가!');
  } else {
    // 새로운 상품이면 장바구니에 추가
    const product = products.find(item => item.id === productId);
    if (product) {
      userCart[userType].push({
        id: product.id,
        title: product.title,
        price: parseInt(product.price), // 가격을 숫자로 변환
        image: product.image || '/api/placeholder/50/75', // 이미지 URL
        quantity: quantity // 새로 추가할 때 사용자가 입력한 수량
      });
      showNotification('장바구니에 새 상품 추가!');
    } else {
      console.error('상품을 찾을 수 없습니다. 상품 ID:', productId);
    }
  }

  saveCart(); // 장바구니 상태를 로컬 스토리지에 저장
  updateCartUI(); // 장바구니 UI를 업데이트합니다.
  updateCartIcon(); // 장바구니 아이콘 UI를 업데이트합니다.
}

/* 장바구니 아이콘 UI */
function updateCartIcon() {
  let cartIcon = document.getElementById('cart-icon');
  let cart = Array.isArray(userCart[userType]) ? userCart[userType] : [];                                       // userCart[userType]이 배열에 존재하는지지 확인
  let cartItemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);                            // 현재 장바구니에 담긴 상품 개수를 가져옵니다.

  cartIcon.src = cartItemCount > 0 ? 'img/basket_fill.png' : 'img/basket_empty.png';    // 장바구니에 상품이 있는지 여부에 따라 아이콘을 변경합니다.
}

/* 장바구니 리스트 UI */
function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  if (!Array.isArray(userCart[userType])) {
    console.error('userCart[userType] is not an array. Initializing to an empty array.');
    userCart[userType] = [];
  }

  let total = 0;
  userCart[userType].forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>가격: ${item.price.toLocaleString()}원</p>
        <div class="quantity-controls">
          <button class="quantity-decrease" onclick="changeQuantity(${index}, -1)">-</button>
          <input type="text" class="quantity" value="${item.quantity}" oninput="updateQuantity(${index}, this.value)">
          <button class="quantity-increase" onclick="changeQuantity(${index}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-actions">
        <button onclick="removeFromCart(${index})">삭제</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  document.getElementById('total-price').textContent = total.toLocaleString();
}

/* 장바구니 수량 변경 */
function changeQuantity(index, change) {
  const item = userCart[userType][index];
  if (item) {
    console.log('변경 전 수량:', item.quantity);
    item.quantity += change;
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    console.log('변경 후 수량:', item.quantity);
    saveCart();
    updateCartUI();
  }
}

function updateQuantity(index, value) {
  const newQuantity = parseInt(value, 10);
  if (!isNaN(newQuantity) && newQuantity > 0) {
    userCart[userType][index].quantity = newQuantity;
    saveCart(); // 변경된 장바구니 상태를 로컬 스토리지에 저장
    updateCartUI(); // 장바구니 UI를 업데이트합니다.
  } else {
    console.error('Invalid quantity:', value);
  }
}

/* 장바구니 삭제 */
function removeFromCart(index) {
  userCart[userType].splice(index, 1);                         // 선택한 항목을 userCart[userType] 에서 추출
  saveCart();                                                  // userCart[userType]을 로컬 스토리지에 저장
  updateCartUI();                                              // 장바구니 UI 업데이트
  updateCartIcon();                                            // 장바구니 아이콘 UI 업데이트
}

/* 장바구니 팝업 열기 */
function openCart() {
  document.querySelector('.cart-overlay').style.display = 'flex';
  updateCartUI();                                                  // 장바구니 UI 업데이트
}

/* 장바구니 팝업 닫기 */
function closeCart() {
  document.querySelector('.cart-overlay').style.display = 'none';
}

/* 장바구니 초기화 */
function clearCart() {
  userCart[userType] = [];                                    // 장바구니를 빈 배열로 초기화
  //localStorage.setItem('cart', JSON.stringify(cart));         // 로컬 스토리지에 빈 장바구니 저장
  saveCart();                                                  // userCart[userType]을 로컬 스토리지에 저장
  updateCartUI();                                             // 장바구니 UI 업데이트
  alert('장바구니가 비워졌습니다.');                            // 알람
  updateCartIcon();                                           // 장바구니 아이콘 UI업데이트
}

/*시작 */
// 수량 증가 버튼 클릭 시 호출되는 함수
document.getElementById('popup-quantity-increase').addEventListener('click', () => {
  const quantityField = document.getElementById('popup-quantity');
  let quantity = parseInt(quantityField.value, 10);

  if (!isNaN(quantity)) {
    quantity++;
    quantityField.value = quantity;
  }
});

document.getElementById('popup-quantity-decrease').addEventListener('click', () => {
  const quantityField = document.getElementById('popup-quantity');
  let quantity = parseInt(quantityField.value, 10);

  if (!isNaN(quantity) && quantity > 1) {
    quantity--;
    quantityField.value = quantity;
  }
});

// 장바구니에 추가 버튼 클릭 시 호출되는 함수
document.getElementById('popup-add-to-cart').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  const productId = popup.dataset.productId; // 데이터 속성에서 상품 ID 가져오기
  const quantityField = document.getElementById('popup-quantity');
  const quantity = parseInt(quantityField.value, 10);

  if (!isNaN(quantity) && quantity > 0) {
    addToCart(productId, quantity); // 장바구니에 추가하는 함수 호출
    closePopup(); // 팝업 닫기
  } else {
    console.error('유효하지 않은 수량:', quantityField.value);
  }
});
/*끝 */




/** 찜하기 **/
/* 토글기능 */
function toggleWishlist(productId) {
  if (userType === 'Guest') {                                 // Guest는 해당 기능 사용 못하도록 차단
    alert('로그인이 필요합니다.');
    return;
  }

  console.log(`상품 ${productId}의 찜하기 버튼을 선택합니다.`);  // 디버깅
  showNotification('찜하기를 선택하셨습니다.');
  wishlist[productId] = !wishlist[productId];                 // 찜하기 상태 토글 false면 true로, true면 false로
  saveWishList(wishlist);                                     // 찜하기 상태를 로컬 스토리지에 저장
  updateWishlistUI();                                         // 찜하기 UI 업데이트
}

/* 찜하기 UI */
function updateWishlistUI() {
  const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
  wishlistButtons.forEach(button => {
    const productId = button.dataset.productId;
    if (productId) {
      const isWished = wishlist.hasOwnProperty(productId) ? wishlist[productId] : false;    // 찜하기 상태가 undefined일 경우 false로 기본값 설정
      button.textContent = isWished ? '찜한상태 ♥' : '찜하기 ♡';                            // 버튼 텍스트 업데이트
      button.classList.toggle('checked', isWished);                                         // 체크 상태에 따라 클래스 토글
    }
  });
}