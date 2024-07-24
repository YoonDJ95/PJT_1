document.addEventListener("DOMContentLoaded", function() {
  const korBook = document.getElementById('kor_book');
  const engBook = document.getElementById('eng_book');
  const goodsBook = document.getElementById('goods_book');

  korBook.addEventListener('click', function() {
    const dropdown = document.getElementById('s-d');
    toggleDropdown(dropdown, 80); // 좌표 값을 직접 설정
  });

  engBook.addEventListener('click', function() {
    const dropdown = document.getElementById('s-d2');
    toggleDropdown(dropdown, 250); // 좌표 값을 직접 설정
  });

  goodsBook.addEventListener('click', function() {
    const dropdown = document.getElementById('s-d3');
    toggleDropdown(dropdown, 500); // 좌표 값을 직접 설정
  });

  function toggleDropdown(dropdown, leftPosition) {
    const dropdowns = document.querySelectorAll('.dropdown, .dropdown2, .dropdown3');
    dropdowns.forEach(dd => {
      if (dd !== dropdown) {
        dd.classList.remove('show');
      }
    });
    dropdown.style.left = `${leftPosition}px`;
    dropdown.classList.toggle('show');
  }
});


// 로그인 드롭박스 토글 함수
function toggleDropdown() {
  const menu = document.getElementById('login-menu');
  menu.classList.toggle('show');
}