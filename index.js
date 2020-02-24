class OnePageScroll {
  constructor(id) {
    this.scrollPage = document.getElementById(id);
    this.currentPage = 0;
    this.pages = this.scrollPage.children;
    this.pagesLength = this.pages.lenght;
    this.onLockChange = false;
    this.transitionTime = 1000;

    this.pageWrapper = document.createElement('div');
    this.pages = document.querySelectorAll('.page');

    // window.onload = this.addTransformForWrapper();
    // window.onresize = OnePageScroll.addResizeEvent;
    // window.onload = OnePageScroll.addResizeEvent;

    this.addFullPageWrapper();

    this.addDots();
    this.addEventsForScroll();
    this.addEventsForButton();
    this.addActiveClassForDots();
  }

  addHeightForPages() {
    for (let i = 0; i < this.pages.length; i += 1) {
      this.pages[i].style.height = `${window.innerHeight}px`;
    }
  }

  addResizeEvent() {
    window.addEventListener('resize', this.addHeightForPages());
  }

  addFullPageWrapper() {
    this.scrollPage.prepend(this.pageWrapper);
    this.pageWrapper.className = 'page_wrapper';
    const pagesArray = Array.from(this.pages);
    pagesArray.forEach((page) => this.pageWrapper.append(page));
    /* this.pageWrapper.append(this.pages); */
    this.addHeightForPages();
  }

  addTransformForWrapper() {
    this.pageWrapper.style.transform = `translateY(${-window.innerHeight * this.currentPage}px)`;
    this.pageWrapper.style.transition = `all ${this.transitionTime}ms ease 0s`;
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
    this.addTransformForWrapper();
  }

  addDots() {
    // console.log('pages1', this.pages.length);
    this.pages = this.pageWrapper.children.length;
    // console.log('pages2', this.pages);
    const divForDots = document.createElement('div');
    divForDots.className = 'dots';
    this.scrollPage.append(divForDots);
    for (let i = 0; i < this.pages; i += 1) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      divForDots.append(dot);
    }
    this.dots = divForDots.children;
    this.addEventsForDots();
  }

  addEventsForDots() {
    for (let i = 0; i < this.pages; i += 1) {
      this.dots[i].addEventListener('click', this.goTo.bind(this, i));
    }
  }

  lockFastScroll() {
    this.onLockChange = true;
    setTimeout(() => {
      this.onLockChange = false;
    }, this.transitionTime);
  }

  keyAssignment(event) {
    if (!this.onLockChange) {
      if (event.keyCode === 40) {
        this.goNext();
        this.lockFastScroll();
      }
      if (event.keyCode === 38) {
        this.goBack();
        this.lockFastScroll();
      }
    }
  }

  scrollAssignment(event) {
    if (!this.onLockChange) {
      if (event.deltaY > 0) {
        this.goNext();
        this.lockFastScroll();
      } else {
        this.goBack();
        this.lockFastScroll();
      }
    }
  }

  addEventsForButton() {
    document.addEventListener('keydown', this.keyAssignment.bind(this));
  }

  addEventsForScroll() {
    document.addEventListener('wheel', this.scrollAssignment.bind(this));
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
