const mountEL = document.querySelector(".mount__card");
const id = localStorage.getItem("id");

async function renderMount(id) {
  const mountCard = await fetch(`https://ffxivcollect.com/api/mounts/${id}`);
  const mountCardData = await mountCard.json();

  const data = [mountCardData];

  console.log(data);
  mountEL.innerHTML = data.map((mount) => selectedMount(mount)).join("");
}

renderMount(id);

function tradeable(trade) {
  if (trade) {
    return "Yes";
  } else {
    return "No";
  }
}

function selectedMount(mount) {
  return ` <div class="mount__wrapper">
    <div class="mount__img-wrapper">
      <figure class="mount__img">
        <img src="${mount.image}" alt="" />
      </figure>
    </div>
    <div class="mount__content-wrapper">
      <div class="mount__name">
        <img
          class="mount__name--img"
          src="${mount.icon}"
          alt=""
        />
        <span class="mount__name--txt">${mount.name}</span>
      </div>
      <div class="mount__stats--wrapper">
        <div>
          <dt>Movement</dt>
          <dd>${mount.movement}</dd>
        </div>
        <div>
          <dt>Tradeable</dt>
          <dd>${tradeable(mount.tradeable)}</dd>
        </div>
        <div>
          <dt>Seats</dt>
          <dd>${mount.seats}</dd>
        </div>
        <div>
          <dt>Owned?</dt>
          <dd>${mount.owned}</dd>
        </div>
        <div>
          <dt>Patch</dt>
          <dd>${mount.patch}</dd>
        </div>
      </div>
      <dt>Source</dt>
      <dd>
        <div class="sources">
          <img
            class="sources__img"
            src="./assests/ff14icon.png"
            alt=""
          />
          <a class="mount__link" href="">${mount.sources[0].text}</a>
        </div>
      </dd>

      <dt>Description</dt>
      <dd>
        ${mount.description}
      </dd>
      <dt>Journal</dt>
      <dd>
        ${mount.enhanced_description}
      </dd>
    </div>
  </div>`;
}
