// Application State
const state = {
    isPlaying: false,
    currentTime: 0,
    duration: 1245,
    volume: 100,
    isMuted: false,
    playbackSpeed: 1,
    focusMode: false,
    selectedCategories: [],
    activeTranscriptIndex: 5,
    activeChapterIndex: 2
};

// Data
const transcriptSegments = [
    { time: "0:00", text: "Welcome back to Tech Insights. Today we're diving into the future of web development and exploring the modern tools and techniques that are revolutionizing how we build for the web." },
    { time: "0:15", text: "The web development landscape has changed dramatically over the past few years. We've seen the rise of new frameworks, better tooling, and a renewed focus on performance and user experience." },
    { time: "0:30", text: "In this video, we'll cover everything from the latest JavaScript frameworks to cutting-edge build tools, testing strategies, and deployment practices that will help you stay ahead of the curve." },
    { time: "0:48", text: "Let's start by looking at what's new in the JavaScript ecosystem. React, Vue, and Angular continue to dominate, but new players like Svelte and Solid are gaining significant traction." },
    { time: "2:15", text: "Modern frameworks have evolved to solve specific problems. React excels at building complex UIs with its component model, Vue offers simplicity and flexibility, while Angular provides a complete solution for enterprise applications." },
    { time: "5:00", text: "When it comes to state management, the ecosystem has matured significantly. Redux remains popular, but newer solutions like Zustand, Jotai, and Recoil offer simpler APIs and better performance characteristics." },
    { time: "5:22", text: "State management is crucial for scaling applications. The key is choosing the right tool for your needs - not every app needs Redux's complexity, and sometimes React's built-in state is sufficient." },
    { time: "5:45", text: "We're also seeing a shift toward server-side state management with tools like React Query and SWR, which handle data fetching, caching, and synchronization automatically." },
    { time: "9:18", text: "Performance optimization has become a critical focus. Users expect fast, responsive applications, and frameworks are responding with features like automatic code splitting and lazy loading." },
    { time: "13:05", text: "Build tools have revolutionized the development experience. Vite and esbuild offer lightning-fast builds, while tools like Turbopack promise even better performance for large applications." }
];

const chapters = [
    { time: "0:00", title: "Introduction" },
    { time: "2:15", title: "Modern JavaScript Frameworks" },
    { time: "5:00", title: "State Management Solutions" },
    { time: "9:18", title: "Performance Optimization" },
    { time: "13:05", title: "Build Tools and Bundlers" },
    { time: "16:30", title: "Testing Strategies" },
    { time: "19:45", title: "Deployment and CI/CD" },
    { time: "22:10", title: "Future Trends" }
];

const videos = [
    { id: 1, title: "Advanced TypeScript Patterns for React", channel: "Code Masters", views: "890K views", timestamp: "1 day ago", duration: "18:24", categories: ["Programming", "Web Development", "TypeScript"] },
    { id: 2, title: "Building Scalable APIs with Node.js", channel: "Backend Guru", views: "520K views", timestamp: "3 days ago", duration: "22:15", categories: ["Programming", "Backend", "Node.js"] },
    { id: 3, title: "Top 10 Funny Cat Videos", channel: "Pet Paradise", views: "2.1M views", timestamp: "5 days ago", duration: "10:42", categories: ["Entertainment", "Pets"] },
    { id: 4, title: "CSS Grid vs Flexbox: Complete Guide", channel: "Design Dev", views: "1.2M views", timestamp: "1 week ago", duration: "16:30", categories: ["Programming", "Web Development", "CSS"] },
    { id: 5, title: "Amazing Food Recipes You Must Try", channel: "Cooking Channel", views: "3.5M views", timestamp: "2 weeks ago", duration: "14:20", categories: ["Food", "Lifestyle"] },
    { id: 6, title: "React Server Components Explained", channel: "Tech Insights", views: "650K views", timestamp: "3 days ago", duration: "20:18", categories: ["Programming", "Web Development", "React"] },
    { id: 7, title: "Web Performance Optimization Tips", channel: "Performance Pro", views: "420K views", timestamp: "5 days ago", duration: "15:45", categories: ["Programming", "Web Development", "Performance"] },
    { id: 8, title: "Travel Vlog: Best Destinations 2026", channel: "World Traveler", views: "1.8M views", timestamp: "1 week ago", duration: "25:30", categories: ["Travel", "Lifestyle"] },
    { id: 9, title: "JavaScript Design Patterns", channel: "Code Masters", views: "380K views", timestamp: "2 days ago", duration: "19:12", categories: ["Programming", "JavaScript", "Web Development"] },
    { id: 10, title: "Music Production Tutorial 2026", channel: "Beat Makers", views: "920K views", timestamp: "4 days ago", duration: "28:45", categories: ["Music", "Tutorial"] }
];

