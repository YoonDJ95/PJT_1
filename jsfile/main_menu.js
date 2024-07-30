document.addEventListener("DOMContentLoaded", function() {  // 상단 메뉴리스트에 대한 드롭다운메뉴 토글 함수
  const novelBook = document.getElementById('novel_book');
  const notnovelBook = document.getElementById('not_novel_book');

  novelBook.addEventListener('click', function() {
    const dropdown = document.getElementById('s-d');
    toggleDropdown(dropdown, 80); // 좌표 값을 직접 설정
  });

  notnovelBook.addEventListener('click', function() {
    const dropdown = document.getElementById('s-d2');
    toggleDropdown(dropdown, 250); // 좌표 값을 직접 설정
  });

 /* goodsBook.addEventListener('click', function() {
    const dropdown = document.getElementById('s-d3');
    toggleDropdown(dropdown, 500); // 좌표 값을 직접 설정
  });*/

  function toggleDropdown(dropdown, leftPosition) {
    const dropdowns = document.querySelectorAll('.dropdown, .dropdown2');
    dropdowns.forEach(dd => {
      if (dd !== dropdown) {
        dd.classList.remove('show');
      }
    });
    dropdown.style.left = `${leftPosition}px`;
    dropdown.classList.toggle('show');
  }
});



function toggleDropdown() {         // 로그인 팝업에 대한 드롭다운메뉴 토글 함수
  const menu = document.getElementById('login-menu');
  menu.classList.toggle('show');
}
