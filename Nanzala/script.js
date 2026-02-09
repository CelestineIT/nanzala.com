const SECRET_MESSAGE = "If you're reading this, My President, just know I'd still choose every long call, every late night, every conversation with you — again and again.";

const RANDOM_REASONS = [
  "Because I never get tired of talking to you.",
  "Because hours pass like minutes whenever it's you on the line.",
  "Because you listen — really listen.",
  "Because you feel like home, even across the distance.",
  "Because our words always find a way to bridge time.",
  "Because you leave room for softness every time we talk."
];

const MAX_UPLOAD = 6;
const MAX_STORAGE = 18;
const THEME_STORAGE_KEY = "preferredTheme";
const DEFAULT_PHOTOS = ["img/1.jpg", "img/2.jpg", "img/3.jpg"];
const CUSTOM_PROMISES_KEY = "customPromises";
const CUSTOM_PROMISE_LIMIT = 6;
const GRATITUDE_KEY = "gratitudeEntries";
const GRATITUDE_LIMIT = 8;
const COUNTDOWN_KEY = "nextCallDate";
const SHARED_PLAYLIST_KEY = "sharedPlaylist";
const MUSIC_TRACKS = [
  { title: "Our Quiet Anthem", src: "music.mp3" }
];
const WISH_LIST = [
  "Weekend cottage retreats with no phone signal.",
  "Moonlit drives simply to laugh with you.",
  "Cooking classes where we mess up and still celebrate.",
  "Road trips with only soulful playlists and quiet stops."
];
const TODAY_NOTES = [
  "Today we celebrated patience while the miles melted away.",
  "Today we held space for each other, no matter how busy life felt.",
  "Today's call reminded me why your voice feels like home.",
  "Today I'm grateful we still choose kindness first."
];
const BIBLE_QUOTES = [
  { text: "Let all that you do be done in love.", ref: "1 Corinthians 16:14" },
  { text: "The Lord is my strength and my shield.", ref: "Psalm 28:7" },
  { text: "Be strong and courageous. Do not be afraid.", ref: "Joshua 1:9" },
  { text: "I can do all things through him who strengthens me.", ref: "Philippians 4:13" },
  { text: "We love because he first loved us.", ref: "1 John 4:19" }
];
const CHECKLIST_KEY = "callChecklist";
const DISTANCE_KEY = "lastCallTimestamp";
const STREAK_DATA_KEY = "callStreakData";
const JOURNAL_KEY = "sharedJournal";
const JOURNAL_LIMIT = 5;
const MOOD_KEY = "moodLevel";
const MEMORY_ENTRIES_KEY = "customMemoryEntries";
const MEMORY_ENTRY_LIMIT = 12;
const VAULT_KEY = "loveLetterVault";
const RITUALS = [
  "Brew a cup of calm and share the scent over text.",
  "Send a 10-second voice note about the first thing you saw this morning.",
  "Choose a verse together and read it aloud during the call.",
  "Plan a silent 5-minute gratitude moment before you hang up."
];
const TIMELINE_STORAGE_KEY = "timelineEntries";
const DEFAULT_TIMELINE_ENTRIES = [
  {
    title: "The Beginning",
    note: "Realizing how natural it felt to talk for hours.",
    meta: "The right words felt effortless from the start."
  },
  {
    title: "Late Nights",
    note: "Calls that never felt long enough.",
    meta: "We chased every minute of the dusk together."
  },
  {
    title: "Today",
    note: "Still choosing communication, patience, and love.",
    meta: "Each day we pick courage over silence."
  }
];
const VOICE_NOTES_KEY = "voiceNotes";
const VOICE_NOTES_LIMIT = 6;
const readFileAsDataUrl = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

const formatFriendlyDate = (date) =>
  date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const getStoredTimelineEntries = () =>
  JSON.parse(localStorage.getItem(TIMELINE_STORAGE_KEY) || "[]");

