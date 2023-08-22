//por alguna razon, en safari no corre el scrip y en google si.

import data from "../data/usuariosRegistrados.json" assert {type: "json"};
//import { findData } from "./fuciones";
// import { linkTo } from "./fuciones";
// linkTo ()


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

    //no logre importar las funcion. deje el archivo de funciones por si podias ver el error
    function findData(criteriosBusqueda) {
        return data.find((registro) => {
            return Object.keys(criteriosBusqueda).every((key) => {
                return registro[key] === criteriosBusqueda[key];
            });
        });
    };

    function linkTo(direccion, tiempo) {
        setTimeout(() => {
            window.location.href = direccion;
        }, tiempo);
    }

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
            linkTo ("./landing.html", 3000)
            
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