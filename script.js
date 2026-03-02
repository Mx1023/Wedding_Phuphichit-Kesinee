document.addEventListener("DOMContentLoaded", function () {

  // ================= MUSIC SYSTEM =================
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const musicIcon = musicBtn ? musicBtn.querySelector("i") : null;

  function openInvitation() {
  const cover = document.getElementById("cover");
  const mainContent = document.getElementById("mainContent");

  if (cover) cover.classList.add("fade-out");
  if (mainContent) mainContent.classList.add("show");

  if (music) {
    music.play().catch(() => {});
  }

  if (musicBtn) {
    musicBtn.classList.add("playing");
  }
}

  // สำคัญมาก (ให้ onclick เรียกได้)
  window.openInvitation = openInvitation;

  if (musicBtn && music) {
    musicBtn.addEventListener("click", function () {
      if (music.paused) {
        music.play();
        musicBtn.classList.add("playing");
        if (musicIcon) {
          musicIcon.classList.remove("fa-volume-xmark");
          musicIcon.classList.add("fa-music");
        }
      } else {
        music.pause();
        musicBtn.classList.remove("playing");
        if (musicIcon) {
          musicIcon.classList.remove("fa-music");
          musicIcon.classList.add("fa-volume-xmark");
        }
      }
    });
  }

  // ================= COUNTDOWN =================
  const weddingDate = new Date("2026-11-20T08:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) return;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (days) days.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (hours) hours.textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
    if (minutes) minutes.textContent = Math.floor((diff / (1000 * 60)) % 60);
    if (seconds) seconds.textContent = Math.floor((diff / 1000) % 60);

  }, 1000);

  // ================= SCROLL FADE EFFECT =================
  const faders = document.querySelectorAll('.fade-in');

  window.addEventListener('scroll', () => {
    faders.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add('show');
      }
    });
  });

  // ================= RSVP SYSTEM =================
  const form = document.getElementById("rsvpForm");
  const messagesList = document.getElementById("messagesList");

  if (form && messagesList) {

    let messages = JSON.parse(localStorage.getItem("weddingMessages")) || [];

    function renderMessages() {
      messagesList.innerHTML = "";

      messages.forEach(msg => {
        const card = document.createElement("div");
        card.classList.add("message-card");
        card.innerHTML = `
          <strong>${msg.name}</strong>
          <p>${msg.text}</p>
        `;
        messagesList.appendChild(card);
      });
    }

    renderMessages();

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector("input").value.trim();
      const text = form.querySelector("textarea").value.trim();

      if (!name) return;

      const newMessage = { name, text };
      messages.unshift(newMessage);

      localStorage.setItem("weddingMessages", JSON.stringify(messages));

      renderMessages();
      form.reset();
    });
  }

});