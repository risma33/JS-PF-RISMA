//por alguna razon, en safari no corre el scrip y en google si.

import data from "../data/usuariosRegistrados.json" assert {type: "json"};
//import { findData } from "./fuciones";
// import { linkTo } from "./fuciones";
// linkTo ()


document.addEventListener("DOMContentLoaded", function () {
    const userLocalStorage = JSON.parse(localStorage.getItem ("usuario"))
    const loginFormG = document.querySelector ("#main__login__form");
    const input = document.querySelectorAll ("input");
    const bienvenidaUsuarioRegistrado = nombre => {
        loginFormG.innerHTML = `<h1 class='main__login--bienvendia'> Bienvenido ${nombre}</h1>`
    };
    const UsuarioNoRegistrado = () => {
        loginFormG.innerHTML = `<h1 class='main__login-notregister'> No estas Registrado</h1>`
    };
    const userLogin = {
        email: '',
        password: '',
    };

    userLocalStorage && bienvenidaUsuarioRegistrado(userLocalStorage.nombre);

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

    function linkTo(direccion) {
        setTimeout(() => {
            window.location.href = direccion;
        }, 3000);
    }

    loginFormG.addEventListener("submit", (event) => {
        event.preventDefault();
        const userfindG = findData(userLogin);
        if (userfindG !== undefined) {
            bienvenidaUsuarioRegistrado(userfindG.nombre);
            localStorage.setItem("usuario", JSON.stringify(userfindG));
            linkTo ("./landing.html")
            
        } else {
            UsuarioNoRegistrado();
            console.log("usuario incorrecto");
        }
    });
})