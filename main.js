const API_KEY = "b6514b7a92d34fa18407c14d9fd7ad2c";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
const sidemenus = document.querySelectorAll(".side-menu-list button");
let url = new URL("https://nimble-semolina-90d596.netlify.app/top-headlines");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
sidemenus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);

    const data = await response.json();
    if (response.status === 200) {
      console.log("result", data);
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );
  url = new URL("https://nimble-semolina-90d596.netlify.app/top-headlines");
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(
    `https://nimble-semolina-90d596.netlify.app/top-headlines?country=kr&category=${category}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  url = new URL(
    `https://nimble-semolina-90d596.netlify.app/top-headlines?country=kr&q=${keyword}`
  );
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
    <img class="news-img-size"
    src="${news.urlToImage}"/>
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description}</p>
    <div>${news.source.name}*${news.publishedAt}</div>
  </div>
  </div>`
    )
    .join("");
  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-warning" role="alert">
${errorMessage}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize);

  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
  let paginationHTML = "";
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  document.querySelector(".pagination").innerHTML = paginationHTML;
};
const moveToPage = (pageNum) => {
  console.log("moveto", pageNum);
  page = pageNum;
  getNews();
};
{
  /* <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav> */
}

getLatestNews();

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
