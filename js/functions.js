function setTheme(name) {
  // change Theme main color
  document.documentElement.setAttribute("data-theme", name);
  localStorage.setItem("theme", name);
}

function btnThemeActive(btnsTheme) {
  // change Theme dark or light
  for (let btn of btnsTheme) {
    btn.checked = !statuesBtnTheme;
  }
  statuesBtnTheme = !statuesBtnTheme;
}

function changeActives(that) {
  let parentAllChildren = that.closest(".changeActives"),
    childActive = parentAllChildren.querySelector(".active"),
    currentChild = that;

  if (that.classList.contains("active")) {
    return 0;
  } else {
    childActive.classList.remove("active");
    currentChild.classList.add("active");
  }
}

function hisClicked(that) {
  let parentAllChildren = that.closest(".changeActives"),
    childActive = parentAllChildren.querySelector(".clicked"),
    currentChild = that;

  if (that.classList.contains("clicked")) {
    return 0;
  } else {
    childActive.classList.remove("clicked");
    currentChild.classList.add("clicked");
  }
}

// ==========================

function openPopup(popupName) {
  // Function To Open popup
  popupEleJQ = $(`.popup[data-popup-name="${popupName}"]`);
  popupBox = popupEleJQ.children(".box");

  popupBox.click((e) => {
    // if user click on PopupBox Don't close popup
    e.stopPropagation();
  });
  $("body").css({
    overflow: "hidden",
  });

  if (popupName == "nav") {
    // if popupName equal nav Do this function.
    $(".popup[data-popup-name='nav']").addClass("clicked");
    popupNavbar();
  } else if (popupName == "viewFiles") {
    setTimeout((e) => {
      popupEleJQ.fadeIn(1000);
      setTimeout((e) => {
        popupEleJQ.children(".box").addClass("show");
      }, 500);
    }, 10);
  } else {
    // else popup
    popupEleJQ.fadeIn(1000);
  }
}

function popupNavbar() {
  popupEleJQ = $(`.popup[data-popup-name="nav"]`);

  // move popupBox to left
  popupEleJQ
    .fadeIn(1000)
    .children(".box")
    .animate({ left: "50%" }, 2500)
    .after();
  popupBox.find(".leg-nav").addClass("active");

  setTimeout(() => {
    popupBox.children("span.leg-nav").removeClass("active").addClass("stop");
  }, 2300);

  setTimeout(() => {
    // move Hand to left to catch popupBox
    popupEleJQ.children(".hands").animate({ left: "10%" }, 2650);
  }, 1000);

  // check if Hand catch the popupBox or not
  checkElementHunted();
}

function closePopup(popupName = null) {
  if (popupName == "nav") {
    if ($(".popup[data-popup-name='nav']").hasClass("clicked")) {
      return 0;
    } else {
      $(".popup")
        .children(".box")
        // animation To Move popup
        .animate({ left: "170%" }, 1000)
        .prev()
        // animation To Move hand
        .animate({ left: "220%" }, 1000)
        .parent()
        .delay(500)
        // close popupElement
        .fadeOut(1000);

      popupEleJQ
        .children(".hands")
        .children(".grab")
        // remove class from his
        .removeClass("grab")
        .prev()
        // add class prev Element
        .addClass("grab");

      popupBox.children("span.leg-nav").removeClass("stop");
    }
  } else if (popupName == "viewFiles") {
    popupEleJQ.children(".box").removeClass("show");
    setTimeout((e) => {
      $(".popup")
        // close popupElement
        .fadeOut(1000);
    }, 400);
  } else {
    $(".popup")
      // close popupElement
      .fadeOut(1000);
  }

  $("body").css({
    overflow: "auto",
  });
}

function collision(item1, item2) {
  // "getBoundingClientRect" this is built in function return top & bottom & left & right & Width & height of the Element and That Faster than jQuery
  let {
    top: t1,
    left: l1,
    bottom: b1,
    right: r1,
  } = item1[0].getBoundingClientRect();

  let {
    top: t2,
    left: l2,
    bottom: b2,
    right: r2,
  } = item2[0].getBoundingClientRect();

  if (b2 < t1 || l2 > r1 || t2 > b1 || r2 < l1) {
    return false;
  } else {
    currentLeftBoxPopup = l2 - 28.5;
    return true;
  }
}

function checkElementHunted() {
  // Check if hand catch the grip or not
  if (collision(popupBox.find(".grip"), popupEleJQ.find(".hands"))) {
    $(".popup .hands").animate({ left: currentLeftBoxPopup }, 250).stop();
    popupEleJQ
      .children(".hands")
      .children(".grab")
      // remove class from his
      .removeClass("grab")
      .next()
      // add class next Element
      .addClass("grab");

    // stop Animations
    cancelAnimationFrame(checkElementHunted);
    // return box in his place
    returnNavBox();
  } else {
    requestAnimationFrame(checkElementHunted);
  }
}

function returnNavBox() {
  // return popupBox his place
  popupEleJQ.children(".box").delay(500).animate({ left: "100%" }, 1000);

  // Animation Legs PopupBox
  popupBox.children("span.leg-nav").removeClass("active").addClass("stop");

  setTimeout(() => {
    popupBox.children("span.leg-nav").removeClass("active").removeClass("stop");
    setTimeout((e) => {
      popupBox.children("span.leg-nav").addClass("stop");
    }, 1200);
    setTimeout((e) => {
      $(".popup[data-popup-name='nav']").removeClass("clicked");
    }, 1000);
  }, 250);

  popupEleJQ.children(".hands").delay(200).animate({ left: "100%" }, 1085);
}

// =======================

function viewBook(idBook) {
  // show Content Book In Popup
  let currentBook = allBooksData.filter((book) => {
    return book.IdBook == idBook;
  })[0],
    popupViewBook = document.querySelector(
      ".popup[data-popup-name='viewFiles']"
    ),
    frameBook = popupViewBook.querySelector("embed");
  // change src iframe To New src Book to View Book
  frameBook.setAttribute("src", `${currentBook.linkFileView.trim()}/preview`);
  // open Popup
  openPopup("viewFiles");
}

function addToFavorite(idBook) {
  // if idBook founded close Function
  if (favoriteBooksNumber.includes(idBook)) return;

  $(` [data-id-book=${idBook}] .favorite-icons`).addClass("active");
  let favoriteBook = allBooksData.filter((item) => item.IdBook == idBook)[0];
  // add number Book in Array
  favoriteBooksNumber.push(idBook);
  // add info Book in Array
  favoriteBooks.push(favoriteBook);
  updateLocalStorage();
}

function removeFromFavorite(idBook) {
  $(` [data-id-book=${idBook}] .favorite-icons`).removeClass("active");
  // return number the id != idBook
  favoriteBooksNumber = favoriteBooksNumber.filter((item) => item != idBook);
  // return books his id != idBook
  favoriteBooks = favoriteBooks.filter((item) => item.IdBook != idBook);
  updateLocalStorage();
}

function toggleFavorite(idBook) {
  if (favoriteBooksNumber.includes(idBook)) {
    removeFromFavorite(idBook);
  } else {
    addToFavorite(idBook);
  }
}

function areYouSureAboutThat() {
  openPopup("sureOrNot");
}

function clearAllFavorite() {
  favoriteBooks = [];
  favoriteBooksNumber = [];
  updateLocalStorage();

  showItemsInPage(newStartNum, newEndNum, arrayOfSomeItems, parentItemsShow, currentPage);
  repairPagination(arrayOfSomeItems);
  checkFavoriteEmpty();
  closePopup('sureOrNot');
};

function popupAreYouSure(statuesChoose) {
  if (statuesChoose.toLowerCase() == "yes") {
    clearAllFavorite();
  } else {
    closePopup('sureOrNot');
  }
}

function deleteBookFromFavorite(idBook) {
  favoriteBooks = favoriteBooks.filter((book) => book.IdBook != idBook);
  favoriteBooksNumber = favoriteBooksNumber.filter((IdBook) => IdBook != idBook);

  // remove ElementBook from row
  $(`.section-page .box[data-id-book="${idBook}"]`).remove();

  // check Row Books Is Empty Or Not
  checkRowFavoritePageEmpty();

  isDeleted = true;
  checkFavoriteEmpty();

  localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
  localStorage.setItem("idBooks", JSON.stringify(favoriteBooksNumber));
}

