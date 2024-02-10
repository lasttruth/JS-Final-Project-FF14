async function main() {
  const mounts = await fetch("https://ffxivcollect.com/api/mounts");
  const mountData = await mounts.json();
  const mountList = document.querySelector(".mounts__list");

  console.log(mountData);
  mountList.innerHTML = mountData.results
    .map((mount) => mountHtml(mount))
    .join("");

}

main();

function mountHtml(mount, source) {
  return ` <div class="mount__card">
    <figure class="mount__img--wrapper">
      <img class="mount__img" src="${mount.image}" alt="" />
    </figure>
    <div class="mount__content--wrapper">
      <div class="mount__content">
        <h4 class="mount__title">${mount.name}</h4>
        <div class="mount__source--wrapper">
          <img
            class="mount__source--img"
            src="/assests/ff14icon.png"
            alt=""
          />
          <p class="mount__source">${mount.sources[0].type}</p>
        </div>
        <div class="mount__tags">
          <p class="mount__patch">Patch:${mount.patch}</p>
          <p class="mount__owners">${mount.owned}%</p>
        </div>
      </div>
    </div>
  </div> `;
}
