/** Scroll Logic **/

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
    //console.log('scrolled');
    //console.log(window.scrollY);
    if (window.scrollY === 0) {
        header.classList.remove('header-scrolled');
    } else {
        header.classList.add('header-scrolled');
    }
};

/** Interests Logic **/

const interests = document.querySelectorAll(
    '#cinema-nav, #literature-nav, #photography-nav'
);

const interestsContents = document.querySelectorAll(
    '#cinema, #literature, #photography'
);

const mapInterestsNavContent = {
    'cinema-nav': document.getElementById('cinema'),
    'literature-nav': document.getElementById('literature'),
    'photography-nav': document.getElementById('photography'),
};

interests.forEach((el) => {
    el.addEventListener('click', function () {
        let classes = this.classList;
        if (!classes.contains('interests-filter-active')) {
            this.classList.add('interests-filter-active');
            interests.forEach((interest) => {
                if (interest !== this)
                    interest.classList.remove('interests-filter-active');
            });
            let visible_el = [...interestsContents].filter(
                (el) => !el.classList.contains('interest-hidden')
            )[0];
            let requested_el = mapInterestsNavContent[this.id];
            switch (requested_el.id) {
                case 'cinema':
                    backIn(requested_el, 'left');
                    backOut(visible_el, 'right');
                    break;
                case 'literature':
                    if (visible_el.id === 'cinema') {
                        backIn(requested_el, 'right');
                        backOut(visible_el, 'left');
                    } else if (visible_el.id === 'photography') {
                        backIn(requested_el, 'left');
                        backOut(visible_el, 'right');
                    }
                    break;
                case 'photography':
                    backIn(requested_el, 'right');
                    backOut(visible_el, 'left');
            }
            changeInterestVisibility(requested_el, visible_el);
        }
    });
});

function backOut(el, direction) {
    switch (direction) {
        case 'left':
            el.classList.remove('animate__animated', 'animate__backInLeft');
            el.classList.add('animate__animated', 'animate__backOutLeft');
            break;
        case 'right':
            el.classList.remove('animate__animated', 'animate__backInRight');
            el.classList.add('animate__animated', 'animate__backOutRight');
            break;
    }
}

function backIn(el, direction) {
    switch (direction) {
        case 'left':
            el.classList.remove('animate__animated', 'animate__backOutLeft');
            el.classList.add('animate__animated', 'animate__backInLeft');
            break;
        case 'right':
            el.classList.remove('animate__animated', 'animate__backOutRight');
            el.classList.add('animate__animated', 'animate__backInRight');
            break;
    }
}

function changeInterestVisibility(elToShow, elToHide) {
    elToHide.classList.add('interest-hidden');
    elToShow.classList.remove('interest-hidden');
}
