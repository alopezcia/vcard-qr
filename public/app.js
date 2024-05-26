
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
          // A.L.E. 24-05-2024 - Ajustar aqui los eventos de la pagina cargada, de otra forma no encuentra los métodos
          document.getElementById('photo-output').addEventListener("dragenter", dragenter );
          document.getElementById('photo-output').addEventListener("dragover", dragover );
          document.getElementById('photo-output').addEventListener("drop", dodrop );
          window.addEventListener('beforeunload', (evt)=>{ 
            evt.returnValue = 'Al recargar la pagina se pierden los valores, ¿seguro?';
          });
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
function dragenter(event){
  event.stopPropagation(); 
  event.preventDefault();
}

function dragover(event){
  event.stopPropagation(); 
  event.preventDefault();
}

function dodrop(event){
  event.stopPropagation(); 
  const items = event.dataTransfer.items;
  if( !items || items.length !== 1 ) return;
  const blob = items[0].getAsFile();
  const URLObj=window.URL || window.webkitURL;
  const source = URLObj.createObjectURL(blob);

	const ctx = document.getElementById('photo-output').getContext("2d");  
  const imagen = new Image();
  imagen.onload = () => {
    const canvas = document.getElementById('photo-output');
    canvas.width = imagen.width;
    canvas.height = imagen.height;
    ctx.clearRect(0, 0 , canvas.width, canvas.height);
    ctx.drawImage(imagen, 0, 0);
  }
  imagen.src = source;
  event.preventDefault();
}


export  { submitForm };