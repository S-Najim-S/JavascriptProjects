const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  createUserCard(respData);
  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  console.log(repos);

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 8)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerHTML = repo.name;

      reposEl.appendChild(repoEl);
    });
}

function createUserCard(user) {
  const cardHtml = `<div class="card-container">
  <img
    class="round"
    src="${user.avatar_url}"
    alt="${user.name}"
  />
  <h3>${user.name}</h3>
  <h5>${user.location}</h5>
  <p>${user.bio}</p>
  <div class="user-info">
    <span  class="mySpan"><i class="far fa-eye"></i>   ${user.followers}</span>
    <span class="mySpan heart"><i class="fas fa-heart"></i>   ${user.following}</span>
    <span class="mySpan"><i class="fas fa-comment-alt"></i>   ${user.public_repos}</span>
  </div>
  <div class="repo-container">
    <div class="skills" id="repos">
        <h5>Repositories:</h5>
    </div>
  </div>
</div>`;

  main.innerHTML = cardHtml;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
