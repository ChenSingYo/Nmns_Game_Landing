import imagesLoaded from 'imagesloaded'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

var container, pageInner, head
var winW = window.innerWidth

async function init() {
  container = document.getElementById('page_container')
  head = document.querySelector('header')

  // setTimeout(() => {
  //   document.body.classList.add('loaded')
  // }, 500)

  imagesLoaded(container, { background: true }, function (instance) {
    setTimeout(() => {
      document.body.classList.add('loaded')
      initSwiper()
      initGsap()
      initObserver()
    }, 800)
  })

  //SCROLL控制menu樣式
  let lastScroll = ''
  const GAP = 80
  let threshold = 0
  let headerWrap = document.querySelector('.head_wrap')
  let navopen = document.getElementById('navopen')

  window.addEventListener('scroll', function (e) {
    let scrollY = window.scrollY

    if (scrollY > 400) {
      headerWrap.classList.remove('on_top')
    } else {
      headerWrap.classList.add('on_top')
    }

    const direction = scrollY < lastScroll ? -1 : scrollY > lastScroll ? 1 : 0
    const isNavShow = document.body.classList.contains('show_nav')

    if (direction == 1) {
      if (isNavShow) {
        if (scrollY > GAP) {
          document.body.classList.remove('show_nav')
          threshold = lastScroll + GAP
        }
      } else {
        threshold = lastScroll - GAP
      }
    } else if (direction == -1) {
      if (scrollY <= threshold || scrollY < GAP) {
        if (!isNavShow) {
          document.body.classList.add('show_nav')
          threshold = lastScroll - GAP
        }
      }
    }
    lastScroll = scrollY
  })

  //menu手機版樣式
  let nav = document.getElementById('navopen')
  nav.addEventListener('click', function () {
    if (head.classList.contains('opennav')) {
      head.classList.remove('opennav')
      navopen.classList.add('on_top')
    } else {
      head.classList.add('opennav')
      navopen.classList.remove('on_top')
    }
  })

  let navLiAry = document.querySelectorAll('#logo_ul li')
  navLiAry.forEach((li) => {
    li.addEventListener('click', function () {
      if (head.classList.contains('opennav')) {
        head.classList.remove('opennav')
        navopen.classList.add('on_top')
      } else {
        head.classList.add('opennav')
        navopen.classList.remove('on_top')
      }
    })
  })

  // steps
  const steps = document.querySelectorAll('.step')
  const previewImg = document.querySelector('.preview_img')

  steps.forEach((step) => {
    step.addEventListener('mouseover', function () {
      let stepNum = this.getAttribute('data-num')
      previewImg.style.opacity = '0'
      setTimeout(() => {
        previewImg.style.backgroundImage = `url('https://project.popworld.cc/NMNSLanding/img/step${stepNum}.jpg')`
        previewImg.style.opacity = '1'
        previewImg.style.backgroundPositionY = 0
      }, 200)
    })

    step.addEventListener('mouseout', function () {
      previewImg.style.opacity = '0'
      setTimeout(() => {
        previewImg.style.backgroundImage =
          "url('https://project.popworld.cc/NMNSLanding/img/step0.jpg')"
        previewImg.style.opacity = '1'
        previewImg.style.backgroundPositionY = '0px'
      }, 200)
    })
  })
}

function initSwiper() {
  const steps = [
    {
      num: 1,
      title: '下載阿謎GO',
    },
    {
      num: 2,
      title: '登入',
    },
    {
      num: 3,
      title: '建立隊伍',
    },
    {
      num: 4,
      title: '觀看劇情故事',
    },
    {
      num: 5,
      title: '地點小考驗',
    },
    {
      num: 6,
      title: '了解展品知識',
    },
    {
      num: 7,
      title: '關卡解謎',
    },
    {
      num: 8,
      title: '過關',
    },
  ]

  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, EffectFade],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      preventDefault: true,
    },
    touchStartPreventDefault: true,
    touchMoveStopPropagation: true,
  })

  let title = document.getElementById('slideTitle')
  let num = document.getElementById('slideNum')

  title.innerText = steps[0].title
  num.dataset.num = steps[0].num

  swiper.on('slideChange', function (swiper) {
    title.innerText = steps[swiper.activeIndex].title
    num.dataset.num = steps[swiper.activeIndex].num
  })
}

