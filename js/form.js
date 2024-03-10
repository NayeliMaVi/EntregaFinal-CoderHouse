(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

let usuarioGuardado = localStorage.getItem('usuarioActual')
let user = JSON.parse(usuarioGuardado);
console.log(user);
let precio =  document.getElementById("precioFinal")

precio.innerText = user.carroCompras.precioTotal



let boton = document.getElementById("submit-btn")
let form = document.getElementById("form-pag")
boton.addEventListener("click", function(event){
    if(form.checkValidity()){ event.preventDefault()
       
        user.carroCompras.productos = 0
        user.carroCompras.precioTotal = 0
        localStorage.setItem('usuarioActual', JSON.stringify(user));
        
        let timerInterval;
        Swal.fire({
            icon: "success",
          title: "La compra fue un exito!",
          html: "El código estará llegandote en unas horas al correo registrado. Regresarás al menu principal en <b></b> milliseconds.",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
          setTimeout(function() {
            window.location.href = "index.html"}, 3000)
    }
    
})