const comments = [
    { author: "John Developer", date: "2 days ago", text: "This is exactly what I needed! The explanation of state management solutions was particularly helpful.", likes: 245 },
    { author: "Sarah Designer", date: "1 week ago", text: "Great overview of modern web development tools. Would love to see more content on accessibility best practices!", likes: 128 },
    { author: "Mike Coder", date: "3 days ago", text: "The comparison between different frameworks was very well done. Helped me make a decision for my next project.", likes: 89 }
];

const shortcuts = [
    { key: "Space / K", action: "Play/Pause" },
    { key: "J", action: "Rewind 10 seconds" },
    { key: "L", action: "Forward 10 seconds" },
    { key: "←", action: "Rewind 5 seconds" },
    { key: "→", action: "Forward 5 seconds" },
    { key: "0-9", action: "Seek to 0%-90% of video" },
    { key: "F", action: "Fullscreen" },
    { key: "M", action: "Mute/Unmute" },
    { key: "?", action: "Show keyboard shortcuts" }
];

const currentVideoCategories = ["Programming", "Web Development", "JavaScript"];

// Utility Functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function parseTimestamp(timestamp) {
    const parts = timestamp.split(":").map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
}

function showToast(title, description) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    const content = description
        ? `<div class="toast-title">${title}</div><div class="toast-description">${description}</div>`
        : title;
    toast.innerHTML = content;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Video Player Functions
function togglePlay() {
    state.isPlaying = !state.isPlaying;
    const centerPlayBtn = document.getElementById('centerPlayBtn');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    if (state.isPlaying) {
        centerPlayBtn.classList.add('hidden');
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        startPlayback();
    } else {
        centerPlayBtn.classList.remove('hidden');
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        stopPlayback();
    }
}

let playbackInterval;

function startPlayback() {
    playbackInterval = setInterval(() => {
        if (state.currentTime < state.duration) {
            state.currentTime++;
            updateProgressBar();
            updateTimeDisplay();
        } else {
            state.isPlaying = false;
            togglePlay();
        }
    }, 1000 / state.playbackSpeed);
}

function stopPlayback() {
    if (playbackInterval) clearInterval(playbackInterval);
}

function seekTo(time) {
    state.currentTime = Math.max(0, Math.min(time, state.duration));
    updateProgressBar();
    updateTimeDisplay();
}

