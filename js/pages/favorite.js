let containerBooks = $(".section-page .container-books"),
  isDeleted = false;

currentPage = "favorite";

// self Invoke
(function () {
  if (localStorage.getItem("favoriteBooks") != null) {
    favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks"));
  } else {
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
  }

  if (localStorage.getItem("idBooks") != null) {
    favoriteBooksNumber = JSON.parse(localStorage.getItem("idBooks"));
  } else {
    localStorage.setItem("idBooks", JSON.stringify(favoriteBooksNumber));
  }

  if (localStorage.getItem("joinFavoriteBookPage") == "no") {
    joinFavoriteBookPage = "yes";
    localStorage.setItem("joinFavoriteBookPage", joinFavoriteBookPage);
  }

  if (localStorage.getItem("currentId") == null) {
    localStorage.setItem("currentId", currentId);
  } else {
    currentId = +localStorage.getItem("currentId");
  }

  if (localStorage.getItem("comments") != null) {
    commentsFeedBacks = JSON.parse(localStorage.getItem("comments"));
  } else {
    localStorage.setItem("comments", JSON.stringify(commentsFeedBacks));
  }

  checkFavoriteEmpty();
})();

arrayOfSomeItems = favoriteBooks;
parentItemsShow = containerBooks;


showItemsInPage(startNum, endNum, arrayOfSomeItems, parentItemsShow, currentPage);

repairPagination(favoriteBooksNumber);

let currentBtnBooks = document.querySelector(
  ".data #indicators ul .indicator:first-child"
);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwYWdlcy9mYXZvcml0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY29udGFpbmVyQm9va3MgPSAkKFwiLnNlY3Rpb24tcGFnZSAuY29udGFpbmVyLWJvb2tzXCIpLFxyXG4gIGlzRGVsZXRlZCA9IGZhbHNlO1xyXG5cclxuY3VycmVudFBhZ2UgPSBcImZhdm9yaXRlXCI7XHJcblxyXG4vLyBzZWxmIEludm9rZVxyXG4oZnVuY3Rpb24gKCkge1xyXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZhdm9yaXRlQm9va3NcIikgIT0gbnVsbCkge1xyXG4gICAgZmF2b3JpdGVCb29rcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJmYXZvcml0ZUJvb2tzXCIpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmYXZvcml0ZUJvb2tzXCIsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlQm9va3MpKTtcclxuICB9XHJcblxyXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlkQm9va3NcIikgIT0gbnVsbCkge1xyXG4gICAgZmF2b3JpdGVCb29rc051bWJlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpZEJvb2tzXCIpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpZEJvb2tzXCIsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlQm9va3NOdW1iZXIpKTtcclxuICB9XHJcblxyXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImpvaW5GYXZvcml0ZUJvb2tQYWdlXCIpID09IFwibm9cIikge1xyXG4gICAgam9pbkZhdm9yaXRlQm9va1BhZ2UgPSBcInllc1wiO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJqb2luRmF2b3JpdGVCb29rUGFnZVwiLCBqb2luRmF2b3JpdGVCb29rUGFnZSk7XHJcbiAgfVxyXG5cclxuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50SWRcIikgPT0gbnVsbCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50SWRcIiwgY3VycmVudElkKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY3VycmVudElkID0gK2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudElkXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY29tbWVudHNcIikgIT0gbnVsbCkge1xyXG4gICAgY29tbWVudHNGZWVkQmFja3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY29tbWVudHNcIikpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNvbW1lbnRzXCIsIEpTT04uc3RyaW5naWZ5KGNvbW1lbnRzRmVlZEJhY2tzKSk7XHJcbiAgfVxyXG5cclxuICBjaGVja0Zhdm9yaXRlRW1wdHkoKTtcclxufSkoKTtcclxuXHJcbmFycmF5T2ZTb21lSXRlbXMgPSBmYXZvcml0ZUJvb2tzO1xyXG5wYXJlbnRJdGVtc1Nob3cgPSBjb250YWluZXJCb29rcztcclxuXHJcblxyXG5zaG93SXRlbXNJblBhZ2Uoc3RhcnROdW0sIGVuZE51bSwgYXJyYXlPZlNvbWVJdGVtcywgcGFyZW50SXRlbXNTaG93LCBjdXJyZW50UGFnZSk7XHJcblxyXG5yZXBhaXJQYWdpbmF0aW9uKGZhdm9yaXRlQm9va3NOdW1iZXIpO1xyXG5cclxubGV0IGN1cnJlbnRCdG5Cb29rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIuZGF0YSAjaW5kaWNhdG9ycyB1bCAuaW5kaWNhdG9yOmZpcnN0LWNoaWxkXCJcclxuKTsiXSwiZmlsZSI6InBhZ2VzL2Zhdm9yaXRlLmpzIn0=
