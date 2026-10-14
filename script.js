const slides = [
  {
    category: "Base",
    time: "há 15 horas",
    title: "Crias da Toca conquistam grandes resultados contra o Fluminense e cravam a classificação para a semifinal do Brasileirão Sub-17",
    description: "Acompanhe as novidades, os resultados e as histórias de quem veste a camisa azul.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=2000&q=90",
    link: "#mais-noticias"
  },
  {
    category: "Futebol",
    time: "Destaque do portal",
    title: "A força da torcida transforma cada jogo em uma grande história",
    description: "A paixão pelo futebol vive nas arquibancadas, nas ruas e no coração de cada torcedor.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=2000&q=90",
    link: "#mais-noticias"
  },
  {
    category: "Clube",
    time: "Notícias do clube",
    title: "Tradição, trabalho e paixão: seguimos juntos rumo aos próximos desafios",
    description: "Confira conteúdos especiais sobre futebol, torcida e a história do clube.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=2000&q=90",
    link: "#mais-noticias"
  }
];

let currentSlide = 0;
let autoPlay = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const menuButton = $("#menuButton");
const closeMenuButton = $("#closeMenu");
const overlay = $("#overlay");
const sideMenu = $("#sideMenu");

function openMenu() {
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  sideMenu.setAttribute("aria-hidden", "false");
  closeMenuButton.focus();
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  sideMenu.setAttribute("aria-hidden", "true");
  menuButton.focus();
}

menuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

$$(".side-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    sideMenu.setAttribute("aria-hidden", "true");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" &&
      document.body.classList.contains("menu-open")) {
    closeMenu();
  }
});

function renderSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];

  $("#category").textContent = slide.category;
  $("#newsTime").textContent = slide.time;
  $("#heroTitle").textContent = slide.title;
  $("#heroDescription").textContent = slide.description;
  $("#readButton").href = slide.link;
  $("#heroBackground").style.backgroundImage =
    `url("${slide.image}")`;
  $("#heroCounter").textContent =
    `0${currentSlide + 1} / 0${slides.length}`;

  $$(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
    dot.setAttribute("aria-pressed", String(i === currentSlide));
  });
}

function nextSlide() {
  renderSlide(currentSlide + 1);
}

function prevSlide() {
  renderSlide(currentSlide - 1);
}

$("#nextSlide").addEventListener("click", nextSlide);
$("#prevSlide").addEventListener("click", prevSlide);

$$(".dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    renderSlide(Number(dot.dataset.slide));
  });
});

// Avança automaticamente e pausa quando o usuário interage.
function startAutoPlay() {
  stopAutoPlay();
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    autoPlay = setInterval(nextSlide, 7000);
  }
}

function stopAutoPlay() {
  if (autoPlay) {
    clearInterval(autoPlay);
    autoPlay = null;
  }
}

$(".hero").addEventListener("mouseenter", stopAutoPlay);
$(".hero").addEventListener("mouseleave", startAutoPlay);
$(".hero").addEventListener("focusin", stopAutoPlay);
$(".hero").addEventListener("focusout", startAutoPlay);

renderSlide(0);
startAutoPlay();

// Diálogos reutilizáveis para as áreas demonstrativas.
const dialog = $("#infoDialog");

function showDialog(title, message) {
  $("#dialogTitle").textContent = title;
  $("#dialogText").textContent = message;

  if (!dialog.open) {
    dialog.showModal();
  }
}

function closeDialog() {
  if (dialog.open) {
    dialog.close();
  }
}

$("#profileButton").addEventListener("click", () => {
  showDialog(
    "Área do torcedor",
    "Este espaço pode ser conectado ao sistema de login do seu projeto."
  );
});

$("#supportButton").addEventListener("click", () => {
  showDialog(
    "Atendimento",
    "Bem-vindo! Para ativar o atendimento real, conecte este botão a um serviço de chat ou WhatsApp."
  );
});

$("#dialogClose").addEventListener("click", closeDialog);
$("#dialogOk").addEventListener("click", closeDialog);

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeDialog();
  }
});

// Controle de tamanho do texto.
$("#accessibilityButton").addEventListener("click", () => {
  const enabled = document.body.classList.toggle("large-text");

  $("#accessibilityButton").textContent = enabled ? "A−" : "A+";
  $("#accessibilityButton").setAttribute(
    "aria-label",
    enabled ? "Restaurar tamanho do texto" : "Aumentar tamanho do texto"
  );
});

// Evita que links de demonstração rolem para IDs inexistentes.
$$('a[href="#loja"], a[href="#ingressos"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const title = link.href.includes("#loja")
      ? "Loja oficial"
      : "Ingressos";

    showDialog(
      title,
      "Este botão está pronto visualmente. Substitua o destino pelo endereço real do serviço que deseja utilizar."
    );
  });
});