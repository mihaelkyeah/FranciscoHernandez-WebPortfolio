'use strict';

import * as AJAXToolbox from './AJAXToolbox.js';
import * as StudyWorkUtil from './StudyWorkUtil.js';

let lang_splash_buttons = document.querySelectorAll('.lang-splash-btn');
Array.prototype.forEach.call(lang_splash_buttons, (button) => {
    button.addEventListener('click', () => {
        document.querySelector('#lang-splash').remove();
        updateLanguage(button.getAttribute('data-lang'), './components/about.html');
    });
});

let nav_buttons = document.querySelectorAll('.nav-button');
Array.prototype.forEach.call(nav_buttons, (button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        let sections = document.querySelectorAll('.section-tab');
        Array.prototype.forEach.call(sections, (section) => {
            console.log(section);
            if(("section-" + button.getAttribute('data-section').toLowerCase()) . localeCompare(section.getAttribute('id')) === 0)
                section.removeAttribute('hidden');
            else
                section.setAttribute('hidden', 'true');
        });

        if((button.getAttribute('data-section')).toLowerCase() . localeCompare('studies') === 0)
            StudyWorkUtil.studies();
        else if((button.getAttribute('data-section')).toLowerCase() . localeCompare('experience') === 0)
            StudyWorkUtil.experience();
    });
});

function updateLanguage(lang) {
    document.documentElement.lang = lang;
    let lang_file = './lang/' + document.documentElement.lang + '.json';
    AJAXToolbox.insertJSONintoHTML(lang_file);
    
}