export function partialRender(html_file, html_element) {

    let response_content = null;
    fetch(html_file)
    .then((response) => response.text())
    .then((html) => {
      response_content = html;
    }).catch((e) => {
      console.log(e);
    });

    if(response_content !== null) {
      html_element.innerHTML = '';
      html_element.innerHTML = response_content;
    }

}

export function partialRender_POST(php_file, html_element, data) {

    // const form = document.getElementById('form')
    // let data = new FormData()
    // data.append('name', form.name.value)
  
    fetch(php_file, {
      method: 'POST',
      body: JSON.stringify(data),
        // Note about the request body:
        // in PHP, use file_get_contents('php://input') to get the request's raw body in case $_POST doesn't contain anything
        // and then json_decode to parse it into a PHP object (not an array)
      mode: 'cors',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/JSON',
        'Access-Control-Allow-Origin': '*'
      }
    })
    
    .then(response => {
      if (!response.ok) {
        error_msg = (response.status < 500) ? 'Bad request' : 'Internal server error';
        throw new Error(error_msg)
      }
      else
        return response.text()
    })
    .then((result) => {
        html_element.innerHTML = '';
        html_element.innerHTML = result;
    })
    .catch(console.error);

  }

export function insertJSONintoHTML(json_file) {

    fetch(json_file)
    .then((response) => response.json())
    .then((json_result) => {
        let json_obj = JSON.parse(JSON.stringify(json_result));
        Object.keys(json_obj).forEach((key) => {
          if(key.localeCompare('file_cv') != 0)
              try { document.getElementById(key).innerHTML = json_obj[key]; } catch(e) { /* console.log(e) */ }
          else
              try { document.getElementById(key).href = json_obj[key]; } catch(e) { /* console.log(e) */ }
      });
    });
    
    
}

export function insertJSONintoHTML_withClass(json_file, target_class) {
    let elements = document.querySelectorAll('.'+target_class);
    Array.prototype.forEach.call(elements, (element) => {
        element.innerHTML = json_file[(element.getAttribute('id'))];
    });
}

/**
 * The functions below were written with the hopes that I could use them separately and
 * not having to build one massive function to do everything that I want it to do in the right
 * order. As I was left with no choice for this virtual portfolio of mine, I ended up
 * writing an auxiliary option that does everything that the functions above already do,
 * except in sequential other within a single promise...
 * 
 * This is probably not good, but it's what works now. Bear with me until I get better at frontend!
 */

// What even is this function naming convention?
export function partialRender_JSONdataSource(html_file, html_element, json_file) {

  fetch(html_file)
  .then((response) => response.text())
  .then((html_res) => {
    html_element.innerHTML = '';
    html_element.innerHTML = html_res;
    fetch(json_file)
    .then((response) => response.json())
    .then((json_res) => {
        let json_obj = JSON.parse(JSON.stringify(json_res));
        Object.keys(json_obj).forEach((key) => {
          if(key.localeCompare('file_cv') != 0)
              try { document.getElementById(key).innerHTML = json[key]; } catch(e) { /* console.log(e) */ }
          else
              try { document.getElementById(key).href = json[key]; } catch(e) { /* console.log(e) */ }
        });
    })
    .catch((e) => { console.log(e) });
  });

}

export function partialRender_JSONdataSource_withClass(html_file, html_element, json_file, target_class) {

  fetch(html_file)
  .then((response) => response.text())
  .then((html_res) => {
    html_element.innerHTML = '';
    html_element.innerHTML = html_res;
    fetch(json_file)
    .then((response) => response.json())
    .then((json_res) => {
        let json_obj = JSON.parse(JSON.stringify(json_res));
        let elements = html_element.querySelectorAll('.target_class');
        Array.prototype.forEach.call(elements, (element) => {
          element.innerHTML = json_obj[element.id];
        })
    });
  })
  .catch((e) => { console.log(e) });

}