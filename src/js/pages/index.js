import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ===================================================
// KV SWIPER
// ===================================================
const SLIDE_DURATION = 5000

export function initKvSwiper() {
  const el = document.querySelector('.kv-swiper')
  if (!el) return

  const timerBar = el.querySelector('.swiper-timer-bar')
  let timerTween = null

  function startTimer(duration) {
    if (timerTween) timerTween.kill()
    gsap.set(timerBar, { width: '0%' })
    timerTween = gsap.to(timerBar, {
      width: '100%',
      duration: duration / 1000,
      ease: 'none',
    })
  }

  const kv = new Swiper('.kv-swiper', {
    modules: [Navigation, Autoplay],
    loop: true,
    speed: 900,
    autoplay: { delay: SLIDE_DURATION, disableOnInteraction: false },
    navigation: {
      prevEl: '.kv-swiper .swiper-button-prev',
      nextEl: '.kv-swiper .swiper-button-next',
    },
    on: {
      init(swiper) { startTimer(SLIDE_DURATION) },
      slideChange() { startTimer(SLIDE_DURATION) },
    },
  })

  return kv
}

// ===================================================
// BUSINESS SWIPER
// ===================================================
export function initBusinessSwiper() {
  const el = document.querySelector('.business-swiper')
  if (!el) return

  return new Swiper('.business-swiper', {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 20,
    speed: 600,
    navigation: {
      prevEl: '.business-swiper .swiper-button-prev',
      nextEl: '.business-swiper .swiper-button-next',
    },
  })
}

// ===================================================
// POPUP SWIPER + LOGIC
// ===================================================
export function initPopup() {
  const wrap = document.querySelector('.popup-wrap')
  if (!wrap) return

  const STORAGE_KEY = 'popup_hidden_until'
  const now = Date.now()
  const hiddenUntil = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
  if (now < hiddenUntil) return

  // Sample popup slides — fill with real data
  const slides = [
    // { img: '/img/popup/popup01.jpg', link: '#' },
  ]
  if (slides.length === 0) return

  const swWrapper = wrap.querySelector('.swiper-wrapper')
  slides.forEach(s => {
    const slide = document.createElement('div')
    slide.className = 'swiper-slide'
    slide.innerHTML = `<a href="${s.link}"><img src="${s.img}" alt=""></a>`
    swWrapper.appendChild(slide)
  })

  wrap.style.display = 'flex'

  if (slides.length > 1) {
    new Swiper('.pop-swiper', {
      modules: [Navigation, Pagination],
      loop: true,
      navigation: {
        prevEl: '.pop-swiper .swiper-button-prev',
        nextEl: '.pop-swiper .swiper-button-next',
      },
      pagination: { el: '.pop-swiper .swiper-pagination', clickable: true },
    })
  }

  wrap.querySelector('.pop-close')?.addEventListener('click', () => {
    wrap.style.display = 'none'
  })

  wrap.querySelector('.nomoretoday')?.addEventListener('click', () => {
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)
    localStorage.setItem(STORAGE_KEY, endOfDay.getTime().toString())
    wrap.style.display = 'none'
  })
}

// ===================================================
// FOUNDING FADE-IN (Intersection Observer)
// ===================================================
export function initFoundingFade() {
  const spans = document.querySelectorAll('.fade01, .fade02, .fade03')
  if (!spans.length) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.2 })

  spans.forEach(span => observer.observe(span))
}

// ===================================================
// GSAP SCROLL ANIMATIONS
// ===================================================
export function initScrollAnimations() {
  // Business head title
  gsap.from('.business-head .title', {
    scrollTrigger: { trigger: '.business', start: 'top 75%' },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power2.out',
  })

  // Sustainable
  gsap.from('.sustainable-wrap .sectit', {
    scrollTrigger: { trigger: '.sustainable', start: 'top 70%' },
    opacity: 0,
    x: -50,
    duration: 0.9,
    ease: 'power2.out',
  })
  gsap.from('.sustainable-wrap .seccnt', {
    scrollTrigger: { trigger: '.sustainable', start: 'top 70%' },
    opacity: 0,
    x: 50,
    duration: 0.9,
    delay: 0.2,
    ease: 'power2.out',
  })

  // Discover items
  gsap.from('.discover-cnt li', {
    scrollTrigger: { trigger: '.discover-cnt', start: 'top 80%' },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  })

  // Relation
  gsap.from('.relation-wrap .sectit', {
    scrollTrigger: { trigger: '.relation', start: 'top 70%' },
    opacity: 0,
    x: -50,
    duration: 0.9,
    ease: 'power2.out',
  })
  gsap.from('.relation-wrap .seccnt', {
    scrollTrigger: { trigger: '.relation', start: 'top 70%' },
    opacity: 0,
    x: 50,
    duration: 0.9,
    delay: 0.2,
    ease: 'power2.out',
  })
}
