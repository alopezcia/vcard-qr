
const submitForm  = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData( event.target );
    let obj = {}
    for( let key of formData.keys() ) {
      obj[key]=formData.get(key);
    }
    obj['uuid']=localStorage.getItem("uuid");

    postData('/api/login', obj).then((data) => {
        if( data.status >= 400 ){
          Swal.fire({icon: 'error', title: 'Oops...', text: data.errors[0].msg, footer: 'Login'});
        } else {
          // Swal.fire({
          //   title: `Login enviado`,
          //   showDenyButton: true,
          //   showCancelButton: false,
          //   confirmButtonText: 'Si',
          //   denyButtonText: 'No',
          //   }).then((result) => {
          //       if (result.isConfirmed) {
          //           window.location = "https://www.google.es/";
          //       }
          //   });
          document.querySelector('body').innerHTML = data['html'];
        }
    }).catch( (err) => {
      // Swal.fire({icon: 'error', title: 'Oops...', text: `El campo ${element} es obligatrio`, footer: 'Cumplimentar'});
      console.error( err );
    });
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json",
              },
              redirect: "follow", // manual, *follow, error
              referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const content = response.headers.get("content-type");
    if( content === 'text/html; charset=utf-8' ) {
      const resp = await response.text(); // parses JSON response into native JavaScript objects
      return {status: 200, html: resp };
    } else {
      const resp = await response.json();
// console.log( JSON.stringify(resp) );      
      return resp; 
    }
}


export  { submitForm };