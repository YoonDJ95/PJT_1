// 현재 사용자 유형을 저장할 변수
let userType = 'Guest'; // 기본값을 'Guest'로 설정

// 장바구니 아이템 리스트를 저장할 배열
let cartItems = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 찜하기 배열
let wishlist = {}; // 찜하기 상태를 저장할 전역 변수



/* 로그인 */

// 로그인 상태를 localStorage에 저장
function setUserType(type) {
  userType = type;
  localStorage.setItem('userType', type);
  wishlist = loadWishList(); // 로그인 후 현재 사용자의 찜하기 목록 불러오기
  updateUI(); // UI 업데이트
}

// 로그인 상태를 localStorage에서 불러오기
function loadUserType() {
  return localStorage.getItem('userType') || 'Guest'; // 기본값을 'Guest'로 설정
}

// 현재 사용자 유형에 따라 키를 설정
function getStorageKey(baseKey) {
  return userType === 'Guest' ? baseKey : `${baseKey}_${userType}`;
}

// 데이터 가져오기
function getData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// 장바구니 관리
function getCart() {
  return getData('cart');
}

function saveCart(cart) {
  if (userType !== 'Guest') {
    saveData('cart', cart);
  }
}

// 찜하기 상태를 로컬 스토리지에서 로드
function loadWishList() {
  return getData(`wishlist_${userType}`) || {}; // 현재 사용자 유형에 맞는 찜하기 상태 반환
}

// 찜하기 상태를 로컬 스토리지에 저장
function saveWishList(list) {
  saveData(`wishlist_${userType}`, list); // 현재 사용자 유형에 맞게 찜하기 상태 저장
}

// 최근상품 관리
function getRecentItems() {
  return getData('recent');
}

function saveRecentItems(recentItems) {
  saveData('recent', recentItems);
}

//로컬스토리지모두 날리기
function clearLocalStorage() {
  localStorage.clear(); // 모든 localStorage 항목 삭제
}

// 로그인 시 데이터 불러오기
function loadUserType() {
  return localStorage.getItem('userType') || 'Guest';
}


// 로그인 상태를 확인하고 UI를 업데이트하는 함수
function updateUI() {
  const loginStatus = document.getElementById('login-status');
  const loginSpace = document.getElementById('login_space');
  const loginDropdown = document.getElementById('login-menu');
  const martcart = document.getElementById('market_guest');

  const userType = loadUserType(); // 현재 사용자 유형을 로드

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
    document.getElementById('welcome-message').textContent = `${userType}님, 반갑습니다.`; // 사용자 환영 메시지 업데이트
    document.getElementById('logout-btn').style.display = 'block'; // 로그아웃 버튼 보이기
  }

  // 로그인 상태에 따른 추가 UI 업데이트
  updateCartIcon();
  updateWishlistUI(); // 찜하기 UI 업데이트
}








// 로그인 함수
function login() {
  const id = document.getElementById('login-id').value;
  const password = document.getElementById('login-password').value;

  if (id === '1' && password === '1') {
    setUserType('User1');
    alert('User1님, 로그인에 성공했습니다.');
    document.getElementById('login-menu').classList.remove('show'); // 로그인 폼 숨기기
  } else if (id === '2' && password === '2') {
    setUserType('User2');
    alert('User2님, 로그인에 성공했습니다.');
    document.getElementById('login-menu').classList.remove('show'); // 로그인 폼 숨기기
  } else {
    alert('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
    document.getElementById('login-menu').classList.add('show'); // 로그인 폼 보이기
    return;
  }
  initializeData(); // 로그인 후 데이터 초기화
  wishlist = loadWishList(); // 로컬 스토리지에서 찜하기 목록 불러오기
  updateUI(); // UI 업데이트
}


/* 로그아웃 */
// 로그아웃 시 데이터는 유지하며 사용자 유형만 'Guest'로 변경
function logout() {
  // 현재 찜하기 상태를 저장 (로그아웃 전 사용자 상태 저장)
  saveWishList(wishlist);

  // 사용자 유형을 Guest로 설정
  setUserType('Guest');

  // 찜하기 리스트를 빈 객체로 초기화
  wishlist = {};

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
  userType = loadUserType(); // 저장된 사용자 유형 불러오기
  wishlist = loadWishList(); // 저장된 찜하기 리스트 불러오기
  updateUI(); // UI 업데이트
}

// 로그인 시 데이터 초기화
function initializeData() {
  if (userType === 'Guest') {

    saveCart([]); // 빈 장바구니
    saveWishList({}); // 빈 찜하기 리스트
    saveRecentItems([]); // 빈 최근상품 목록
  }  else {
    saveWishList(wishlist);
  }}



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
  RecentProducts[userType].add(productId); // 최근 본 상품 추가
  updateRecentProductsUI(); // UI 업데이트
}

// 최근 본 상품 기능 수정
function updateRecentProductsUI() {
  const recentProductsContainer = document.querySelector('.recent-products');
  recentProductsContainer.innerHTML = '<h3>최근 본 상품</h3>';

  // 최근 본 상품 목록을 가져옴
  const recentProductIds = [...(RecentProducts[userType] || [])];

  recentProductIds.slice(-5).reverse().forEach(productId => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const img = document.createElement('img');
      img.src = product.image; // 실제 이미지 URL로 변경 필요
      img.alt = product.title;
      // 최근 본 페이지 이미지 크기
      img.style.width = '20px';
      img.style.height = '20px';
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
  localStorage.setItem('cart', JSON.stringify(cart)); // 장바구니를 로컬 스토리지에 저장합니다.
  updateCartUI(); // 장바구니 UI를 업데이트합니다.
  updateCartIcon();
}

function updateCartIcon() {
  let cartIcon = document.getElementById('cart-icon');

  // 현재 장바구니에 담긴 상품 개수를 가져옵니다.
  let cartItemCount = userCart[userType].reduce((total, item) => total + item.quantity, 0);
  // 장바구니에 상품이 있는지 여부에 따라 아이콘을 변경합니다.
  cartIcon.src = cartItemCount > 0 ? 'C:\\PJT_1\\img\\basket_fill.png' : 'C:\\PJT_1\\img\\basket_empty.png';
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
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

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function () {
  // 모든 localStorage 항목을 삭제하는 것이 맞는지 확인하세요.
  clearLocalStorage(); // 주석 처리하거나 조건에 따라 호출

  userType = loadUserType(); // 현재 사용자 유형을 로드
  wishlist = loadWishList(); // 로컬 스토리지에서 찜하기 목록 불러오기
  initializeData(); // 데이터 초기화
  updateUI(); // UI 업데이트
});







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
