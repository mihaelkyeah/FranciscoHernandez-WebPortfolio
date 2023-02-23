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
                
                // CHANGE

                // Add logo 'cell' to entry 'row'
                pseudo_row.appendChild(pseudo_cell);

            // === CAREER/JOB INFO ===

                // Create 'cell' to contain career info
                pseudo_cell = document.createElement('div');
                pseudo_cell.classList.add('info-cell');

        })
    });
}