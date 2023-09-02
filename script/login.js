import data from "../server/data/doctorsRegister.json" assert {type: "json"};
import { findData } from './fuciones.js';
import { linkTo } from './fuciones.js';


document.addEventListener("DOMContentLoaded", function () {
    const userLocalStorage = JSON.parse(localStorage.getItem ("usuario"))
    const loginFormG = document.querySelector ("#main__login__form");
    const input = document.querySelectorAll ("input");
    const userLogin = {
        email: '',
        password: '',
    };

    if (userLocalStorage) {
        Swal.fire({
            title: `<h1 class= "login_alert">¡Bienvenido Dr. ${userLocalStorage.apellido}!</h1>`,
            timer: 2000,
            showConfirmButton: false,
            background: 'linear-gradient(#d9e1e6, #6e99b3)',
            color: 'white'
          }),
        linkTo ("./landing.html", 1000)
    }

    input.forEach((elemento)=>{
        elemento.addEventListener("input", ({target})=> {
            const {value, name} = target;
            userLogin[name] = value
        })
    })


    loginFormG.addEventListener("submit", (event) => {
        event.preventDefault();
        const userfindG = findData(userLogin);
        if (userfindG !== undefined) {
            Swal.fire({
              title: `<h1 class= "login_alert">¡Bienvenido Dr. ${userfindG.apellido}!</h1>`,
              timer: 2000,
              showConfirmButton: false,
              background: 'linear-gradient(#d9e1e6, #6e99b3)',
              color: 'white'
            })
            localStorage.setItem("usuario", JSON.stringify(userfindG));
            linkTo ("./landing.html", 2000)
            
        } else {
            Swal.fire({
                title: `<h1 class= "login_alert">Usuario no registrado</h1>`,
                timer: 2000,
                showConfirmButton: false,
                background: 'linear-gradient(#d9e1e6, #6e99b3)',
                color: 'white'
              })
        }
    });

    

})