let userType = 'Guest'; // 기본값을 'Guest'로 설정 
let userName = '';

let cartItems = [];  // 장바구니 아이템 리스트를 저장할 배열
let cart = JSON.parse(localStorage.getItem('cart')) || [];

let wishlist = {}; // 찜하기 상태를 저장할 전역 변수
// 페이지 로드 시 초기화






/* 회원가입 */
function saveUserInfo(userId, password, name) {
  const users = JSON.parse(localStorage.getItem('users') || '{}');

  // 이미 존재하는 ID 확인
  if (users[userId]) {
    return '이미 존재하는 ID입니다.';
  }

  // 새로운 사용자 정보 저장
  users[userId] = { password, name };
  localStorage.setItem('users', JSON.stringify(users));
  return '계정이 성공적으로 생성되었습니다.';
}

function initializeUserInfo() {
  // 예시로 초기 사용자 정보 설정 (실제로는 별도의 UI를 통해 입력받음)
  saveUserInfo('1', '1', 'User1');
  saveUserInfo('2', '2', 'User2');
  saveUserInfo('Master','Master','Master')
}


// 계정 생성 폼 제출 처리
function setupSignupForm() {
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault(); // 폼 제출 기본 동작 방지

      const userId = document.getElementById('signup-id').value;
      const password = document.getElementById('signup-password').value;
      const name = document.getElementById('signup-name').value;
      const messageElement = document.getElementById('signup-message');

      // 계정 생성 시도
      const resultMessage = saveUserInfo(userId, password, name);

      // 결과 메시지 표시
      messageElement.textContent = resultMessage;
    });
  }
}


// 계정 생성 버튼 클릭 시 폼 표시
function setupShowSignupFormButton() {
  const showSignupFormButton = document.getElementById('show-signup-form');
  if (showSignupFormButton) {
    showSignupFormButton.addEventListener('click', function () {
      const signupSection = document.getElementById('signup-section');
      if (signupSection) {
        signupSection.style.display = (signupSection.style.display === 'none' || signupSection.style.display === '') ? 'block' : 'none';
      }
    });
  }
}

/* 마스터 계정 */
// 사용자 목록을 가져오는 함수
function getUserList() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

// 사용자 삭제
function deleteUser(userId) {
  const users = getUserList();
  if (!users[userId]) {
    return '사용자가 존재하지 않습니다.';
  }

  delete users[userId];
  localStorage.setItem('users', JSON.stringify(users));
  return '사용자가 성공적으로 삭제되었습니다.';
}

// 사용자 정보 수정
function updateUser(userId, newPassword, newName) {
  const users = getUserList();
  if (!users[userId]) {
    return '사용자가 존재하지 않습니다.';
  }

  users[userId] = { password: newPassword, name: newName };
  localStorage.setItem('users', JSON.stringify(users));
  return '사용자 정보가 성공적으로 수정되었습니다.';
}

