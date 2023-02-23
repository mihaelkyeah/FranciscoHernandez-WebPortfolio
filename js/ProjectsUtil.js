'use strict';

export function listProjects() {
    listProjectsFromJSON();
}

function listProjectsFromJSON() {
    fetch('lang/' + document.documentElement.lang + '.json')
    .then((response) => response.json())
    .then((json) => {
        Array.prototype.forEach.call(json['projects'], (project) => {

            // Create 'row'
            let pseudo_row = document.createElement('div');
            pseudo_row.classList.add('entry');

            // === INSTITUTION/WORKPLACE LOGO AND LINK ===

                // Create 'cell' to contain logo and link
                let pseudo_cell = document.createElement('div');
                pseudo_cell.classList.add('logo-cell');

                // Create link to the institution
                let logo_link = document.createElement('a');
                logo_link.href = study_exp_obj.image_link;

                // Create image to contain instution logo
                let logo_img = document.createElement('img');
                logo_img.src = 'img/' + img_folder + study_exp_obj.image;
                logo_img.classList.add('study-exp-logo');

                // Append the image to the link
                logo_link.appendChild(logo_img);

                // Add link with image in it to the 'cell'
                pseudo_cell.appendChild(logo_link);

                // Add logo 'cell' to entry 'row'
                pseudo_row.appendChild(pseudo_cell);

            // === CAREER/JOB INFO ===

                // Create 'cell' to contain career info
                pseudo_cell = document.createElement('div');
                pseudo_cell.classList.add('info-cell');

        })
    });
}