function skip(seconds) {
    seekTo(state.currentTime + seconds);
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    progressBar.value = state.currentTime;
    const percentage = (state.currentTime / state.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, #ef4444 0%, #ef4444 ${percentage}%, #3f3f46 ${percentage}%, #3f3f46 100%)`;
}

function updateTimeDisplay() {
    const timeDisplay = document.getElementById('timeDisplay');
    timeDisplay.textContent = `${formatTime(state.currentTime)} / ${formatTime(state.duration)}`;
}

function toggleMute() {
    state.isMuted = !state.isMuted;
    const volumeIcon = document.querySelector('.volume-icon');
    const muteIcon = document.querySelector('.mute-icon');
    if (state.isMuted) {
        volumeIcon.classList.add('hidden');
        muteIcon.classList.remove('hidden');
    } else {
        volumeIcon.classList.remove('hidden');
        muteIcon.classList.add('hidden');
    }
}

function setVolume(value) {
    state.volume = value;
    state.isMuted = value === 0;
    const volumeText = document.getElementById('volumeText');
    volumeText.textContent = `${value}%`;
    const volumeInput = document.getElementById('volumeInput');
    const percentage = value;
    volumeInput.style.background = `linear-gradient(to right, white 0%, white ${percentage}%, #3f3f46 ${percentage}%, #3f3f46 100%)`;
    if (state.isMuted) {
        document.querySelector('.volume-icon').classList.add('hidden');
        document.querySelector('.mute-icon').classList.remove('hidden');
    } else {
        document.querySelector('.volume-icon').classList.remove('hidden');
        document.querySelector('.mute-icon').classList.add('hidden');
    }
}

function setPlaybackSpeed(speed) {
    state.playbackSpeed = speed;
    const speedBtn = document.getElementById('speedBtn');
    speedBtn.textContent = speed === 1 ? '1x' : `${speed}x`;
    document.querySelectorAll('.settings-item[data-speed]').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-speed="${speed}"]`).classList.add('active');
    if (state.isPlaying) {
        stopPlayback();
        startPlayback();
    }
}

// Knowledge Panel Functions
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    document.getElementById(`${tabName}Tab`).classList.remove('hidden');
}

function renderTranscript() {
    const container = document.getElementById('transcriptList');
    container.innerHTML = transcriptSegments.map((segment, index) => `
        <div class="transcript-item ${index === state.activeTranscriptIndex ? 'active' : ''}" data-index="${index}">
            <div class="transcript-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                ${segment.time}
            </div>
            <p class="transcript-text">${segment.text}</p>
        </div>
    `).join('');
    container.querySelectorAll('.transcript-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            state.activeTranscriptIndex = index;
            seekTo(parseTimestamp(transcriptSegments[index].time));
            renderTranscript();
        });
    });
}

function renderChapters() {
    const container = document.getElementById('chaptersList');
    container.innerHTML = chapters.map((chapter, index) => `
        <button class="chapter-item ${index === state.activeChapterIndex ? 'active' : ''}" data-index="${index}">
            <div class="chapter-thumbnail">
                ${index === state.activeChapterIndex ? `
                    <div class="chapter-play-overlay">
                        <div class="chapter-play-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </div>
                    </div>
                ` : ''}
                <div class="chapter-time-badge">${chapter.time}</div>
            </div>
            <div class="chapter-info">
                <div class="chapter-title">${chapter.title}</div>
            </div>
        </button>
    `).join('');
    container.querySelectorAll('.chapter-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            state.activeChapterIndex = index;
            seekTo(parseTimestamp(chapters[index].time));
            renderChapters();
        });
    });
}

// Recommended Videos Functions
function getFilteredVideos() {
    let filtered = videos;
    if (state.focusMode) {
        filtered = videos.filter(video =>
            video.categories.some(cat => currentVideoCategories.includes(cat))
        );
    }
    if (state.selectedCategories.length > 0) {
        filtered = filtered.filter(video =>
            state.selectedCategories.every(cat => video.categories.includes(cat))
        );
    }
    return filtered;
}

function renderRecommendedVideos() {
    const container = document.getElementById('recommendedVideos');
    const filtered = getFilteredVideos();
    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="background: #27272a; border-radius: 8px; padding: 32px; text-align: center;">
                <p style="color: #a1a1aa; font-size: 14px;">No videos match your current filters</p>
                <button onclick="clearFilters()" style="margin-top: 12px; background: transparent; border: none; color: #3b82f6; font-size: 14px; cursor: pointer;">Clear filters</button>
            </div>
        `;
        return;
    }
    container.innerHTML = filtered.map(video => `
        <div class="video-card">
            <div class="video-thumbnail">
                <div class="video-duration">${video.duration}</div>
            </div>
            <div class="video-details">
                <h4 class="video-card-title">${video.title}</h4>
                <p class="video-channel">${video.channel}</p>
                <div class="video-meta-info">
                    <span>${video.views}</span>
                    <span>•</span>
                    <span>${video.timestamp}</span>
                </div>
                ${state.focusMode ? `
                    <div class="video-tags">
                        ${video.categories.slice(0, 2).map(cat => `<span class="video-tag">${cat}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function toggleFocusMode() {
    state.focusMode = !state.focusMode;
    const focusModeBtn = document.getElementById('focusModeBtn');
    const categoryFilters = document.getElementById('categoryFilters');
    if (state.focusMode) {
        focusModeBtn.classList.add('active');
        categoryFilters.classList.remove('hidden');
        renderCategoryFilters();
    } else {
        focusModeBtn.classList.remove('active');
        categoryFilters.classList.add('hidden');
        state.selectedCategories = [];
    }
    renderRecommendedVideos();
}

function renderCategoryFilters() {
    const filtered = getFilteredVideos();
    const categories = [...new Set(filtered.flatMap(v => v.categories))].sort();
    const container = document.getElementById('filterTags');
    container.innerHTML = categories.map(cat => `
        <button class="filter-tag ${state.selectedCategories.includes(cat) ? 'active' : ''}" data-category="${cat}">
            ${cat}
        </button>
    `).join('');
    container.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const category = tag.dataset.category;
            toggleCategory(category);
        });
    });
}

function toggleCategory(category) {
    const index = state.selectedCategories.indexOf(category);
    if (index > -1) {
        state.selectedCategories.splice(index, 1);
    } else {
        state.selectedCategories.push(category);
    }
    const clearBtn = document.getElementById('clearFilters');
    if (state.selectedCategories.length > 0) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }
    renderCategoryFilters();
    renderRecommendedVideos();
}

function clearFilters() {
    state.selectedCategories = [];
    document.getElementById('clearFilters').classList.add('hidden');
    renderCategoryFilters();
    renderRecommendedVideos();
}

// Comments Functions
function renderComments() {
    const container = document.getElementById('commentsList');
    container.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-avatar"></div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
                <div class="comment-actions">
                    <button class="comment-action">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        ${comment.likes}
                    </button>
                    <button class="comment-action">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                        </svg>
                    </button>
                    <button class="comment-action">Reply</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Shortcuts Modal Functions
function renderShortcuts() {
    const container = document.getElementById('shortcutsList');
    container.innerHTML = shortcuts.map(shortcut => `
        <div class="shortcut-item">
            <span class="shortcut-action">${shortcut.action}</span>
            <kbd>${shortcut.key}</kbd>
        </div>
    `).join('');
}

function toggleShortcutsModal() {
    const modal = document.getElementById('shortcutsModal');
    modal.classList.toggle('hidden');
}

// Keyboard Shortcuts
function handleKeyPress(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
            e.preventDefault();
            togglePlay();
            break;
        case 'j':
            e.preventDefault();
            skip(-10);
            break;
        case 'l':
            e.preventDefault();
            skip(10);
            break;
        case 'arrowleft':
            e.preventDefault();
            skip(-5);
            break;
        case 'arrowright':
            e.preventDefault();
            skip(5);
            break;
        case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
        case 'm':
            e.preventDefault();
            toggleMute();
            break;
        case '?':
            e.preventDefault();
            toggleShortcutsModal();
            break;
        default:
            if (e.key >= '0' && e.key <= '9') {
                e.preventDefault();
                const percent = parseInt(e.key) * 10;
                seekTo(Math.floor((state.duration * percent) / 100));
            }
            break;
    }
}

function toggleFullscreen() {
    const player = document.getElementById('videoPlayer');
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.fullscreenEnabled) {
        player.requestFullscreen();
    }
}

// Save Button
function handleSaveClick() {
    const saveBtn = document.getElementById('saveBtn');
    const saveBtnText = document.getElementById('saveBtnText');
    if (saveBtn.classList.contains('saved')) {
        saveBtn.classList.remove('saved');
        saveBtnText.textContent = 'Save';
        showToast('Removed from playlist');
    } else {
        saveBtn.classList.add('saved');
        saveBtnText.textContent = 'Saved (1)';
        showToast('Saved to Web Development', 'Video added to playlist');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('centerPlayBtn').addEventListener('click', togglePlay);
    document.getElementById('playPauseBtn').addEventListener('click', togglePlay);
    document.getElementById('skipBackBtn').addEventListener('click', () => skip(-10));
    document.getElementById('skipForwardBtn').addEventListener('click', () => skip(10));
    document.getElementById('muteBtn').addEventListener('click', toggleMute);
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);

    const progressBar = document.getElementById('progressBar');
    progressBar.max = state.duration;
    progressBar.addEventListener('input', (e) => seekTo(parseInt(e.target.value)));

    const volumeInput = document.getElementById('volumeInput');
    volumeInput.addEventListener('input', (e) => setVolume(parseInt(e.target.value)));

    const muteBtn = document.getElementById('muteBtn');
    muteBtn.addEventListener('mouseenter', () => {
        document.getElementById('volumeSlider').classList.add('show');
    });
    muteBtn.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!document.getElementById('volumeSlider').matches(':hover')) {
                document.getElementById('volumeSlider').classList.remove('show');
            }
        }, 500);
    });

    document.getElementById('volumeSlider').addEventListener('mouseleave', () => {
        setTimeout(() => document.getElementById('volumeSlider').classList.remove('show'), 500);
    });

    const speedBtn = document.getElementById('speedBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    speedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsMenu.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
        if (!speedBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
            settingsMenu.classList.remove('show');
        }
    });

    document.querySelectorAll('.settings-item[data-speed]').forEach(item => {
        item.addEventListener('click', () => {
            setPlaybackSpeed(parseFloat(item.dataset.speed));
            settingsMenu.classList.remove('show');
        });
    });

    const videoPlayer = document.getElementById('videoPlayer');
    const videoControls = document.getElementById('videoControls');
    let controlsTimeout;
    videoPlayer.addEventListener('mousemove', () => {
        videoControls.classList.remove('hidden');
        clearTimeout(controlsTimeout);
        if (state.isPlaying) {
            controlsTimeout = setTimeout(() => videoControls.classList.add('hidden'), 3000);
        }
    });
    videoPlayer.addEventListener('mouseleave', () => {
        if (state.isPlaying) videoControls.classList.add('hidden');
    });

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    document.getElementById('focusModeBtn').addEventListener('click', toggleFocusMode);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    document.getElementById('saveBtn').addEventListener('click', handleSaveClick);
    document.getElementById('keyboardBtn').addEventListener('click', toggleShortcutsModal);
    document.getElementById('closeShortcutsBtn').addEventListener('click', toggleShortcutsModal);
    document.getElementById('shortcutsModal').addEventListener('click', (e) => {
        if (e.target.id === 'shortcutsModal') toggleShortcutsModal();
    });

    document.addEventListener('keydown', handleKeyPress);

    updateProgressBar();
    updateTimeDisplay();
    setVolume(100);
    renderTranscript();
    renderChapters();
    renderRecommendedVideos();
    renderComments();
    renderShortcuts();
});
