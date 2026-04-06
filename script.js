let courses = [
  { id: 1, title: "Python Asoslari", img: "https://picsum.photos/id/201/300/180", video: "https://www.youtube.com/embed/dQw4w9wgxcq" },
  { id: 2, title: "HTML & CSS To'liq", img: "https://picsum.photos/id/237/300/180", video: "https://www.youtube.com/embed/dQw4w9wgxcq" }
];

let currentUser = null;
const ADMIN_USERNAME = "admin";        // Asosiy admin
const ADMIN_PASSWORD = "admin123";     // Asosiy admin paroli

// Foydalanuvchilar bazasi (localStorage)
function getUsers() {
  const users = localStorage.getItem("netflixfx_users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("netflixfx_users", JSON.stringify(users));
}

function loadCourses() {
  const saved = localStorage.getItem("netflixfx_courses");
  if (saved) courses = JSON.parse(saved);
}

function saveCourses() {
  localStorage.setItem("netflixfx_courses", JSON.stringify(courses));
}

// Auth funksiyalari
function showAuthModal() {
  document.getElementById('authModal').style.display = 'flex';
  switchToLogin();
}

function switchToLogin() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('register-form').classList.add('hidden');
  document.getElementById('auth-title').textContent = 'Kirish';
  document.getElementById('auth-error').textContent = '';
}

function switchToRegister() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('register-form').classList.remove('hidden');
  document.getElementById('auth-title').textContent = "Ro'yxatdan o'tish";
  document.getElementById('auth-error').textContent = '';
}

function registerUser() {
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value.trim();
  const errorEl = document.getElementById('auth-error');

  if (!username || !password) {
    errorEl.textContent = "Foydalanuvchi nomi va parolni kiriting!";
    return;
  }

  const users = getUsers();
  if (users.find(u => u.username === username)) {
    errorEl.textContent = "Bu foydalanuvchi nomi allaqachon mavjud!";
    return;
  }

  users.push({ username, password, role: "user" });
  saveUsers(users);

  errorEl.style.color = '#4ade80';
  errorEl.textContent = "Ro'yxatdan muvaffaqiyatli o'tdingiz! Endi kiring.";
  
  setTimeout(() => {
    switchToLogin();
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
  }, 1500);
}

function loginUser() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const errorEl = document.getElementById('auth-error');

  if (!username || !password) {
    errorEl.textContent = "Foydalanuvchi nomi va parolni kiriting!";
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    document.getElementById('authModal').style.display = 'none';
    updateAuthSection();
    
    // Agar admin bo'lsa, admin paneliga kirish imkonini beramiz
    if (username === ADMIN_USERNAME) {
      alert("Admin sifatida kirdingiz!");
    }
  } else {
    errorEl.textContent = "Noto'g'ri foydalanuvchi nomi yoki parol!";
  }
}

function logoutUser() {
  currentUser = null;
  updateAuthSection();
}

function updateAuthSection() {
  const authSection = document.getElementById('auth-section');
  
  if (currentUser) {
    authSection.innerHTML = `
      <a href="#" class="nav-item" onclick="logoutUser()">👤 ${currentUser.username}</a>
      ${currentUser.username === ADMIN_USERNAME ? 
        '<a href="#" class="nav-item" onclick="showAdminPanel()">🔧 Admin Panel</a>' : ''}
      <a href="#" class="nav-item" onclick="logoutUser()">Chiqish</a>
    `;
  } else {
    authSection.innerHTML = `
      <a href="#" class="nav-item" onclick="showAuthModal()">🔑 Kirish / Ro'yxatdan o'tish</a>
    `;
  }
}

function showAdminPanel() {
  if (currentUser && currentUser.username === ADMIN_USERNAME) {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('admin-page').classList.remove('hidden');
  } else {
    alert("Admin paneliga faqat admin kira oladi!");
  }
}

// Qolgan funksiyalar (oldingi versiyadan)
function getEmbedUrl(platform, input) {
  input = input.trim();
  if (platform === "youtube") {
    if (input.includes("youtube.com/watch?v=")) return `https://www.youtube.com/embed/${input.split("v=")[1].split("&")[0]}`;
    if (input.includes("youtu.be/")) return `https://www.youtube.com/embed/${input.split("youtu.be/")[1].split("?")[0]}`;
    if (input.length === 11) return `https://www.youtube.com/embed/${input}`;
    return input;
  }
  if (platform === "vimeo") return `https://player.vimeo.com/video/${input.replace(/[^0-9]/g, '')}`;
  if (platform === "dailymotion") {
    let id = input.split("/video/")[1] || input;
    return `https://www.dailymotion.com/embed/video/${id.split("?")[0]}`;
  }
  if (platform === "rutube") return `https://rutube.ru/play/embed/${input}`;
  if (platform === "mp4") return input;
  return input;
}

function addNewCourse() {
  if (!currentUser || currentUser.username !== ADMIN_USERNAME) {
    alert("Faqat admin video yuklay oladi!");
    return;
  }

  const platform = document.getElementById('videoPlatform').value;
  const title = document.getElementById('courseTitle').value.trim();
  const img = document.getElementById('courseImg').value.trim();
  const videoInput = document.getElementById('videoInput').value.trim();
  const messageEl = document.getElementById('admin-message');

  if (!title || !img || !videoInput) {
    alert("Barcha maydonlarni to‘ldiring!");
    return;
  }

  const embedUrl = getEmbedUrl(platform, videoInput);
  const newCourse = { id: Date.now(), title, img, video: embedUrl };

  courses.unshift(newCourse);
  saveCourses();
  renderCourses();

  messageEl.style.color = '#4ade80';
  messageEl.textContent = `✅ ${platform.toUpperCase()} video yuklandi!`;
  
  setTimeout(() => messageEl.textContent = '', 4000);
  
  // Formani tozalash
  document.getElementById('courseTitle').value = '';
  document.getElementById('courseImg').value = '';
  document.getElementById('videoInput').value = '';
}

function renderCourses() {
  const row1 = document.getElementById('new-courses');
  const row2 = document.getElementById('web-courses');
  row1.innerHTML = ''; row2.innerHTML = '';
  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `<img src="${course.img}" alt="${course.title}"><div class="info"><h3>${course.title}</h3></div>`;
    card.addEventListener('click', () => playVideo(course.video));
    row1.appendChild(card);
    row2.appendChild(card);
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

function searchCourses() {
  const term = document.getElementById('searchInput').value.toLowerCase().trim();
  const filtered = courses.filter(c => c.title.toLowerCase().includes(term));
  document.getElementById('new-courses').innerHTML = '';
  document.getElementById('web-courses').innerHTML = '';
  filtered.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `<img src="${course.img}" alt="${course.title}"><div class="info"><h3>${course.title}</h3></div>`;
    card.addEventListener('click', () => playVideo(course.video));
    document.getElementById('new-courses').appendChild(card);
    document.getElementById('web-courses').appendChild(card);
  });
}

function showPage(page) {
  if (page === 'home') {
    document.getElementById('home-page').classList.remove('hidden');
    document.getElementById('admin-page').classList.add('hidden');
  }
}

// ====================== INIT ======================
window.onload = () => {
  loadCourses();
  renderCourses();
  updateAuthSection();

  // Birinchi marta admin yaratish
  const users = getUsers();
  if (!users.find(u => u.username === ADMIN_USERNAME)) {
    users.push({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD, role: "admin" });
    saveUsers(users);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  });
};