import { initHeader, initScrollTop, initFamilySelect } from './common-ui.js'
import {
  initKvSwiper,
  initBusinessSwiper,
  initPopup,
  initFoundingFade,
  initScrollAnimations,
} from './pages/index.js'

document.addEventListener('DOMContentLoaded', () => {
  initHeader()
  initScrollTop()
  initFamilySelect()
  initKvSwiper()
  initBusinessSwiper()
  initFoundingFade()
  initScrollAnimations()
  initPopup()
})