const renderTimelineEntries = (container) => {
  if (!container) {
    return;
  }
  const stored = getStoredTimelineEntries();
  const combined = [...DEFAULT_TIMELINE_ENTRIES, ...stored];
  container.innerHTML = combined
    .map((entry) => {
      const meta = entry.meta
        || (entry.created ? `Added ${formatFriendlyDate(new Date(entry.created))}` : "A cherished moment");
      const noteBlock = entry.note ? `<p>${entry.note}</p>` : "";
      return `
        <article class="timeline-entry">
          <small>${meta}</small>
          <h3>${entry.title}</h3>
          ${noteBlock}
        </article>
      `.trim();
    })
    .join("");
};
document.addEventListener("DOMContentLoaded", () => {
  const authorInput = document.getElementById("author-input");
  const authorSpan = document.getElementById("letter-author");
  const storedAuthor = localStorage.getItem("authorName") || "Celestine";
  if (authorInput) {
    authorInput.value = storedAuthor;
  }
  if (authorSpan) {
    authorSpan.textContent = storedAuthor;
  }
  authorInput?.addEventListener("input", () => {
    const nextValue = authorInput.value.trim() || "Celestine";
    localStorage.setItem("authorName", nextValue);
    authorSpan.textContent = nextValue;
  });

  const themeToggle = document.getElementById("theme-toggle");
  const applyTheme = (theme) => {
    document.body.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "\u{1F4A1} Light" : "\u{1F319} Dark";
    }
  };
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  applyTheme(storedTheme);
  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });

  const verseTextEl = document.getElementById("verse-text");
  const verseRefEl = document.getElementById("verse-reference");
  const verseRefresh = document.getElementById("verse-refresh");
  const getDailyVerseIndex = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    return day % BIBLE_QUOTES.length;
  };
  let currentVerseIndex = getDailyVerseIndex();
  const renderVerse = (index) => {
    if (!BIBLE_QUOTES.length) {
      return;
    }
    currentVerseIndex = index % BIBLE_QUOTES.length;
    const verse = BIBLE_QUOTES[currentVerseIndex];
    if (verseTextEl) {
      verseTextEl.textContent = verse.text;
    }
    if (verseRefEl) {
      verseRefEl.textContent = verse.ref;
    }
  };
  verseRefresh?.addEventListener("click", () => {
    const nextIndex = Math.floor(Math.random() * BIBLE_QUOTES.length);
    renderVerse(nextIndex);
  });
  renderVerse(currentVerseIndex);

  const reasonHeart = document.getElementById("reason-heart");
  const reasonText = document.getElementById("reason-text");
  const heartsLayer = document.getElementById("floating-hearts");
  const createFloatingHeart = () => {
    if (!heartsLayer) {
      return;
    }
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "\u2764\uFE0F";
    heart.style.left = `${Math.random() * 70 + 15}%`;
    heart.style.animationDuration = `${2 + Math.random() * 1.5}s`;
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 3200);
  };
  const setRandomReason = () => {
    if (!RANDOM_REASONS.length || !reasonText) {
      return;
    }
    let nextReason;
    let attempts = 5;
    do {
      nextReason = RANDOM_REASONS[Math.floor(Math.random() * RANDOM_REASONS.length)];
      attempts -= 1;
    } while (nextReason === reasonText.textContent && attempts > 0);
    reasonText.textContent = nextReason;
  };
  reasonHeart?.addEventListener("click", () => {
    setRandomReason();
    reasonHeart.classList.add("animate");
    createFloatingHeart();
    setTimeout(() => reasonHeart.classList.remove("animate"), 400);
  });

  const wishlistText = document.getElementById("wishlist-text");
  if (wishlistText) {
    let wishIndex = 0;
    wishlistText.textContent = WISH_LIST[wishIndex];
    setInterval(() => {
      wishIndex = (wishIndex + 1) % WISH_LIST.length;
      wishlistText.textContent = WISH_LIST[wishIndex];
    }, 4200);
  }

  const todayDateEl = document.getElementById("today-date");
  const todayNoteEl = document.getElementById("today-note");
  if (todayDateEl) {
    const today = new Date();
    todayDateEl.textContent = today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }
  if (todayNoteEl) {
    todayNoteEl.textContent = TODAY_NOTES[Math.floor(Math.random() * TODAY_NOTES.length)];
  }

  const ritualText = document.getElementById("ritual-text");
  const ritualNext = document.getElementById("ritual-next");
  let ritualIndex = 0;
  const renderRitual = (index) => {
    if (!RITUALS.length || !ritualText) {
      return;
    }
    ritualIndex = index % RITUALS.length;
    ritualText.textContent = RITUALS[ritualIndex];
  };
  ritualNext?.addEventListener("click", () => renderRitual(ritualIndex + 1));
  renderRitual(0);
  setInterval(() => renderRitual(ritualIndex + 1), 9000);

  const memoryTitleInput = document.getElementById("memory-title");
  const memoryNotesInput = document.getElementById("memory-notes");
  const memoryFileInput = document.getElementById("memory-file");
  const memorySave = document.getElementById("memory-save");
  const memoryList = document.getElementById("memory-list");
  const memorySpotlight = document.getElementById("memory-spotlight-content");

  const getMemoryEntries = () => JSON.parse(localStorage.getItem(MEMORY_ENTRIES_KEY) || "[]");

  const buildMediaPreview = (entry) => {
    if (!entry.mediaType || entry.mediaType === "text") {
      return "";
    }
    if (entry.mediaType === "image") {
      return `<img src="${entry.mediaData}" alt="${entry.title || "Memory"}" />`;
    }
    if (entry.mediaType === "video") {
      return `<video controls src="${entry.mediaData}"></video>`;
    }
    if (entry.mediaType === "audio") {
      return `<audio controls src="${entry.mediaData}"></audio>`;
    }
    return "";
  };

  const updateMemorySpotlight = (entries) => {
    if (!memorySpotlight) {
      return;
    }
    const latest = entries[0];
    if (!latest) {
      memorySpotlight.innerHTML = '<p class="muted">Create a memory and it will appear here.</p>';
      return;
    }
    const preview = buildMediaPreview(latest);
    memorySpotlight.innerHTML = `
      <div>
        <strong>${latest.title || "A shared memory"}</strong>
        <p>${latest.note || "No note yet, just a feeling."}</p>
        <small>${formatFriendlyDate(new Date(latest.created))} · ${new Date(latest.created).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</small>
        ${preview}
      </div>
    `;
  };

  const renderMemoryEntries = () => {
    if (!memoryList) {
      return;
    }
    const entries = getMemoryEntries();
    if (!entries.length) {
      memoryList.innerHTML = '<p class="muted">Your memories will show here.</p>';
      updateMemorySpotlight(entries);
      return;
    }
    memoryList.innerHTML = entries
      .map((entry) => {
        const media = buildMediaPreview(entry);
        return `
          <div class="memory-entry">
            <h3>${entry.title || "Memory"}</h3>
            <small>${formatFriendlyDate(new Date(entry.created))}</small>
            ${media}
            <p>${entry.note || ""}</p>
          </div>
        `.trim();
      })
      .join("");
    updateMemorySpotlight(entries);
  };

  const storeMemoryEntry = (entry) => {
    const entries = getMemoryEntries();
    entries.unshift(entry);
    if (entries.length > MEMORY_ENTRY_LIMIT) {
      entries.pop();
    }
    localStorage.setItem(MEMORY_ENTRIES_KEY, JSON.stringify(entries));
    renderMemoryEntries();
  };

  const addMemoryEntry = async () => {
    if (!memoryTitleInput && !memoryNotesInput && !memoryFileInput) {
      return;
    }
    const title = memoryTitleInput?.value.trim();
    const note = memoryNotesInput?.value.trim();
    const file = memoryFileInput?.files?.[0];
    if (!title && !note && !file) {
      return;
    }
    const entry = {
      id: Date.now(),
      title,
      note,
      mediaType: "text",
      mediaData: "",
      created: new Date().toISOString()
    };
    if (file) {
      const data = await readFileAsDataUrl(file);
      if (file.type.startsWith("image/")) {
        entry.mediaType = "image";
      } else if (file.type.startsWith("video/")) {
        entry.mediaType = "video";
      } else if (file.type.startsWith("audio/")) {
        entry.mediaType = "audio";
      }
      entry.mediaData = data;
    }
    storeMemoryEntry(entry);
    memoryTitleInput && (memoryTitleInput.value = "");
    memoryNotesInput && (memoryNotesInput.value = "");
    memoryFileInput && (memoryFileInput.value = "");
  };

  memorySave?.addEventListener("click", addMemoryEntry);
  renderMemoryEntries();

  const photoInput = document.getElementById("photo-input");
  const addPhotosButton = document.getElementById("add-photos");
  const photoGrid = document.getElementById("photo-grid");

  const renderPhotos = () => {
    if (!photoGrid) {
      return;
    }
    const stored = JSON.parse(localStorage.getItem("memoryPhotos") || "[]");
    const sources = stored.length ? stored : DEFAULT_PHOTOS;
    photoGrid.innerHTML = sources
      .map(
        (src, index) => `
          <button class="photo-button" type="button" data-src="${src}" aria-label="View photo ${index + 1}">
            <img src="${src}" alt="Our memory" loading="lazy" />
          </button>
        `.trim()
      )
      .join("");
  };

  const storePhotos = (urls) => {
    let stored = JSON.parse(localStorage.getItem("memoryPhotos") || "[]");
    stored = stored.concat(urls);
    if (stored.length > MAX_STORAGE) {
      stored = stored.slice(-MAX_STORAGE);
    }
    localStorage.setItem("memoryPhotos", JSON.stringify(stored));
  };

  photoInput?.addEventListener("change", async (event) => {
    const files = Array.from(event.target.files || []).slice(0, MAX_UPLOAD);
    if (!files.length) {
      return;
    }
    const readFiles = files.map((file) => readFileAsDataUrl(file));
    const newImages = await Promise.all(readFiles);
    storePhotos(newImages);
    renderPhotos();
    photoInput.value = "";
  });

  addPhotosButton?.addEventListener("click", () => photoInput?.click());
  renderPhotos();

  const photoModal = document.getElementById("photo-modal");
  const photoModalOverlay = document.getElementById("photo-modal-overlay");
  const photoModalImage = document.getElementById("photo-modal-image");
  const photoModalClose = document.getElementById("photo-modal-close");

  const openPhotoModal = (src) => {
    if (!photoModal || !photoModalImage) {
      return;
    }
    photoModalImage.src = src;
    photoModal.classList.remove("hidden");
    photoModal.setAttribute("aria-hidden", "false");
  };

  const closePhotoModal = () => {
    if (!photoModal) {
      return;
    }
    photoModal.classList.add("hidden");
    photoModal.setAttribute("aria-hidden", "true");
    if (photoModalImage) {
      photoModalImage.src = "";
    }
  };

  photoGrid?.addEventListener("click", (event) => {
    const button = event.target.closest(".photo-button");
    if (!button) {
      return;
    }
    openPhotoModal(button.dataset.src);
  });

  photoModalClose?.addEventListener("click", closePhotoModal);
  photoModalOverlay?.addEventListener("click", closePhotoModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePhotoModal();
    }
  });

  const playlistInput = document.getElementById("playlist-input");
  const playlistAdd = document.getElementById("playlist-add");
  const playlistCustom = document.getElementById("playlist-custom");

  const getCustomPromises = () => JSON.parse(localStorage.getItem(CUSTOM_PROMISES_KEY) || "[]");

  const renderCustomPromises = () => {
    if (!playlistCustom) {
      return;
    }
    const stored = getCustomPromises();
    if (!stored.length) {
      playlistCustom.innerHTML = '<li class="muted">Add your own promise to see it here.</li>';
      return;
    }
    playlistCustom.innerHTML = stored.map((promise) => `<li>\u2764\uFE0F ${promise}</li>`).join("");
  };

  const addCustomPromise = () => {
    if (!playlistInput) {
      return;
    }
    const next = playlistInput.value.trim();
    if (!next) {
      return;
    }
    let stored = getCustomPromises();
    stored.unshift(next);
    if (stored.length > CUSTOM_PROMISE_LIMIT) {
      stored = stored.slice(0, CUSTOM_PROMISE_LIMIT);
    }
    localStorage.setItem(CUSTOM_PROMISES_KEY, JSON.stringify(stored));
    playlistInput.value = "";
    renderCustomPromises();
  };

  playlistAdd?.addEventListener("click", addCustomPromise);
  playlistInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomPromise();
    }
  });
  renderCustomPromises();

  const gratitudeInput = document.getElementById("gratitude-input");
  const gratitudeAdd = document.getElementById("gratitude-add");
  const gratitudeList = document.getElementById("gratitude-list");
  const gratitudeToast = document.getElementById("gratitude-toast");
  const gratitudeToastText = document.getElementById("gratitude-toast-text");
  const gratitudeToastDismiss = document.getElementById("gratitude-toast-dismiss");

  const getGratitudeEntries = () => JSON.parse(localStorage.getItem(GRATITUDE_KEY) || "[]");

  const renderGratitudeEntries = () => {
    if (!gratitudeList) {
      return;
    }
    const entries = getGratitudeEntries();
    if (!entries.length) {
      gratitudeList.innerHTML = '<li class="muted">Leave a tiny gratitude note.</li>';
      return;
    }
    gratitudeList.innerHTML = entries
      .map((entry) => `<li><strong>${entry.time}</strong><br>${entry.text}</li>`)
      .join("");
  };

  const showGratitudeToast = (message) => {
    if (!gratitudeToast || !gratitudeToastText) {
      return;
    }
    gratitudeToastText.textContent = message;
    gratitudeToast.classList.remove("hidden");
  };

  const addGratitudeEntry = () => {
    if (!gratitudeInput) {
      return;
    }
    const text = gratitudeInput.value.trim();
    if (!text) {
      return;
    }
    const now = new Date();
    let entries = getGratitudeEntries();
    entries.unshift({
      text,
      time: now.toLocaleDateString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" })
    });
    if (entries.length > GRATITUDE_LIMIT) {
      entries = entries.slice(0, GRATITUDE_LIMIT);
    }
    localStorage.setItem(GRATITUDE_KEY, JSON.stringify(entries));
    gratitudeInput.value = "";
    renderGratitudeEntries();
    showGratitudeToast("Saved your gratitude—carry that warmth into our next call.");
  };

  gratitudeAdd?.addEventListener("click", addGratitudeEntry);
  gratitudeInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addGratitudeEntry();
    }
  });
  gratitudeToastDismiss?.addEventListener("click", () => gratitudeToast?.classList.add("hidden"));
  renderGratitudeEntries();

  const countdownDisplay = document.getElementById("countdown-display");
  const countdownInput = document.getElementById("countdown-input");
  const countdownSet = document.getElementById("countdown-set");

  const getCountdownTarget = () => {
    const stored = localStorage.getItem(COUNTDOWN_KEY);
    if (stored) {
      const parsed = new Date(stored);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 2);
    fallback.setHours(20, 0, 0, 0);
    return fallback;
  };

  let countdownTarget = getCountdownTarget();

  const renderCountdown = () => {
    if (!countdownDisplay) {
      return;
    }
    const now = new Date();
    const diff = countdownTarget - now;
    if (diff <= 0) {
      countdownDisplay.textContent = "Our call is live or just wrapped—time to reconnect.";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until our next call.`;
  };

  const setCountdownTarget = (date) => {
    countdownTarget = date;
    localStorage.setItem(COUNTDOWN_KEY, date.toISOString());
    renderCountdown();
  };

  countdownSet?.addEventListener("click", () => {
    if (!countdownInput?.value) {
      return;
    }
    const nextDate = new Date(countdownInput.value);
    if (Number.isNaN(nextDate)) {
      return;
    }
    setCountdownTarget(nextDate);
  });

  renderCountdown();
  setInterval(renderCountdown, 1000);

  const sharedPlaylistInput = document.getElementById("shared-playlist-input");
  const sharedPlaylistAdd = document.getElementById("shared-playlist-add");
  const sharedPlaylistList = document.getElementById("shared-playlist-list");

  const getSharedTracks = () => JSON.parse(localStorage.getItem(SHARED_PLAYLIST_KEY) || "[]");

  const renderSharedPlaylist = () => {
    if (!sharedPlaylistList) {
      return;
    }
    const tracks = getSharedTracks();
    if (!tracks.length) {
      sharedPlaylistList.innerHTML = '<li class="muted">Add a shared vibe to see it here.</li>';
      return;
    }
    sharedPlaylistList.innerHTML = tracks.map((track) => `<li>\u{1F3B5} ${track}</li>`).join("");
  };

  const addSharedTrack = () => {
    if (!sharedPlaylistInput) {
      return;
    }
    const next = sharedPlaylistInput.value.trim();
    if (!next) {
      return;
    }
    const tracks = getSharedTracks();
    tracks.unshift(next);
    if (tracks.length > 10) {
      tracks.pop();
    }
    localStorage.setItem(SHARED_PLAYLIST_KEY, JSON.stringify(tracks));
    sharedPlaylistInput.value = "";
    renderSharedPlaylist();
  };

  sharedPlaylistAdd?.addEventListener("click", addSharedTrack);
  sharedPlaylistInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSharedTrack();
    }
  });
  renderSharedPlaylist();

  const checklistInputs = document.querySelectorAll('.checklist-items input[type="checkbox"]');
  const checklistReset = document.getElementById("checklist-reset");

  const loadChecklist = () => {
    const stored = JSON.parse(localStorage.getItem(CHECKLIST_KEY) || "{}");
    checklistInputs.forEach((input) => {
      const task = input.dataset.task;
      input.checked = !!stored[task];
    });
  };

  checklistInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const stored = JSON.parse(localStorage.getItem(CHECKLIST_KEY) || "{}");
      stored[input.dataset.task] = input.checked;
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(stored));
    });
  });

  checklistReset?.addEventListener("click", () => {
    localStorage.removeItem(CHECKLIST_KEY);
    loadChecklist();
  });

  loadChecklist();

  const distanceDisplay = document.getElementById("distance-display");
  const distanceMark = document.getElementById("distance-mark");
  const streakCount = document.getElementById("streak-count");

  const renderStreak = () => {
    if (!streakCount) {
      return;
    }
    const stored = JSON.parse(localStorage.getItem(STREAK_DATA_KEY) || "{}");
    streakCount.textContent = stored.count || 0;
  };

  const updateStreakOnCall = (date) => {
    const stored = JSON.parse(localStorage.getItem(STREAK_DATA_KEY) || "{}");
    const lastDate = stored.lastDate ? new Date(stored.lastDate) : null;
    const today = new Date(date);
    const todayNorm = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let streak = stored.count || 0;
    if (!lastDate) {
      streak = 1;
    } else {
      const lastNorm = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
      const diffDays = Math.round((todayNorm - lastNorm) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        streak = Math.max(streak, 1);
      } else if (diffDays === 1) {
        streak += 1;
      } else {
        streak = 1;
      }
    }
    const payload = { count: streak, lastDate: todayNorm.toISOString() };
    localStorage.setItem(STREAK_DATA_KEY, JSON.stringify(payload));
    renderStreak();
  };

  const getLastCall = () => {
    const stored = localStorage.getItem(DISTANCE_KEY);
    if (stored) {
      const parsed = new Date(stored);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
    return new Date();
  };

  let lastCallTimestamp = getLastCall();

  const renderDistance = () => {
    if (!distanceDisplay) {
      return;
    }
    const now = new Date();
    const diff = now - lastCallTimestamp;
    if (diff <= 0) {
      distanceDisplay.textContent = "Just wrapped a call—feeling close.";
      return;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    distanceDisplay.textContent = `${hours}h ${minutes}m since our last call`;
  };

  distanceMark?.addEventListener("click", () => {
    lastCallTimestamp = new Date();
    localStorage.setItem(DISTANCE_KEY, lastCallTimestamp.toISOString());
    renderDistance();
    updateStreakOnCall(lastCallTimestamp);
  });

  renderDistance();
  setInterval(renderDistance, 60 * 1000);
  renderStreak();

  const journalList = document.getElementById("journal-list");
  const journalInput = document.getElementById("journal-input");
  const journalAdd = document.getElementById("journal-add");

  const getJournalEntries = () => JSON.parse(localStorage.getItem(JOURNAL_KEY) || "[]");

  const renderJournalEntries = () => {
    if (!journalList) {
      return;
    }
    const entries = getJournalEntries();
    if (!entries.length) {
      journalList.innerHTML = '<li class="muted">Leave a sentence for us here.</li>';
      return;
    }
    journalList.innerHTML = entries
      .map((entry) => `<li><strong>${entry.time}</strong><br>${entry.text}</li>`)
      .join("");
  };

  const addJournalEntry = () => {
    if (!journalInput) {
      return;
    }
    const text = journalInput.value.trim();
    if (!text) {
      return;
    }
    const now = new Date();
    let entries = getJournalEntries();
    entries.unshift({
      text,
      time: now.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
    });
    if (entries.length > JOURNAL_LIMIT) {
      entries = entries.slice(0, JOURNAL_LIMIT);
    }
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
    journalInput.value = "";
    renderJournalEntries();
  };

  journalAdd?.addEventListener("click", addJournalEntry);
  journalInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addJournalEntry();
    }
  });
  renderJournalEntries();

  const moodSlider = document.getElementById("mood-slider");
  const moodLabel = document.getElementById("mood-label");

  const getMoodLevel = () => {
    const stored = parseInt(localStorage.getItem(MOOD_KEY), 10);
    return Number.isNaN(stored) ? 50 : stored;
  };

  const updateMoodGlow = (level) => {
    const normalized = Math.min(Math.max(level / 100, 0), 1);
    const alpha = 0.04 + normalized * 0.12;
    document.body.style.setProperty("--mood-glow", `rgba(255, 255, 255, ${alpha.toFixed(3)})`);
    const labels = ["Restful hush", "Balanced glow", "Warm radiance", "Bright affection"];
    if (moodLabel) {
      moodLabel.textContent = labels[Math.min(Math.floor(normalized * labels.length), labels.length - 1)];
    }
  };

  const setMoodLevel = (value) => {
    localStorage.setItem(MOOD_KEY, value.toString());
    updateMoodGlow(value);
  };

  const initialMood = getMoodLevel();
  setMoodLevel(initialMood);
  if (moodSlider) {
    moodSlider.value = initialMood.toString();
    moodSlider.addEventListener("input", (event) => {
      const nextValue = parseInt(event.target.value, 10);
      if (!Number.isNaN(nextValue)) {
        setMoodLevel(nextValue);
      }
    });
  }

  const secretModal = document.getElementById("secret-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const secretText = document.getElementById("secret-text");
  const secretToggle = document.getElementById("secret-toggle");
  const modalClose = document.getElementById("modal-close");
  if (secretText) {
    secretText.textContent = SECRET_MESSAGE;
  }
  const openSecretModal = () => {
    if (secretModal) {
      secretModal.classList.remove("hidden");
      secretModal.setAttribute("aria-hidden", "false");
    }
  };
  const closeSecretModal = () => {
    if (secretModal) {
      secretModal.classList.add("hidden");
      secretModal.setAttribute("aria-hidden", "true");
    }
  };

  secretToggle?.addEventListener("click", openSecretModal);
  modalClose?.addEventListener("click", closeSecretModal);
  modalOverlay?.addEventListener("click", closeSecretModal);

  const vaultModal = document.getElementById("vault-modal");
  const vaultOverlay = document.getElementById("vault-overlay");
  const vaultOpen = document.getElementById("vault-open");
  const vaultClose = document.getElementById("vault-close");
  const vaultInput = document.getElementById("vault-input");
  const vaultSave = document.getElementById("vault-save");
  const vaultList = document.getElementById("vault-list");

  const getVaultEntries = () => JSON.parse(localStorage.getItem(VAULT_KEY) || "[]");

  const renderVaultEntries = () => {
    if (!vaultList) {
      return;
    }
    const entries = getVaultEntries();
    if (!entries.length) {
      vaultList.innerHTML = '<p class="muted">Save a love letter to see it here.</p>';
      return;
    }
    vaultList.innerHTML = entries
      .map((entry) => `<div class="vault-letter"><small>${entry.time}</small><p>${entry.text}</p></div>`)
      .join("");
  };

  const saveVaultEntry = () => {
    if (!vaultInput) {
      return;
    }
    const text = vaultInput.value.trim();
    if (!text) {
      return;
    }
    const entries = getVaultEntries();
    entries.unshift({
      text,
      time: new Date().toLocaleString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" })
    });
    if (entries.length > 8) {
      entries.pop();
    }
    localStorage.setItem(VAULT_KEY, JSON.stringify(entries));
    vaultInput.value = "";
    renderVaultEntries();
  };

  const openVaultModal = () => {
    renderVaultEntries();
    if (vaultModal) {
      vaultModal.classList.remove("hidden");
      vaultModal.setAttribute("aria-hidden", "false");
    }
  };
  const closeVaultModal = () => {
    if (vaultModal) {
      vaultModal.classList.add("hidden");
      vaultModal.setAttribute("aria-hidden", "true");
    }
  };

  vaultOpen?.addEventListener("click", openVaultModal);
  vaultSave?.addEventListener("click", saveVaultEntry);
  vaultClose?.addEventListener("click", closeVaultModal);
  vaultOverlay?.addEventListener("click", closeVaultModal);

  const voiceModal = document.getElementById("voice-modal");
  const voiceOverlay = document.getElementById("voice-overlay");
  const voiceOpen = document.getElementById("voice-note-open");
  const voiceClose = document.getElementById("voice-close");
  const voiceInput = document.getElementById("voice-input");
  const voiceSave = document.getElementById("voice-save");
  const voiceList = document.getElementById("voice-list");

  const getVoiceNotes = () => JSON.parse(localStorage.getItem(VOICE_NOTES_KEY) || "[]");

  const renderVoiceNotes = () => {
    if (!voiceList) {
      return;
    }
    const entries = getVoiceNotes();
    if (!entries.length) {
      voiceList.innerHTML = '<p class="muted">Save a voice prompt to keep it close.</p>';
      return;
    }
    voiceList.innerHTML = entries
      .map((entry) => `<div class="vault-letter"><small>${entry.time}</small><p>${entry.text}</p></div>`)
      .join("");
  };

  const saveVoiceNote = () => {
    if (!voiceInput) {
      return;
    }
    const text = voiceInput.value.trim();
    if (!text) {
      return;
    }
    const entries = getVoiceNotes();
    entries.unshift({
      text,
      time: new Date().toLocaleString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" })
    });
    if (entries.length > VOICE_NOTES_LIMIT) {
      entries.pop();
    }
    localStorage.setItem(VOICE_NOTES_KEY, JSON.stringify(entries));
    voiceInput.value = "";
    renderVoiceNotes();
  };

  const openVoiceModal = () => {
    renderVoiceNotes();
    if (voiceModal) {
      voiceModal.classList.remove("hidden");
      voiceModal.setAttribute("aria-hidden", "false");
    }
  };
  const closeVoiceModal = () => {
    if (voiceModal) {
      voiceModal.classList.add("hidden");
      voiceModal.setAttribute("aria-hidden", "true");
    }
  };

  voiceOpen?.addEventListener("click", openVoiceModal);
  voiceSave?.addEventListener("click", saveVoiceNote);
  voiceClose?.addEventListener("click", closeVoiceModal);
  voiceOverlay?.addEventListener("click", closeVoiceModal);

  const musicToggle = document.getElementById("music-toggle");
  const playerPlay = document.getElementById("player-play");
  const trackNameEl = document.getElementById("track-name");
  const trackStatusEl = document.getElementById("track-status");
  const trackProgress = document.getElementById("track-progress");
  const volumeSlider = document.getElementById("volume-slider");

  const music = new Audio();
  let musicAvailable = MUSIC_TRACKS.length > 0;
  let currentTrackIndex = 0;

  const setTrack = (index) => {
    if (!MUSIC_TRACKS.length) {
      musicAvailable = false;
      return;
    }
    currentTrackIndex = index % MUSIC_TRACKS.length;
    const track = MUSIC_TRACKS[currentTrackIndex];
    if (trackNameEl) {
      trackNameEl.textContent = track.title;
    }
    music.src = track.src;
  };

  setTrack(0);
  music.loop = true;

  music.addEventListener("error", () => {
    musicAvailable = false;
    updateMusicUI();
  });

  const updateMusicUI = () => {
    if (!musicToggle) {
      return;
    }
    if (!musicAvailable) {
      musicToggle.textContent = "\u{1F3B5} Music";
      playerPlay && (playerPlay.textContent = "Play music");
      trackStatusEl && (trackStatusEl.textContent = "Unavailable");
      trackProgress && (trackProgress.style.width = "0");
      return;
    }
    musicToggle.textContent = music.paused ? "\u{1F3B5} Music" : "\u{1F3B5} Music (pause)";
    if (playerPlay) {
      playerPlay.textContent = music.paused ? "Play music" : "Pause music";
    }
    if (trackStatusEl) {
      trackStatusEl.textContent = music.paused ? "Paused" : "Playing";
    }
  };

  music.addEventListener("timeupdate", () => {
    if (!trackProgress || !music.duration) {
      return;
    }
    const percent = (music.currentTime / music.duration) * 100;
    trackProgress.style.width = `${percent}%`;
  });

  const setVolume = (value) => {
    music.volume = value;
    if (volumeSlider) {
      volumeSlider.value = value.toString();
    }
  };

  const togglePlayback = async () => {
    if (!musicAvailable) {
      alert("Background music is not available right now, but the love song is still ours.");
      return;
    }
    try {
      if (music.paused) {
        await music.play();
      } else {
        music.pause();
      }
    } catch (error) {
      musicAvailable = false;
      alert("Background music cannot play locally, but the melody lives on in us.");
    }
    updateMusicUI();
  };

  playerPlay?.addEventListener("click", togglePlayback);
  musicToggle?.addEventListener("click", togglePlayback);

  volumeSlider?.addEventListener("input", (event) => {
    const value = parseFloat(event.target.value);
    if (!Number.isNaN(value)) {
      setVolume(value);
    }
  });

  setVolume(0.7);
  updateMusicUI();

  const timelineContainer = document.getElementById("timeline-entries");
  const timelineInput = document.getElementById("timeline-input");
  const timelineAdd = document.getElementById("timeline-add");

  const addTimelineEntry = () => {
    if (!timelineInput) {
      return;
    }
    const text = timelineInput.value.trim();
    if (!text) {
      return;
    }
    const stored = getStoredTimelineEntries();
    stored.unshift({ title: text, created: new Date().toISOString() });
    if (stored.length > 8) {
      stored.pop();
    }
    localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(stored));
    timelineInput.value = "";
    renderTimelineEntries(timelineContainer);
  };

  renderTimelineEntries(timelineContainer);
  timelineAdd?.addEventListener("click", addTimelineEntry);
  timelineInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTimelineEntry();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSecretModal();
      closeVaultModal();
      closeVoiceModal();
    }
  });
});
