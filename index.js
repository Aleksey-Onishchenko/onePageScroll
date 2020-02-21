class OnePageScroll {
  constructor(id) {
    this.scrollPage = document.getElementById(id);
    this.currentPage = 0;
    this.pages = this.scrollPage.children;
    this.pagesLength = this.pages.lenght;
    this.onLockChange = false;

    this.pageWrapper = document.createElement('div');


    // window.goNext = this.goNext.bind(this);
    window.onload = this.addTransformForWrapper();
    window.onresize = OnePageScroll.addResizeEvent;
    this.addFullPageWrapper();

    this.addDots();
    this.addEventsForButton();
    this.addActiveClassForDots();
  }

  static addResizeEvent() {
    window.onresize = window.innerHeight;
    this.addTransformForWrapper();
  }

  addFullPageWrapper() {
    this.scrollPage.append(this.pageWrapper);
    this.pageWrapper.className = 'page_wrapper';
    this.pages = document.querySelectorAll('.page');
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

  goBack() {
    console.log('goBack:', this.currentPage);
    if (this.currentPage === 0) {
      this.currentPage = this.pagesLength - 1;
    } else {
      this.currentPage -= 1;
    }
    this.addTransformForWrapper();
    this.addActiveClassForDots();
  }

  goNext() {
    console.log('goNext:', this.currentPage);
    this.currentPage += 1;
    if (this.currentPage === this.pagesLength - 1) {
      this.pagesLength = 0;
    } else {
      this.pagesLength += 1;
    }
    this.addTransformForWrapper();
    this.addActiveClassForDots();
  }


  goTo(number) {
    this.currentPage = number;
    this.addActiveClassForDots();
  }

  addDots() {
    const pages = this.pageWrapper.children.length;
    const divForDots = document.createElement('div');
    divForDots.className = 'dots';
    this.scrollPage.append(divForDots);
    for (let i = 0; i < pages; i += 1) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      divForDots.append(dot);
    }
    this.dots = divForDots.children;
    this.addEventsForDots();
  }

  addEventsForDots() {

  //  this.goTo();
  }

  addEventsForButton() {
    // this.goNext();
    // this.goBack();
  }

  addActiveClassForDots() {
  
  }



}

const OnePageScrollInstance = new OnePageScroll('one_page_scroll');

window.OnePageScrollInstance = OnePageScrollInstance;
// OnePageScrollInstance.method()
