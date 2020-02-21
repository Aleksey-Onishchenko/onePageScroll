class OnePageScroll {
  constructor(id) {
    this.scrollPage = document.getElementById(id);
    this.currentPage = 0;
    this.pages = this.scrollPage.children;
    this.pagesLength = this.pages.lenght;
    this.onLockChange = false;

    this.pageWrapper = document.createElement('div');
    this.pages = document.querySelectorAll('.page');

    window.goBack = this.goBack.bind(this);
    window.goNext = this.goNext.bind(this);
    window.onload = this.addTransformForWrapper();
    window.onresize = OnePageScroll.addResizeEvent;
    this.addFullPageWrapper();

    this.addDots();
    OnePageScroll.addEventsForButton();
    this.addActiveClassForDots();
  }

  static addResizeEvent() {
    window.onresize = window.innerHeight;
    this.addTransformForWrapper();
  }

  addFullPageWrapper() {
    this.scrollPage.append(this.pageWrapper);
    this.pageWrapper.className = 'page_wrapper';
    // this.pages = document.querySelectorAll('.page');
    // console.log('pages:', this.pages.length);
    const pagesArray = Array.from(this.pages);
    pagesArray.forEach((page) => this.pageWrapper.append(page));
    this.addHeightForPages();
    this.addTransformForWrapper();
  }

  addHeightForPages() {
    for (let i = 0; i < this.pages.length; i += 1) {
      this.pages[i].style.height = `${window.innerHeight}px`;
    }
  }

  addTransformForWrapper() {
    this.pageWrapper.style.transform = `translateY(${-window.innerHeight * this.currentPage}px)`;
  }

  goNext() {
    if (this.currentPage === this.pages - 1) {
      this.currentPage = this.pages - 1;
    } else {
      this.currentPage += 1;
    }
    this.addTransformForWrapper();
    this.addActiveClassForDots();
  }

  goBack() {
    if (this.currentPage === 0) {
      this.currentPage = 0;
    } else {
      this.currentPage -= 1;
    }
    this.addTransformForWrapper();
    this.addActiveClassForDots();
  }


  goTo(number) {
    this.currentPage = number;
    this.addActiveClassForDots();
  }

  addDots() {
    this.pages = this.pageWrapper.children.length;
    const divForDots = document.createElement('div');
    divForDots.className = 'dots';
    this.scrollPage.append(divForDots);
    for (let i = 0; i < this.pages; i += 1) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      divForDots.append(dot);
    }
    this.dots = divForDots.children;
    // this.addEventsForDots();
  }

  addEventsForDots() {
    for (let i = 0; i < this.pages; i += 1) {
      this.dots[i].addEventListener('click', this.goTo.bind(this, i));
    }
  }

  static addEventsForButton() {
    document.onkeydown = function (event) {
      if (event.keyCode === 40) {
        // this.goNext();
        console.log('go bottom');
      }
      if (event.keyCode === 38) {
        // this.goBack.bind(this);
        console.log('go top');
      }
    };

    document.onwheel = function (event) {
      if (event.deltaY > 0) {
        console.log('Вниз');
      } else {
        console.log('Вверх');
      }
    };
  }

  addActiveClassForDots() {
    for (let i = 0; i < this.pages; i += 1) {
      this.dots[i].classList.remove('active');
    }
    this.dots[this.currentPage].classList.add('active');
  }



}

const OnePageScrollInstance = new OnePageScroll('one_page_scroll');

window.OnePageScrollInstance = OnePageScrollInstance;
// OnePageScrollInstance.method()
