/** SCROLL LOGIC **/

function callbackFuncSkill(entries, _observer) {
    entries.forEach((entry) => {
        let el = document.getElementById(entry.target.id);
        //console.log(el);
        //console.log(entry.isIntersecting);
        if (entry.isIntersecting) {
            el.style.width = entry.target.ariaValueNow + '%';
        }
    });
}

let optionsSkill = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};

let observerSkill = new IntersectionObserver(callbackFuncSkill, optionsSkill);

document
    .querySelectorAll('.skill-bar')
    .forEach((el) => observerSkill.observe(el));

/** NAVBAR LOGIC */

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

function callbackFuncSections(entries, _observer) {
    let navbarLinks = document
        .querySelector('#navbar')
        .querySelectorAll('li a');

    entries.forEach((entry) => {
        //console.log(entry.isIntersecting + ': ' + entry.target.id);
        if (entry.isIntersecting) {
            if (entry.target.id === 'hero') {
                navLinkEl = document.getElementById(`nav-link-home`);
            } else {
                navLinkEl = document.getElementById(
                    `nav-link-${entry.target.id}`
                );
            }
            activeNavbarLink(navLinkEl, navbarLinks);
        }
    });
}

let optionsSections = {
    root: null,
    rootMargin: '0px',
    threshold: 0.65,
};

let observerSections = new IntersectionObserver(
    callbackFuncSections,
    optionsSections
);

document
    .querySelectorAll('section')
    .forEach((el) => observerSections.observe(el));

function activeNavbarLink(element, navbarLinks) {
    navbarLinks.forEach((el) => el.classList.remove('active'));
    element.classList.add('active');
}

/** INTERESTS LOGIC **/

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
                    break;
            }
            changeInterestVisibility(requested_el, visible_el);
        }
    });
});

function backOut(el, direction) {
    switch (direction) {
        case 'left':
            removeAnimatedClass(el);
            el.classList.add('animate__animated', 'animate__backOutLeft');
            break;
        case 'right':
            removeAnimatedClass(el);
            el.classList.add('animate__animated', 'animate__backOutRight');
            break;
    }
}

function backIn(el, direction) {
    switch (direction) {
        case 'left':
            removeAnimatedClass(el);
            el.classList.add('animate__animated', 'animate__backInLeft');
            break;
        case 'right':
            removeAnimatedClass(el);
            el.classList.add('animate__animated', 'animate__backInRight');
            break;
    }
}

const animatedclasses = [
    'animate__animated',
    'animate__backOutRight',
    'animate__backInRight',
    'animate__backOutLeft',
    'animate__backInLeft',
];

function removeAnimatedClass(element) {
    element.classList.remove(...animatedclasses);
}

function changeInterestVisibility(elToShow, elToHide) {
    elToHide.classList.add('interest-hidden');
    elToShow.classList.remove('interest-hidden');
}
