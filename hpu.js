(function () {
  // Product data map
  const productsMap = {
    "products": {
      "name": "Products",
      "categories": [
        { "name": "MiFires Derwent 5Kw Multi-Fuel Eco Design Stove", "img": "/media/catalog/product/m/i/mifires-derwent-5kw-multifuel-stove-eco-design-stove.jpg", "href": "/mifires-derwent-5kw-multifuel-stove-eco-design-stove", "basePrice": 494.98, "freeItems": true },
        { "name": "MiFires Derwent 5Kw Multi-Fuel Eco Design Stove inc. Flue Pack", "img": "/media/catalog/product/m/i/mifires-derwent-5kw-multi-fuel-stove-inc-flue-pack-550-x-550.jpg", "href": "/mifires-derwent-5kw-multi-fuel-stove-inc-flue-pack", "basePrice": 694.69, "freeItems": true },
        { "name": "Kartell Kompact Type 11 Single Panel Single Convector Radiator", "img": "/media/catalog/product/k/a/kartel-type-11-convector-radiator_1.jpg", "href": "/kartell-kompact-type-11-single-panel-single-convector-radiator", "basePrice": 12.73, "fromPrice": true, "discount": true },
        { "name": "Kartell Kompact Type 21 Double Panel Single Convector Radiator", "img": "/media/catalog/product/k/a/kartell-kompact-type-21-convector-radiator.jpg", "href": "/kartell-kompact-type-21-double-panel-single-convector-radiator", "basePrice": 25.64, "fromPrice": true, "discount": true },
        { "name": "Kartell Kompact Type 22 Double Panel Double Convector Radiator", "img": "/media/catalog/product/k/a/kartell-kompact-type-22-double-panel-double-convector-radiator_1.jpg", "href": "/kartell-type-22-compact-double-panel-double-convector-radiator", "basePrice": 24.04, "fromPrice": true, "discount": true },
        { "name": "Wyndam Anthracite 22mm Straight Towel Warmer", "img": "/media/catalog/product/w/y/wyndam-anthracite-22mm-straight-towel-warmer.jpg", "href": "/wyndam-anthracite-22mm-straight-towel-warmer", "basePrice": 22.68, "fromPrice": true, "discount": true },
        { "name": "Wyndam Black 22mm Straight Towel Warmer", "img": "/media/catalog/product/w/y/wyndam-black-22mm-straight-towel-warmer.jpg", "href": "/wyndam-black-22mm-straight-towel-warmer", "basePrice": 23.87, "fromPrice": true, "discount": true },
        { "name": "Wyndam Chrome 22mm Straight Towel Warmer", "img": "/media/catalog/product/w/y/wyndam-chrome-22mm-straight-towel-warmer-1.jpg", "href": "/wyndam-chrome-22mm-straight-towel-warmer", "basePrice": 28.35, "fromPrice": true, "discount": true },
        { "name": "Worcester Greenstar 1000 24Kw Combi Boiler inc. Worcester Standard Horizontal Flue Kit", "img": "/media/catalog/product/b/8/b8080754-worcester-greenstar-1000-24kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit.jpg", "href": "/worcester-greenstar-1000-24kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit", "basePrice": 680.00, "freeItems": true },
        { "name": "Worcester Greenstar 1000 30Kw Combi Boiler inc. Worcester Standard Horizontal Flue Kit", "img": "/media/catalog/product/b/8/b8080755-worcester-greenstar-1000-30kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit.jpg", "href": "/worcester-greenstar-1000-30kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit", "basePrice": 740.00, "freeItems": true },
        { "name": "Worcester Greenstar 4000 25Kw Combi Boiler inc. Worcester Standard Horizontal Flue Kit", "img": "/media/catalog/product/b/8/b8080756-worcester-greenstar-4000-25kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit.jpg", "href": "/worcester-greenstar-4000-25kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit", "basePrice": 1120.00, "freeItems": true },
        { "name": "Worcester Greenstar 4000 30Kw Combi Boiler inc. Worcester Standard Horizontal Flue Kit", "img": "/media/catalog/product/b/8/b8080757-worcester-greenstar-4000-30kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit.jpg", "href": "/worcester-greenstar-4000-30kw-combi-boiler-inc-worcester-standard-horizontal-flue-kit", "basePrice": 1250.00, "freeItems": true },
        { "name": "Sime 8116690B Giulia 30Kw Combi Boiler with Horizontal Flue & Clock", "img": "/media/catalog/product/b/8/b8080758-sime-8116690b-giulia-30kw-combi-boiler-flue-clock-500ml-wyndam-inhibitor-and-system-cleanser.jpg", "href": "/sime-8116690b-giulia-30kw-combi-boiler-flue-clock-500ml-wyndam-inhibitor-system-cleanser", "basePrice": 624.00, "freeItems": true },
      ]
    }
  };

  // Generic carousel initialization function
  function initializeCarousel({
    containerId,
    cardSelector,
    prevBtnId,
    nextBtnId,
    bottomBtnsSelector,
    skip = 0,
  }) {
    const scrollContainer = document.getElementById(containerId);
    const cards = scrollContainer ? Array.from(scrollContainer.querySelectorAll(cardSelector)) : [];
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const bottomButtonsContainer = document.querySelector(bottomBtnsSelector);
    const bottomButtons = bottomButtonsContainer ? bottomButtonsContainer.querySelectorAll('button') : [];
    const step = Math.max(1, (Number.isFinite(skip) ? Math.floor(skip) : 0) + 1);
    
    function getCurrentIndex() {
      const containerCenter = scrollContainer.scrollLeft + scrollContainer.offsetWidth / 2;
      let closest = 0, minDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < minDist) {
          closest = i;
          minDist = dist;
        }
      });
      return closest;
    }
    
    function snapToCard(idx) {
      if (!cards.length) return;
      let targetIdx = Math.max(0, Math.min(idx, cards.length - 1));
      if (targetIdx == skip) {
        targetIdx = 0;
      }
      const card = cards[targetIdx];
      const targetLeft = card.offsetLeft - (scrollContainer.clientWidth - card.clientWidth) / 2;
      scrollContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
    
    function go(direction) {
      const current = getCurrentIndex();
      snapToCard(current + direction * step);
    }
    
    prevBtn?.addEventListener('click', () => go(-1));
    nextBtn?.addEventListener('click', () => go(1));
    
    if (bottomButtons.length === 2) {
      bottomButtons[0].addEventListener('click', () => go(-1));
      bottomButtons[1].addEventListener('click', () => go(1));
    }
    
    if (containerId === 'BoschScrollContainerNew') {
      window.addEventListener("resize", () => { snapToCard(getCurrentIndex()); });
      document.addEventListener("DOMContentLoaded", () => { snapToCard(getCurrentIndex()); });
    }
  }

  // Trader deals product carousel initialization
  function initializeTraderDealsCarousel() {
    let products = ["products"];
    const carousels = [];
    const prevButtons = [];
    const nextButtons = [];
    const carouselContainers = [];
    const carouselIndexMap = {};

    products = products.filter(material => {
      const exists = productsMap[material] && document.getElementById(`trader-deals-product-carousel`);
      if (!exists) console.warn(`Carousel for ${material} not found or missing in productsMap`);
      return exists;
    });

    products.forEach((material, index) => {
      const section = document.getElementById(`trader-deals-product-carousel`);
      if (!section) return;

      const carousel = section.querySelector('.trader-deals-product-carousel');
      const container = section.querySelector('.trader-deals-product-carousel-container');
      const prevBtnSide = section.querySelector('#TraderDealsPrevBtn');
      const nextBtnSide = section.querySelector('#TraderDealsNextBtn');
      const prevBtnBottom = section.querySelector('.trader-deals-bottom-buttons .prevBtn');
      const nextBtnBottom = section.querySelector('.trader-deals-bottom-buttons .nextBtn');

      if (!carousel || !container) return;

      carousels.push(carousel);
      carouselContainers.push(container);
      carouselIndexMap[material] = 0;

      prevButtons.push({ side: prevBtnSide, bottom: prevBtnBottom });
      nextButtons.push({ side: nextBtnSide, bottom: nextBtnBottom });

      carousel.innerHTML = '';

      const category = productsMap[material];
      const uniqueProducts = category.categories.filter(
        (product, idx, self) => idx === self.findIndex(p => p.href === product.href)
      );

      uniqueProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'trader-deals-product-carousel-item';
        
        const discountHtml = product.discount ? `
          <div class="discount-circle">
            <div class="discount-text discount-header-text">
              <span class="discount">10%</span>
              <span class="off">OFF</span>
            </div>
          </div>
        ` : '';

        const freeItemsHtml = product.freeItems ? `
          <div class="free-items-circle free-items-circle">
            <div class="free-items-text free-items-header-price-text">
              <span class="free-items">FREE<br>ITEMS</span>
            </div>
          </div>
        ` : '';
        
        const fromText = product.fromPrice ? 'From ' : '';
        const priceHtml = `
          <div x-data="{ basePrice: ${product.basePrice} }">
            <p class="mx-auto text-center text-sm">
              ${fromText}Only £<span x-text="(basePrice * ($store.vatSwitch.state ? 1.20 : 1)).toFixed(2)"></span> 
              <span x-text="$store.vatSwitch.state ? 'Inc VAT' : 'Ex VAT'"></span>
            </p>
          </div>
        `;
        
        item.innerHTML = `
<form class="trader-deals-product-carousel-item-content w-full" style="position: relative;">
  ${discountHtml}
  ${freeItemsHtml}
  <img src="${product.img}" alt="${product.name}" title="${product.name}" class="trader-deals-product-carousel-item-image">
  <div class="trader-deals-product-carousel-item-details w-full">
    <div class="flex flex-row items-center gap-4 justify-start" style="padding: 8px; padding-left: 0px; min-height: 50px;">
      <p class="truncate-2-lines text-base font-semibold pb-2 mx-auto text-center w-4/5">
        ${product.name}
      </p>
    </div>
    
    ${priceHtml}

    <div class="pt-2 pb-2 flex z-50 trader-deals-shop-now" style="margin: 0 auto;">
      <a href="${product.href}" class="py-2 w-full trader-deals-shop-now-btn justify-center text-sm rounded uppercase font-bold focus:border-primary focus:outline-none focus:ring-0 mr-auto" aria-label="SHOP NOW">
        <svg class="w-6 h-auto flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 328.8"><path d="M387.61,142.63h-116.59l-27.11-61.22c3.52-3.46,4.83-8.84,2.9-13.69l-21.21-53.51c-5.22-11.89-17.75-17.11-26.2-12.32l-1.1-.44c-10.5-4.17-20.52,1.02-24.69,11.53l-21.21,53.5c-1.9,4.8-.64,10.1,2.77,13.55l-.26,.18-27.57,62.42H12.45c-.26,0-.52,0-.77,.02-6.5,.29-11.68,4.32-11.68,9.19v6.79c0,5.07,5.99,9.49,12.83,9.49h3.52l52.04,148.59c2.54,7.25,9.38,12.11,17.07,12.11h220.59c7.4,0,14.06-4.52,16.8-11.4l59.16-148.73h5.64c.29,0,.58,0,.86-.03,6.45-.39,11.49-5.17,11.49-10.02v-6.79c0-5.05-5.57-9.19-12.39-9.2Zm-122.93,60.13h-55.65v-34.72h61.02l-5.38,34.72Zm-7.75,50.05h-47.9v-32.17h52.88l-4.98,32.17Zm-119.42-32.17h53.04l-.06,32.17h-48.18l-4.81-32.17Zm33.86-132.76l.09-.5c5.78,1.02,11.72-2.13,13.97-7.79l13.92-35.1,14.41,36.34c2.13,5.36,7.57,8.47,13.06,7.91h0s.06,.17,.09,.28c0,.03,.02,.06,.02,.08,0,0,0,.02,0,.02l24.7,53.53h-104.82l24.55-54.76Zm19.28,80.16l-.06,34.72h-55.76l-5.2-34.72h61.01Zm-146.03,0H111.83l5.05,34.72H56.87l-12.25-34.72Zm19.4,52.6h55.46l4.69,32.17h-49.17l-10.98-32.17Zm29.87,84.25l-12.26-34.21h45.13l4.98,34.21h-37.84Zm56.22,0l-5.12-34.21h45.46l-.06,34.21h-40.28Zm58.91,0v-34.21h45.13l-5.3,34.21h-39.83Zm90.13,0h-32.17l5.39-34.21h39.54l-12.76,34.21Zm20.42-52.08h-44.38l5.08-32.17h52.59l-13.28,32.17Zm21.45-50.05h-57.94l5.47-34.72h66.76l-14.29,34.72Z"></path></svg>
        <span class="ml-2 inline text-nowrap">SHOP NOW</span>
      </a>
    </div>
  </div>
</form>`;
        carousel.appendChild(item);
      });

      if (uniqueProducts.length <= 1) {
        if (prevBtnSide) prevBtnSide.classList.add('hidden');
        if (nextBtnSide) nextBtnSide.classList.add('hidden');
        if (prevBtnBottom) prevBtnBottom.classList.add('hidden');
        if (nextBtnBottom) nextBtnBottom.classList.add('hidden');
      }
    });

    function getVisibleItems() {
      if (window.innerWidth <= 350) return 1.1;
      if (window.innerWidth <= 600) return 1.3;
      if (window.innerWidth <= 880) return 2;
      if (window.innerWidth <= 1280) return 3;
      return 4;
    }

    function getMaxIndex(material) {
      const uniqueCount = productsMap[material].categories.filter(
        (product, idx, self) => idx === self.findIndex(p => p.href === product.href)
      ).length;
      return Math.max(uniqueCount - getVisibleItems(), 0);
    }

    function updateCarousel(material) {
      const idx = products.indexOf(material);
      const carousel = carousels[idx];
      if (!carousel) return;

      const items = carousel.querySelectorAll('.trader-deals-product-carousel-item');
      if (!items.length) return;

      const visibleItems = getVisibleItems();
      const maxIndex = getMaxIndex(material);
      
      carouselIndexMap[material] = Math.max(0, Math.min(carouselIndexMap[material], maxIndex));

      const itemWidthPercent = 100 / visibleItems;
      items.forEach(item => {
        item.style.flex = `0 0 ${itemWidthPercent}%`;
        item.style.maxWidth = `${itemWidthPercent}%`;
      });

      const itemWidthPx = items[0].getBoundingClientRect().width;
      const totalWidth = itemWidthPx * items.length;
      const containerWidth = carousel.parentElement.getBoundingClientRect().width;
      const maxTranslate = Math.max(totalWidth - containerWidth, 0);

      let translateX = carouselIndexMap[material] * itemWidthPx;
      translateX = Math.max(0, Math.min(Math.round(translateX), maxTranslate));

      carousel.style.transform = `translateX(-${translateX}px)`;
    }

    function nextProduct(material) {
      const maxIndex = getMaxIndex(material);
      const currentIndex = carouselIndexMap[material];
      
      if (currentIndex < maxIndex) {
        carouselIndexMap[material] = Math.min(currentIndex + 1, maxIndex);
        updateCarousel(material);
      }
    }

    function prevProduct(material) {
      const currentIndex = carouselIndexMap[material];
      
      if (currentIndex > 0) {
        carouselIndexMap[material] = Math.max(currentIndex - 1, 0);
        updateCarousel(material);
      }
    }

    products.forEach((material, index) => {
      const prevBtns = prevButtons[index];
      const nextBtns = nextButtons[index];
      const carouselContainer = carouselContainers[index];

      if (prevBtns.side) prevBtns.side.addEventListener('click', () => prevProduct(material));
      if (nextBtns.side) nextBtns.side.addEventListener('click', () => nextProduct(material));
      if (prevBtns.bottom) prevBtns.bottom.addEventListener('click', () => prevProduct(material));
      if (nextBtns.bottom) nextBtns.bottom.addEventListener('click', () => nextProduct(material));

if (carouselContainer) {
  let touchStartX = 0;
  let touchStartTime = 0;
  let isSwiping = false;
  let hasMoved = false;

  carouselContainer.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartTime = Date.now();
    isSwiping = false;
    hasMoved = false;
  });
  
  carouselContainer.addEventListener('touchmove', e => {
    hasMoved = true;
    
    if (isSwiping) {
      e.preventDefault();
      return;
    }
    
    const touchMoveX = e.touches[0].clientX;
    const swipeDistance = touchStartX - touchMoveX;
    const swipeThreshold = window.innerWidth * 0.25;
    const maxIndex = getMaxIndex(material);
    const currentIndex = carouselIndexMap[material];
    
    if ((swipeDistance > 0 && currentIndex >= maxIndex) || 
        (swipeDistance < 0 && currentIndex <= 0)) {
      e.preventDefault();
      return;
    }
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        if (currentIndex < maxIndex) {
          isSwiping = true;
          e.preventDefault();
          nextProduct(material);
        }
      } else {
        if (currentIndex > 0) {
          isSwiping = true;
          e.preventDefault();
          prevProduct(material);
        }
      }
    }
  }, { passive: false });
  
  carouselContainer.addEventListener('touchend', e => {
    if (!hasMoved) {
      isSwiping = false;
      return;
    }
    
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;
    const swipeTime = Date.now() - touchStartTime;
    const maxIndex = getMaxIndex(material);
    const currentIndex = carouselIndexMap[material];
    
    if (!isSwiping && Math.abs(swipeDistance) > 50 && swipeTime < 300) {
      if (swipeDistance > 0 && currentIndex < maxIndex) {
        nextProduct(material);
      } else if (swipeDistance < 0 && currentIndex > 0) {
        prevProduct(material);
      }
    }
    
    setTimeout(() => {
      const finalIndex = carouselIndexMap[material];
      carouselIndexMap[material] = Math.max(0, Math.min(finalIndex, maxIndex));
      updateCarousel(material);
    }, 100);
    
    isSwiping = false;
    hasMoved = false;
  });
  
  carouselContainer.style.touchAction = 'pan-y pinch-zoom';
}

});

    function updateCarousels() {
      products.forEach(material => updateCarousel(material));
    }

    window.addEventListener('resize', updateCarousels);
    updateCarousels();
  }

  // Initialize all carousels on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize generic carousels
    initializeCarousel({
      containerId: 'CategoryScrollContainer',
      cardSelector: '.inline-block',
      prevBtnId: 'CategoryPrevBtn',
      nextBtnId: 'CategoryNextBtn',
      bottomBtnsSelector: '.category-buttons'
    });

    initializeCarousel({
      containerId: 'BoschScrollContainerNew',
      cardSelector: '.bosch-card-new',
      prevBtnId: 'BoschNewPrevBtn',
      nextBtnId: 'BoschNewNextBtn',
      bottomBtnsSelector: '.bosch-bottom-buttons-new',
      skip: 1,
    });

    initializeCarousel({
      containerId: 'HomePageScrollContainer',
      cardSelector: '.inline-block',
      prevBtnId: 'HomePagePrevBtn',
      nextBtnId: 'HomePageNextBtn',
      bottomBtnsSelector: '.home-page-bottom-buttons'
    });

    // Initialize trader deals carousel
    initializeTraderDealsCarousel();

   // Fade animations
    if (window.innerWidth >= 767) {
      const fadeFromTopItems = document.querySelectorAll(".fade-from-top");
      const fadeTopObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
      );
      fadeFromTopItems.forEach((el) => fadeTopObserver.observe(el));
      
      const fadeFromSideItems = document.querySelectorAll(".fade-from-side");
      const fadeSideObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px -50px 0px 0px" }
      );
      fadeFromSideItems.forEach((el) => fadeSideObserver.observe(el));
    } else {
     
      document.querySelectorAll(".fade-from-top, .fade-from-side").forEach((el) => {
        el.classList.add("visible");
      });
    }
    }); 

  // Category scroll reset on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1430) {
      const container = document.getElementById('CategoryScrollContainer');
      if (container) {
        container.scrollLeft = 0;
        container.scrollTop = 0;
      }
    }
  });
})();
