let flipPage = document.getElementById('flipPage'),
  flipPageLeft = document.getElementById('flipPageLeft'),
  toggleBook = document.getElementById('toggleBook'),
  BookCover = document.querySelector('#Book'),
  toggleFormBook = document.querySelectorAll('.toggleFormBook'),
  inputPasswordLoginForm = document.querySelector("#loginForm input[type='password']"),
  showPasswordForm = document.querySelector("#showPasswordForm"),
  flipped = false,
  flipping = false,
  flippedBookCover = false,
  flippingBookCover = false;

toggleBook.addEventListener('click', () => {
  if (flippingBookCover || flipping) return;

  if (flipped) {
    flipped = !flipped;
    flipping = !flipping;

    moveElement(flipPage, flipped, 'rotateY(-180deg)', 'rotateY(0deg)');

    setTimeout(() => {
      toggleBook.innerHTML = `${(flipped) ? "Close Book" : "Open Book"}`;
      flipPageLeft.classList.remove('open');
      flippedBookCover = !flippedBookCover;
      moveElement(BookCover, flippedBookCover, 'translateX(0)', 'translateX(-25%)');
      moveElement(flipPageLeft, flippedBookCover, 'translateX(0) rotateY(0deg)', 'translateX(100%) rotateY(180deg)');

      flipPageLeft.classList.toggle('left-position');
      setTimeout(() => {
        flipping = false;
        flippingBookCover = false;
      }, 750);
    }, 500);
  } else {

    flippedBookCover = !flippedBookCover;
    flippingBookCover = !flippingBookCover;

    moveElement(BookCover, flippedBookCover, 'translateX(0)', 'translateX(-25%)');
    moveElement(flipPageLeft, flippedBookCover, 'translateX(0) rotateY(0deg)', 'translateX(100%) rotateY(180deg)');

    toggleBook.innerHTML = `${(flippedBookCover) ? "Close Book" : "Open Book"}`;
    flipPageLeft.classList.toggle('open');
    setTimeout(() => {
      flipPageLeft.classList.toggle('left-position');
      flippingBookCover = false;
    }, 1000);
  }
});

toggleFormBook.forEach(function (button) {
  button.addEventListener('click', () => {
    if (flipping) return;
    flipping = true;
    flipped = !flipped;

    moveElement(flipPage, flipped, 'rotateY(-180deg)', 'rotateY(0deg)');

    setTimeout(() => {
      flipping = false;
    }, 500);
  });
});

