class Swiper{
    constructor(option){
        this.container = option.container || document.querySelector('.swiper');
        this.father = this.container.querySelectorAll('.swiper-wrapper')[0];
        this.speed = option.speed || 3000;
        this.autoplay= option.autoplay || false;
        this.photos = this.father.children;
        this.photoWidth = this.photos[0].offsetWidth +
            parseInt(getComputedStyle(this.photos[0]).marginLeft) +
            parseInt(getComputedStyle(this.photos[0]).marginRight);
        this.nextEl = this.container.children[2];
        this.prevEl = this.container.children[1];
        this.cuuent = 1;
        this.filstEl = this.photos[0].cloneNode(true)
        this.lastEl = this.photos[this.photos.length - 1].cloneNode(true)
        this.isResetIndex = false

        this.father.appendChild(this.filstEl);
        this.father.insertBefore(this.lastEl, this.photos[0])

        if(this.autoplay){
            setInterval(this.next.bind(this), this.speed);
        }

        this.father.style.transform = `translate3d(${this.countX()}%, 0, 0)`;
        this.nextEl.addEventListener('click', this.next.bind(this));
        this.prevEl.addEventListener('click', this.prev.bind(this));
    };

    next(e) {
        this.cuuent ++;
        this.moveTo();
    };

    prev(e) {
        this.cuuent --;
        this.moveTo()
    };

    moveTo() {
        const that = this
        if(this.cuuent === 0){
            this.cuuent = this.photos.length - 1;
        }
        if(this.cuuent > 3){
            this.cuuent = 1;
            this.father.style.transform = `translate3d(-80%, 0, 0)`;
            return setTimeout(()=>{
                that.father.style.transition = `transform 0s`;
                that.father.style.transform = `translate3d(${that.countX()}%, 0, 0)`;
            },300)
        }

        this.father.style.transform = `translate3d(${this.countX()}%, 0, 0)`;
        this.father.style.transition = `transform 0.3s`;
        // this.father.style.left = `${-this.countX()}px`;
    };

    countX(){
        return '-' + this.cuuent * 100 / this.photos.length
    };
}