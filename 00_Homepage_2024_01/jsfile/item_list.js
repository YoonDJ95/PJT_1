
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
  // 페이지 이동 로직 구현
  window.location.href = `C:\\PJT_1\\page\\book_${productId.split('_')[1]}_info.html`; // 예시: book_1_info.html
}

  // 초기 상품 목록 생성
  createProducts();



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
const recentProducts = new Set();

function addToRecentProducts(productId) {
  recentProducts.add(productId);
  updateRecentProductsUI();
}

// 최근 본 상품 기능 수정
function updateRecentProductsUI() {
  const recentProductsContainer = document.querySelector('.recent-products');
  recentProductsContainer.innerHTML = '<h3>최근 본 상품</h3>';
  [...recentProducts].slice(-5).reverse().forEach(productId => {
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
// 장바구니 아이템 리스트를 저장할 배열
let cartItems = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
  console.log(`상품 ${productId.split('_')[1]}을 장바구니에 추가합니다.`);
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    // 상품 목록에서 상품을 찾아서 정보 추가
    const product = products.find(item => item.id === productId);
    if (product) {
      cart.push({
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
  let cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // 장바구니에 상품이 있는지 여부에 따라 아이콘을 변경합니다.
  if (cartItemCount > 0) {
    cartIcon.src = 'C:\\PJT_1\\img\\basket_fill.png';
  } else {
    cartIcon.src = 'C:\\PJT_1\\img\\basket_empty.png';
  }
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
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
  const item = cart[index];
  item.quantity += change;
  if (item.quantity <= 0) {
    item.quantity = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
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
  cart = []; // 장바구니를 빈 배열로 초기화
  localStorage.setItem('cart', JSON.stringify(cart)); // 로컬 스토리지에 빈 장바구니 저장
  updateCartUI(); // 장바구니 UI 업데이트
  alert('장바구니가 비워졌습니다.');
  updateCartIcon();
}










/* 찜하기 */
// 찜하기 상태를 저장할 객체
const wishlist = {};

// 초기에 모든 상품의 찜하기 아이콘을 하트(♡)로 설정
document.addEventListener('DOMContentLoaded', function () {
  const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
  wishlistButtons.forEach(button => {
    const productId = button.dataset.productId;
    wishlist[productId] = false; // 초기 상태는 찜하지 않은(false) 상태
    updateWishlistUI(productId);
  });
});

// 찜하기 버튼 클릭 시 호출되는 함수
function toggleWishlist(productId) {
  wishlist[productId] = !wishlist[productId]; // 찜하기 상태를 토글
  updateWishlistUI(productId);
}

// 찜하기 버튼의 UI를 업데이트하는 함수
function updateWishlistUI(productId) {
  const button = document.querySelector(`.add-to-wishlist[data-product-id="${productId}"]`);
  if (wishlist[productId]) {
    button.textContent = '찜한 상태 ♥';
  } else {
    button.textContent = '찜하기 ♡';
  }
}

// 초기에 모든 상품의 찜하기 아이콘을 하트(♡)로 설정
document.addEventListener('DOMContentLoaded', function () {
  const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
  wishlistButtons.forEach(button => {
    const productId = button.dataset.productId;
    wishlist[productId] = false; // 초기 상태는 찜하지 않은(false) 상태
    updateWishlistUI(productId);
  });
});
