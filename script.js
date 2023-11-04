function callbackFunc(entries, observer) {
    entries.forEach((entry) => {
        let el = document.getElementById(entry.target.id);
        //console.log(el);
        //console.log(entry.isIntersecting);
        if (entry.isIntersecting) {
            el.style.width = entry.target.ariaValueNow + '%';
        }
    });
}

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};

let observer = new IntersectionObserver(callbackFunc, options);

document.querySelectorAll('.skill-bar').forEach((el) => observer.observe(el));

const header = document.getElementById('header');

window.onscroll = () => {
    console.log('scrolled');
    console.log(window.scrollY);
    if (window.scrollY === 0) {
        header.classList.remove('header-scrolled');
    } else {
        header.classList.add('header-scrolled');
    }
};
