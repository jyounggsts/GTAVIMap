import './style.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const RELEASE_DATE = new Date('2026-11-19T00:00:00-05:00')
const HERO_DISMISSED_KEY = 'gtavi-map-hero-dismissed'

const CATEGORIES = [
  {
    title: 'Collectibles',
    items: [
      { icon: '◆', label: 'Hidden Packages' },
      { icon: '★', label: 'Street Art' },
      { icon: '◎', label: 'Photo Ops' },
      { icon: '♦', label: 'Unique Items' },
    ],
  },
  {
    title: 'Activities',
    items: [
      { icon: '▶', label: 'Story Missions' },
      { icon: '◉', label: 'Side Jobs' },
      { icon: '⚡', label: 'Random Events' },
      { icon: '♠', label: 'Heists' },
    ],
  },
  {
    title: 'Locations',
    items: [
      { icon: '🏢', label: 'Businesses' },
      { icon: '🏠', label: 'Safehouses' },
      { icon: '🚔', label: 'Police Stations' },
      { icon: '🏥', label: 'Medical' },
      { icon: '⛽', label: 'Ammu-Nation & Shops' },
    ],
  },
  {
    title: 'World',
    items: [
      { icon: '🌴', label: 'Vice City Districts' },
      { icon: '🏝', label: 'Keys' },
      { icon: '🛣', label: 'Highways & Fast Travel' },
      { icon: '📍', label: 'User Pins' },
    ],
  },
  {
    title: 'Wildlife',
    items: [
      { icon: '🐊', label: 'Animals' },
      { icon: '🐟', label: 'Fishing Spots' },
      { icon: '🦅', label: 'Bird Watching' },
    ],
  },
]

const PLACEHOLDER_MARKERS = [
  { lat: 0.52, lng: 0.54, label: 'Downtown Vice City', type: 'pink' },
  { lat: 0.48, lng: 0.58, label: 'Ocean Beach', type: 'teal' },
  { lat: 0.35, lng: 0.32, label: 'Port Gellhorn', type: 'teal' },
  { lat: 0.42, lng: 0.72, label: 'Ambrosia', type: 'pink' },
  { lat: 0.62, lng: 0.52, label: 'Grassrivers', type: 'teal' },
  { lat: 0.28, lng: 0.78, label: 'Keys', type: 'pink' },
  { lat: 0.38, lng: 0.22, label: 'Mount Kalaga', type: 'teal' },
]

