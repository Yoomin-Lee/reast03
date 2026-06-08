// ===================================================
// HEADER — scroll behavior, PC nav, Mobile nav
// ===================================================

export function initHeader() {
  const header = document.querySelector('header')
  if (!header) return

  // Scroll: dark → white
  const onScroll = () => {
    if (window.scrollY > 80) {
      header.classList.remove('dark')
      header.classList.add('white')
    } else {
      header.classList.add('dark')
      header.classList.remove('white')
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  initPcNav(header)
  initMoNav(header)
}

function initPcNav(header) {
  const navPc = header.querySelector('nav.pc')
  if (!navPc) return

  const navBar = navPc.querySelector('.nav-bar')
  const menuItems = navBar.querySelectorAll('ul > li')

  menuItems.forEach(li => {
    li.addEventListener('mouseenter', () => navPc.classList.add('open'))
  })
  navPc.addEventListener('mouseleave', () => navPc.classList.remove('open'))
}

function initMoNav(header) {
  const navMo = header.querySelector('nav.mo')
  if (!navMo) return

  const menuBtn = navMo.querySelector('.menu-btn')
  menuBtn?.addEventListener('click', () => {
    navMo.classList.toggle('open')
    header.classList.toggle('open')
    document.body.style.overflow = navMo.classList.contains('open') ? 'hidden' : ''
  })

  // Accordion
  navMo.querySelectorAll('.menu-wrap dl dt button').forEach(btn => {
    btn.addEventListener('click', () => {
      const dl = btn.closest('dl')
      const isOpen = dl.classList.contains('open')
      navMo.querySelectorAll('.menu-wrap dl').forEach(d => d.classList.remove('open'))
      if (!isOpen) dl.classList.add('open')
    })
  })
}

// ===================================================
// SCROLL-TO-TOP
// ===================================================
export function initScrollTop() {
  const stickyEl = document.querySelector('.footer-sticky')
  const btn = document.querySelector('.gototop')
  if (!btn) return

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      stickyEl?.classList.add('visible')
    } else {
      stickyEl?.classList.remove('visible')
    }
  }, { passive: true })

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

// ===================================================
// FAMILY SITE SELECT
// ===================================================
export function initFamilySelect() {
  const sel = document.getElementById('family-site')
  sel?.addEventListener('change', () => {
    const url = sel.value
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      sel.value = ''
    }
  })
}