// Master 계정 기능 초기화
function initializeMasterFeatures() {
  console.log('Master 기능 초기화 중'); // 디버깅용 로그 추가

  const masterSection = document.getElementById('setup-section');
  if (!masterSection) return;

  const userList = document.getElementById('user-list');
  const users = getUserList();
  userList.innerHTML = ''; // 기존 목록 지우기

  Object.keys(users).forEach(userId => {
    const userItem = document.createElement('div');
    userItem.textContent = `ID: ${userId}, Name: ${users[userId].name}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {
      const resultMessage = deleteUser(userId);
      alert(resultMessage);
      initializeMasterFeatures(); // 목록 새로고침
    });

    const updateButton = document.createElement('button');
    updateButton.textContent = '수정';
    updateButton.addEventListener('click', () => {
      const newPassword = prompt('새 비밀번호를 입력하세요:');
      const newName = prompt('새 이름을 입력하세요:');
      const resultMessage = updateUser(userId, newPassword, newName);
      alert(resultMessage);
      initializeMasterFeatures(); // 목록 새로고침
    });

    userItem.appendChild(deleteButton);
    userItem.appendChild(updateButton);
    userList.appendChild(userItem);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // 모든 localStorage 항목을 삭제하는 것이 맞는지 확인하세요.
  clearLocalStorage(); // 주석 처리하거나 조건에 따라 호출

  initializeUserInfo(); // 초기 사용자 정보 설정
  setupSignupForm(); // 계정 생성 폼 설정
  setupShowSignupFormButton(); // 계정 생성 버튼 설정

  userType = loaduserType(); // 현재 사용자 유형을 로드
  wishlist = loadWishList(); // 로컬 스토리지에서 찜하기 목록 불러오기
  updateUI(); // UI 업데이트
  initializeData(); // 데이터 초기화
  initializeMasterFeatures(); // Master 기능 초기화

  // 계정 생성 및 관리자 계정 설정
  const triggerImage = document.getElementById('trigger-image');
  const triggerImage2 = document.getElementById('show-management');
  const signupSection = document.getElementById('signup-section');
  const masterAdmin = document.getElementById('setup-section');
  const overlay = document.getElementById('overlay');
  const overlay2 = document.getElementById('overlay2');

  function toggleSignupSection() {
    const isActive = signupSection.style.display === 'block';
    signupSection.style.display = isActive ? 'none' : 'block';
    overlay.style.display = isActive ? 'none' : 'block';
  }

  function toggleMasterSection() {
    const isActive = masterAdmin.style.display === 'block';
    masterAdmin.style.display = isActive ? 'none' : 'block';
    overlay2.style.display = isActive ? 'none' : 'block';

    if (!isActive) {
      initializeMasterFeatures(); // 사용자 목록 표시
    }
  }

  overlay.addEventListener('click', () => {
    signupSection.style.display = 'none';
    overlay.style.display = 'none';
  });

  overlay2.addEventListener('click', () => {
    masterAdmin.style.display = 'none';
    overlay2.style.display = 'none';
  });

  triggerImage.addEventListener('click', toggleSignupSection);
  triggerImage2.addEventListener('click', toggleMasterSection);
});





/* 로그인 */

function setuserType(userId, name) { // 로그인 상태를 localStorage에 저장
  userType = userId;
  userName = name;
  localStorage.setItem('userType', userId);
  localStorage.setItem('userName', name); // 이름 저장
  wishlist = loadWishList(); // 로그인 후 현재 사용자의 찜하기 목록 불러오기
  updateUI(); // UI 업데이트
}


function getStorageKey(baseKey) { // 현재 사용자 유형에 따라 키를 설정
  return userType === 'Guest' ? baseKey : `${baseKey}_${userType}`;
}


function getData(key) { // 데이터 가져오기
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
}

function saveData(key, data) { // 데이터 저장하기
  localStorage.setItem(key, JSON.stringify(data));
}

// 장바구니 관리
function getCart() {
  const cartData = localStorage.getItem(`cart_${userType}`);
  return cartData ? JSON.parse(cartData) : [];
}

// 장바구니를 로컬 스토리지에 저장하는 함수
function saveCart(cart) {
  localStorage.setItem(`cart_${userType}`, JSON.stringify(cart));
}


// 찜하기 상태를 로컬 스토리지에서 로드
function loadWishList() {
  return getData(`wishlist_${userType}`) || {}; // 현재 사용자 유형에 맞는 찜하기 상태 반환
}

// 찜하기 상태를 로컬 스토리지에 저장
function saveWishList(list) {
  saveData(`wishlist_${userType}`, list); // 현재 사용자 유형에 맞게 찜하기 상태 저장
}

// 최근본 상품을 로컬 스토리지에서 로드
function getRecentItems() {
  return getData(`recent_${userType}`) || []; // 현재 사용자 유형에 맞는 최근본 상품 목록 반환
}

// 최근본 상품을 로컬 스토리지에 저장
function saveRecentItems() {
  saveData(`recent_${userType}`, Array.from(RecentProducts[userType] || []));
}

//로컬스토리지모두 날리기
function clearLocalStorage() {
  localStorage.clear(); // 모든 localStorage 항목 삭제
}

// 로그인 시 데이터 불러오기
function loaduserType() {
  return localStorage.getItem('userType') || 'Guest';
}


// 로그인 상태를 확인하고 UI를 업데이트하는 함수
function updateUI() {
  const loginStatus = document.getElementById('login-status');
  const loginSpace = document.getElementById('login_space');
  const loginDropdown = document.getElementById('login-menu');
  const martcart = document.getElementById('market_guest');
  const welcomeMessage = document.getElementById('welcome-message');

  const userType = loaduserType(); // 현재 사용자 유형을 로드
  const userName = localStorage.getItem('userName') || '사용자'; // 저장된 사용자 이름 불러오기

  if (userType === 'Guest') {
    loginStatus.style.display = 'none'; // 로그아웃 상태에서는 보이지 않게
    loginSpace.style.display = 'block'; // 로그인 아이콘 보이기
    loginDropdown.classList.add('none'); // 로그인 드롭박스 보이기
    martcart.style.display = 'none';

    // 찜하기 UI 업데이트 (로그아웃 시 비어있는 상태로 표시)
    wishlist = {}; // 로그인 후 새 사용자로 대체됨
    updateWishlistUI();
  } else {
    loginStatus.style.display = 'block'; // 로그인 상태에서는 보이게
    loginSpace.style.display = 'none'; // 로그인 아이콘 숨기기
    martcart.style.display = 'block';
    loginDropdown.classList.remove('show'); // 로그인 드롭박스 숨기기
    welcomeMessage.textContent = `${userName}님, 반갑습니다.`; // 사용자 이름으로 환영 메시지 업데이트
    document.getElementById('logout-btn').style.display = 'block'; // 로그아웃 버튼 보이기
  }

  // 로그인 상태에 따른 추가 UI 업데이트
  updateCartIcon();         // 장바구니 아이콘업데이트
  updateWishlistUI(); // 찜하기 UI 업데이트
  updateRecentProductsUI(); // 최근본상품 UI 업데이트
}








// 로그인 함수
function login(userType) {
  this.userType = userType;
  const id = document.getElementById('login-id').value;
  const password = document.getElementById('login-password').value;

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const user = users[id];

  if (user && user.password === password) {
    setuserType(id, user.name);
    alert(`${user.name}님, 로그인에 성공했습니다.`);
    document.getElementById('login-menu').classList.remove('show'); // 로그인 폼 숨기기
  } else {
    alert('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
    document.getElementById('login-menu').classList.add('show'); // 로그인 폼 보이기
  }

  initializeData(); // 로그인 후 데이터 초기화
  //wishlist = loadWishList(); // 로컬 스토리지에서 찜하기 목록 불러오기
  updateUI(); // UI 업데이트
}


/* 로그아웃 */
// 로그아웃 시 데이터는 유지하며 사용자 유형만 'Guest'로 변경
function logout() {
  saveWishList(wishlist); // 현재 찜하기 상태를 저장
  setuserType('Guest', ''); // 사용자 유형을 Guest로 설정하고 이름을 빈 문자열로 초기화
  userCart['Guest'] = []; // 손님 장바구니를 빈 배열로 초기화
  wishlist = {}; // 찜하기 리스트를 빈 객체로 초기화
  RecentProducts['Guest'] = new Set(); // 최근 본 상품 목록을 빈 Set으로 초기화


  alert('로그아웃되었습니다.');
  document.getElementById('login-menu').classList.add('show'); // 로그인 드롭박스 보이기
  closeCart();
  updateUI(); // 로그아웃 후 UI 업데이트
  removetext();
}

// 취소 버튼 함수
function removetext() {
  // ID와 PW 입력 필드 지우기
  document.getElementById('login-id').value = '';
  document.getElementById('login-password').value = '';
}





// 페이지 로드 시 로그인 상태 확인 및 처리
function initialize() {
  userType = loaduserType(); // 저장된 사용자 유형 불러오기
  wishlist = loadWishList(); // 저장된 찜하기 리스트 불러오기
  updateUI(); // UI 업데이트
}

// 로그인 시 데이터 초기화
function initializeData() {
  if (userType === 'Guest') {
    userCart[userType] = []; // 빈 배열로 초기화
    wishlist = {};
    RecentProducts[userType] = new Set(); // 빈 Set으로 초기화
  } else {
    // 로그인 시 사용자의 장바구니, 찜하기 리스트, 최근 본 상품 목록 불러오기
    userCart[userType] = getCart() || [];
    wishlist = loadWishList();
    loadRecentItems(); // 최근 본 상품 불러오기
    // getRecentItems()가 배열을 반환한다고 가정
    const recentItems = getRecentItems() || [];
    if (Array.isArray(recentItems)) {
      RecentProducts[userType] = new Set(recentItems);
    } else {
      console.error('getRecentItems() did not return an array');
      RecentProducts[userType] = new Set(); // 빈 Set으로 초기화
    }
  }
}



// 페이지 로드 시 데이터 초기화
window.onload = function () {
  initialize();
  initializeData();
  createProducts();
  updateUI(); // 페이지 로드 시 UI 업데이트
};


const wishListKey = `wishlist_${userType}`;
const recentItemsKey = `recent_${userType}`;
const cartKey = `cart_${userType}`;


// 각 사용자별 데이터 저장 객체
const userCart = {
  Guest: [],
  User1: [],
  User2: []
};

const userWishlist = {
  Guest: {},
  User1: {},
  User2: {}
};

const RecentProducts = {
  Guest: new Set(),
  User1: new Set(),
  User2: new Set()
};


// 제품 목록 생성
// 상품 목록 데이터 배열
const products = [
  { id: 'book_1', image: '', title: '도서 제목 1', author: '저자1', publisher: '출판사1', style: '장르', star: '★☆☆☆☆', price: '15000', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] },
  { id: 'book_2', image: '', title: '스릴러제목', author: '윤동주', publisher: '서동탄 출판', style: '장르', star: '★★☆☆☆', price: '30000', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] },
  { id: 'book_3', image: '', title: '판타지제목', author: '김태영', publisher: '평택 출판', style: '장르', star: '★★★★☆', price: '7000', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] },
  { id: 'book_4', image: '', title: '그냥그런제목', author: '임정호', publisher: '오산 출판', style: '장르', star: '★★★★☆', price: '22000', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] },
  { id: 'book_5', image: '', title: '도서 제목 5', author: '저자5', publisher: '출판사5', style: '장르', star: '★★★★☆', price: '22500', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] },
  { id: 'book_6', image: '', title: '도서 제목 6', author: '저자6', publisher: '출판사6', style: '장르', star: '★★★★☆', price: '30000', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] },
  { id: 'book_7', image: '', title: '도서 제목 7', author: '저자7', publisher: '출판사7', style: '장르', star: '★★★★☆', price: '10000', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] },
  { id: 'book_8', image: '', title: '도서 제목 8', author: '저자8', publisher: '출판사8', style: '장르', star: '★★★★☆', price: '9900', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] },
  { id: 'book_9', image: '', title: '도서 제목 9', author: '저자9', publisher: '출판사9', style: '장르', star: '★★★★☆', price: '9900', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] },
  { id: 'book_10', image: '', title: '도서 제목 10', author: '저자10', publisher: '출판사10', style: '장르', star: '★★★★☆', price: '7500', previewPages: ['/api/book1/page1', '/api/book1/page2', '/api/book1/page3', '/api/book1/page4', '/api/book1/page5'] }
];

// 상품 목록 생성 함수
function createProducts() {
  const productList = document.querySelector('.product-list');

  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.id = 'product-${product.id}';
    productItem.innerHTML = `
        <img src="/api/placeholder/200/300">
        <div class="rating">${product.star}</div>
        <h3>${product.title}</h3>
        <p>${product.author} | ${product.publisher}</p>
        <p style="text-size:50%; color:gray;">${product.style}</p>
        <div class="actions">
          <button class="add-to-wishlist" data-product-id="${product.id}">찜하기 ♡</button>
          <button class="add-to-cart">장바구니</button>
          <button class="open-info-page">상세정보</button>
          <button class="open-preview">미리보기</button>
        </div>
      `;

    productList.appendChild(productItem);

    // 각 버튼에 이벤트 리스너 추가
    const toggleWishlistButton = productItem.querySelector('.add-to-wishlist');
    const addToCartButton = productItem.querySelector('.add-to-cart');
    const openInfoPageButton = productItem.querySelector('.open-info-page');
    const openPreviewButton = productItem.querySelector('.open-preview');

    toggleWishlistButton.addEventListener('click', () => toggleWishlist(product.id));
    addToCartButton.addEventListener('click', () => addToCart(product.id));
    openInfoPageButton.addEventListener('click', () => openInfoPage(product.id));
    openPreviewButton.addEventListener('click', () => openPreview(product.id));
  });
}



// 상세 정보 페이지 열기 함수
function openInfoPage(productId) {
  console.log(`상품 ${productId.split('_')[1]}의 상세 정보 페이지를 엽니다.`);
  if (userType === 'Guest') {
    alert('로그인이 필요합니다.');
    return;
  }
  // 페이지 이동 로직 구현
  window.location.href = `C:\\PJT_1\\page\\book_${productId.split('_')[1]}_info.html`; // 예시: book_1_info.html
}


// 쿠폰 적용 기능
function applyCoupon() {
  const couponCode = document.getElementById('coupon-input').value;
  if (couponCode === 'DISCOUNT10') {
    const totalPrice = parseInt(document.getElementById('total-price').textContent);
    const discountedPrice = totalPrice * 0.9; // 10% 할인
    document.getElementById('total-price').textContent = discountedPrice.toFixed(0);
    alert('쿠폰이 적용되었습니다. 10% 할인이 적용됩니다.');
  } else {
    alert('유효하지 않은 쿠폰 코드입니다.');
  }
}




/* 최근 본 상품 기능 */
function addToRecentProducts(productId) {
  if (!RecentProducts[userType]) {
    // 유저 타입에 대한 Set이 없으면 새로 생성
    RecentProducts[userType] = new Set();
  }
  RecentProducts[userType].add(productId);
  saveRecentItems(); // 최근 본 상품을 저장
  updateRecentProductsUI(); // UI 업데이트
}

// 최근 본 상품 기능 수정
function updateRecentProductsUI() {
  const recentProductsContainer = document.querySelector('.recent-products');
  recentProductsContainer.innerHTML = '<h3>최근 본 상품</h3>';

  // 최근 본 상품 목록을 가져옴
  const recentProductIds = Array.from(RecentProducts[userType] || []);

  recentProductIds.slice(-5).reverse().forEach(productId => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const img = document.createElement('img');
      img.src = product.image || '/api/placeholder/50/75'; // 이미지 URL
      img.alt = product.title;
      img.style.width = '50px'; // 최근 본 상품 이미지 크기
      img.style.height = '75px';
      img.onclick = () => openInfoPage(productId); // 클릭 시 상세 페이지로 이동
      recentProductsContainer.appendChild(img);
    }
    else {
      const title = document.createElement('p');
      title.textContent = product.title;
      title.onclick = () => openInfoPage(productId); // 클릭 시 상세 페이지로 이동
      recentProductsContainer.appendChild(title);
    }
  });
}




/* 스크롤 탑 기능 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}




/* 미리보기 기능 */
// 미리보기 팝업 모달을 제어할 변수와 함수
let currentPreviewBook = null;
let currentPreviewPage = 0;

function openPreview(bookId) {
  const book = products.find(product => product.id === bookId);
  if (!book) return;

  currentPreviewBook = book;
  currentPreviewPage = 0;

  updatePreviewImage();
  document.querySelector('.preview-modal').style.display = 'block';

  // 최근 본 상품에 추가
  addToRecentProducts(bookId);

  // 최근 본 상품 UI 업데이트
  updateRecentProductsUI();

}

function closePreview() {
  document.querySelector('.preview-modal').style.display = 'none';
}

function prevPage() {
  if (currentPreviewPage > 0) {
    currentPreviewPage--;
  } else {
    currentPreviewPage = currentPreviewBook.previewPages.length - 1; // 마지막 페이지로 이동
  }
  updatePreviewImage();
}

function nextPage() {
  if (currentPreviewPage < currentPreviewBook.previewPages.length - 1) {
    currentPreviewPage++;
  } else {
    currentPreviewPage = 0; // 첫 번째 페이지로 이동
  }
  updatePreviewImage();
}

// 최근 본 상품을 로컬 스토리지에서 로드하는 함수
function loadRecentItems() {
  const recentItems = getData(`recent_${userType}`);
  if (Array.isArray(recentItems)) {
    RecentProducts[userType] = new Set(recentItems);
  } else {
    RecentProducts[userType] = new Set();
  }
}

function updatePreviewImage() {
  if (!currentPreviewBook) return;
  document.getElementById('preview-image').src = currentPreviewBook.previewPages[currentPreviewPage];
}

// HTML 모달 창 구조와 CSS 스타일
// 미리보기 모달 HTML
const previewModalHTML = `
    <div class="preview-modal" style="display: none;">
        <div class="modal-content">
        <p id="book-title"></p> <!-- 책의 제목을 출력할 요소 -->
            <span class="close-btn" onclick="closePreview()">&times;</span>
            <img id="preview-image" src="" alt="미리보기 이미지" style="width: 1000px; height: 400px;">
            <div class="page-navigation">
                <button id="prev-page-btn" onclick="prevPage()">이전</button>
                <button id="next-page-btn" onclick="nextPage()">다음</button>
            </div>
        </div>
    </div>
`;

// 모달 창을 문서에 추가
document.body.insertAdjacentHTML('beforeend', previewModalHTML);

// 이전 페이지 버튼에 이벤트 리스너 추가
document.getElementById('prev-page-btn').addEventListener('click', prevPage);

// 다음 페이지 버튼에 이벤트 리스너 추가
document.getElementById('next-page-btn').addEventListener('click', nextPage);





/* 장바구니 기능*/

function addToCart(productId) {
  console.log(`상품 ${productId.split('_')[1]}을 장바구니에 추가합니다.`);

  if (userType === 'Guest') {
    alert('로그인이 필요합니다.');
    return;
  }

  const existingItem = userCart[userType].find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    // 상품 목록에서 상품을 찾아서 정보 추가
    const product = products.find(item => item.id === productId);
    if (product) {
      userCart[userType].push({
        id: product.id,
        title: product.title,
        price: parseInt(product.price), // 가격을 숫자로 변환
        image: product.image || '/api/placeholder/50/75', // 이미지 URL
        quantity: 1
      });
    }
  }

  saveCart(userCart[userType]); // 장바구니를 로컬 스토리지에 저장합니다.
  updateCartUI(); // 장바구니 UI를 업데이트합니다.
  updateCartIcon();
}


function updateCartIcon() {
  let cartIcon = document.getElementById('cart-icon');

  // userCart[userType]이 배열인지 확인합니다.
  let cart = Array.isArray(userCart[userType]) ? userCart[userType] : [];

  // 현재 장바구니에 담긴 상품 개수를 가져옵니다.
  let cartItemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  // 장바구니에 상품이 있는지 여부에 따라 아이콘을 변경합니다.
  cartIcon.src = cartItemCount > 0 ? 'C:\\PJT_1\\img\\basket_fill.png' : 'C:\\PJT_1\\img\\basket_empty.png';
}

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
                <p>가격: ${item.price.toLocaleString()}원</p> <!-- 가격에 천단위 구분기호 추가 -->
                <div class="quantity-controls">
                    <button class="quantity-decrease" onclick="changeQuantity(${index}, -1)">-</button>
                    <input type="text" class="quantity" value="${item.quantity}" readonly>
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
  document.getElementById('total-price').textContent = total.toLocaleString(); // 총 가격에 천단위 구분기호 추가
}

function changeQuantity(index, change) {
  const item = userCart[userType][index];
  item.quantity += change;
  if (item.quantity <= 0) {
    item.quantity = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function removeFromCart(index) {
  userCart[userType].splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartIcon();
}

function openCart() {
  document.querySelector('.cart-overlay').style.display = 'flex'; // 장바구니 오버레이 표시
  updateCartUI();
}

function closeCart() {
  document.querySelector('.cart-overlay').style.display = 'none'; // 장바구니 오버레이 숨기기
}

function clearCart() {
  userCart[userType] = []; // 장바구니를 빈 배열로 초기화
  localStorage.setItem('cart', JSON.stringify(cart)); // 로컬 스토리지에 빈 장바구니 저장
  updateCartUI(); // 장바구니 UI 업데이트
  alert('장바구니가 비워졌습니다.');
  updateCartIcon();
}





/* 찜하기 */


// 찜하기 버튼 클릭 시 상태 변경
function toggleWishlist(productId) {
  if (userType === 'Guest') {
    alert('로그인이 필요합니다.');
    return;
  }

  console.log(`상품 ${productId}의 찜하기 버튼을 선택합니다.`);
  wishlist[productId] = !wishlist[productId]; // 찜하기 상태 토글
  saveWishList(wishlist); // 찜하기 상태를 로컬 스토리지에 저장
  updateWishlistUI(); // UI 업데이트
}

// 찜하기 상태를 로컬 스토리지에서 로드
function loadWishList() {
  return getData(`wishlist_${userType}`) || {}; // 현재 사용자 유형에 맞는 찜하기 상태 반환
}

// 찜하기 상태를 로컬 스토리지에 저장
function saveWishList(list) {
  saveData(`wishlist_${userType}`, list); // 현재 사용자 유형에 맞게 찜하기 상태 저장
}

// 찜하기 버튼의 UI를 업데이트
function updateWishlistUI() {
  const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
  wishlistButtons.forEach(button => {
    const productId = button.dataset.productId;
    if (productId) {
      // 찜하기 상태가 undefined일 경우 false로 기본값 설정
      const isWished = wishlist.hasOwnProperty(productId) ? wishlist[productId] : false;
      button.textContent = isWished ? '찜한상태 ♥' : '찜하기 ♡'; // 버튼 텍스트 업데이트
      button.classList.toggle('checked', isWished); // 체크 상태에 따라 클래스 토글
    }
  });
}

// 모든 찜하기 상태를 초기화하고 UI를 업데이트
function clearWishlist() {
  wishlist = {}; // 찜하기 상태를 빈 객체로 초기화
  saveWishList(wishlist); // 로컬 스토리지에 초기화된 상태 저장
  updateWishlistUI(); // UI 업데이트
}