function getTimeRemaining() {
  const now = Date.now()
  const diff = Math.max(0, RELEASE_DATE.getTime() - now)

  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function renderCountdownUnits(time, large = false) {
  const units = [
    { value: time.days, name: 'Days' },
    { value: time.hours, name: 'Hours' },
    { value: time.minutes, name: 'Min' },
    { value: time.seconds, name: 'Sec' },
  ]

  return units
    .map((u, i) => {
      const sep = i < units.length - 1 ? '<span class="countdown-separator">:</span>' : ''
      return `
        <div class="countdown-unit">
          <div class="countdown-value">${pad(u.value)}</div>
          <div class="countdown-name">${u.name}</div>
        </div>${sep}`
    })
    .join('')
}

function renderCategories() {
  return CATEGORIES.map(
    (group) => `
    <div class="category-group">
      <div class="category-header">${group.title}</div>
      <ul class="category-items">
        ${group.items
          .map(
            (item) => `
          <li class="category-item locked" title="Available at launch">
            <span class="category-icon">${item.icon}</span>
            ${item.label}
          </li>`
          )
          .join('')}
      </ul>
    </div>`
  ).join('')
}

function buildApp() {
  const time = getTimeRemaining()

  document.querySelector('#app').innerHTML = `
    <div class="scanlines" aria-hidden="true"></div>

    <div class="hero-overlay ${localStorage.getItem(HERO_DISMISSED_KEY) ? 'hidden' : ''}" id="hero">
      <div class="hero-content">
        <div class="hero-gta">Official Interactive</div>
        <div class="hero-title">GTA <span class="hero-vi">VI</span> MAP</div>
        <p class="hero-tagline">
          The definitive GTA VI interactive map — launching alongside Grand Theft Auto VI.
          Explore Vice City and beyond with collectibles, missions, and secrets mapped for the community.
        </p>
        <div class="hero-countdown countdown-units" id="hero-countdown">
          ${renderCountdownUnits(time, true)}
        </div>
        <button class="btn-primary" id="enter-map">Preview the Map</button>
        <p class="hero-disclaimer">
          Fan project. Not affiliated with Rockstar Games or Take-Two Interactive.
        </p>
      </div>
    </div>

    <header class="site-header">
      <div class="brand">
        <div class="brand-logo">
          <span class="brand-gta">OFFICIAL INTERACTIVE</span>
          <span class="brand-vi">GTA VI MAP</span>
        </div>
      </div>
      <div class="header-actions">
        <div class="status-badge">
          <span class="status-dot"></span>
          Pre-Launch
        </div>
        <button class="btn-ghost" id="show-hero">About</button>
      </div>
    </header>

    <section class="countdown-strip" aria-label="Countdown to launch">
      <span class="countdown-label">Map Goes Live In</span>
      <div class="countdown-units" id="strip-countdown">
        ${renderCountdownUnits(time)}
      </div>
      <div class="countdown-release">
        Grand Theft Auto VI
        <strong>November 19, 2026</strong>
      </div>
    </section>

    <div class="main-layout">
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-title">Categories</div>
          <div class="sidebar-subtitle">Filters unlock at launch</div>
        </div>
        <div class="sidebar-scroll">
          ${renderCategories()}
        </div>
        <div class="sidebar-footer">
          Inspired by community maps like <a href="https://jeanropke.github.io/RDOMap/" target="_blank" rel="noopener">RDO Map</a>.
          Full documentation begins when GTA VI releases.
        </div>
      </aside>

      <div class="map-container">
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle menu">☰ MENU</button>
        <div id="map"></div>
        <div class="map-overlay">
          <div class="map-vignette"></div>
          <div class="map-lock-banner">
            <h2>Map Classified</h2>
            <p>
              You're viewing a preview of the GTA VI interactive map interface.
              Official terrain data, collectibles, and location markers will be added when Grand Theft Auto VI launches.
            </p>
            <span class="tagline">Vice City, USA</span>
          </div>
        </div>
        <div class="map-hud hud-compass" aria-hidden="true"></div>
        <div class="map-hud hud-coords" id="coords">LAT 26.122° N · LON 80.143° W</div>
        <div class="map-hud hud-time" id="clock">--:--</div>
      </div>
    </div>
  `
}

function initCountdown() {
  const stripEl = document.getElementById('strip-countdown')
  const heroEl = document.getElementById('hero-countdown')

  function tick() {
    const time = getTimeRemaining()
    const html = renderCountdownUnits(time)
    if (stripEl) stripEl.innerHTML = html
    if (heroEl) heroEl.innerHTML = html

    if (time.total <= 0) {
      document.querySelector('.countdown-label')?.replaceChildren()
      const label = document.querySelector('.countdown-label')
      if (label) label.textContent = 'GTA VI is here — map update coming soon'
    }
  }

  tick()
  setInterval(tick, 1000)
}

function initClock() {
  const clockEl = document.getElementById('clock')
  if (!clockEl) return

  function tick() {
    const now = new Date()
    clockEl.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  tick()
  setInterval(tick, 1000)
}

function initMap() {
  const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 3,
    zoomControl: true,
    attributionControl: false,
  })

  const bounds = [[0, 0], [1, 1]]
  L.imageOverlay(`${import.meta.env.BASE_URL}assets/leonida-map.svg`, bounds).addTo(map)
  map.fitBounds(bounds)
  map.setMaxBounds([[-0.1, -0.1], [1.1, 1.1]])

  PLACEHOLDER_MARKERS.forEach((m) => {
    const icon = L.divIcon({
      className: '',
      html: `<div class="placeholder-marker ${m.type}"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    })

    const marker = L.marker([m.lat, m.lng], { icon }).addTo(map)
    marker.bindPopup(`
      <div class="popup-title">${m.label}</div>
      <div class="popup-locked">🔒 Unlocks at launch</div>
    `)
  })

  map.on('mousemove', (e) => {
    const lat = (26.0 + e.latlng.lat * 2).toFixed(3)
    const lng = (-80.5 + e.latlng.lng * 2).toFixed(3)
    const coordsEl = document.getElementById('coords')
    if (coordsEl) {
      coordsEl.textContent = `LAT ${lat}° N · LON ${Math.abs(lng)}° W`
    }
  })

  return map
}

function initInteractions() {
  const hero = document.getElementById('hero')
  const enterBtn = document.getElementById('enter-map')
  const aboutBtn = document.getElementById('show-hero')
  const sidebar = document.getElementById('sidebar')
  const sidebarToggle = document.getElementById('sidebar-toggle')

  enterBtn?.addEventListener('click', () => {
    hero?.classList.add('hidden')
    localStorage.setItem(HERO_DISMISSED_KEY, '1')
  })

  aboutBtn?.addEventListener('click', () => {
    hero?.classList.remove('hidden')
  })

  hero?.addEventListener('click', (e) => {
    if (e.target === hero) {
      hero.classList.add('hidden')
      localStorage.setItem(HERO_DISMISSED_KEY, '1')
    }
  })

  sidebarToggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open')
  })

  document.addEventListener('click', (e) => {
    if (
      sidebar?.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      e.target !== sidebarToggle
    ) {
      sidebar.classList.remove('open')
    }
  })
}

buildApp()
initCountdown()
initClock()
initMap()
initInteractions()