function initGsap() {
  gsap.registerPlugin(ScrollTrigger)
  let isMobile = winW < 768
  let $el = {
    loaderStone: document.querySelector('.loaderStone'),
    bannerStone: document.querySelector('.bannerStone'),
    bannerLight: document.querySelector('.light'),
    characterAry: document.querySelectorAll('.character'),
    stickerMain: document.querySelector('.sticker_main'),
    stickerMainMobile: document.querySelector('.sticker_main_mobile'),
    cards: document.querySelectorAll('.card'),
    introText: document.querySelector('#story .text_wrap'),
  }

  console.log('cards', $el.cards)
  // sticker main
  if (isMobile) {
    gsap.fromTo(
      $el.stickerMainMobile,
      {
        opacity: 0,
        scale: 1,
      },
      {
        y: '-=60',
        opacity: 1,
        duration: 1,
        ease: 'power1.Out',
        delay: 3.5,
      }
    )
    gsap.set($el.stickerMain, {
      opacity: 0,
    })
  } else {
    gsap.fromTo(
      $el.stickerMain,
      {
        opacity: 0,
      },
      {
        y: '-=10',
        opacity: 1,
        duration: 1.2,
        ease: 'power1.Out',
        delay: 3.5,
      }
    )
  }

  // loaderStone
  gsap.set($el.loaderStone, {
    scale: isMobile ? 0.9 : 1,
    opacity: 0,
    yPercent: 10,
  })
  gsap.to($el.loaderStone, {
    opacity: 1,
    yPercent: 0,
    duration: 1,
    ease: 'power1.inOut',
  })

  // Stone+light
  gsap.set($el.bannerStone, {
    scale: isMobile ? 0.9 : 1,
    filter: 'grayscale(100%)',
  })
  gsap.set($el.bannerLight, {
    scale: isMobile ? 0.9 : 1,
    filter: 'grayscale(100%)',
    opacity: 0,
  })
  gsap.to($el.bannerStone, {
    y: '-=10',
    duration: 2,
    filter: 'grayscale(0%)',
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1,
  })
  gsap.to($el.bannerLight, {
    y: '-=10',
    duration: 2,
    opacity: 1,
    filter: 'grayscale(0%)',
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1,
  })

  //characterAry
  gsap.set($el.characterAry, {
    opacity: 0,
  })
  gsap.to($el.characterAry, {
    y: '-=10',
    opacity: 1,
    duration: 1,
    ease: 'power1.inOut',
    stagger: {
      amount: 0.3,
    },
    delay: 2.5,
  })

  // #intro
  gsap.set('#intro h2, #intro p', {
    y: 50,
    opacity: 0,
  })
  const introTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#intro',
      start: 'center 70%',
      toggleActions: "restart reverse complete reverse"
    },
  })
  introTl.to('#intro h2, #intro p', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
  })

  // #feature
  const featureTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#feature',
      start: '30% bottom',
      end: 'center center',
      scrub: !isMobile,
      toggleActions: 'play none none none',
    },
  })
  featureTl.fromTo(
    $el.cards,
    { opacity: 0, yPercent: 50, pointerEvents: 'none' },
    {
      opacity: 1,
      yPercent: 0,
      duration: isMobile ? 0.5 : 3,
      stagger: isMobile ? 0.3 : 1,
      pointerEvents: 'auto',
    },
    0.5
  )

  // #story
  const storyTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#story',
      start: '20% center',
      markers: false,
      toggleActions: "restart reverse complete reverse"
    },
  })

  gsap.set($el.introText, { opacity: 0, yPercent: 5 })

  storyTl.to($el.introText, {
    opacity: 1,
    yPercent: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.03,
  })
}

function initObserver() {
  const featureSection = document.getElementById('feature')
  const instructionSection = document.getElementById('instruction')
  const downloadSection = document.getElementById('downloads')
  const fixedContent = document.getElementById('fixedContent')

  const stickerAry = {
    instruction: fixedContent.querySelector('.sticker_instruction'),
    featureLeft: fixedContent.querySelector('.sticker_feature_left'),
    featureRight: fixedContent.querySelector('.sticker_feature_right'),
    downloadsLeft: fixedContent.querySelector('.sticker_downloads_left'),
    downloadsRight: fixedContent.querySelector('.sticker_downloads_right'),
  }

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('entry.isIntersecting', entry.target.id)
        switch (entry.target.id) {
          case 'feature':
            console.log('feature.isIntersecting', entry.target.id)
            gsap.fromTo(
              stickerAry.featureLeft,
              { x: -100 },
              {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                x: 0,
              }
            )
            gsap.fromTo(
              stickerAry.featureRight,
              { x: 100 },
              {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                x: 0,
              }
            )
            break
          case 'instruction':
            gsap.fromTo(
              '.sticker_instruction',
              { x: 100 },
              { opacity: 1, duration: 0.5, x: 0 }
            )
            break
          case 'downloads':
            gsap.fromTo(
              '.sticker_downloads_left',
              { x: -100 },
              { opacity: 1, duration: 0.5, x: 0 }
            )
            gsap.fromTo(
              '.sticker_downloads_right',
              { x: 100 },
              { opacity: 1, duration: 0.5, x: 0 }
            )
            break
        }
      } else {
        switch (entry.target.id) {
          case 'feature':
            gsap.to('.sticker_feature_left', {
              opacity: 0,
              duration: 0.5,
              x: -100,
            })
            gsap.to('.sticker_feature_right', {
              opacity: 0,
              duration: 0.5,
              x: 100,
            })
            break
          case 'instruction':
            gsap.to('.sticker_instruction', {
              opacity: 0,
              duration: 0.5,
              x: 100,
            })
            break
          case 'downloads':
            gsap.to('.sticker_downloads_left', {
              opacity: 0,
              duration: 0.5,
              x: -100,
            })
            gsap.to('.sticker_downloads_right', {
              opacity: 0,
              duration: 0.5,
              x: 100,
            })
            break
        }
      }
    })
  }

  // 創建 IntersectionObserver 實例
  const options = {
    threshold: 0.5, // 至少50%的內容在視窗中時觸發
  }
  const observer = new IntersectionObserver(callback, options)

  // 開始觀察
  observer.observe(featureSection)
  observer.observe(instructionSection)
  observer.observe(downloadSection)
}

window.addEventListener('DOMContentLoaded', (event) => {
  init()
})
