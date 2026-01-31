var allBooksDataAPI, allBooksData, newsBooksData, oldBooksData;

// self Invoke
(async function () {
  allBooksDataAPI = await fetchNews("js/data/books.details.json");

  allBooksData = [...allBooksDataAPI.newsFiles, ...allBooksDataAPI.oldFiles];
  newsBooksData = allBooksDataAPI.newsFiles;
  oldBooksData = allBooksDataAPI.oldFiles;

  let containerBooks = $(".section-page .container-books");
  parentItemsShow = containerBooks;

  if (currentPage.toLowerCase() == "home") {
    newsBooksData.forEach(async (data) => {
      let newCard = createNewBookCard(data);
      containerBooks.trigger(`add.owl.carousel`, [newCard]);
    });

    arrayOfSomeItems = newsBooksData.newsFiles;

    containerBooks.trigger("refresh.owl.carousel");
  } else if (currentPage.toLowerCase() == "materials") {

    arrayOfSomeItems = allBooksData;
    searchVideosContent = allBooksData;

    showItemsInPage(newStartNum, newEndNum, arrayOfSomeItems, parentItemsShow, currentPage);
    repairPagination(allBooksData);

  } else { }

})();

async function fetchNews(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw response.status;
  }

  return response.json();
}

function createNewBookCard(data) {
  let { IdBook, role, university, author, doctorName, codeFile, categories, bookName, yearRelease, academicYear, imageUrl } = data;

  let newBookEle = $(document.createElement("div"));

  newBookEle.addClass(
    `${joinFavoriteBookPage == "yes"
      ? `box mb-4 col-xl-3 col-lg-4 col-md-6 mb-2`
      : (currentPage.toLowerCase() == "materials")
        ? "col-xl-3 col-md-4 col-sm-6 mb-4"
        : ""
    }`
  );

  if (joinFavoriteBookPage == "yes" || currentPage == "materials") {
    newBookEle.attr("data-id-book", IdBook);
  }

  newBookEle.append(
    `
            <div class="item" data-type="${role}">
                ${joinFavoriteBookPage == "no" || currentPage.toLowerCase() == "materials"
      ? `<div class="spacial-card wow animate__bounceIn" data-wow-duration=".7s" data-wow-delay="${(0.15 * ((IdBook - 1) % numberItemsInRow))}s">`
      : isDeleted
        ? `<div class="spacial-card wow animate__fadeIn" data-wow-duration="1s" data-wow-delay=".2s">`
        : `<div class="spacial-card wow animate__bounceIn" data-wow-duration="1s" data-wow-delay=".2s">`
    }
                    <div class="book" data-id-book="${IdBook}">
        ${joinFavoriteBookPage == "yes"
      ? `
            <div class="deleteBook">
                <i class="fa-solid fa-trash deleteComment" onclick="deleteBookFromFavorite(${IdBook})"></i>
            </div>
            `
      : `<div class="favorite-icons ${favoriteBooksNumber.includes(IdBook) ?? false ? "active" : ""
      }" onclick='toggleFavorite(${IdBook})'>
                <i class="star1 fa-regular fa-star"></i>
                <i class="star2 fa-solid fa-star"></i>
            </div>`
    }
                        <div class="content">
                            <div class="row">
                                ${doctorName
      ? `<div class="part mt-2 col-12">
                                    <strong class="me-1">Doctor:</strong>
                                    <span>${doctorName.trim()}</span>
                                    </div>`
      : `<div class="part mt-2 col-12">
                                    <strong class="me-1">Author:</strong>
                                    <span>${author.trim()}</span>
                                    </div>`
    }
                                <div class="part col-12">
                                    <strong class="me-1">Category:</strong>
                                    <span>${categories.join(" | ")}</span>
                                </div>
                                <div class="part col-12">
                                    <strong class="me-1">Year:</strong>
                                    <span>${yearRelease.trim()}</span>
                                </div>
                                <div class="part col-12">
                                    <strong class="me-1">Academic Year:</strong>
                                    <span>${academicYear}</span>
                                </div>
                            </div>
                            <a class="btn-book my-2" onclick="viewBook(${IdBook})">
                                View File
                            </a>
                            <a download="Human_Rights.pdf" href="https://drive.google.com/uc?export=download&id=${codeFile.trim()}" class="btn-book" target="_blank">
                                Download File
                            </a>
                        </div>
                        <div class="cover">
                            <img src="images/icons/${imageUrl}" alt="pdf-file" loading="lazy" class="img-fluid">
                            <p class="mb-0 text-center">${bookName}</p>
                            <span class="mt-1 fw-bold text-center" style="font-size:15px; letter-spacing : 2px;">${university}</span>

                            <span class="" style="font-size:14px; margin-top:3px;">Hover to view Content</span>
                        </div>
                    </div>
                </div>
            </div>
        `
  );

  return newBookEle;
}
