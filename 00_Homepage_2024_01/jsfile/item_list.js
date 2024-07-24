// 제품 목록 생성
const productList = document.querySelector('.product-list');

// 도서 이미지 배열
const bookImages = [
    'C:/PJT_1/img/book1.jpg',
    'C:/PJT_1/img/book2.jpg',
    // 추가 이미지 경로
];

function createProducts() {
    for (let i = 0; i < 10; i++) {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${bookImages[i] || '/api/placeholder/200/300'}" alt="도서 ${i + 1}">
            <div class="rating">★★★★☆</div>
            <h3>도서 제목 ${i + 1}</h3>
            <p>저자 | 출판사</p>
            <div class="actions">
                <button onclick="addToCart(${i})">장바구니</button>
                <button onclick="openInfoPage(${i})">상세정보</button>
                <button onclick="openPreview(${i})">미리보기</button>
            </div>
        `;
        productList.appendChild(productItem);
    }
}

createProducts();

// 장바구니 기능
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            title: `도서 제목 ${productId + 1}`,
            price: 10000, // 예시 가격
            image: bookImages[productId] || '/api/placeholder/50/75', // 이미지 URL
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('아이템이 장바구니에 추가되었습니다. 장바구니를 열어 확인해 보세요.');
    updateCartUI();
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
                <p>가격: ${item.price}원</p>
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
    document.getElementById('total-price').textContent = total;
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
}

function openCart() {
    document.querySelector('.cart-overlay').style.display = 'flex'; // 장바구니 오버레이 표시
    updateCartUI();
}

function closeCart() {
    document.querySelector('.cart-overlay').style.display = 'none'; // 장바구니 오버레이 숨기기
}

// 장바구니 비우기 기능
function clearCart() {
    cart = []; // 장바구니를 빈 배열로 초기화
    localStorage.setItem('cart', JSON.stringify(cart)); // 로컬 스토리지에 빈 장바구니 저장
    updateCartUI(); // 장바구니 UI 업데이트
    alert('장바구니가 비워졌습니다.');
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

// 최근 본 상품 기능
const recentProducts = new Set();

function addToRecentProducts(productId) {
    recentProducts.add(productId);
    updateRecentProductsUI();
}

function updateRecentProductsUI() {
    const recentProductsContainer = document.querySelector('.recent-products');
    recentProductsContainer.innerHTML = '<h3>최근 본 상품</h3>';
    [...recentProducts].slice(-5).reverse().forEach(productId => {
        const img = document.createElement('img');
        img.src = bookImages[productId] || '/api/placeholder/50/75';
        img.alt = `최근 본 상품 ${productId + 1}`;
        img.onclick = () => openInfoPage(productId);
        recentProductsContainer.appendChild(img);
    });
}

// 책 미리보기 기능
let currentPreviewPage = 0;
const previewPages = ['/api/placeholder/400/600', '/api/placeholder/400/600', '/api/placeholder/400/600']; // 예시 이미지

function openPreview(productId) {
    addToRecentProducts(productId);
    document.querySelector('.preview-modal').style.display = 'block';
    currentPreviewPage = 0;
    updatePreviewImage();
}

function closePreview() {
    document.querySelector('.preview-modal').style.display = 'none';
}

function prevPage() {
    if (currentPreviewPage > 0) {
        currentPreviewPage--;
        updatePreviewImage();
    }
}

function nextPage() {
    if (currentPreviewPage < previewPages.length - 1) {
        currentPreviewPage++;
        updatePreviewImage();
    }
}

function updatePreviewImage() {
    document.getElementById('preview-image').src = previewPages[currentPreviewPage];
}

// 스크롤 탑 기능
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}
