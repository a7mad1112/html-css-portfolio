/* show and close contact section */
function toggleContact() {
  document.querySelector(".contact-section").classList.toggle("show-contact");
}

[...document.getElementsByClassName("contact-btn")].forEach(
  (e) => (e.onclick = toggleContact)
);

document.querySelector(".form-overlay").onclick = toggleContact;

document
  .getElementById("close-contact")
  .addEventListener("click", toggleContact);

/* Call Github Api and display the two top repos */
getRepos();
async function getRepos() {
  await fetch("https://api.github.com/users/a7mad1112/repos")
    .then(async (res) => await res.json())
    .then((data) => findMaxStars(data))
    .then((maxRepos) => displayRepos(maxRepos));
}

function repoTemplate(repo) {
  console.log(repo);
  return `<div class="project">
  <a class="skill" href=${repo.html_url} target="_blank">
    <span>${repo.name}</span>
  </a>
</div>
  `;
}

function displayRepos(repos) {
  const container = document.getElementById("repos-container");
  let template = "";
  repos.forEach((repo) => (template += repoTemplate(repo)));
  container.innerHTML = template;
}

function findMaxStars(repos) {
  // console.log(repos)
  let max = [repos[0], repos[1]];
  // console.log(max)
  for (let repo of repos) {
    if (
      repo["stargazers_count"] > max[0]["stargazers_count"] &&
      repo["id"] !== max[1]["id"]
    ) {
      max.reverse();
      max.pop();
      max.push(repo);
    } else if (
      repo["stargazers_count"] > max[1]["stargazers_count"] &&
      repo["id"] !== max[0]["id"]
    ) {
      max.pop();
      max.push(repo);
    }
  }
  // console.log(max[0])
  return max;
}

/* toggle mode (dark || light) */
let displayMode = localStorage.getItem("mode") || "dark";
document.body.className = displayMode;
const toggleBtn = document.querySelector(".mode-toggler");
moveBall();

toggleBtn.addEventListener("click", function () {
  if (displayMode === "light") displayMode = "dark";
  else displayMode = "light";
  localStorage.setItem("mode", displayMode);
  moveBall();
  document.body.className = displayMode;
});

function moveBall() {
  const ball = document.querySelector(".ball");
  if (displayMode === "light") ball.classList.add("left");
  else ball.classList.remove("left");
}
