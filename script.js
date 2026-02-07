// --- CONFIGURATION ---
const LANG_STORAGE_KEY = "360_lang"
const THEME_STORAGE_KEY = "360_theme"

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

// 1. Language Toggle
function setLanguage(lang) {
	if (lang === "cn") {
		body.classList.remove("lang-en")
		body.classList.add("lang-cn")
		langText.textContent = "CN"

		// Update Nav Links Text
		navLinksItems.forEach((link) => {
			const cnText = link.getAttribute("data-cn")
			if (cnText) link.textContent = cnText
		})
	} else {
		body.classList.remove("lang-cn")
		body.classList.add("lang-en")
		langText.textContent = "EN"

		navLinksItems.forEach((link) => {
			const enText = link.getAttribute("data-en")
			if (enText) link.textContent = enText
		})
	}
	localStorage.setItem(LANG_STORAGE_KEY, lang)
}

function toggleLanguage() {
	const isEnglish = body.classList.contains("lang-en")
	setLanguage(isEnglish ? "cn" : "en")
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
langBtn.addEventListener("click", toggleLanguage)
themeBtn.addEventListener("click", toggleTheme)
window.addEventListener("scroll", handleScroll)
mobileMenuBtn.addEventListener("click", toggleMobileMenu)

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
	// Load Language
	const savedLang = localStorage.getItem(LANG_STORAGE_KEY) || "en"
	setLanguage(savedLang)

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