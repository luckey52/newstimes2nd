const API_KEY = "b6514b7a92d34fa18407c14d9fd7ad2c";
let newsList = [];
const menus = document.querySelectorAll(".menus button");
let url = new URL("https://nimble-semolina-90d596.netlify.app/top-headlines");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      render();
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

getLatestNews();

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
