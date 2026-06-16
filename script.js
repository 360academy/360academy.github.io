// --- CONFIGURATION ---
const LANG_STORAGE_KEY = "360_lang"
const THEME_STORAGE_KEY = "360_theme"
const SUPPORTED_LANGS = ["en", "cn", "ms"]
const LANG_DISPLAY = { en: "EN", cn: "CN", ms: "BM" }

// --- ELEMENTS ---
const body = document.body
const navbar = document.getElementById("navbar")
const langBtn = document.getElementById("lang-btn")
const langText = document.getElementById("lang-text")
const themeBtn = document.getElementById("theme-btn")
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const navLinks = document.querySelector(".nav-links")
const navLinksItems = document.querySelectorAll(".nav-link, .btn-nav")

// --- FUNCTIONS ---

// 1. Language Toggle (now cycles through 3 languages)
function getCurrentLang() {
	if (body.classList.contains("lang-cn")) return "cn"
	if (body.classList.contains("lang-ms")) return "ms"
	return "en"
}

function setLanguage(lang) {
	// Remove all language classes
	body.classList.remove("lang-en", "lang-cn", "lang-ms")
	// Add the target language class
	body.classList.add("lang-" + lang)
	
	// Update the language button text
	langText.textContent = LANG_DISPLAY[lang] || "EN"

	// Update Nav Links Text
	navLinksItems.forEach((link) => {
		const text = link.getAttribute("data-" + lang)
		if (text) link.textContent = text
	})
	
	localStorage.setItem(LANG_STORAGE_KEY, lang)
}

function cycleLanguage() {
	const current = getCurrentLang()
	let nextIndex = (SUPPORTED_LANGS.indexOf(current) + 1) % SUPPORTED_LANGS.length
	const nextLang = SUPPORTED_LANGS[nextIndex]
	setLanguage(nextLang)
}

// 2. Theme Toggle
function setTheme(theme) {
	body.setAttribute("data-theme", theme)
	themeBtn.innerHTML = theme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'
	localStorage.setItem(THEME_STORAGE_KEY, theme)

	// Trigger scroll handler to update header colors immediately if needed
	handleScroll()
}

function toggleTheme() {
	const currentTheme = body.getAttribute("data-theme")
	setTheme(currentTheme === "light" ? "dark" : "light")
}

// 3. Navbar Scroll Effect
function handleScroll() {
	if (window.scrollY > 50) {
		navbar.classList.add("scrolled")
	} else {
		navbar.classList.remove("scrolled")
	}
}

// 4. Mobile Menu
function toggleMobileMenu() {
	navLinks.classList.toggle("active")
	const icon = mobileMenuBtn.querySelector("i")
	if (navLinks.classList.contains("active")) {
		icon.classList.remove("fa-bars")
		icon.classList.add("fa-times")
		// Ensure nav links text color is correct for the dropdown background
		navLinks.style.color = "var(--text-main)"
	} else {
		icon.classList.remove("fa-times")
		icon.classList.add("fa-bars")
	}
}

// Close mobile menu when a link is clicked
navLinksItems.forEach((item) => {
	item.addEventListener("click", () => {
		if (navLinks.classList.contains("active")) toggleMobileMenu()
	})
})

// --- EVENT LISTENERS ---
langBtn.addEventListener("click", cycleLanguage)
themeBtn.addEventListener("click", toggleTheme)
window.addEventListener("scroll", handleScroll)
mobileMenuBtn.addEventListener("click", toggleMobileMenu)

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
	// Load Language
	const savedLang = localStorage.getItem(LANG_STORAGE_KEY)
	if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
		setLanguage(savedLang)
	} else {
		setLanguage("en")
	}

	// Load Theme
	const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
	if (savedTheme) {
		setTheme(savedTheme)
	} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
		setTheme("dark")
	} else {
		setTheme("light")
	}
})