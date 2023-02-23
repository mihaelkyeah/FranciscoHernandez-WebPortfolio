'use strict';

export function studies() {
    let json_object_arr_field = 'studies';
    let pseudo_table_name = '#studies-pseudo_table';
    let img_folder = 'studies/';

    document.querySelector(pseudo_table_name).innerHTML = '';
    renderStudiesWorkTable(json_object_arr_field, img_folder, pseudo_table_name);
}

export function experience() {
    let json_object_arr_field = 'jobs';
    let pseudo_table_name = '#experience-pseudo_table';
    let img_folder = 'experience/';

    document.querySelector(pseudo_table_name).innerHTML = '';
    renderStudiesWorkTable(json_object_arr_field, img_folder, pseudo_table_name);
}

function renderStudiesWorkTable(json_object_arr_field, img_folder, pseudo_table_name) {

    fetch('lang/' + document.documentElement.lang + '.json')
    .then((response) => response.json())
    .then((json) => {
        Array.prototype.forEach.call(json[json_object_arr_field], (study_exp_obj) => {
            // === NEW STUDY/JOB ENTRY ===

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

                // Create list of fields
                let field_list = document.createElement('ul');
                field_list.classList.add('study-work-field_list');

                // Create and append each field
                Object.keys(study_exp_obj).forEach(key => {
                    if(key.toLowerCase() . localeCompare('image') != 0 && key.toLowerCase() . localeCompare('image_link') != 0)
                    field_list.appendChild(createField(json['studies-experience-'+key], study_exp_obj[key]));
                });

                // Append the list of fields to the career info 'cell'
                pseudo_cell.appendChild(field_list);

                // Append the career info 'cell' to the entry 'row'
                pseudo_row.appendChild(pseudo_cell);

            // === COMPLETE APPENDING NEW ENTRY TO PSEUDO TABLE ===
            document.querySelector(pseudo_table_name).appendChild(pseudo_row);
        });
    });

}

function createField(fieldTitle_innerHTML, fieldContent_innerHTML) {

    let field = document.createElement('li');

    let field_title = document.createElement('strong');
    field_title.innerHTML = fieldTitle_innerHTML + ":";

    let field_content = document.createElement('span');
    field_content.classList.add('study-work-field_content');
    field_content.innerHTML = fieldContent_innerHTML;

    let linebreak = document.createElement('br');

    field.appendChild(field_title);
    field.appendChild(linebreak);
    field.appendChild(field_content);

    return field;

}