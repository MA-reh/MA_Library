let popupEleJQ,
  popupBox,
  currentLeftBoxPopup,
  currentRightBoxPopup,
  currentPage = "home",
  ulIndicators = $(".data .indicators ul"),
  secondNav = $("#Navbar2"),
  heightOfNavbar = secondNav.outerHeight(true),
  allBtnTheme = document.querySelectorAll(
    `label.switch input[type="checkbox"]`
  ),
  statuesBtnTheme = false,
  joinFavoriteBookPage = "no",
  favoriteBooksNumber = [],
  favoriteBooks = [],
  arrayOfSomeItems = [],
  parentItemsShow,
  idSureDeleted,
  typeService;

// show Number Items of rage this variable in page
const startNum = 0,
  endNum = 8; // number of last card in row 

// number Items in page to show pagination
const numberItemsInRow = endNum;

let numberBtn = 1,
  newStartNum = numberBtn * endNum - endNum,
  numberClicked = 1,
  newEndNum = endNum * numberBtn;

localStorage.setItem("joinFavoriteBookPage", joinFavoriteBookPage);

(function () {
  if (localStorage.getItem("theme") == "dark") {
    setTheme("dark");
    allBtnTheme = document.querySelectorAll(
      'label.switch input[type="checkbox"]'
    );

    btnThemeActive(allBtnTheme);
  } else {
    localStorage.setItem("theme", "light");
    setTheme("light");
  }
})();

$(`label.switch input[type="checkbox"]`).click(function () {
  setTimeout((e) => {
    setTheme(
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark"
    );

    btnThemeActive(allBtnTheme);
  }, 500);
});

window.addEventListener("scroll", function () {
  let topOfWindow = window.scrollY;

  if (topOfWindow > 100) {
    $("#Navbar1").addClass("hide");
    $("#Navbar2").addClass("show");
  } else {
    $("#Navbar1").removeClass("hide");
    $("#Navbar2").removeClass("show");
  }

  $(`nav#Navbar2 .nav-link[href]`).each(function (index, navLinkPage) {
    let sectionId = $(navLinkPage).attr("href");
    let topOfSection = $(`${sectionId}`).offset().top - heightOfNavbar;
    if ($(window).scrollTop() >= topOfSection) {
      $(`nav .nav-link[href="${sectionId}"]`)
        .addClass("active")
        .parent()
        .siblings()
        .children()
        .removeClass("active");
    }
  });
});

$("#Navbar2 #secondBtnNavbar").click(function () {
  if (
    document.querySelector("#navbarSupportedContent").style.display == "block"
  ) {
    $(this).siblings("#navbarSupportedContent").slideUp();
  } else {
    $(this).siblings("#navbarSupportedContent").slideDown();
  }
});

$("nav#Navbar2.navbar .nav-link").click(function (e) {
  e.preventDefault();

  let sectionName = $(this).attr("href"),
    currentSection = $(`${sectionName}`),
    topOfCurrentSection = currentSection.offset().top;

  setTimeout(function () { }, 1000);

  if (window.innerWidth >= 992) {
    $(window).scrollTop(topOfCurrentSection - heightOfNavbar);
  } else {
    $(this)
      .parent()
      .parent()
      .parent()
      .slideUp(600, function () {
        $(window).scrollTop(topOfCurrentSection - heightOfNavbar);
      });
  }
});

