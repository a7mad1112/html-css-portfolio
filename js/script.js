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
    .then(maxRepos => displayRepos(maxRepos));
}

function displayRepos(repos) {
  let container = document.getElementById("repos-container");
  let template = "Top Stars Repositories: <br>";
  repos.forEach((repo) => {
    template += `
    <a target="_blank" href="${repo.html_url}">${repo.name}</a> 
    `;
  });
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
