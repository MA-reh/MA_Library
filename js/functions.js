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
                                                    <img src="images/playlists_images/${data.imgVideo}"
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
            <img src="images/categories/${data.imgItemURL ?? "default_Images.png"} "
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