window.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    $("body").css("overflow-y", "auto");
  }, 300)
  $("#loading").fadeOut(1000);
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcG9wdXBFbGVKUSxcclxuICBwb3B1cEJveCxcclxuICBjdXJyZW50TGVmdEJveFBvcHVwLFxyXG4gIGN1cnJlbnRSaWdodEJveFBvcHVwLFxyXG4gIGN1cnJlbnRQYWdlID0gXCJob21lXCIsXHJcbiAgdWxJbmRpY2F0b3JzID0gJChcIi5kYXRhIC5pbmRpY2F0b3JzIHVsXCIpLFxyXG4gIHNlY29uZE5hdiA9ICQoXCIjTmF2YmFyMlwiKSxcclxuICBoZWlnaHRPZk5hdmJhciA9IHNlY29uZE5hdi5vdXRlckhlaWdodCh0cnVlKSxcclxuICBhbGxCdG5UaGVtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICBgbGFiZWwuc3dpdGNoIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXWBcclxuICApLFxyXG4gIHN0YXR1ZXNCdG5UaGVtZSA9IGZhbHNlLFxyXG4gIGpvaW5GYXZvcml0ZUJvb2tQYWdlID0gXCJub1wiLFxyXG4gIGZhdm9yaXRlQm9va3NOdW1iZXIgPSBbXSxcclxuICBmYXZvcml0ZUJvb2tzID0gW10sXHJcbiAgYXJyYXlPZlNvbWVJdGVtcyA9IFtdLFxyXG4gIHBhcmVudEl0ZW1zU2hvdyxcclxuICBpZFN1cmVEZWxldGVkLFxyXG4gIHR5cGVTZXJ2aWNlO1xyXG5cclxuLy8gc2hvdyBOdW1iZXIgSXRlbXMgb2YgcmFnZSB0aGlzIHZhcmlhYmxlIGluIHBhZ2VcclxuY29uc3Qgc3RhcnROdW0gPSAwLFxyXG4gIGVuZE51bSA9IDg7IC8vIG51bWJlciBvZiBsYXN0IGNhcmQgaW4gcm93IFxyXG5cclxuLy8gbnVtYmVyIEl0ZW1zIGluIHBhZ2UgdG8gc2hvdyBwYWdpbmF0aW9uXHJcbmNvbnN0IG51bWJlckl0ZW1zSW5Sb3cgPSBlbmROdW07XHJcblxyXG5sZXQgbnVtYmVyQnRuID0gMSxcclxuICBuZXdTdGFydE51bSA9IG51bWJlckJ0biAqIGVuZE51bSAtIGVuZE51bSxcclxuICBudW1iZXJDbGlja2VkID0gMSxcclxuICBuZXdFbmROdW0gPSBlbmROdW0gKiBudW1iZXJCdG47XHJcblxyXG5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImpvaW5GYXZvcml0ZUJvb2tQYWdlXCIsIGpvaW5GYXZvcml0ZUJvb2tQYWdlKTtcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGhlbWVcIikgPT0gXCJkYXJrXCIpIHtcclxuICAgIHNldFRoZW1lKFwiZGFya1wiKTtcclxuICAgIGFsbEJ0blRoZW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgJ2xhYmVsLnN3aXRjaCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nXHJcbiAgICApO1xyXG5cclxuICAgIGJ0blRoZW1lQWN0aXZlKGFsbEJ0blRoZW1lKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0aGVtZVwiLCBcImxpZ2h0XCIpO1xyXG4gICAgc2V0VGhlbWUoXCJsaWdodFwiKTtcclxuICB9XHJcbn0pKCk7XHJcblxyXG4kKGBsYWJlbC5zd2l0Y2ggaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdYCkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gIHNldFRpbWVvdXQoKGUpID0+IHtcclxuICAgIHNldFRoZW1lKFxyXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10aGVtZVwiKSA9PT0gXCJkYXJrXCJcclxuICAgICAgICA/IFwibGlnaHRcIlxyXG4gICAgICAgIDogXCJkYXJrXCJcclxuICAgICk7XHJcblxyXG4gICAgYnRuVGhlbWVBY3RpdmUoYWxsQnRuVGhlbWUpO1xyXG4gIH0sIDUwMCk7XHJcbn0pO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGxldCB0b3BPZldpbmRvdyA9IHdpbmRvdy5zY3JvbGxZO1xyXG5cclxuICBpZiAodG9wT2ZXaW5kb3cgPiAxMDApIHtcclxuICAgICQoXCIjTmF2YmFyMVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAkKFwiI05hdmJhcjJcIikuYWRkQ2xhc3MoXCJzaG93XCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKFwiI05hdmJhcjFcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgJChcIiNOYXZiYXIyXCIpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcclxuICB9XHJcblxyXG4gICQoYG5hdiNOYXZiYXIyIC5uYXYtbGlua1tocmVmXWApLmVhY2goZnVuY3Rpb24gKGluZGV4LCBuYXZMaW5rUGFnZSkge1xyXG4gICAgbGV0IHNlY3Rpb25JZCA9ICQobmF2TGlua1BhZ2UpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgbGV0IHRvcE9mU2VjdGlvbiA9ICQoYCR7c2VjdGlvbklkfWApLm9mZnNldCgpLnRvcCAtIGhlaWdodE9mTmF2YmFyO1xyXG4gICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+PSB0b3BPZlNlY3Rpb24pIHtcclxuICAgICAgJChgbmF2IC5uYXYtbGlua1tocmVmPVwiJHtzZWN0aW9uSWR9XCJdYClcclxuICAgICAgICAuYWRkQ2xhc3MoXCJhY3RpdmVcIilcclxuICAgICAgICAucGFyZW50KClcclxuICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgIC5jaGlsZHJlbigpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbiQoXCIjTmF2YmFyMiAjc2Vjb25kQnRuTmF2YmFyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICBpZiAoXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdmJhclN1cHBvcnRlZENvbnRlbnRcIikuc3R5bGUuZGlzcGxheSA9PSBcImJsb2NrXCJcclxuICApIHtcclxuICAgICQodGhpcykuc2libGluZ3MoXCIjbmF2YmFyU3VwcG9ydGVkQ29udGVudFwiKS5zbGlkZVVwKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQodGhpcykuc2libGluZ3MoXCIjbmF2YmFyU3VwcG9ydGVkQ29udGVudFwiKS5zbGlkZURvd24oKTtcclxuICB9XHJcbn0pO1xyXG5cclxuJChcIm5hdiNOYXZiYXIyLm5hdmJhciAubmF2LWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIGxldCBzZWN0aW9uTmFtZSA9ICQodGhpcykuYXR0cihcImhyZWZcIiksXHJcbiAgICBjdXJyZW50U2VjdGlvbiA9ICQoYCR7c2VjdGlvbk5hbWV9YCksXHJcbiAgICB0b3BPZkN1cnJlbnRTZWN0aW9uID0gY3VycmVudFNlY3Rpb24ub2Zmc2V0KCkudG9wO1xyXG5cclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgfSwgMTAwMCk7XHJcblxyXG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA5OTIpIHtcclxuICAgICQod2luZG93KS5zY3JvbGxUb3AodG9wT2ZDdXJyZW50U2VjdGlvbiAtIGhlaWdodE9mTmF2YmFyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgJCh0aGlzKVxyXG4gICAgICAucGFyZW50KClcclxuICAgICAgLnBhcmVudCgpXHJcbiAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAuc2xpZGVVcCg2MDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKHRvcE9mQ3VycmVudFNlY3Rpb24gLSBoZWlnaHRPZk5hdmJhcik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImF1dG9cIik7XHJcbiAgfSwgMzAwKVxyXG4gICQoXCIjbG9hZGluZ1wiKS5mYWRlT3V0KDEwMDApO1xyXG59KTsiXSwiZmlsZSI6ImluZGV4LmpzIn0=
