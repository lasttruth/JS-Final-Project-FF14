async function main(filter) {
  const mounts = await fetch("https://ffxivcollect.com/api/mounts");
  const mountData = await mounts.json();
  const mountList = document.querySelector(".mounts__list");
  let listTitle = document.querySelector(".mount__header");
  
  const arr = "A Realm Reborn ";
  const hw = "Heavensward ";
  const sb = "Stormblood ";
  const shb = "Shadowbringers ";
  const ew = "Endwalkers ";
  
  console.log(mountData);

  let filteredAndSortedResults = mountData.results;

  if (filter === "ARR") {
    
    filteredAndSortedResults = filteredAndSortedResults
      .filter((mount) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patch = parseFloat(mount.patch);
        return patch >= 2.0 && patch < 3.0;
      })
      .sort((a, b) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patchA = parseFloat(a.patch);
        const patchB = parseFloat(b.patch);

        // Compare the patch versions
        return patchA - patchB;
      });
      listTitle.innerHTML = listTitleHtml(arr);
  } else if (filter === "HW") {
    filteredAndSortedResults = filteredAndSortedResults
      .filter((mount) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patch = parseFloat(mount.patch);
        return patch >= 3.0 && patch < 4.0;
      })
      .sort((a, b) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patchA = parseFloat(a.patch);
        const patchB = parseFloat(b.patch);

        // Compare the patch versions
        return patchA - patchB;
      });
      listTitle.innerHTML = listTitleHtml(hw);
  } else if (filter === "SB") {
    filteredAndSortedResults = filteredAndSortedResults
      .filter((mount) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patch = parseFloat(mount.patch);
        return patch >= 4.0 && patch < 5.0;
      })
      .sort((a, b) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patchA = parseFloat(a.patch);
        const patchB = parseFloat(b.patch);

        // Compare the patch versions
        return patchA - patchB;
      });
      listTitle.innerHTML = listTitleHtml(sb);
  } else if (filter === "ShB") {
    filteredAndSortedResults = filteredAndSortedResults
      .filter((mount) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patch = parseFloat(mount.patch);
        return patch >= 5.0 && patch < 6.0;
      })
      .sort((a, b) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patchA = parseFloat(a.patch);
        const patchB = parseFloat(b.patch);

        // Compare the patch versions
        return patchA - patchB;
      });
      listTitle.innerHTML = listTitleHtml(shb);
  } else if (filter === "EW") {
    filteredAndSortedResults = filteredAndSortedResults
      .filter((mount) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patch = parseFloat(mount.patch);
        return patch >= 6.0 && patch < 7.0;
      })
      .sort((a, b) => {
        // Assuming "patch" is a string representing a version number like "6.55"
        const patchA = parseFloat(a.patch);
        const patchB = parseFloat(b.patch);

        // Compare the patch versions
        return patchA - patchB;
      });
      listTitle.innerHTML = listTitleHtml(ew);
  }

  mountList.innerHTML = filteredAndSortedResults
    .map((mount) => mountHtml(mount))
    .join("");
}

main();

function listTitleHtml(expansion) {
  return `<h2 class="mount__header--title">
  ${expansion} <span class="secondary"> Mounts </span>
</h2>
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

function filterMounts(event) {
  main(event.target.value);
}
