'use strict';

import * as AJAXToolbox from './AJAXToolbox.js';
import * as StudyWorkUtil from './StudyWorkUtil.js';
import * as ProjectsUtil from './ProjectsUtil.js';

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

        // Hide all sections but the one named like the button's data-section attribute
        let sections = document.querySelectorAll('.section-tab');
        Array.prototype.forEach.call(sections, (section) => {
            if(button.getAttribute('data-section').toLowerCase() . localeCompare(section.getAttribute('id')) === 0)
                section.removeAttribute('hidden');
            else
                section.setAttribute('hidden', 'true');
        });

        // Fill studies or experience tables accordingly (this was residual from when I used components...)
        switch(button.getAttribute('data-section')) {
            case 'section-studies':
                StudyWorkUtil.studies();
                break;
            case 'section-experience':
                StudyWorkUtil.experience();
                break;
            case 'section-projects':
                ProjectsUtil.listProjects();
                break;
            default:
                console.log('sosoroso (:');
                break;

        }
        

        // Add the highlit class to the corresponding button
        Array.prototype.forEach.call(nav_buttons, (button_j) => {
            if(button !== button_j) {
                if(button_j.classList.contains('highlit'))
                    button_j.classList.remove('highlit');
            } else {
                if(!button_j.classList.contains('highlit'))
                    button_j.classList.add('highlit');
            }
        });
    });
});

function updateLanguage(lang) {
    document.documentElement.lang = lang;
    let lang_file = './lang/' + document.documentElement.lang + '.json';
    AJAXToolbox.insertJSONintoHTML(lang_file);
    
}