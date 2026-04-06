let courses = [];

// Kurslarni GitHubdan yuklash
async function loadCourses() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/LutsiferMorningStar/netflix-fx/main/courses.json');
    if (response.ok) {
      courses = await response.json();
    } else {
      throw new Error("JSON topilmadi");
    }
  } catch (error) {
    console.log("JSON yuklanmadi, default kurslar ishlatilmoqda");
    courses = [
      { id: 1, title: "Python Asoslari", img: "https://picsum.photos/id/201/300/180", video: "https://www.youtube.com/embed/dQw4w9wgxcq" },
      { id: 2, title: "HTML & CSS To'liq", img: "https://picsum.photos/id/237/300/180", video: "https://www.youtube.com/embed/dQw4w9wgxcq" }
    ];
  }
  renderCourses();
}

// Yangi video qo'shish (hozircha faqat localStorage)
function addNewCourse() {
  const platform = document.getElementById('videoPlatform').value;
  const title = document.getElementById('courseTitle').value.trim();
  const img = document.getElementById('courseImg').value.trim();
  const videoInput = document.getElementById('videoInput').value.trim();

  if (!title || !img || !videoInput) {
    alert("Barcha maydonlarni to'ldiring!");
    return;
  }

  const embedUrl = getEmbedUrl(platform, videoInput);

  const newCourse = {
    id: Date.now(),
    title: title,
    img: img,
    video: embedUrl
  };

  courses.unshift(newCourse);
  saveToLocalAndRender();

  showNotification("✅ Video qo'shildi! (Hozircha faqat siz ko'rasiz. To'liq hammaga ko'rinishi uchun qo'shimcha sozlash kerak)");
}

function saveToLocalAndRender() {
  localStorage.setItem("netflixfx_courses", JSON.stringify(courses));
  renderCourses();
}

function getEmbedUrl(platform, input) {
  input = input.trim();
  if (platform === "youtube") {
    if (input.includes("youtube.com/watch?v=")) return `https://www.youtube.com/embed/${input.split("v=")[1].split("&")[0]}`;
    if (input.includes("youtu.be/")) return `https://www.youtube.com/embed/${input.split("youtu.be/")[1].split("?")[0]}`;
    if (input.length === 11) return `https://www.youtube.com/embed/${input}`;
    return input;
  }
  if (platform === "vimeo") return `https://player.vimeo.com/video/${input.replace(/[^0-9]/g,'')}`;
  if (platform === "dailymotion") return `https://www.dailymotion.com/embed/video/${input}`;
  if (platform === "rutube") return `https://rutube.ru/play/embed/${input}`;
  if (platform === "mp4") return input;
  return input;
}

function renderCourses() {
  const container = document.getElementById('new-courses');
  container.innerHTML = '';

  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <img src="${course.img}" alt="${course.title}">
      <div class="info"><h3>${course.title}</h3></div>
    `;
    card.onclick = () => playVideo(course.video);
    container.appendChild(card);
  });
}

function playVideo(url) {
  document.getElementById('videoPlayer').src = url;
  document.getElementById('videoModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('videoModal').style.display = 'none';
  document.getElementById('videoPlayer').src = '';
}

function showNotification(message) {
  const notif = document.createElement('div');
  notif.style.cssText = `position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#e50914; color:white; padding:15px 25px; border-radius:12px; z-index:9999;`;
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}

// Init
window.onload = loadCourses;