function checkInput(input) {
  // check input form is valid or not
  let inputName = input.name,
    inputValue = input.value.trim(),
    inputAlert = input.parentElement.nextElementSibling;
  let regex;

  // Regex inputs
  if (inputName === "UserName") {
    regex = /^\s*[A-Za-z]{3,15}(\s+[A-Za-z]{3,15})?\s*$/;
  } else if (inputName === "academicYear") {
    regex = /^[A-Za-z]+$/;
  } else if (inputName === "message") {
    regex = /^( )?[A-Za-z\ \-\_0-9\,\.\'\s|\\]+$/;
  }

  if (inputValue === "") {
    inputAlert.innerHTML = `
        <span class="alert">
        <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:">
        <use xlink:href="#exclamation-triangle-fill" />
        </svg> This field is required
        </span>
    `;
    inputAlert.classList.remove("d-none");
    input.dataset.valid = false;
  } else if (!regex.test(inputValue)) {
    inputAlert.innerHTML = `
            <span class="alert">
                <svg class="bi flex-shrink-0 me-3" role="img" aria-label="Danger:">
                    <use xlink:href="#exclamation-triangle-fill" />
                </svg>  
                ${repairErrorAlert(inputName)}
            </span>
        `;
    input.dataset.valid = false;
    inputAlert.classList.remove("d-none");
  } else {
    inputAlert.classList.add("d-none");
    input.dataset.valid = true;
  }
}

function repairErrorAlert(typeError) {
  // show text
  if (typeError == "UserName") {
    return "Invalid name. <br> The first word must be 3–15 letters, <br> and the second word is optional.";
  } else if (typeError == "academicYear") {
    return "Chose Your Academic Year";
  } else {
    return "Invalid Field";
  }
}

function addCommentInObj(idUser) {
  // Return object Comment From the Form;
  let commentObj = { id: idUser };

  formInputs.forEach((formInput) => {
    let inputName = formInput.name.trim(),
      inputValue = formInput.value.trim().toLowerCase();

    commentObj[inputName] = inputValue;
  });

  return commentObj;
}

function repairComment(objOfComment) {
  let CommentContentHTML = ``;

  CommentContentHTML = `
                <div class="header-user">
                <div class="row g-0">
                    <div class="part col-3">
                        <div class="item me-2">
                            <div class="img">
                                <img src="images/logo-bg-light.svg" alt="" class="img-fluid">
                            </div>
                        </div>
                    </div>
                    <div class="part col-9">
                        <div class="item">
                            <h6 class="font-4 mb-1">${objOfComment.UserName
    }</h6>
                            <span>
                                <span class="academic-year">${objOfComment.academicYear
    } Year</span>
                                ${objOfComment.id != 1
      ? `<i class="fa-solid fa-trash deleteComment" onclick="deleteComment(${objOfComment.id})"></i>`
      : " "
    }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="body-user-message">
                <p>
                    ${objOfComment.message}
                </p>
            </div>
    `;

  return CommentContentHTML;
}

function addComment(arrComments) {
  let wrapperHome = document.querySelector("#homeFeedBacks .swiper-wrapper");
  let commentCard = document.createElement("div");
  commentCard.classList.add("swiper-slide", "wow", "animate__fadeIn");

  arrComments.forEach(function (comment) {
    commentCard.dataset.idComment = comment.id;
    commentCard.dataset.wowDuration = ".5s";
    commentCard.dataset.wowDelay = "0s";
    commentCard.innerHTML = `
            ${repairComment(comment)}
        `;
  });
  // add comment in swiper slider
  wrapperHome.appendChild(commentCard);
  // should do That To
  swiper.update();

  updateLocalStorage();
  // change number of all comments if changed
  numberCardsEle.textContent = swiper.slides.length;
}

function showAllComments(arrayOfComments) {
  // when refresh show all comments saved in local Storage
  let wrapperHome = document.querySelector("#homeFeedBacks .swiper-wrapper");
  arrayOfComments.forEach((item) => {
    let commentCard = document.createElement("div");
    commentCard.classList.add("swiper-slide", "wow", "animate__fadeIn");
    commentCard.dataset.idComment = item.id;
    commentCard.dataset.wowDuration = ".5s";
    commentCard.dataset.wowDelay = "1.5s";

    commentCard.innerHTML = `
            ${repairComment(item)}
        `;
    wrapperHome.appendChild(commentCard);
  });

  swiper.update();
}

function deleteComment(idComment) {
  let parentsComment = document.querySelector(
    `#homeFeedBacks .swiper-wrapper [data-id-comment="${idComment}"]`
  );
  commentsFeedBacks = commentsFeedBacks.filter((comment) => {
    return comment.id != idComment;
  });

  // Remove commentElement
  parentsComment.remove();
  updateLocalStorage();
  swiper.update();
  // change Slider Number
  numberCardsEle.textContent = swiper.slides.length;
}

function checkFavoriteEmpty() {
  // if user not add book show text 1 else show text 2
  if (favoriteBooks.length == 0) {
    $("#FavoriteHeader .text-favorite").removeClass("d-none");
    $("#FavoriteHeader .data").addClass("d-none");
    return false;
  } else {
    $("#FavoriteHeader .text-favorite").addClass("d-none");
    $("#FavoriteHeader .data").removeClass("d-none");
    return true;
  }
}


// finished comments

function showItemsInPage(start, end, array, parentAddChild, currentPage) {
  // show the favorite books to the user
  parentAddChild.html("");

  array.forEach((dataOfItem, index) => {
    if (start <= index && index < end) {
      if (currentPage.toLowerCase() == "favorite" || currentPage.toLowerCase() == "materials") {
        parentAddChild.append(createNewBookCard(dataOfItem));
      } else if (currentPage.toLowerCase() == "playlist") {
        parentAddChild.append(createVideoContent(dataOfItem, index));
      }
    }
  });
}

function returnPageLayout() {
  let liIndicator = document.querySelector(
    ".indicators .indicator.active.clicked"
  );
  let prevIndicator =
    liIndicator == null || liIndicator == undefined
      ? liIndicator
      : liIndicator.previousElementSibling;

  return prevIndicator;
}

function returnLayoutSearchPage() {
  let firstIndicator = document.querySelector(
    ".indicators .indicator:first-child"
  );

  return firstIndicator;
}

function repairPage(typeRiper) {
  if (typeRiper == "current") {
    showItemsInPage(
      newStartNum,
      newEndNum,
      arrayOfSomeItems,
      parentItemsShow,
      currentPage
    );
  } else if (typeRiper == "prev") {
    changeContentPagination(returnPageLayout());
  } else if (typeRiper == "first") {
    changeContentPagination(returnLayoutSearchPage());
  } else {
  }

  repairPagination(arrayOfSomeItems);
}

function checkRowFavoritePageEmpty() {
  arrayOfSomeItems = favoriteBooks;
  let favoriteDataBooks = $("#FavoriteHeader .data .container-books");

  if (favoriteDataBooks.html() == "") {
    if (!checkFavoriteEmpty()) return;
    repairPage("prev");
  } else {
    repairPage("current");
  }
}

// =================================

function changeFiltration(typeVideos) {
  // change Filter if you choose any category
  containerFilterSelected.find(".choses").html("");

  if (typeVideos.toLowerCase() == "academic") {
    repairFiltrationVideos(filterPlaylistTypes.Academic);
  } else if (typeVideos.toLowerCase() == "programming") {
    repairFiltrationVideos(filterPlaylistTypes.Programming);
  } else {
    containerFilterSelected.find(".choses").html("");
  }
  repairPagination(searchVideosContent);
}

function repairFiltrationVideos(filterButtons) {
  containerFilterSelected
    .find(".choses")
    .append(`<h6 class="text font-4 fw-bold">Filter Videos: </h6>`);

  filterButtons.forEach((filterButton, index) => {
    containerFilterSelected
      .find(".choses")
      .append(createFiltrationButtons(filterButton, index));
  });
}

function createFiltrationButtons(button, index) {
  let HtmlContent = `
      <div class="form-check">
        <input class="form-check-input p-0" type="radio" name="playlistsRadios"
          onclick="changePlaylists(this)" data-value="${button.split(" ", 1)}"
              id="playlistsRadios${index + 1}" value="option${index + 1}" ${index == 0 ? "checked" : ""
    }>
          <label class="form-check-label me-2 mb-0" for="playlistsRadios${index + 1
    }">
              ${button}
          </label>
      </div>
    `;
  return HtmlContent;
}

function changePlaylists(that) {
  let inputValueVideo = that.dataset.value.toLowerCase();

  videosCategoryTemp2 = videosCategoryTemp.filter((video) => {
    return (
      video.programmingLanguageORAcademicYear.toLowerCase() == inputValueVideo
    );
  });
  searchInput.value = "";

  if (inputValueVideo.toLowerCase() == "all") {
    searchVideosContent = videosCategoryTemp;
    arrayOfSomeItems = videosCategoryTemp;
    checkVideos(videosCategoryTemp);
    repairPagination(searchVideosContent);
    showVideos();
  } else {
    searchVideosContent = videosCategoryTemp2;
    arrayOfSomeItems = videosCategoryTemp2;
    checkVideos(videosCategoryTemp2);
    repairPagination(searchVideosContent);
    showVideos();
  }
}

function showVideos() {
  showItemsInPage(
    newStartNum,
    newEndNum,
    arrayOfSomeItems,
    parentItemsShow,
    currentPage
  );
}

function createVideoContent(data, index) {
  let contentVideo = `
 <div class="spacial-card col-lg-4 col-xl-3 col-md-4 mb-3 col-sm-6 wow animate__fadeIn" data-wow-duration="1s" data-wow-delay="${(index % numberItemsInRow) * 0.1}s" data-id="${data.id}" data-type-video="${data.type}">
                                            <div class="item">
                                                <div class="head">
                                                    <img src="../images/playlists_images/${data.imgVideo}"
                                                        class="img-fluid" alt="Img Video" loading="lazy">
                                                </div>
                                                <div class="body">
                                                    <div class="containerContent">
                                                        <div class="name mb-1">
                                                            ${data.namePlaylist ? `
                                                            <div class="name-playlist">
                                                                <strong>Playlist :</strong> ${data.namePlaylist}
                                                            </div>
                                                            `
      : `
                                                            <div class="name-subject">
                                                                <strong>Subject :</strong> ${data.nameSubject}
                                                            </div>
                                                            `
    }
                                                        </div>
                                                        <div class="created-by">
                                                            <strong>created By:</strong> ${data.createdBy}
                                                        </div>
                                                    </div>
                                                    <div class="">
                                                        <a href="${data.linkVideo}" target="_blank" class="btn btn-video mt-2">
                                                            <span>${data.namePlaylist ? "PlayList" : "Video"} Link</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
`;
  return contentVideo;
}

// Buttons Categories Change
function changeContentVideos(typeVideos) {
  videosCategoryTemp = videos.filter((video) => {
    return typeVideos.toLowerCase() == "all"
      ? video
      : video.type == typeVideos.toLowerCase();
  });

  searchVideosContent = videosCategoryTemp;
  searchInput.value = "";

  arrayOfSomeItems = videosCategoryTemp;

  changeFiltration(typeVideos);

  checkVideos(videosCategoryTemp);

  repairPagination(searchVideosContent);

  showVideos();
}

function checkVideos(checkArray) {
  let parent = containerVideos.parent();
  if (checkArray.length === 0) {
    parent.addClass("d-none");
    parent.removeClass("d-block");

    parent.next().removeClass("d-none");
    parent.next().addClass("d-block");
  } else {
    parent.removeClass("d-none");
    parent.addClass("d-block");

    parent.next().addClass("d-none");
    parent.next().removeClass("d-block");
  }
}

// ==============================

function updateLocalStorage() {
  // update local storage
  if (currentPage.toLowerCase() == "home" || currentPage.toLowerCase() == "favorite") {
    localStorage.setItem("comments", JSON.stringify(commentsFeedBacks));
    localStorage.setItem("currentId", JSON.stringify(currentId));
  }
  if (currentPage.toLowerCase() == "favorite" || currentPage.toLowerCase() == "materials" || currentPage.toLowerCase() == "home") {
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
    localStorage.setItem("idBooks", JSON.stringify(favoriteBooksNumber));
  }
  if (currentPage.toLowerCase() == "") {
  }
  if (currentPage.toLowerCase() == "") {
  }


}

// Functions For Pagination

function createIndicators(array) {
  // create indicators
  let HtmlContent = ``;

  for (let i = 1; i <= Math.ceil(array.length / numberItemsInRow); i++) {
    HtmlContent += ` 
        <li value="${i}" onclick="changeActives(this);changeContentPagination(this);hisClicked(this)" class="${Math.ceil(array.length / numberItemsInRow) != i ? "me-2" : ""
      } indicator ${i == numberClicked ? "active clicked" : ""}">
            ${i}
        </li> 
        `;
  }

  return HtmlContent;
}

function changeContentPagination(that) {
  // Pagination number
  numberClicked = that.value;
  // when currentPagination clicked
  currentBtnBooks = that;
  // if currentPagination clicked => stop
  if (that.classList.contains("clicked")) return;

  numberBtn = that.value;
  newStartNum = numberBtn * endNum - endNum;
  newEndNum = endNum * numberBtn;

  if (currentPage.toLowerCase() == "playlist" || currentPage.toLowerCase() == "materials") {
    searchInput.value = "";
  } else {
  }

  showItemsInPage(
    newStartNum,
    newEndNum,
    arrayOfSomeItems,
    parentItemsShow,
    currentPage
  );
}

function repairPagination(array) {
  ulIndicators.html("");
  ulIndicators.append(createIndicators(array));
}

// ==============================

function moveElement(ElementYouChangIt, booleanValue1, value1, value2) {
  ElementYouChangIt.style.transform = booleanValue1 ? `${value1}` : `${value2}`;
}

// ============================== Functions For Categories

function rebuildBreadcrumb() {
  breadcrumbEle.innerHTML = ``;

  breadcrumbArr.forEach((breadcrumb, index) => {
    breadcrumbEle.innerHTML += `
    <li class="breadcrumb-item ${((index + 1) == breadcrumbArr.length) ? "" : "active"}" onclick="${(index + 1) != breadcrumbArr.length ? `returnBackStep(${index})` : ""}">
        ${breadcrumb}
    </li>
    `;
  });
}

function returnBackStep(index) {
  while ((index + 1) < (choosesUser.length)) {
    choosesUser.pop();
  }

  while ((index + 1) < breadcrumbArr.length) {
    breadcrumbArr.pop();
  }

  tempData = choosesUser[index];
  rebuildNewDataContent(tempData);
  rebuildBreadcrumb();

}

function rebuildDataContent(data) {
  let HtmlContent = ``
  titlePage.innerHTML = `${data.currentName}`;

  HtmlContent = `
      <div class="choose col-xl-3 col-sm-6 col-md-4 mb-3 wow animate__fadeIn" data-wow-duration=".7s" data-wow-delay="0.3s" data-depth="${data.depth}" data-name-current-title="${data.nameItem}">
        <div class="item" onclick="${(data.depth < 4) ? `chooseCategory('${data.nameItem}', ${data.depth}) ` : ''}">
            <img src="../images/categories/${data.imgItemURL ?? "default_Images.png"} "
class="mb-2 img-fluid" alt = "Image ${data.nameItem}" >

  <h4 class="">
    ${data.nameItem}
  </h4>
        </div >
    </div >
  `;

  return HtmlContent;
}

function chooseCategory(nameTitle, depthCategory) {
  let newArrayData = tempData.filter((Item) => {
    return Item.depth == depthCategory && Item.nameItem == nameTitle;
  })[0].details;

  if (choosesUser.length <= 6) {
    choosesUser.push(tempData);
  }

  tempData = newArrayData;

  rebuildNewDataContent(newArrayData);
}

function rebuildNewDataContent(array) {
  containerDataCategory.innerHTML = ``;

  array.forEach((arrData) => {
    containerDataCategory.innerHTML += rebuildDataContent(arrData);
    objectCurrentData = arrData;
  });
  breadcrumb(objectCurrentData);
  rebuildBreadcrumb();
}

function breadcrumb(objData) {
  if (!breadcrumbArr.includes(objData.currentName)) {
    breadcrumbArr.push(objData.currentName);
  }
}

// ==============================

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJmdW5jdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2V0VGhlbWUobmFtZSkge1xyXG4gIC8vIGNoYW5nZSBUaGVtZSBtYWluIGNvbG9yXHJcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGhlbWVcIiwgbmFtZSk7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0aGVtZVwiLCBuYW1lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnRuVGhlbWVBY3RpdmUoYnRuc1RoZW1lKSB7XHJcbiAgLy8gY2hhbmdlIFRoZW1lIGRhcmsgb3IgbGlnaHRcclxuICBmb3IgKGxldCBidG4gb2YgYnRuc1RoZW1lKSB7XHJcbiAgICBidG4uY2hlY2tlZCA9ICFzdGF0dWVzQnRuVGhlbWU7XHJcbiAgfVxyXG4gIHN0YXR1ZXNCdG5UaGVtZSA9ICFzdGF0dWVzQnRuVGhlbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUFjdGl2ZXModGhhdCkge1xyXG4gIGxldCBwYXJlbnRBbGxDaGlsZHJlbiA9IHRoYXQuY2xvc2VzdChcIi5jaGFuZ2VBY3RpdmVzXCIpLFxyXG4gICAgY2hpbGRBY3RpdmUgPSBwYXJlbnRBbGxDaGlsZHJlbi5xdWVyeVNlbGVjdG9yKFwiLmFjdGl2ZVwiKSxcclxuICAgIGN1cnJlbnRDaGlsZCA9IHRoYXQ7XHJcblxyXG4gIGlmICh0aGF0LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNoaWxkQWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICBjdXJyZW50Q2hpbGQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpc0NsaWNrZWQodGhhdCkge1xyXG4gIGxldCBwYXJlbnRBbGxDaGlsZHJlbiA9IHRoYXQuY2xvc2VzdChcIi5jaGFuZ2VBY3RpdmVzXCIpLFxyXG4gICAgY2hpbGRBY3RpdmUgPSBwYXJlbnRBbGxDaGlsZHJlbi5xdWVyeVNlbGVjdG9yKFwiLmNsaWNrZWRcIiksXHJcbiAgICBjdXJyZW50Q2hpbGQgPSB0aGF0O1xyXG5cclxuICBpZiAodGhhdC5jbGFzc0xpc3QuY29udGFpbnMoXCJjbGlja2VkXCIpKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9IGVsc2Uge1xyXG4gICAgY2hpbGRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcImNsaWNrZWRcIik7XHJcbiAgICBjdXJyZW50Q2hpbGQuY2xhc3NMaXN0LmFkZChcImNsaWNrZWRcIik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuZnVuY3Rpb24gb3BlblBvcHVwKHBvcHVwTmFtZSkge1xyXG4gIC8vIEZ1bmN0aW9uIFRvIE9wZW4gcG9wdXBcclxuICBwb3B1cEVsZUpRID0gJChgLnBvcHVwW2RhdGEtcG9wdXAtbmFtZT1cIiR7cG9wdXBOYW1lfVwiXWApO1xyXG4gIHBvcHVwQm94ID0gcG9wdXBFbGVKUS5jaGlsZHJlbihcIi5ib3hcIik7XHJcblxyXG4gIHBvcHVwQm94LmNsaWNrKChlKSA9PiB7XHJcbiAgICAvLyBpZiB1c2VyIGNsaWNrIG9uIFBvcHVwQm94IERvbid0IGNsb3NlIHBvcHVwXHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG4gICQoXCJib2R5XCIpLmNzcyh7XHJcbiAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcclxuICB9KTtcclxuXHJcbiAgaWYgKHBvcHVwTmFtZSA9PSBcIm5hdlwiKSB7XHJcbiAgICAvLyBpZiBwb3B1cE5hbWUgZXF1YWwgbmF2IERvIHRoaXMgZnVuY3Rpb24uXHJcbiAgICAkKFwiLnBvcHVwW2RhdGEtcG9wdXAtbmFtZT0nbmF2J11cIikuYWRkQ2xhc3MoXCJjbGlja2VkXCIpO1xyXG4gICAgcG9wdXBOYXZiYXIoKTtcclxuICB9IGVsc2UgaWYgKHBvcHVwTmFtZSA9PSBcInZpZXdGaWxlc1wiKSB7XHJcbiAgICBzZXRUaW1lb3V0KChlKSA9PiB7XHJcbiAgICAgIHBvcHVwRWxlSlEuZmFkZUluKDEwMDApO1xyXG4gICAgICBzZXRUaW1lb3V0KChlKSA9PiB7XHJcbiAgICAgICAgcG9wdXBFbGVKUS5jaGlsZHJlbihcIi5ib3hcIikuYWRkQ2xhc3MoXCJzaG93XCIpO1xyXG4gICAgICB9LCA1MDApO1xyXG4gICAgfSwgMTApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBlbHNlIHBvcHVwXHJcbiAgICBwb3B1cEVsZUpRLmZhZGVJbigxMDAwKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVwTmF2YmFyKCkge1xyXG4gIHBvcHVwRWxlSlEgPSAkKGAucG9wdXBbZGF0YS1wb3B1cC1uYW1lPVwibmF2XCJdYCk7XHJcblxyXG4gIC8vIG1vdmUgcG9wdXBCb3ggdG8gbGVmdFxyXG4gIHBvcHVwRWxlSlFcclxuICAgIC5mYWRlSW4oMTAwMClcclxuICAgIC5jaGlsZHJlbihcIi5ib3hcIilcclxuICAgIC5hbmltYXRlKHsgbGVmdDogXCI1MCVcIiB9LCAyNTAwKVxyXG4gICAgLmFmdGVyKCk7XHJcbiAgcG9wdXBCb3guZmluZChcIi5sZWctbmF2XCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIHBvcHVwQm94LmNoaWxkcmVuKFwic3Bhbi5sZWctbmF2XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLmFkZENsYXNzKFwic3RvcFwiKTtcclxuICB9LCAyMzAwKTtcclxuXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAvLyBtb3ZlIEhhbmQgdG8gbGVmdCB0byBjYXRjaCBwb3B1cEJveFxyXG4gICAgcG9wdXBFbGVKUS5jaGlsZHJlbihcIi5oYW5kc1wiKS5hbmltYXRlKHsgbGVmdDogXCIxMCVcIiB9LCAyNjUwKTtcclxuICB9LCAxMDAwKTtcclxuXHJcbiAgLy8gY2hlY2sgaWYgSGFuZCBjYXRjaCB0aGUgcG9wdXBCb3ggb3Igbm90XHJcbiAgY2hlY2tFbGVtZW50SHVudGVkKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlUG9wdXAocG9wdXBOYW1lID0gbnVsbCkge1xyXG4gIGlmIChwb3B1cE5hbWUgPT0gXCJuYXZcIikge1xyXG4gICAgaWYgKCQoXCIucG9wdXBbZGF0YS1wb3B1cC1uYW1lPSduYXYnXVwiKS5oYXNDbGFzcyhcImNsaWNrZWRcIikpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKFwiLnBvcHVwXCIpXHJcbiAgICAgICAgLmNoaWxkcmVuKFwiLmJveFwiKVxyXG4gICAgICAgIC8vIGFuaW1hdGlvbiBUbyBNb3ZlIHBvcHVwXHJcbiAgICAgICAgLmFuaW1hdGUoeyBsZWZ0OiBcIjE3MCVcIiB9LCAxMDAwKVxyXG4gICAgICAgIC5wcmV2KClcclxuICAgICAgICAvLyBhbmltYXRpb24gVG8gTW92ZSBoYW5kXHJcbiAgICAgICAgLmFuaW1hdGUoeyBsZWZ0OiBcIjIyMCVcIiB9LCAxMDAwKVxyXG4gICAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAgIC5kZWxheSg1MDApXHJcbiAgICAgICAgLy8gY2xvc2UgcG9wdXBFbGVtZW50XHJcbiAgICAgICAgLmZhZGVPdXQoMTAwMCk7XHJcblxyXG4gICAgICBwb3B1cEVsZUpRXHJcbiAgICAgICAgLmNoaWxkcmVuKFwiLmhhbmRzXCIpXHJcbiAgICAgICAgLmNoaWxkcmVuKFwiLmdyYWJcIilcclxuICAgICAgICAvLyByZW1vdmUgY2xhc3MgZnJvbSBoaXNcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJncmFiXCIpXHJcbiAgICAgICAgLnByZXYoKVxyXG4gICAgICAgIC8vIGFkZCBjbGFzcyBwcmV2IEVsZW1lbnRcclxuICAgICAgICAuYWRkQ2xhc3MoXCJncmFiXCIpO1xyXG5cclxuICAgICAgcG9wdXBCb3guY2hpbGRyZW4oXCJzcGFuLmxlZy1uYXZcIikucmVtb3ZlQ2xhc3MoXCJzdG9wXCIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocG9wdXBOYW1lID09IFwidmlld0ZpbGVzXCIpIHtcclxuICAgIHBvcHVwRWxlSlEuY2hpbGRyZW4oXCIuYm94XCIpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcclxuICAgIHNldFRpbWVvdXQoKGUpID0+IHtcclxuICAgICAgJChcIi5wb3B1cFwiKVxyXG4gICAgICAgIC8vIGNsb3NlIHBvcHVwRWxlbWVudFxyXG4gICAgICAgIC5mYWRlT3V0KDEwMDApO1xyXG4gICAgfSwgNDAwKTtcclxuICB9IGVsc2Uge1xyXG4gICAgJChcIi5wb3B1cFwiKVxyXG4gICAgICAvLyBjbG9zZSBwb3B1cEVsZW1lbnRcclxuICAgICAgLmZhZGVPdXQoMTAwMCk7XHJcbiAgfVxyXG5cclxuICAkKFwiYm9keVwiKS5jc3Moe1xyXG4gICAgb3ZlcmZsb3c6IFwiYXV0b1wiLFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb2xsaXNpb24oaXRlbTEsIGl0ZW0yKSB7XHJcbiAgLy8gXCJnZXRCb3VuZGluZ0NsaWVudFJlY3RcIiB0aGlzIGlzIGJ1aWx0IGluIGZ1bmN0aW9uIHJldHVybiB0b3AgJiBib3R0b20gJiBsZWZ0ICYgcmlnaHQgJiBXaWR0aCAmIGhlaWdodCBvZiB0aGUgRWxlbWVudCBhbmQgVGhhdCBGYXN0ZXIgdGhhbiBqUXVlcnlcclxuICBsZXQge1xyXG4gICAgdG9wOiB0MSxcclxuICAgIGxlZnQ6IGwxLFxyXG4gICAgYm90dG9tOiBiMSxcclxuICAgIHJpZ2h0OiByMSxcclxuICB9ID0gaXRlbTFbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gIGxldCB7XHJcbiAgICB0b3A6IHQyLFxyXG4gICAgbGVmdDogbDIsXHJcbiAgICBib3R0b206IGIyLFxyXG4gICAgcmlnaHQ6IHIyLFxyXG4gIH0gPSBpdGVtMlswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgaWYgKGIyIDwgdDEgfHwgbDIgPiByMSB8fCB0MiA+IGIxIHx8IHIyIDwgbDEpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9IGVsc2Uge1xyXG4gICAgY3VycmVudExlZnRCb3hQb3B1cCA9IGwyIC0gMjguNTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tFbGVtZW50SHVudGVkKCkge1xyXG4gIC8vIENoZWNrIGlmIGhhbmQgY2F0Y2ggdGhlIGdyaXAgb3Igbm90XHJcbiAgaWYgKGNvbGxpc2lvbihwb3B1cEJveC5maW5kKFwiLmdyaXBcIiksIHBvcHVwRWxlSlEuZmluZChcIi5oYW5kc1wiKSkpIHtcclxuICAgICQoXCIucG9wdXAgLmhhbmRzXCIpLmFuaW1hdGUoeyBsZWZ0OiBjdXJyZW50TGVmdEJveFBvcHVwIH0sIDI1MCkuc3RvcCgpO1xyXG4gICAgcG9wdXBFbGVKUVxyXG4gICAgICAuY2hpbGRyZW4oXCIuaGFuZHNcIilcclxuICAgICAgLmNoaWxkcmVuKFwiLmdyYWJcIilcclxuICAgICAgLy8gcmVtb3ZlIGNsYXNzIGZyb20gaGlzXHJcbiAgICAgIC5yZW1vdmVDbGFzcyhcImdyYWJcIilcclxuICAgICAgLm5leHQoKVxyXG4gICAgICAvLyBhZGQgY2xhc3MgbmV4dCBFbGVtZW50XHJcbiAgICAgIC5hZGRDbGFzcyhcImdyYWJcIik7XHJcblxyXG4gICAgLy8gc3RvcCBBbmltYXRpb25zXHJcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShjaGVja0VsZW1lbnRIdW50ZWQpO1xyXG4gICAgLy8gcmV0dXJuIGJveCBpbiBoaXMgcGxhY2VcclxuICAgIHJldHVybk5hdkJveCgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2hlY2tFbGVtZW50SHVudGVkKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHVybk5hdkJveCgpIHtcclxuICAvLyByZXR1cm4gcG9wdXBCb3ggaGlzIHBsYWNlXHJcbiAgcG9wdXBFbGVKUS5jaGlsZHJlbihcIi5ib3hcIikuZGVsYXkoNTAwKS5hbmltYXRlKHsgbGVmdDogXCIxMDAlXCIgfSwgMTAwMCk7XHJcblxyXG4gIC8vIEFuaW1hdGlvbiBMZWdzIFBvcHVwQm94XHJcbiAgcG9wdXBCb3guY2hpbGRyZW4oXCJzcGFuLmxlZy1uYXZcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikuYWRkQ2xhc3MoXCJzdG9wXCIpO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIHBvcHVwQm94LmNoaWxkcmVuKFwic3Bhbi5sZWctbmF2XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwic3RvcFwiKTtcclxuICAgIHNldFRpbWVvdXQoKGUpID0+IHtcclxuICAgICAgcG9wdXBCb3guY2hpbGRyZW4oXCJzcGFuLmxlZy1uYXZcIikuYWRkQ2xhc3MoXCJzdG9wXCIpO1xyXG4gICAgfSwgMTIwMCk7XHJcbiAgICBzZXRUaW1lb3V0KChlKSA9PiB7XHJcbiAgICAgICQoXCIucG9wdXBbZGF0YS1wb3B1cC1uYW1lPSduYXYnXVwiKS5yZW1vdmVDbGFzcyhcImNsaWNrZWRcIik7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9LCAyNTApO1xyXG5cclxuICBwb3B1cEVsZUpRLmNoaWxkcmVuKFwiLmhhbmRzXCIpLmRlbGF5KDIwMCkuYW5pbWF0ZSh7IGxlZnQ6IFwiMTAwJVwiIH0sIDEwODUpO1xyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuZnVuY3Rpb24gdmlld0Jvb2soaWRCb29rKSB7XHJcbiAgLy8gc2hvdyBDb250ZW50IEJvb2sgSW4gUG9wdXBcclxuICBsZXQgY3VycmVudEJvb2sgPSBhbGxCb29rc0RhdGEuZmlsdGVyKChib29rKSA9PiB7XHJcbiAgICByZXR1cm4gYm9vay5JZEJvb2sgPT0gaWRCb29rO1xyXG4gIH0pWzBdLFxyXG4gICAgcG9wdXBWaWV3Qm9vayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLnBvcHVwW2RhdGEtcG9wdXAtbmFtZT0ndmlld0ZpbGVzJ11cIlxyXG4gICAgKSxcclxuICAgIGZyYW1lQm9vayA9IHBvcHVwVmlld0Jvb2sucXVlcnlTZWxlY3RvcihcImVtYmVkXCIpO1xyXG4gIC8vIGNoYW5nZSBzcmMgaWZyYW1lIFRvIE5ldyBzcmMgQm9vayB0byBWaWV3IEJvb2tcclxuICBmcmFtZUJvb2suc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke2N1cnJlbnRCb29rLmxpbmtGaWxlVmlldy50cmltKCl9L3ByZXZpZXdgKTtcclxuICAvLyBvcGVuIFBvcHVwXHJcbiAgb3BlblBvcHVwKFwidmlld0ZpbGVzXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUb0Zhdm9yaXRlKGlkQm9vaykge1xyXG4gIC8vIGlmIGlkQm9vayBmb3VuZGVkIGNsb3NlIEZ1bmN0aW9uXHJcbiAgaWYgKGZhdm9yaXRlQm9va3NOdW1iZXIuaW5jbHVkZXMoaWRCb29rKSkgcmV0dXJuO1xyXG5cclxuICAkKGAgW2RhdGEtaWQtYm9vaz0ke2lkQm9va31dIC5mYXZvcml0ZS1pY29uc2ApLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIGxldCBmYXZvcml0ZUJvb2sgPSBhbGxCb29rc0RhdGEuZmlsdGVyKChpdGVtKSA9PiBpdGVtLklkQm9vayA9PSBpZEJvb2spWzBdO1xyXG4gIC8vIGFkZCBudW1iZXIgQm9vayBpbiBBcnJheVxyXG4gIGZhdm9yaXRlQm9va3NOdW1iZXIucHVzaChpZEJvb2spO1xyXG4gIC8vIGFkZCBpbmZvIEJvb2sgaW4gQXJyYXlcclxuICBmYXZvcml0ZUJvb2tzLnB1c2goZmF2b3JpdGVCb29rKTtcclxuICB1cGRhdGVMb2NhbFN0b3JhZ2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlRnJvbUZhdm9yaXRlKGlkQm9vaykge1xyXG4gICQoYCBbZGF0YS1pZC1ib29rPSR7aWRCb29rfV0gLmZhdm9yaXRlLWljb25zYCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgLy8gcmV0dXJuIG51bWJlciB0aGUgaWQgIT0gaWRCb29rXHJcbiAgZmF2b3JpdGVCb29rc051bWJlciA9IGZhdm9yaXRlQm9va3NOdW1iZXIuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9IGlkQm9vayk7XHJcbiAgLy8gcmV0dXJuIGJvb2tzIGhpcyBpZCAhPSBpZEJvb2tcclxuICBmYXZvcml0ZUJvb2tzID0gZmF2b3JpdGVCb29rcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uSWRCb29rICE9IGlkQm9vayk7XHJcbiAgdXBkYXRlTG9jYWxTdG9yYWdlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUZhdm9yaXRlKGlkQm9vaykge1xyXG4gIGlmIChmYXZvcml0ZUJvb2tzTnVtYmVyLmluY2x1ZGVzKGlkQm9vaykpIHtcclxuICAgIHJlbW92ZUZyb21GYXZvcml0ZShpZEJvb2spO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhZGRUb0Zhdm9yaXRlKGlkQm9vayk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcmVZb3VTdXJlQWJvdXRUaGF0KCkge1xyXG4gIG9wZW5Qb3B1cChcInN1cmVPck5vdFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJBbGxGYXZvcml0ZSgpIHtcclxuICBmYXZvcml0ZUJvb2tzID0gW107XHJcbiAgZmF2b3JpdGVCb29rc051bWJlciA9IFtdO1xyXG4gIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xyXG5cclxuICBzaG93SXRlbXNJblBhZ2UobmV3U3RhcnROdW0sIG5ld0VuZE51bSwgYXJyYXlPZlNvbWVJdGVtcywgcGFyZW50SXRlbXNTaG93LCBjdXJyZW50UGFnZSk7XHJcbiAgcmVwYWlyUGFnaW5hdGlvbihhcnJheU9mU29tZUl0ZW1zKTtcclxuICBjaGVja0Zhdm9yaXRlRW1wdHkoKTtcclxuICBjbG9zZVBvcHVwKCdzdXJlT3JOb3QnKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHBvcHVwQXJlWW91U3VyZShzdGF0dWVzQ2hvb3NlKSB7XHJcbiAgaWYgKHN0YXR1ZXNDaG9vc2UudG9Mb3dlckNhc2UoKSA9PSBcInllc1wiKSB7XHJcbiAgICBjbGVhckFsbEZhdm9yaXRlKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNsb3NlUG9wdXAoJ3N1cmVPck5vdCcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlQm9va0Zyb21GYXZvcml0ZShpZEJvb2spIHtcclxuICBmYXZvcml0ZUJvb2tzID0gZmF2b3JpdGVCb29rcy5maWx0ZXIoKGJvb2spID0+IGJvb2suSWRCb29rICE9IGlkQm9vayk7XHJcbiAgZmF2b3JpdGVCb29rc051bWJlciA9IGZhdm9yaXRlQm9va3NOdW1iZXIuZmlsdGVyKChJZEJvb2spID0+IElkQm9vayAhPSBpZEJvb2spO1xyXG5cclxuICAvLyByZW1vdmUgRWxlbWVudEJvb2sgZnJvbSByb3dcclxuICAkKGAuc2VjdGlvbi1wYWdlIC5ib3hbZGF0YS1pZC1ib29rPVwiJHtpZEJvb2t9XCJdYCkucmVtb3ZlKCk7XHJcblxyXG4gIC8vIGNoZWNrIFJvdyBCb29rcyBJcyBFbXB0eSBPciBOb3RcclxuICBjaGVja1Jvd0Zhdm9yaXRlUGFnZUVtcHR5KCk7XHJcblxyXG4gIGlzRGVsZXRlZCA9IHRydWU7XHJcbiAgY2hlY2tGYXZvcml0ZUVtcHR5KCk7XHJcblxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZmF2b3JpdGVCb29rc1wiLCBKU09OLnN0cmluZ2lmeShmYXZvcml0ZUJvb2tzKSk7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpZEJvb2tzXCIsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlQm9va3NOdW1iZXIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tJbnB1dChpbnB1dCkge1xyXG4gIC8vIGNoZWNrIGlucHV0IGZvcm0gaXMgdmFsaWQgb3Igbm90XHJcbiAgbGV0IGlucHV0TmFtZSA9IGlucHV0Lm5hbWUsXHJcbiAgICBpbnB1dFZhbHVlID0gaW5wdXQudmFsdWUudHJpbSgpLFxyXG4gICAgaW5wdXRBbGVydCA9IGlucHV0LnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gIGxldCByZWdleDtcclxuXHJcbiAgLy8gUmVnZXggaW5wdXRzXHJcbiAgaWYgKGlucHV0TmFtZSA9PT0gXCJVc2VyTmFtZVwiKSB7XHJcbiAgICByZWdleCA9IC9eXFxzKltBLVphLXpdezMsMTV9KFxccytbQS1aYS16XXszLDE1fSk/XFxzKiQvO1xyXG4gIH0gZWxzZSBpZiAoaW5wdXROYW1lID09PSBcImFjYWRlbWljWWVhclwiKSB7XHJcbiAgICByZWdleCA9IC9eW0EtWmEtel0rJC87XHJcbiAgfSBlbHNlIGlmIChpbnB1dE5hbWUgPT09IFwibWVzc2FnZVwiKSB7XHJcbiAgICByZWdleCA9IC9eKCApP1tBLVphLXpcXCBcXC1cXF8wLTlcXCxcXC5cXCdcXHN8XFxcXF0rJC87XHJcbiAgfVxyXG5cclxuICBpZiAoaW5wdXRWYWx1ZSA9PT0gXCJcIikge1xyXG4gICAgaW5wdXRBbGVydC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhbGVydFwiPlxyXG4gICAgICAgIDxzdmcgY2xhc3M9XCJiaSBmbGV4LXNocmluay0wIG1lLTJcIiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbD1cIkRhbmdlcjpcIj5cclxuICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjZXhjbGFtYXRpb24tdHJpYW5nbGUtZmlsbFwiIC8+XHJcbiAgICAgICAgPC9zdmc+IFRoaXMgZmllbGQgaXMgcmVxdWlyZWRcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICBgO1xyXG4gICAgaW5wdXRBbGVydC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gICAgaW5wdXQuZGF0YXNldC52YWxpZCA9IGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoIXJlZ2V4LnRlc3QoaW5wdXRWYWx1ZSkpIHtcclxuICAgIGlucHV0QWxlcnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFsZXJ0XCI+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiYmkgZmxleC1zaHJpbmstMCBtZS0zXCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9XCJEYW5nZXI6XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiI2V4Y2xhbWF0aW9uLXRyaWFuZ2xlLWZpbGxcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+ICBcclxuICAgICAgICAgICAgICAgICR7cmVwYWlyRXJyb3JBbGVydChpbnB1dE5hbWUpfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgYDtcclxuICAgIGlucHV0LmRhdGFzZXQudmFsaWQgPSBmYWxzZTtcclxuICAgIGlucHV0QWxlcnQuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5wdXRBbGVydC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gICAgaW5wdXQuZGF0YXNldC52YWxpZCA9IHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXBhaXJFcnJvckFsZXJ0KHR5cGVFcnJvcikge1xyXG4gIC8vIHNob3cgdGV4dFxyXG4gIGlmICh0eXBlRXJyb3IgPT0gXCJVc2VyTmFtZVwiKSB7XHJcbiAgICByZXR1cm4gXCJJbnZhbGlkIG5hbWUuIDxicj4gVGhlIGZpcnN0IHdvcmQgbXVzdCBiZSAz4oCTMTUgbGV0dGVycywgPGJyPiBhbmQgdGhlIHNlY29uZCB3b3JkIGlzIG9wdGlvbmFsLlwiO1xyXG4gIH0gZWxzZSBpZiAodHlwZUVycm9yID09IFwiYWNhZGVtaWNZZWFyXCIpIHtcclxuICAgIHJldHVybiBcIkNob3NlIFlvdXIgQWNhZGVtaWMgWWVhclwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gXCJJbnZhbGlkIEZpZWxkXCI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRDb21tZW50SW5PYmooaWRVc2VyKSB7XHJcbiAgLy8gUmV0dXJuIG9iamVjdCBDb21tZW50IEZyb20gdGhlIEZvcm07XHJcbiAgbGV0IGNvbW1lbnRPYmogPSB7IGlkOiBpZFVzZXIgfTtcclxuXHJcbiAgZm9ybUlucHV0cy5mb3JFYWNoKChmb3JtSW5wdXQpID0+IHtcclxuICAgIGxldCBpbnB1dE5hbWUgPSBmb3JtSW5wdXQubmFtZS50cmltKCksXHJcbiAgICAgIGlucHV0VmFsdWUgPSBmb3JtSW5wdXQudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgY29tbWVudE9ialtpbnB1dE5hbWVdID0gaW5wdXRWYWx1ZTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGNvbW1lbnRPYmo7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlcGFpckNvbW1lbnQob2JqT2ZDb21tZW50KSB7XHJcbiAgbGV0IENvbW1lbnRDb250ZW50SFRNTCA9IGBgO1xyXG5cclxuICBDb21tZW50Q29udGVudEhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXVzZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgZy0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhcnQgY29sLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0gbWUtMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1hZ2VzL2xvZ28tYmctbGlnaHQuc3ZnXCIgYWx0PVwiXCIgY2xhc3M9XCJpbWctZmx1aWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFydCBjb2wtOVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg2IGNsYXNzPVwiZm9udC00IG1iLTFcIj4ke29iak9mQ29tbWVudC5Vc2VyTmFtZVxyXG4gICAgfTwvaDY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFjYWRlbWljLXllYXJcIj4ke29iak9mQ29tbWVudC5hY2FkZW1pY1llYXJcclxuICAgIH0gWWVhcjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke29iak9mQ29tbWVudC5pZCAhPSAxXHJcbiAgICAgID8gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2ggZGVsZXRlQ29tbWVudFwiIG9uY2xpY2s9XCJkZWxldGVDb21tZW50KCR7b2JqT2ZDb21tZW50LmlkfSlcIj48L2k+YFxyXG4gICAgICA6IFwiIFwiXHJcbiAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9keS11c2VyLW1lc3NhZ2VcIj5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICR7b2JqT2ZDb21tZW50Lm1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuXHJcbiAgcmV0dXJuIENvbW1lbnRDb250ZW50SFRNTDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkQ29tbWVudChhcnJDb21tZW50cykge1xyXG4gIGxldCB3cmFwcGVySG9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG9tZUZlZWRCYWNrcyAuc3dpcGVyLXdyYXBwZXJcIik7XHJcbiAgbGV0IGNvbW1lbnRDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb21tZW50Q2FyZC5jbGFzc0xpc3QuYWRkKFwic3dpcGVyLXNsaWRlXCIsIFwid293XCIsIFwiYW5pbWF0ZV9fZmFkZUluXCIpO1xyXG5cclxuICBhcnJDb21tZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb21tZW50KSB7XHJcbiAgICBjb21tZW50Q2FyZC5kYXRhc2V0LmlkQ29tbWVudCA9IGNvbW1lbnQuaWQ7XHJcbiAgICBjb21tZW50Q2FyZC5kYXRhc2V0Lndvd0R1cmF0aW9uID0gXCIuNXNcIjtcclxuICAgIGNvbW1lbnRDYXJkLmRhdGFzZXQud293RGVsYXkgPSBcIjBzXCI7XHJcbiAgICBjb21tZW50Q2FyZC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICR7cmVwYWlyQ29tbWVudChjb21tZW50KX1cclxuICAgICAgICBgO1xyXG4gIH0pO1xyXG4gIC8vIGFkZCBjb21tZW50IGluIHN3aXBlciBzbGlkZXJcclxuICB3cmFwcGVySG9tZS5hcHBlbmRDaGlsZChjb21tZW50Q2FyZCk7XHJcbiAgLy8gc2hvdWxkIGRvIFRoYXQgVG9cclxuICBzd2lwZXIudXBkYXRlKCk7XHJcblxyXG4gIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xyXG4gIC8vIGNoYW5nZSBudW1iZXIgb2YgYWxsIGNvbW1lbnRzIGlmIGNoYW5nZWRcclxuICBudW1iZXJDYXJkc0VsZS50ZXh0Q29udGVudCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QWxsQ29tbWVudHMoYXJyYXlPZkNvbW1lbnRzKSB7XHJcbiAgLy8gd2hlbiByZWZyZXNoIHNob3cgYWxsIGNvbW1lbnRzIHNhdmVkIGluIGxvY2FsIFN0b3JhZ2VcclxuICBsZXQgd3JhcHBlckhvbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvbWVGZWVkQmFja3MgLnN3aXBlci13cmFwcGVyXCIpO1xyXG4gIGFycmF5T2ZDb21tZW50cy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICBsZXQgY29tbWVudENhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29tbWVudENhcmQuY2xhc3NMaXN0LmFkZChcInN3aXBlci1zbGlkZVwiLCBcIndvd1wiLCBcImFuaW1hdGVfX2ZhZGVJblwiKTtcclxuICAgIGNvbW1lbnRDYXJkLmRhdGFzZXQuaWRDb21tZW50ID0gaXRlbS5pZDtcclxuICAgIGNvbW1lbnRDYXJkLmRhdGFzZXQud293RHVyYXRpb24gPSBcIi41c1wiO1xyXG4gICAgY29tbWVudENhcmQuZGF0YXNldC53b3dEZWxheSA9IFwiMS41c1wiO1xyXG5cclxuICAgIGNvbW1lbnRDYXJkLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgJHtyZXBhaXJDb21tZW50KGl0ZW0pfVxyXG4gICAgICAgIGA7XHJcbiAgICB3cmFwcGVySG9tZS5hcHBlbmRDaGlsZChjb21tZW50Q2FyZCk7XHJcbiAgfSk7XHJcblxyXG4gIHN3aXBlci51cGRhdGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlQ29tbWVudChpZENvbW1lbnQpIHtcclxuICBsZXQgcGFyZW50c0NvbW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgYCNob21lRmVlZEJhY2tzIC5zd2lwZXItd3JhcHBlciBbZGF0YS1pZC1jb21tZW50PVwiJHtpZENvbW1lbnR9XCJdYFxyXG4gICk7XHJcbiAgY29tbWVudHNGZWVkQmFja3MgPSBjb21tZW50c0ZlZWRCYWNrcy5maWx0ZXIoKGNvbW1lbnQpID0+IHtcclxuICAgIHJldHVybiBjb21tZW50LmlkICE9IGlkQ29tbWVudDtcclxuICB9KTtcclxuXHJcbiAgLy8gUmVtb3ZlIGNvbW1lbnRFbGVtZW50XHJcbiAgcGFyZW50c0NvbW1lbnQucmVtb3ZlKCk7XHJcbiAgdXBkYXRlTG9jYWxTdG9yYWdlKCk7XHJcbiAgc3dpcGVyLnVwZGF0ZSgpO1xyXG4gIC8vIGNoYW5nZSBTbGlkZXIgTnVtYmVyXHJcbiAgbnVtYmVyQ2FyZHNFbGUudGV4dENvbnRlbnQgPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tGYXZvcml0ZUVtcHR5KCkge1xyXG4gIC8vIGlmIHVzZXIgbm90IGFkZCBib29rIHNob3cgdGV4dCAxIGVsc2Ugc2hvdyB0ZXh0IDJcclxuICBpZiAoZmF2b3JpdGVCb29rcy5sZW5ndGggPT0gMCkge1xyXG4gICAgJChcIiNGYXZvcml0ZUhlYWRlciAudGV4dC1mYXZvcml0ZVwiKS5yZW1vdmVDbGFzcyhcImQtbm9uZVwiKTtcclxuICAgICQoXCIjRmF2b3JpdGVIZWFkZXIgLmRhdGFcIikuYWRkQ2xhc3MoXCJkLW5vbmVcIik7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoXCIjRmF2b3JpdGVIZWFkZXIgLnRleHQtZmF2b3JpdGVcIikuYWRkQ2xhc3MoXCJkLW5vbmVcIik7XHJcbiAgICAkKFwiI0Zhdm9yaXRlSGVhZGVyIC5kYXRhXCIpLnJlbW92ZUNsYXNzKFwiZC1ub25lXCIpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuLy8gZmluaXNoZWQgY29tbWVudHNcclxuXHJcbmZ1bmN0aW9uIHNob3dJdGVtc0luUGFnZShzdGFydCwgZW5kLCBhcnJheSwgcGFyZW50QWRkQ2hpbGQsIGN1cnJlbnRQYWdlKSB7XHJcbiAgLy8gc2hvdyB0aGUgZmF2b3JpdGUgYm9va3MgdG8gdGhlIHVzZXJcclxuICBwYXJlbnRBZGRDaGlsZC5odG1sKFwiXCIpO1xyXG5cclxuICBhcnJheS5mb3JFYWNoKChkYXRhT2ZJdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKHN0YXJ0IDw9IGluZGV4ICYmIGluZGV4IDwgZW5kKSB7XHJcbiAgICAgIGlmIChjdXJyZW50UGFnZS50b0xvd2VyQ2FzZSgpID09IFwiZmF2b3JpdGVcIiB8fCBjdXJyZW50UGFnZS50b0xvd2VyQ2FzZSgpID09IFwibWF0ZXJpYWxzXCIpIHtcclxuICAgICAgICBwYXJlbnRBZGRDaGlsZC5hcHBlbmQoY3JlYXRlTmV3Qm9va0NhcmQoZGF0YU9mSXRlbSkpO1xyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlLnRvTG93ZXJDYXNlKCkgPT0gXCJwbGF5bGlzdFwiKSB7XHJcbiAgICAgICAgcGFyZW50QWRkQ2hpbGQuYXBwZW5kKGNyZWF0ZVZpZGVvQ29udGVudChkYXRhT2ZJdGVtLCBpbmRleCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHVyblBhZ2VMYXlvdXQoKSB7XHJcbiAgbGV0IGxpSW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgIFwiLmluZGljYXRvcnMgLmluZGljYXRvci5hY3RpdmUuY2xpY2tlZFwiXHJcbiAgKTtcclxuICBsZXQgcHJldkluZGljYXRvciA9XHJcbiAgICBsaUluZGljYXRvciA9PSBudWxsIHx8IGxpSW5kaWNhdG9yID09IHVuZGVmaW5lZFxyXG4gICAgICA/IGxpSW5kaWNhdG9yXHJcbiAgICAgIDogbGlJbmRpY2F0b3IucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHJcbiAgcmV0dXJuIHByZXZJbmRpY2F0b3I7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJldHVybkxheW91dFNlYXJjaFBhZ2UoKSB7XHJcbiAgbGV0IGZpcnN0SW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgIFwiLmluZGljYXRvcnMgLmluZGljYXRvcjpmaXJzdC1jaGlsZFwiXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIGZpcnN0SW5kaWNhdG9yO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXBhaXJQYWdlKHR5cGVSaXBlcikge1xyXG4gIGlmICh0eXBlUmlwZXIgPT0gXCJjdXJyZW50XCIpIHtcclxuICAgIHNob3dJdGVtc0luUGFnZShcclxuICAgICAgbmV3U3RhcnROdW0sXHJcbiAgICAgIG5ld0VuZE51bSxcclxuICAgICAgYXJyYXlPZlNvbWVJdGVtcyxcclxuICAgICAgcGFyZW50SXRlbXNTaG93LFxyXG4gICAgICBjdXJyZW50UGFnZVxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKHR5cGVSaXBlciA9PSBcInByZXZcIikge1xyXG4gICAgY2hhbmdlQ29udGVudFBhZ2luYXRpb24ocmV0dXJuUGFnZUxheW91dCgpKTtcclxuICB9IGVsc2UgaWYgKHR5cGVSaXBlciA9PSBcImZpcnN0XCIpIHtcclxuICAgIGNoYW5nZUNvbnRlbnRQYWdpbmF0aW9uKHJldHVybkxheW91dFNlYXJjaFBhZ2UoKSk7XHJcbiAgfSBlbHNlIHtcclxuICB9XHJcblxyXG4gIHJlcGFpclBhZ2luYXRpb24oYXJyYXlPZlNvbWVJdGVtcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrUm93RmF2b3JpdGVQYWdlRW1wdHkoKSB7XHJcbiAgYXJyYXlPZlNvbWVJdGVtcyA9IGZhdm9yaXRlQm9va3M7XHJcbiAgbGV0IGZhdm9yaXRlRGF0YUJvb2tzID0gJChcIiNGYXZvcml0ZUhlYWRlciAuZGF0YSAuY29udGFpbmVyLWJvb2tzXCIpO1xyXG5cclxuICBpZiAoZmF2b3JpdGVEYXRhQm9va3MuaHRtbCgpID09IFwiXCIpIHtcclxuICAgIGlmICghY2hlY2tGYXZvcml0ZUVtcHR5KCkpIHJldHVybjtcclxuICAgIHJlcGFpclBhZ2UoXCJwcmV2XCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXBhaXJQYWdlKFwiY3VycmVudFwiKTtcclxuICB9XHJcbn1cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlRmlsdHJhdGlvbih0eXBlVmlkZW9zKSB7XHJcbiAgLy8gY2hhbmdlIEZpbHRlciBpZiB5b3UgY2hvb3NlIGFueSBjYXRlZ29yeVxyXG4gIGNvbnRhaW5lckZpbHRlclNlbGVjdGVkLmZpbmQoXCIuY2hvc2VzXCIpLmh0bWwoXCJcIik7XHJcblxyXG4gIGlmICh0eXBlVmlkZW9zLnRvTG93ZXJDYXNlKCkgPT0gXCJhY2FkZW1pY1wiKSB7XHJcbiAgICByZXBhaXJGaWx0cmF0aW9uVmlkZW9zKGZpbHRlclBsYXlsaXN0VHlwZXMuQWNhZGVtaWMpO1xyXG4gIH0gZWxzZSBpZiAodHlwZVZpZGVvcy50b0xvd2VyQ2FzZSgpID09IFwicHJvZ3JhbW1pbmdcIikge1xyXG4gICAgcmVwYWlyRmlsdHJhdGlvblZpZGVvcyhmaWx0ZXJQbGF5bGlzdFR5cGVzLlByb2dyYW1taW5nKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29udGFpbmVyRmlsdGVyU2VsZWN0ZWQuZmluZChcIi5jaG9zZXNcIikuaHRtbChcIlwiKTtcclxuICB9XHJcbiAgcmVwYWlyUGFnaW5hdGlvbihzZWFyY2hWaWRlb3NDb250ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVwYWlyRmlsdHJhdGlvblZpZGVvcyhmaWx0ZXJCdXR0b25zKSB7XHJcbiAgY29udGFpbmVyRmlsdGVyU2VsZWN0ZWRcclxuICAgIC5maW5kKFwiLmNob3Nlc1wiKVxyXG4gICAgLmFwcGVuZChgPGg2IGNsYXNzPVwidGV4dCBmb250LTQgZnctYm9sZFwiPkZpbHRlciBWaWRlb3M6IDwvaDY+YCk7XHJcblxyXG4gIGZpbHRlckJ1dHRvbnMuZm9yRWFjaCgoZmlsdGVyQnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgY29udGFpbmVyRmlsdGVyU2VsZWN0ZWRcclxuICAgICAgLmZpbmQoXCIuY2hvc2VzXCIpXHJcbiAgICAgIC5hcHBlbmQoY3JlYXRlRmlsdHJhdGlvbkJ1dHRvbnMoZmlsdGVyQnV0dG9uLCBpbmRleCkpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGaWx0cmF0aW9uQnV0dG9ucyhidXR0b24sIGluZGV4KSB7XHJcbiAgbGV0IEh0bWxDb250ZW50ID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jaGVja1wiPlxyXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY2hlY2staW5wdXQgcC0wXCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cInBsYXlsaXN0c1JhZGlvc1wiXHJcbiAgICAgICAgICBvbmNsaWNrPVwiY2hhbmdlUGxheWxpc3RzKHRoaXMpXCIgZGF0YS12YWx1ZT1cIiR7YnV0dG9uLnNwbGl0KFwiIFwiLCAxKX1cIlxyXG4gICAgICAgICAgICAgIGlkPVwicGxheWxpc3RzUmFkaW9zJHtpbmRleCArIDF9XCIgdmFsdWU9XCJvcHRpb24ke2luZGV4ICsgMX1cIiAke2luZGV4ID09IDAgPyBcImNoZWNrZWRcIiA6IFwiXCJcclxuICAgIH0+XHJcbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsIG1lLTIgbWItMFwiIGZvcj1cInBsYXlsaXN0c1JhZGlvcyR7aW5kZXggKyAxXHJcbiAgICB9XCI+XHJcbiAgICAgICAgICAgICAgJHtidXR0b259XHJcbiAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgcmV0dXJuIEh0bWxDb250ZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VQbGF5bGlzdHModGhhdCkge1xyXG4gIGxldCBpbnB1dFZhbHVlVmlkZW8gPSB0aGF0LmRhdGFzZXQudmFsdWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgdmlkZW9zQ2F0ZWdvcnlUZW1wMiA9IHZpZGVvc0NhdGVnb3J5VGVtcC5maWx0ZXIoKHZpZGVvKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB2aWRlby5wcm9ncmFtbWluZ0xhbmd1YWdlT1JBY2FkZW1pY1llYXIudG9Mb3dlckNhc2UoKSA9PSBpbnB1dFZhbHVlVmlkZW9cclxuICAgICk7XHJcbiAgfSk7XHJcbiAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xyXG5cclxuICBpZiAoaW5wdXRWYWx1ZVZpZGVvLnRvTG93ZXJDYXNlKCkgPT0gXCJhbGxcIikge1xyXG4gICAgc2VhcmNoVmlkZW9zQ29udGVudCA9IHZpZGVvc0NhdGVnb3J5VGVtcDtcclxuICAgIGFycmF5T2ZTb21lSXRlbXMgPSB2aWRlb3NDYXRlZ29yeVRlbXA7XHJcbiAgICBjaGVja1ZpZGVvcyh2aWRlb3NDYXRlZ29yeVRlbXApO1xyXG4gICAgcmVwYWlyUGFnaW5hdGlvbihzZWFyY2hWaWRlb3NDb250ZW50KTtcclxuICAgIHNob3dWaWRlb3MoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2VhcmNoVmlkZW9zQ29udGVudCA9IHZpZGVvc0NhdGVnb3J5VGVtcDI7XHJcbiAgICBhcnJheU9mU29tZUl0ZW1zID0gdmlkZW9zQ2F0ZWdvcnlUZW1wMjtcclxuICAgIGNoZWNrVmlkZW9zKHZpZGVvc0NhdGVnb3J5VGVtcDIpO1xyXG4gICAgcmVwYWlyUGFnaW5hdGlvbihzZWFyY2hWaWRlb3NDb250ZW50KTtcclxuICAgIHNob3dWaWRlb3MoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dWaWRlb3MoKSB7XHJcbiAgc2hvd0l0ZW1zSW5QYWdlKFxyXG4gICAgbmV3U3RhcnROdW0sXHJcbiAgICBuZXdFbmROdW0sXHJcbiAgICBhcnJheU9mU29tZUl0ZW1zLFxyXG4gICAgcGFyZW50SXRlbXNTaG93LFxyXG4gICAgY3VycmVudFBhZ2VcclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVWaWRlb0NvbnRlbnQoZGF0YSwgaW5kZXgpIHtcclxuICBsZXQgY29udGVudFZpZGVvID0gYFxyXG4gPGRpdiBjbGFzcz1cInNwYWNpYWwtY2FyZCBjb2wtbGctNCBjb2wteGwtMyBjb2wtbWQtNCBtYi0zIGNvbC1zbS02IHdvdyBhbmltYXRlX19mYWRlSW5cIiBkYXRhLXdvdy1kdXJhdGlvbj1cIjFzXCIgZGF0YS13b3ctZGVsYXk9XCIkeyhpbmRleCAlIG51bWJlckl0ZW1zSW5Sb3cpICogMC4xfXNcIiBkYXRhLWlkPVwiJHtkYXRhLmlkfVwiIGRhdGEtdHlwZS12aWRlbz1cIiR7ZGF0YS50eXBlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4uL2ltYWdlcy9wbGF5bGlzdHNfaW1hZ2VzLyR7ZGF0YS5pbWdWaWRlb31cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW1nLWZsdWlkXCIgYWx0PVwiSW1nIFZpZGVvXCIgbG9hZGluZz1cImxhenlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyQ29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lIG1iLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhLm5hbWVQbGF5bGlzdCA/IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWUtcGxheWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+UGxheWxpc3QgOjwvc3Ryb25nPiAke2RhdGEubmFtZVBsYXlsaXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICA6IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWUtc3ViamVjdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5TdWJqZWN0IDo8L3N0cm9uZz4gJHtkYXRhLm5hbWVTdWJqZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdGVkLWJ5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+Y3JlYXRlZCBCeTo8L3N0cm9uZz4gJHtkYXRhLmNyZWF0ZWRCeX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke2RhdGEubGlua1ZpZGVvfVwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwiYnRuIGJ0bi12aWRlbyBtdC0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZGF0YS5uYW1lUGxheWxpc3QgPyBcIlBsYXlMaXN0XCIgOiBcIlZpZGVvXCJ9IExpbms8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbmA7XHJcbiAgcmV0dXJuIGNvbnRlbnRWaWRlbztcclxufVxyXG5cclxuLy8gQnV0dG9ucyBDYXRlZ29yaWVzIENoYW5nZVxyXG5mdW5jdGlvbiBjaGFuZ2VDb250ZW50VmlkZW9zKHR5cGVWaWRlb3MpIHtcclxuICB2aWRlb3NDYXRlZ29yeVRlbXAgPSB2aWRlb3MuZmlsdGVyKCh2aWRlbykgPT4ge1xyXG4gICAgcmV0dXJuIHR5cGVWaWRlb3MudG9Mb3dlckNhc2UoKSA9PSBcImFsbFwiXHJcbiAgICAgID8gdmlkZW9cclxuICAgICAgOiB2aWRlby50eXBlID09IHR5cGVWaWRlb3MudG9Mb3dlckNhc2UoKTtcclxuICB9KTtcclxuXHJcbiAgc2VhcmNoVmlkZW9zQ29udGVudCA9IHZpZGVvc0NhdGVnb3J5VGVtcDtcclxuICBzZWFyY2hJbnB1dC52YWx1ZSA9IFwiXCI7XHJcblxyXG4gIGFycmF5T2ZTb21lSXRlbXMgPSB2aWRlb3NDYXRlZ29yeVRlbXA7XHJcblxyXG4gIGNoYW5nZUZpbHRyYXRpb24odHlwZVZpZGVvcyk7XHJcblxyXG4gIGNoZWNrVmlkZW9zKHZpZGVvc0NhdGVnb3J5VGVtcCk7XHJcblxyXG4gIHJlcGFpclBhZ2luYXRpb24oc2VhcmNoVmlkZW9zQ29udGVudCk7XHJcblxyXG4gIHNob3dWaWRlb3MoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tWaWRlb3MoY2hlY2tBcnJheSkge1xyXG4gIGxldCBwYXJlbnQgPSBjb250YWluZXJWaWRlb3MucGFyZW50KCk7XHJcbiAgaWYgKGNoZWNrQXJyYXkubGVuZ3RoID09PSAwKSB7XHJcbiAgICBwYXJlbnQuYWRkQ2xhc3MoXCJkLW5vbmVcIik7XHJcbiAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoXCJkLWJsb2NrXCIpO1xyXG5cclxuICAgIHBhcmVudC5uZXh0KCkucmVtb3ZlQ2xhc3MoXCJkLW5vbmVcIik7XHJcbiAgICBwYXJlbnQubmV4dCgpLmFkZENsYXNzKFwiZC1ibG9ja1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGFyZW50LnJlbW92ZUNsYXNzKFwiZC1ub25lXCIpO1xyXG4gICAgcGFyZW50LmFkZENsYXNzKFwiZC1ibG9ja1wiKTtcclxuXHJcbiAgICBwYXJlbnQubmV4dCgpLmFkZENsYXNzKFwiZC1ub25lXCIpO1xyXG4gICAgcGFyZW50Lm5leHQoKS5yZW1vdmVDbGFzcyhcImQtYmxvY2tcIik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcclxuICAvLyB1cGRhdGUgbG9jYWwgc3RvcmFnZVxyXG4gIGlmIChjdXJyZW50UGFnZS50b0xvd2VyQ2FzZSgpID09IFwiaG9tZVwiIHx8IGN1cnJlbnRQYWdlLnRvTG93ZXJDYXNlKCkgPT0gXCJmYXZvcml0ZVwiKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNvbW1lbnRzXCIsIEpTT04uc3RyaW5naWZ5KGNvbW1lbnRzRmVlZEJhY2tzKSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRJZFwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50SWQpKTtcclxuICB9XHJcbiAgaWYgKGN1cnJlbnRQYWdlLnRvTG93ZXJDYXNlKCkgPT0gXCJmYXZvcml0ZVwiIHx8IGN1cnJlbnRQYWdlLnRvTG93ZXJDYXNlKCkgPT0gXCJtYXRlcmlhbHNcIiB8fCBjdXJyZW50UGFnZS50b0xvd2VyQ2FzZSgpID09IFwiaG9tZVwiKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImZhdm9yaXRlQm9va3NcIiwgSlNPTi5zdHJpbmdpZnkoZmF2b3JpdGVCb29rcykpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpZEJvb2tzXCIsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlQm9va3NOdW1iZXIpKTtcclxuICB9XHJcbiAgaWYgKGN1cnJlbnRQYWdlLnRvTG93ZXJDYXNlKCkgPT0gXCJcIikge1xyXG4gIH1cclxuICBpZiAoY3VycmVudFBhZ2UudG9Mb3dlckNhc2UoKSA9PSBcIlwiKSB7XHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbi8vIEZ1bmN0aW9ucyBGb3IgUGFnaW5hdGlvblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSW5kaWNhdG9ycyhhcnJheSkge1xyXG4gIC8vIGNyZWF0ZSBpbmRpY2F0b3JzXHJcbiAgbGV0IEh0bWxDb250ZW50ID0gYGA7XHJcblxyXG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IE1hdGguY2VpbChhcnJheS5sZW5ndGggLyBudW1iZXJJdGVtc0luUm93KTsgaSsrKSB7XHJcbiAgICBIdG1sQ29udGVudCArPSBgIFxyXG4gICAgICAgIDxsaSB2YWx1ZT1cIiR7aX1cIiBvbmNsaWNrPVwiY2hhbmdlQWN0aXZlcyh0aGlzKTtjaGFuZ2VDb250ZW50UGFnaW5hdGlvbih0aGlzKTtoaXNDbGlja2VkKHRoaXMpXCIgY2xhc3M9XCIke01hdGguY2VpbChhcnJheS5sZW5ndGggLyBudW1iZXJJdGVtc0luUm93KSAhPSBpID8gXCJtZS0yXCIgOiBcIlwiXHJcbiAgICAgIH0gaW5kaWNhdG9yICR7aSA9PSBudW1iZXJDbGlja2VkID8gXCJhY3RpdmUgY2xpY2tlZFwiIDogXCJcIn1cIj5cclxuICAgICAgICAgICAgJHtpfVxyXG4gICAgICAgIDwvbGk+IFxyXG4gICAgICAgIGA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gSHRtbENvbnRlbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUNvbnRlbnRQYWdpbmF0aW9uKHRoYXQpIHtcclxuICAvLyBQYWdpbmF0aW9uIG51bWJlclxyXG4gIG51bWJlckNsaWNrZWQgPSB0aGF0LnZhbHVlO1xyXG4gIC8vIHdoZW4gY3VycmVudFBhZ2luYXRpb24gY2xpY2tlZFxyXG4gIGN1cnJlbnRCdG5Cb29rcyA9IHRoYXQ7XHJcbiAgLy8gaWYgY3VycmVudFBhZ2luYXRpb24gY2xpY2tlZCA9PiBzdG9wXHJcbiAgaWYgKHRoYXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xpY2tlZFwiKSkgcmV0dXJuO1xyXG5cclxuICBudW1iZXJCdG4gPSB0aGF0LnZhbHVlO1xyXG4gIG5ld1N0YXJ0TnVtID0gbnVtYmVyQnRuICogZW5kTnVtIC0gZW5kTnVtO1xyXG4gIG5ld0VuZE51bSA9IGVuZE51bSAqIG51bWJlckJ0bjtcclxuXHJcbiAgaWYgKGN1cnJlbnRQYWdlLnRvTG93ZXJDYXNlKCkgPT0gXCJwbGF5bGlzdFwiIHx8IGN1cnJlbnRQYWdlLnRvTG93ZXJDYXNlKCkgPT0gXCJtYXRlcmlhbHNcIikge1xyXG4gICAgc2VhcmNoSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgfVxyXG5cclxuICBzaG93SXRlbXNJblBhZ2UoXHJcbiAgICBuZXdTdGFydE51bSxcclxuICAgIG5ld0VuZE51bSxcclxuICAgIGFycmF5T2ZTb21lSXRlbXMsXHJcbiAgICBwYXJlbnRJdGVtc1Nob3csXHJcbiAgICBjdXJyZW50UGFnZVxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlcGFpclBhZ2luYXRpb24oYXJyYXkpIHtcclxuICB1bEluZGljYXRvcnMuaHRtbChcIlwiKTtcclxuICB1bEluZGljYXRvcnMuYXBwZW5kKGNyZWF0ZUluZGljYXRvcnMoYXJyYXkpKTtcclxufVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5mdW5jdGlvbiBtb3ZlRWxlbWVudChFbGVtZW50WW91Q2hhbmdJdCwgYm9vbGVhblZhbHVlMSwgdmFsdWUxLCB2YWx1ZTIpIHtcclxuICBFbGVtZW50WW91Q2hhbmdJdC5zdHlsZS50cmFuc2Zvcm0gPSBib29sZWFuVmFsdWUxID8gYCR7dmFsdWUxfWAgOiBgJHt2YWx1ZTJ9YDtcclxufVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEZ1bmN0aW9ucyBGb3IgQ2F0ZWdvcmllc1xyXG5cclxuZnVuY3Rpb24gcmVidWlsZEJyZWFkY3J1bWIoKSB7XHJcbiAgYnJlYWRjcnVtYkVsZS5pbm5lckhUTUwgPSBgYDtcclxuXHJcbiAgYnJlYWRjcnVtYkFyci5mb3JFYWNoKChicmVhZGNydW1iLCBpbmRleCkgPT4ge1xyXG4gICAgYnJlYWRjcnVtYkVsZS5pbm5lckhUTUwgKz0gYFxyXG4gICAgPGxpIGNsYXNzPVwiYnJlYWRjcnVtYi1pdGVtICR7KChpbmRleCArIDEpID09IGJyZWFkY3J1bWJBcnIubGVuZ3RoKSA/IFwiXCIgOiBcImFjdGl2ZVwifVwiIG9uY2xpY2s9XCIkeyhpbmRleCArIDEpICE9IGJyZWFkY3J1bWJBcnIubGVuZ3RoID8gYHJldHVybkJhY2tTdGVwKCR7aW5kZXh9KWAgOiBcIlwifVwiPlxyXG4gICAgICAgICR7YnJlYWRjcnVtYn1cclxuICAgIDwvbGk+XHJcbiAgICBgO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXR1cm5CYWNrU3RlcChpbmRleCkge1xyXG4gIHdoaWxlICgoaW5kZXggKyAxKSA8IChjaG9vc2VzVXNlci5sZW5ndGgpKSB7XHJcbiAgICBjaG9vc2VzVXNlci5wb3AoKTtcclxuICB9XHJcblxyXG4gIHdoaWxlICgoaW5kZXggKyAxKSA8IGJyZWFkY3J1bWJBcnIubGVuZ3RoKSB7XHJcbiAgICBicmVhZGNydW1iQXJyLnBvcCgpO1xyXG4gIH1cclxuXHJcbiAgdGVtcERhdGEgPSBjaG9vc2VzVXNlcltpbmRleF07XHJcbiAgcmVidWlsZE5ld0RhdGFDb250ZW50KHRlbXBEYXRhKTtcclxuICByZWJ1aWxkQnJlYWRjcnVtYigpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gcmVidWlsZERhdGFDb250ZW50KGRhdGEpIHtcclxuICBsZXQgSHRtbENvbnRlbnQgPSBgYFxyXG4gIHRpdGxlUGFnZS5pbm5lckhUTUwgPSBgJHtkYXRhLmN1cnJlbnROYW1lfWA7XHJcblxyXG4gIEh0bWxDb250ZW50ID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2hvb3NlIGNvbC14bC0zIGNvbC1zbS02IGNvbC1tZC00IG1iLTMgd293IGFuaW1hdGVfX2ZhZGVJblwiIGRhdGEtd293LWR1cmF0aW9uPVwiLjdzXCIgZGF0YS13b3ctZGVsYXk9XCIwLjNzXCIgZGF0YS1kZXB0aD1cIiR7ZGF0YS5kZXB0aH1cIiBkYXRhLW5hbWUtY3VycmVudC10aXRsZT1cIiR7ZGF0YS5uYW1lSXRlbX1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiIG9uY2xpY2s9XCIkeyhkYXRhLmRlcHRoIDwgNCkgPyBgY2hvb3NlQ2F0ZWdvcnkoJyR7ZGF0YS5uYW1lSXRlbX0nLCAke2RhdGEuZGVwdGh9KSBgIDogJyd9XCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiLi4vaW1hZ2VzL2NhdGVnb3JpZXMvJHtkYXRhLmltZ0l0ZW1VUkwgPz8gXCJkZWZhdWx0X0ltYWdlcy5wbmdcIn0gXCJcclxuY2xhc3M9XCJtYi0yIGltZy1mbHVpZFwiIGFsdCA9IFwiSW1hZ2UgJHtkYXRhLm5hbWVJdGVtfVwiID5cclxuXHJcbiAgPGg0IGNsYXNzPVwiXCI+XHJcbiAgICAke2RhdGEubmFtZUl0ZW19XHJcbiAgPC9oND5cclxuICAgICAgICA8L2RpdiA+XHJcbiAgICA8L2RpdiA+XHJcbiAgYDtcclxuXHJcbiAgcmV0dXJuIEh0bWxDb250ZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaG9vc2VDYXRlZ29yeShuYW1lVGl0bGUsIGRlcHRoQ2F0ZWdvcnkpIHtcclxuICBsZXQgbmV3QXJyYXlEYXRhID0gdGVtcERhdGEuZmlsdGVyKChJdGVtKSA9PiB7XHJcbiAgICByZXR1cm4gSXRlbS5kZXB0aCA9PSBkZXB0aENhdGVnb3J5ICYmIEl0ZW0ubmFtZUl0ZW0gPT0gbmFtZVRpdGxlO1xyXG4gIH0pWzBdLmRldGFpbHM7XHJcblxyXG4gIGlmIChjaG9vc2VzVXNlci5sZW5ndGggPD0gNikge1xyXG4gICAgY2hvb3Nlc1VzZXIucHVzaCh0ZW1wRGF0YSk7XHJcbiAgfVxyXG5cclxuICB0ZW1wRGF0YSA9IG5ld0FycmF5RGF0YTtcclxuXHJcbiAgcmVidWlsZE5ld0RhdGFDb250ZW50KG5ld0FycmF5RGF0YSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYnVpbGROZXdEYXRhQ29udGVudChhcnJheSkge1xyXG4gIGNvbnRhaW5lckRhdGFDYXRlZ29yeS5pbm5lckhUTUwgPSBgYDtcclxuXHJcbiAgYXJyYXkuZm9yRWFjaCgoYXJyRGF0YSkgPT4ge1xyXG4gICAgY29udGFpbmVyRGF0YUNhdGVnb3J5LmlubmVySFRNTCArPSByZWJ1aWxkRGF0YUNvbnRlbnQoYXJyRGF0YSk7XHJcbiAgICBvYmplY3RDdXJyZW50RGF0YSA9IGFyckRhdGE7XHJcbiAgfSk7XHJcbiAgYnJlYWRjcnVtYihvYmplY3RDdXJyZW50RGF0YSk7XHJcbiAgcmVidWlsZEJyZWFkY3J1bWIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnJlYWRjcnVtYihvYmpEYXRhKSB7XHJcbiAgaWYgKCFicmVhZGNydW1iQXJyLmluY2x1ZGVzKG9iakRhdGEuY3VycmVudE5hbWUpKSB7XHJcbiAgICBicmVhZGNydW1iQXJyLnB1c2gob2JqRGF0YS5jdXJyZW50TmFtZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuIl0sImZpbGUiOiJmdW5jdGlvbnMuanMifQ==
