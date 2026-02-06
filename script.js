// 🔧 แก้วันที่งานตรงนี้
const weddingDate = new Date("2026-12-09T10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff < 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP (ตอนนี้ยังไม่ส่งไป backend)
document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("ขอบคุณสำหรับการตอบรับ ❤️");
  this.reset();
});
