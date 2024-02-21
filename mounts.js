//https://ffxivcollect.com/api/mounts/mount.id

const mountList = document.querySelector(".mounts__list");
const listTitle = document.querySelector(".mounts__header");
const showMoreButton = document.querySelector(".show-more");
const f = document.getElementById("form");

async function main(filter) {
  const mounts = await fetch("https://ffxivcollect.com/api/mounts");
  const mountData = await mounts.json();

  const expansions = {
    ARR: { min: 2.0, max: 3.0, title: "A Realm Reborn" },
    HW: { min: 3.0, max: 4.0, title: "Heavensward" },
    SB: { min: 4.0, max: 5.0, title: "Stormblood" },
    ShB: { min: 5.0, max: 6.0, title: "Shadowbringers" },
    EW: { min: 6.0, max: 7.0, title: "Endwalker" },
  };

  let filteredAndSortedResults = mountData.results;

  if (filter in expansions) {
    const { min, max, title } = expansions[filter];

    filteredAndSortedResults = filteredAndSortedResults
      .filter((mount) => {
        const patch = parseFloat(mount.patch);
        return patch >= min && patch < max;
      })
      .sort((a, b) => {
        const patchA = parseFloat(a.patch);
        const patchB = parseFloat(b.patch);
        return patchA - patchB;
      });

    listTitle.innerHTML = listTitleHtml(title);
  }

  const initialDisplayCount = filter ? filteredAndSortedResults.length : 20;
  const initialMountCards = filteredAndSortedResults.slice(
    0,
    initialDisplayCount
  );

  mountList.innerHTML = initialMountCards
    .map((mount) => mountHtml(mount))
    .join("");

  if (filteredAndSortedResults.length > initialDisplayCount) {
    showMoreButton.style.display = "flex";
  } else {
    showMoreButton.style.display = "none";
  }

  showMoreButton.addEventListener("click", function () {
    const currentMountCount = mountList.childElementCount;
    const remainingMounts = filteredAndSortedResults.slice(currentMountCount);
    const mountsToShow = remainingMounts.slice(0, initialDisplayCount);
    mountList.innerHTML += mountsToShow
      .map((mount) => mountHtml(mount))
      .join("");

    if (
      filteredAndSortedResults.length <=
      currentMountCount + initialDisplayCount
    ) {
      showMoreButton.style.display = "none";
    }
  });

  showMoreButton.style.display = filter ? "none" : "flex";
}

main();

function showMount(id) {
  localStorage.setItem("id", id);
  window.location.href = `${window.location.origin}/JS-Final-Project-FF14/mount.html`;
}

async function submitted(query) {
  const searchedMounts = await fetch(
    `https://ffxivcollect.com/api/mounts?name_en_end=${query}`
  );
  const searchedMountsData = await searchedMounts.json();

  if (searchedMountsData.results.length === 0) {
    mountList.innerHTML = "<h1>No results found</h1>";
    showMoreButton.style.display = "none";
  } else {
    mountList.innerHTML = searchedMountsData.results
      .map((mount) => mountHtml(mount))
      .join("");
    showMoreButton.style.display = "none";
  }
}

function listTitleHtml(expansion) {
  return `<h2 class="mounts__header--title">
  <div>
  ${expansion} <span class="secondary"> Mounts </span>
</h2>
  </div>
<select name="" id="filter" onchange="filterMounts(event)">
  <option value="" disabled selected>Expansion</option>
  <option value="ARR">A Realm Reborn</option>
  <option value="HW">Heavensward</option>
  <option value="SB">Stormblood</option>
  <option value="ShB">Shadowbringers</option>
  <option value="EW">Endwalker</option>
</select>`;
}

function mountHtml(mount) {
  return ` <div class="mounts__card"  onclick="showMount(${mount.id})">
    <figure class="mounts__img--wrapper">
      <img class="mounts__img" src="${mount.image}" alt="" />
    </figure>
    <div class="mounts__content--wrapper">
      <div class="mounts__content">
        <h4 class="mounts__title">${mount.name}</h4>
        <div class="mounts__source--wrapper">
          <img
            class="mounts__source--img"
            src="/assests/ff14icon.png"
            alt=""
          />
          <p class="mounts__source">${mount.sources[0].type}</p>
        </div>
        <div class="mounts__tags">
          <p class="mounts__patch">Patch:${mount.patch}</p>
          <p class="mounts__owners">${mount.owned}</p>
        </div>
      </div>
    </div>
  </div> 
  `;
}

function filterMounts(event) {
  main(event.target.value);
}

f.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = document.getElementById("query").value;
  submitted(query);
});
