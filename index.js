class OnePageScroll {
  constructor(id) {
    this.scrollPage = document.getElementById(id);
    this.currentPage = 0;
    this.pages = this.scrollPage.children;
    this.pagesLength = this.pages.length;
    this.onLockChange = false;


    this.addFullPageWrapper();

    this.addDots();
    this.addEventsForScroll();
    this.addEventsForButton();
    this.addActiveClassForDots();
    this.addEventsForWrapper();
    this.addResizeEvent();
  }

  addHeightForPages() {
    this.pages = document.querySelectorAll('.page');
    for (let i = 0; i < this.pagesLength; i += 1) {
      this.pages[i].style.height = `${window.innerHeight}px`;
    }
  }

  addResizeEvent() {
    window.addEventListener('resize', () => {
      this.addTransformForWrapper();
      this.addHeightForPages();
    });
  }

  addFullPageWrapper() {
    this.pageWrapper = document.createElement('div');
    this.pageWrapper.append(...this.scrollPage.children);
    this.scrollPage.prepend(this.pageWrapper);
    this.pageWrapper.className = 'page_wrapper';

    this.addHeightForPages();
  }

  addTransformForWrapper() {
    this.pageWrapper.style.transform = `translate3d(0px, ${-window.innerHeight * this.currentPage}px, 0px)`;
  }

  goNext() {
    
      if (this.currentPage !== this.pagesLength - 1 && !this.onLockChange) { // если текущая страница === длинне страниц (последняя)
        this.onLockChange = true;
        this.currentPage += 1;
      } else if (!this.onLockChange) {
        this.currentPage = this.pagesLength - 1;
      }
    this.addTransformForWrapper();
    this.addActiveClassForDots();
  }

  goBack() {
    if (this.currentPage !== 0 && !this.onLockChange) {
      this.onLockChange = true;
      this.currentPage -= 1;
    } else if (!this.onLockChange) {
      this.currentPage = 0;
    }
    this.addTransformForWrapper();
    this.addActiveClassForDots();
  }

  goTo(number) {
    console.log(this.onLockChange);
    if (this.currentPage !== undefined && !this.onLockChange) {
      this.onLockChange = true;
      this.currentPage = number;
      // this.onLockChange = true;
    } else {
      // this.onLockChange = false;
      return false;
    }
    this.addActiveClassForDots();
    this.addTransformForWrapper();
    this.addEventsForWrapper();
    return null;
  }

  addDots() {
    const divForDots = document.createElement('div');
    divForDots.className = 'dots';
    this.scrollPage.append(divForDots);
    for (let i = 0; i < this.pagesLength; i += 1) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      divForDots.append(dot);
    }
    this.dots = divForDots.children;
    this.addEventsForDots();
  }

  addEventsForDots() {
    for (let i = 0; i < this.pagesLength; i += 1) {
      this.dots[i].addEventListener('click', this.goTo.bind(this, i));
    }
  }

  addEventsForWrapper() {
    this.pageWrapper.addEventListener('transitionend', () => { this.onLockChange = false; });
  }

  keyAssignment(event) {
    if (event.keyCode === 40) {
      this.goNext();
    }
    if (event.keyCode === 38) {
      this.goBack();
    }
  }

  scrollAssignment(event) {
    if (event.deltaY > 0) {
      this.goNext();
    } else {
      this.goBack();
    }
  }

  addEventsForButton() {
    document.addEventListener('keydown', this.keyAssignment.bind(this));
  }

  addEventsForScroll() {
    document.addEventListener('wheel', this.scrollAssignment.bind(this));
  }

  addActiveClassForDots() {
    for (let i = 0; i < this.pagesLength; i += 1) {
      this.dots[i].classList.remove('active');
    }
    this.dots[this.currentPage].classList.add('active');
  }
}

const OnePageScrollInstance = new OnePageScroll('one_page_scroll');

window.OnePageScrollInstance = OnePageScrollInstance;