showPasswordForm.addEventListener("click", function () {
  if (showPasswordForm.dataset.isCheck == "false") {
    inputPasswordLoginForm.setAttribute("type", "password");
    showPasswordForm.dataset.isCheck = "true";
  } else {
    inputPasswordLoginForm.setAttribute("type", "text");
    showPasswordForm.dataset.isCheck = "false";
  }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlcy9yZWdpc3RyYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGZsaXBQYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsaXBQYWdlJyksXHJcbiAgZmxpcFBhZ2VMZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsaXBQYWdlTGVmdCcpLFxyXG4gIHRvZ2dsZUJvb2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlQm9vaycpLFxyXG4gIEJvb2tDb3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNCb29rJyksXHJcbiAgdG9nZ2xlRm9ybUJvb2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9nZ2xlRm9ybUJvb2snKSxcclxuICBpbnB1dFBhc3N3b3JkTG9naW5Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbkZvcm0gaW5wdXRbdHlwZT0ncGFzc3dvcmQnXVwiKSxcclxuICBzaG93UGFzc3dvcmRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaG93UGFzc3dvcmRGb3JtXCIpLFxyXG4gIGZsaXBwZWQgPSBmYWxzZSxcclxuICBmbGlwcGluZyA9IGZhbHNlLFxyXG4gIGZsaXBwZWRCb29rQ292ZXIgPSBmYWxzZSxcclxuICBmbGlwcGluZ0Jvb2tDb3ZlciA9IGZhbHNlO1xyXG5cclxudG9nZ2xlQm9vay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpZiAoZmxpcHBpbmdCb29rQ292ZXIgfHwgZmxpcHBpbmcpIHJldHVybjtcclxuXHJcbiAgaWYgKGZsaXBwZWQpIHtcclxuICAgIGZsaXBwZWQgPSAhZmxpcHBlZDtcclxuICAgIGZsaXBwaW5nID0gIWZsaXBwaW5nO1xyXG5cclxuICAgIG1vdmVFbGVtZW50KGZsaXBQYWdlLCBmbGlwcGVkLCAncm90YXRlWSgtMTgwZGVnKScsICdyb3RhdGVZKDBkZWcpJyk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRvZ2dsZUJvb2suaW5uZXJIVE1MID0gYCR7KGZsaXBwZWQpID8gXCJDbG9zZSBCb29rXCIgOiBcIk9wZW4gQm9va1wifWA7XHJcbiAgICAgIGZsaXBQYWdlTGVmdC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgIGZsaXBwZWRCb29rQ292ZXIgPSAhZmxpcHBlZEJvb2tDb3ZlcjtcclxuICAgICAgbW92ZUVsZW1lbnQoQm9va0NvdmVyLCBmbGlwcGVkQm9va0NvdmVyLCAndHJhbnNsYXRlWCgwKScsICd0cmFuc2xhdGVYKC0yNSUpJyk7XHJcbiAgICAgIG1vdmVFbGVtZW50KGZsaXBQYWdlTGVmdCwgZmxpcHBlZEJvb2tDb3ZlciwgJ3RyYW5zbGF0ZVgoMCkgcm90YXRlWSgwZGVnKScsICd0cmFuc2xhdGVYKDEwMCUpIHJvdGF0ZVkoMTgwZGVnKScpO1xyXG5cclxuICAgICAgZmxpcFBhZ2VMZWZ0LmNsYXNzTGlzdC50b2dnbGUoJ2xlZnQtcG9zaXRpb24nKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZmxpcHBpbmcgPSBmYWxzZTtcclxuICAgICAgICBmbGlwcGluZ0Jvb2tDb3ZlciA9IGZhbHNlO1xyXG4gICAgICB9LCA3NTApO1xyXG4gICAgfSwgNTAwKTtcclxuICB9IGVsc2Uge1xyXG5cclxuICAgIGZsaXBwZWRCb29rQ292ZXIgPSAhZmxpcHBlZEJvb2tDb3ZlcjtcclxuICAgIGZsaXBwaW5nQm9va0NvdmVyID0gIWZsaXBwaW5nQm9va0NvdmVyO1xyXG5cclxuICAgIG1vdmVFbGVtZW50KEJvb2tDb3ZlciwgZmxpcHBlZEJvb2tDb3ZlciwgJ3RyYW5zbGF0ZVgoMCknLCAndHJhbnNsYXRlWCgtMjUlKScpO1xyXG4gICAgbW92ZUVsZW1lbnQoZmxpcFBhZ2VMZWZ0LCBmbGlwcGVkQm9va0NvdmVyLCAndHJhbnNsYXRlWCgwKSByb3RhdGVZKDBkZWcpJywgJ3RyYW5zbGF0ZVgoMTAwJSkgcm90YXRlWSgxODBkZWcpJyk7XHJcblxyXG4gICAgdG9nZ2xlQm9vay5pbm5lckhUTUwgPSBgJHsoZmxpcHBlZEJvb2tDb3ZlcikgPyBcIkNsb3NlIEJvb2tcIiA6IFwiT3BlbiBCb29rXCJ9YDtcclxuICAgIGZsaXBQYWdlTGVmdC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZmxpcFBhZ2VMZWZ0LmNsYXNzTGlzdC50b2dnbGUoJ2xlZnQtcG9zaXRpb24nKTtcclxuICAgICAgZmxpcHBpbmdCb29rQ292ZXIgPSBmYWxzZTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH1cclxufSk7XHJcblxyXG50b2dnbGVGb3JtQm9vay5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcclxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBpZiAoZmxpcHBpbmcpIHJldHVybjtcclxuICAgIGZsaXBwaW5nID0gdHJ1ZTtcclxuICAgIGZsaXBwZWQgPSAhZmxpcHBlZDtcclxuXHJcbiAgICBtb3ZlRWxlbWVudChmbGlwUGFnZSwgZmxpcHBlZCwgJ3JvdGF0ZVkoLTE4MGRlZyknLCAncm90YXRlWSgwZGVnKScpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBmbGlwcGluZyA9IGZhbHNlO1xyXG4gICAgfSwgNTAwKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5zaG93UGFzc3dvcmRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHNob3dQYXNzd29yZEZvcm0uZGF0YXNldC5pc0NoZWNrID09IFwiZmFsc2VcIikge1xyXG4gICAgaW5wdXRQYXNzd29yZExvZ2luRm9ybS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwicGFzc3dvcmRcIik7XHJcbiAgICBzaG93UGFzc3dvcmRGb3JtLmRhdGFzZXQuaXNDaGVjayA9IFwidHJ1ZVwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbnB1dFBhc3N3b3JkTG9naW5Gb3JtLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xyXG4gICAgc2hvd1Bhc3N3b3JkRm9ybS5kYXRhc2V0LmlzQ2hlY2sgPSBcImZhbHNlXCI7XHJcbiAgfVxyXG59KTtcclxuIl0sImZpbGUiOiJwYWdlcy9yZWdpc3RyYXRpb24uanMifQ==
