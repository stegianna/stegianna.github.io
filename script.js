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

observer.observe(document.getElementById('cloud-architectures'));
