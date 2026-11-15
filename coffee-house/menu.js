const kinds = document.querySelectorAll(".kind");
const buttonMore = document.querySelector(".refresh");
const catalog = document.querySelector(".catalog");
const visibleOnMobile = 4;

let products = [];

function createCard(item, index) {
  const card = document.createElement("div");
  card.className = "kindOfCoffee";
  if (index >= visibleOnMobile) card.classList.add("kindOfCoffeeHide");

  const image = document.createElement("img");
  image.className = "imgCatalog";
  image.src = item.imageSrc;
  image.alt = item.name;
  image.loading = "lazy";

  const title = document.createElement("h5");
  title.textContent = item.name;

  const description = document.createElement("p");
  description.className = "describeCoffee";
  description.textContent = item.description;

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = `$${item.price}`;

  card.append(image, title, description, price);
  return card;
}

function renderCategory(category) {
  const items = products.filter((item) => item.category === category);

  catalog.replaceChildren(...items.map(createCard));
  catalog.classList.remove("isExpanded");
  catalog.classList.toggle("hasMore", items.length > visibleOnMobile);
}

function selectKind(kind) {
  kinds.forEach((item) => {
    const isActive = item === kind;
    item.classList.toggle("Kindactive", isActive);
    item.setAttribute("aria-pressed", isActive);
  });
  renderCategory(kind.dataset.category);
}

kinds.forEach((kind) => kind.addEventListener("click", () => selectKind(kind)));

buttonMore.addEventListener("click", (event) => {
  event.preventDefault();
  catalog.classList.add("isExpanded");
});

fetch("./products.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((data) => {
    products = data;
    selectKind(kinds[0]);
  })
  .catch(() => {
    catalog.textContent = "Menu is unavailable right now. Please try again later.";
  });
