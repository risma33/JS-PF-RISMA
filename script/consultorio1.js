import data from "../server/data/doctorsRegister.json" assert {type: "json"};
import { findData } from './fuciones.js';
import { getSlots } from './fuciones.js';
import { linkTo } from './fuciones.js';
import { valueVSSearch } from './fuciones.js';
import { calcularEdad } from './fuciones.js';

document.addEventListener("DOMContentLoaded", function () {

    //                      parametros

    const userLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    const main = document.querySelector('main')
    const officeLinkWeekCalendario = document.querySelector("#office__link_week_calendario");
    const officeLinkDayCalendario = document.querySelector("#office__link_day_calendario");
    const officeLinkPacient = document.querySelector("#office__link_pacient")
    const navUserIconCloseSesion = document.querySelector("#nav__userIcon_closeSesion")
    const navNewPacientButton = document.querySelector("#consultorio__navNewPacient_Button")

    let currentDate = dayjs();
    let currentMonth = currentDate.month();
    let currentYear = currentDate.year();

    const userLogin = {
        nombre: userLocalStorage.nombre,
        apellido: userLocalStorage.apellido,
        email: userLocalStorage.email,
    };

    const consul_dayOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const userLog = findData(userLogin);

    let currentView = "day"


    //              Eventos

    officeLinkWeekCalendario.addEventListener("click", (event) => {
        event.preventDefault();
        currentView = "week";
        calendar(weekAppointmentCalendar);
    });
    officeLinkDayCalendario.addEventListener("click", (event) => {
        event.preventDefault();
        currentView = "day";
        calendar(dayAppointmentCalendar);

    })

    navNewPacientButton.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            const { value: newPacientValues } = await Swal.fire({
                title: 'Nuevo Paciente',
                html:
                    `<div>
                        <input type="text" id="newPatien_inputName" placeholder="Nombre" class="swal2-input" autocomplete="off" required>
                    </div>

                    <div>
                        <input type="text" id="newPatien_inputLastName" placeholder="Apellido" class="swal2-input" autocomplete="off" required>
                    </div>
                    <div>
                        <input type="number" name="dni" id="newPatien_inputdni" placeholder="DNI" class="swal2-input" autocomplete="off" required>
                    </div>

                    <div>
                        <label class="form-label" for="gender">Género</label>
                        <select id="newPatien_inputGenero" name="genero" class="form-select ">
                            <option value="">Seleccionar</option>
                            <option value="female">Mujer</option>
                            <option value="male">Hombre</option>
                        </select>  
                    </div>

            <div>
                <label class="form-label " for="inputBirthdate">Fecha de nacimiento</label>
                <input type="date" name="fecha_nacimiento"id="newPatien_inputBirthdate" class="swal2-input" required>
            </div>

            <div class="newPacient__coberturaConteiner">
                <div class="newPacient__coberturaConteiner-header">
                    <div class="coberturasTitle">Coberturas</div>
                    <button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6e99b3" class="bi bi-file-plus-fill" viewBox="0 0 16 16">
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
                <div class="newPacient__coberturaConteiner-input">
                    <div>
                        <input type="text" name="cobertura" id="newPatien_inputCobertura" placeholder="Cobertura" class="swal2-input" autocomplete="off" required>
                    </div>
                    <div>
                        <input type="text" name="numero_afiliado" id="newPatien_inputNumeroAfiliado" placeholder="Numero de Afiliado" class="swal2-input" autocomplete="off" required>
                    </div>
                </div>
            </div>

            <div class="newPacient__emailConteiner">
                <div class="newPacient__emailConteiner-header">
                    <div class="emailTitle">Emails</div>
                    <button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6e99b3" class="bi bi-file-plus-fill" viewBox="0 0 16 16">
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
                <div>
                    <input type="email" name="email" id="newPacient_inputEmail" placeholder="Email" class="swal2-input" autocomplete="off" required>
                </div>
            </div>

            <div class="newPacient_telefonoConteiner">
                <div class="newPacient__telefonoConteriner-Header">
                    <div class="telefonoTitle">telefono</div>
                    <button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6e99b3" class="bi bi-file-plus-fill" viewBox="0 0 16 16">
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
                <div>
                    <input type="tel" name="telefono" id="newPacient_telefono" placeholder="telefono" class="swal2-input" autocomplete="off" required>
                </div>
            </div>

            <div>
                <input type="text" name="direccion" id="newPacient_inputdireccion" placeholder="direccion" class="swal2-input" autocomplete="off">
            </div>

            <div>
                <input type="text" name="notas" id="newPacient_inputNotas" placeholder="notas" class="swal2-input" autocomplete="off">
                    </div>`,

                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#6e99b3',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),

                preConfirm: async () => {
                    const firstName = document.getElementById("newPatien_inputName").value;
                    const lastName = document.getElementById("newPatien_inputLastName").value;
                    const dni = document.getElementById("newPatien_inputdni").value;
                    const genero = document.getElementById("newPatien_inputGenero").value;
                    const fecha_nacimiento = document.getElementById("newPatien_inputBirthdate").value;
                    const cobertura = document.getElementById("newPatien_inputCobertura").value;
                    const numero_afiliado = document.getElementById("newPatien_inputNumeroAfiliado").value;
                    const email = document.getElementById("newPacient_inputEmail").value;
                    const telefono = document.getElementById("newPacient_telefono").value;
                    const direccion = document.getElementById("newPacient_inputdireccion").value;
                    const notas = document.getElementById("newPacient_inputNotas").value;
                    let edad = calcularEdad(fecha_nacimiento)
                    const nombre = firstName + " " + lastName;
                    const numero_historia_clinica = Math.random() * 100000000000000
                    const historia_clinica = ""

                    const newPacient = { dni, nombre, fecha_nacimiento, edad, genero, telefono, email, direccion, cobertura, numero_afiliado, notas, numero_historia_clinica, historia_clinica }



                    const response = await fetch('http://localhost:3002/updateNewPacient', {
                        method: 'POST',
                        body: JSON.stringify(newPacient),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        }
                    });

                    if (response.ok) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Paciente guardado correctamente',
                            timer: 10000
                        })
                    } else {
                        throw new Error(response.statusText);
                    }

                },
            });

        } catch (error) {
            Swal.showValidationMessage(
                `Request failed: ${error}`
            )
        }
    })

    officeLinkPacient.addEventListener("click", (event) => {
        main.innerHTML = ""
        async function importPacienData() {
            try {
                const response = await fetch('../server/data/patientRegistry.json');
                const pacientData = await response.json();

                const listPacientConteiner = document.createElement("div");
                listPacientConteiner.classList.add("consultorio__listPatient_conteiner");
                main.appendChild(listPacientConteiner);

                const listPacienteHeader = document.createElement("div")
                listPacienteHeader.classList.add("consultorio__listPatient_header")
                listPacientConteiner.appendChild(listPacienteHeader)

                const searchInput = document.createElement("input");
                searchInput.setAttribute("type", "text");
                searchInput.setAttribute("placeholder", "Buscar Paciente");
                listPacienteHeader.appendChild(searchInput)

                const newPacientButton = document.createElement("div");
                newPacientButton.setAttribute("id", "consultorio__newPacient_Button");
                listPacienteHeader.appendChild(newPacientButton)
                newPacientButton.innerHTML = `<button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill=#6e99b3 class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/></svg>
                </button>`



                newPacientButton.addEventListener("click", async (event) => {
                    event.preventDefault();
                    try {
                        const { value: newPacientValues } = await Swal.fire({
                            title: 'Nuevo Paciente',
                            html:
                                `<div>
                                        <input type="text" id="newPatien_inputName" placeholder="Nombre" class="swal2-input" autocomplete="off" required>
                                    </div>
                
                                    <div>
                                        <input type="text" id="newPatien_inputLastName" placeholder="Apellido" class="swal2-input" autocomplete="off" required>
                                    </div>
                                    <div>
                                        <input type="number" name="dni" id="newPatien_inputdni" placeholder="DNI" class="swal2-input" autocomplete="off" required>
                                    </div>
                
                                    <div>
                                        <label class="form-label" for="gender">Género</label>
                                        <select id="newPatien_inputGenero" name="genero" class="form-select ">
                                            <option value="">Seleccionar</option>
                                            <option value="female">Mujer</option>
                                            <option value="male">Hombre</option>
                                        </select>  
                                    </div>
                
                            <div>
                                <label class="form-label " for="inputBirthdate">Fecha de nacimiento</label>
                                <input type="date" name="fecha_nacimiento"id="newPatien_inputBirthdate" class="swal2-input" required>
                            </div>
                
                            <div class="newPacient__coberturaConteiner">
                                <div class="newPacient__coberturaConteiner-header">
                                    <div class="coberturasTitle">Coberturas</div>
                                    <button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6e99b3" class="bi bi-file-plus-fill" viewBox="0 0 16 16">
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="newPacient__coberturaConteiner-input">
                                    <div>
                                        <input type="text" name="cobertura" id="newPatien_inputCobertura" placeholder="Cobertura" class="swal2-input" autocomplete="off" required>
                                    </div>
                                    <div>
                                        <input type="text" name="numero_afiliado" id="newPatien_inputNumeroAfiliado" placeholder="Numero de Afiliado" class="swal2-input" autocomplete="off" required>
                                    </div>
                                </div>
                            </div>
                
                            <div class="newPacient__emailConteiner">
                                <div class="newPacient__emailConteiner-header">
                                    <div class="emailTitle">Emails</div>
                                    <button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6e99b3" class="bi bi-file-plus-fill" viewBox="0 0 16 16">
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <input type="email" name="email" id="newPacient_inputEmail" placeholder="Email" class="swal2-input" autocomplete="off" required>
                                </div>
                            </div>
                
                            <div class="newPacient_telefonoConteiner">
                                <div class="newPacient__telefonoConteriner-Header">
                                    <div class="telefonoTitle">telefono</div>
                                    <button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6e99b3" class="bi bi-file-plus-fill" viewBox="0 0 16 16">
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <input type="tel" name="telefono" id="newPacient_telefono" placeholder="telefono" class="swal2-input" autocomplete="off" required>
                                </div>
                            </div>
                
                            <div>
                                <input type="text" name="direccion" id="newPacient_inputdireccion" placeholder="direccion" class="swal2-input" autocomplete="off">
                            </div>
                
                            <div>
                                <input type="text" name="notas" id="newPacient_inputNotas" placeholder="notas" class="swal2-input" autocomplete="off">
                                    </div>`,

                            inputAttributes: {
                                autocapitalize: 'off'
                            },
                            showCancelButton: true,
                            confirmButtonText: 'Guardar',
                            confirmButtonColor: '#6e99b3',
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),

                            preConfirm: async () => {
                                const firstName = document.getElementById("newPatien_inputName").value;
                                const lastName = document.getElementById("newPatien_inputLastName").value;
                                const dni = document.getElementById("newPatien_inputdni").value;
                                const genero = document.getElementById("newPatien_inputGenero").value;
                                const fecha_nacimiento = document.getElementById("newPatien_inputBirthdate").value;
                                const cobertura = document.getElementById("newPatien_inputCobertura").value;
                                const numero_afiliado = document.getElementById("newPatien_inputNumeroAfiliado").value;
                                const email = document.getElementById("newPacient_inputEmail").value;
                                const telefono = document.getElementById("newPacient_telefono").value;
                                const direccion = document.getElementById("newPacient_inputdireccion").value;
                                const notas = document.getElementById("newPacient_inputNotas").value;
                                let edad = calcularEdad(fecha_nacimiento)
                                const nombre = firstName + " " + lastName;
                                const numero_historia_clinica = Math.random() * 100000000000000
                                const historia_clinica = ""

                                const newPacient = { dni, nombre, fecha_nacimiento, edad, genero, telefono, email, direccion, cobertura, numero_afiliado, notas, numero_historia_clinica, historia_clinica }



                                const response = await fetch('http://localhost:3002/updateNewPacient', {
                                    method: 'POST',
                                    body: JSON.stringify(newPacient),
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8',
                                    }
                                });

                                if (response.ok) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Paciente guardado correctamente',
                                        timer: 10000
                                    })
                                } else {
                                    throw new Error(response.statusText);
                                }

                            },
                        });

                    } catch (error) {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    }
                })



                const listPacientBody = document.createElement("div")
                listPacientBody.classList.add("consultorio__listPacient_body")
                listPacientConteiner.appendChild(listPacientBody)

                pacientData.forEach(patient => {
                    const pacientConteiner = document.createElement("div")
                    pacientConteiner.classList.add("consultorio__pacient-Conteiner")
                    listPacientBody.appendChild(pacientConteiner)

                    const patienNameWLink = document.createElement("div");
                    patienNameWLink.classList.add("consultorio__listPatient_patienNameLink");
                    patienNameWLink.textContent = patient.nombre
                    pacientConteiner.appendChild(patienNameWLink);

                    const patientDNI = document.createElement("div");
                    patientDNI.classList.add("consultorio__listPatient_patientDNI");
                    patientDNI.textContent = patient.dni
                    pacientConteiner.appendChild(patientDNI);

                    const patientCobertura = document.createElement("div");
                    patientCobertura.classList.add("consultorio__listPatient_patientCobertura");
                    patientCobertura.textContent = patient.cobertura
                    pacientConteiner.appendChild(patientCobertura);

                    const patientAfiliadoNumber = document.createElement("div");
                    patientAfiliadoNumber.classList.add("consultorio__listPatient_patientAfiliadoNumber");
                    patientAfiliadoNumber.textContent = patient.numero_afiliado
                    pacientConteiner.appendChild(patientAfiliadoNumber);

                    const patientPhoneNumber = document.createElement("div");
                    patientPhoneNumber.classList.add("consultorio__listPatient_patientPhoneNumber");
                    pacientConteiner.appendChild(patientPhoneNumber);
                    const phoneNumber = patient.telefono
                    const whatsappLink = document.createElement("a");
                    whatsappLink.href = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
                    whatsappLink.target = '_blank'
                    whatsappLink.textContent = patient.telefono
                    patientPhoneNumber.appendChild(whatsappLink)

                    const hcLinkrow = document.createElement("div");
                    hcLinkrow.classList.add("consultorio__listPacient_hclinkrow")
                    hcLinkrow.setAttribute("id", "consultorioListPacientHclinkrow")
                    hcLinkrow.textContent = "HC"
                    pacientConteiner.appendChild(hcLinkrow);
                })
                searchInput.addEventListener("input", (event) => {

                    const searchedPacient = searchInput.value.trim();
                    const filteredPacients = pacientData.filter(patient => {
                        return valueVSSearch(patient.nombre, searchedPacient) ||
                            valueVSSearch(patient.dni, searchedPacient) ||
                            valueVSSearch(patient.numero_afiliado, searchedPacient) ||
                            valueVSSearch(patient.cobertura, searchedPacient) ||
                            valueVSSearch(patient.numero_afiliado, searchedPacient) ||
                            valueVSSearch(patient.correo, searchedPacient) ||
                            valueVSSearch(patient.telefono, searchedPacient)
                    });


                    listPacientBody.innerHTML = "";

                    filteredPacients.forEach(patient => {
                        const SearchedPacientConteiner = document.createElement("div")
                        SearchedPacientConteiner.classList.add("consultorio__pacient-Conteiner")
                        listPacientBody.appendChild(SearchedPacientConteiner)

                        const patienNameWLink = document.createElement("div");
                        patienNameWLink.classList.add("consultorio__listPatient_patienNameLink");
                        patienNameWLink.textContent = patient.nombre
                        SearchedPacientConteiner.appendChild(patienNameWLink);

                        const patientDNI = document.createElement("div");
                        patientDNI.classList.add("consultorio__listPatient_patientDNI");
                        patientDNI.textContent = patient.dni
                        SearchedPacientConteiner.appendChild(patientDNI);

                        const patientCobertura = document.createElement("div");
                        patientCobertura.classList.add("consultorio__listPatient_patientCobertura");
                        patientCobertura.textContent = patient.cobertura
                        SearchedPacientConteiner.appendChild(patientCobertura);

                        const patientAfiliadoNumber = document.createElement("div");
                        patientAfiliadoNumber.classList.add("consultorio__listPatient_patientAfiliadoNumber");
                        patientAfiliadoNumber.textContent = patient.numero_afiliado
                        SearchedPacientConteiner.appendChild(patientAfiliadoNumber);

                        const patientPhoneNumber = document.createElement("div");
                        patientPhoneNumber.classList.add("consultorio__listPatient_patientPhoneNumber");
                        SearchedPacientConteiner.appendChild(patientPhoneNumber);
                        const phoneNumber = patient.telefono
                        const whatsappLink = document.createElement("a");
                        whatsappLink.href = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
                        whatsappLink.target = '_blank'
                        whatsappLink.textContent = patient.telefono
                        patientPhoneNumber.appendChild(whatsappLink)

                        const hcLinkrow = document.createElement("div");
                        hcLinkrow.classList.add("consultorio__listPacient_hclinkrow")
                        hcLinkrow.setAttribute("id", "consultorioListPacientHclinkrow")
                        hcLinkrow.textContent = "HC"
                        SearchedPacientConteiner.appendChild(hcLinkrow);
                    });
                });
            }
            catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Algo no salio bien! Vuelve a intentarlo 
                    Actualiza el navegador`,
                    showConfirmButton: false,
                    background: 'linear-gradient(#d9e1e6, #6e99b3)',
                    color: 'white',
                    timer: 1500,
                });
            }
        };
        importPacienData()
    })


    navUserIconCloseSesion.addEventListener("click", (event) => {
        event.preventDefault();
        Swal.fire({
            title: `<h1 class="closeSesion_alert">¿Te vas?</h1>`,
            showCancelButton: true,
            confirmButtonColor: 'transparent',
            cancelButtonColor: 'transparent',
            confirmButtonText: `<h5 class="closeSesion_alert">¡Si. Hasta Pronto!</h5>`,
            cancelButtonText: `<h5 class="closeSesion_alert">Cancelar</h5>`,
            background: 'linear-gradient(#d9e1e6, #6e99b3)',
            color: 'white',
            returnFocus: true,
            buttonsStyling: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `<h1 class= "closeSesion_alert">¡Hasta Pronto Dr. ${userLogin.apellido}!</h1>`,
                    showConfirmButton: false,
                    background: 'linear-gradient(#d9e1e6, #6e99b3)',
                    color: 'white',
                    timer: 1500,
                });
                localStorage.removeItem("usuario")
                linkTo("../index.html", 1500)
            }
        })


    })


    //              Funciones


    function calendar(funciondayorweek) {
        main.innerHTML = ""

        const calendarContainer = document.createElement("div");
        calendarContainer.classList.add("office__calendar");
        main.appendChild(calendarContainer);


        const headerContainer = document.createElement("div");
        headerContainer.classList.add("header");
        calendarContainer.appendChild(headerContainer);

        const prevButton = document.createElement("div");
        prevButton.setAttribute("id", "prevMonth");
        prevButton.innerHTML = `<button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill=#6e99b3 class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                </svg>
                                </button>`;
        headerContainer.appendChild(prevButton);

        const currentMonthHeader = document.createElement("h1");
        currentMonthHeader.setAttribute("id", "currentMonth");
        headerContainer.appendChild(currentMonthHeader);

        const nextButton = document.createElement("div");
        nextButton.setAttribute("id", "nextMonth");
        nextButton.innerHTML = `<button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill=#6e99b3 class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                </svg>
                                </button>`;
        headerContainer.appendChild(nextButton);

        const divDay = document.createElement("div");
        divDay.classList.add("days");
        calendarContainer.appendChild(divDay);

        const currentMonthHTML = document.querySelector("#currentMonth");
        const daysContainer = document.querySelector(".days");

        const prevMonth = document.querySelector("#prevMonth");
        const nextMonth = document.querySelector("#nextMonth");

        prevMonth.addEventListener("click", () => {
            currentDate = currentDate.subtract(1, 'month');
            currentMonth = currentDate.month();
            currentYear = currentDate.year();
            showView(currentDate)
        });
        nextMonth.addEventListener("click", () => {
            currentDate = currentDate.add(1, 'month');
            currentMonth = currentDate.month();
            currentYear = currentDate.year();
            showView(currentDate)
        });

        funciondayorweek(currentDate);
        currentMonthHTML.textContent = `${currentDate.format('MMMM')} ${currentYear}`;
        const firstDay = currentDate.startOf('month');
        const lastDay = currentDate.endOf('month');
        const firstDayOfWeek = firstDay.day();
        const lastDayOfPrevMonth = firstDay.subtract(1, 'month').endOf('month');
        const lasDayOfMonth = lastDay.date();
        const daysInNextMonth = 6 * 7 - (firstDayOfWeek + lasDayOfMonth);
        const consul_ShorDaysOfWeek = consul_dayOfWeek.map(day => day.slice(0, 3));

        daysContainer.innerHTML = "";

        for (const dayOfWeek of consul_ShorDaysOfWeek) {
            const dayOfWeekE = document.createElement("div");
            dayOfWeekE.classList.add("day-of-week");
            dayOfWeekE.textContent = dayOfWeek;
            daysContainer.appendChild(dayOfWeekE);
        }

        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("otherMonth-day");
            const dayNumber = lastDayOfPrevMonth.date() - firstDayOfWeek + i + 1;
            emptyDay.textContent = dayNumber;
            daysContainer.appendChild(emptyDay);
        }

        for (let day = 1; day <= lastDay.date(); day++) {
            const dayOfMonth = document.createElement("div");
            dayOfMonth.classList.add("month-day");
            if (
                day === currentDate.date() &&
                currentMonth === currentDate.month() &&
                currentYear === currentDate.year()
            ) {
                dayOfMonth.classList.add("current-day");
            }
            dayOfMonth.textContent = day;
            daysContainer.appendChild(dayOfMonth);

        }
        for (let i = 1; i <= daysInNextMonth; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("otherMonth-day");
            emptyDay.textContent = i;
            daysContainer.appendChild(emptyDay);
        }
        const dayOfMonth = document.querySelectorAll(".month-day");

        dayOfMonth.forEach(day => {
            day.addEventListener("click", () => {
                const selectedDayClassDeleted = document.querySelectorAll(".month-day");
                selectedDayClassDeleted.forEach(day => {
                    day.classList.remove("selected-day");
                });
                day.classList.add("selected-day");
                const dayNumber = parseInt(day.textContent);
                const selectedDate = currentDate.date(dayNumber);
                const officeContent = document.querySelector("#office__content");
                if (officeContent) {
                    officeContent.remove();
                }
                funciondayorweek(selectedDate);
            });
        });

    }

    function weekAppointmentCalendar(day) {
        const officeContent = document.createElement("div");
        officeContent.setAttribute("id", "office__content");
        main.appendChild(officeContent);
    
        const selectedDay = dayjs(day);
    
        officeContent.innerHTML = "";
    
        const table = document.createElement("table");
        table.classList.add("office__week-table");
        officeContent.appendChild(table);
    
        const thead = document.createElement("thead");
        thead.classList.add("office__week-table-header");
        table.appendChild(thead);
    
        const doctorDayConsulting = document.createElement("tr");
        doctorDayConsulting.classList.add("table-primary");
        thead.appendChild(doctorDayConsulting);
    
        const tbody = document.createElement("tbody");
        tbody.classList.add("office__week-table-body");
        table.appendChild(tbody);
    
        const doctorTimeDayConsulting = document.createElement("tr");
        tbody.appendChild(doctorTimeDayConsulting);
    
        for (let i = 0; i < 8; i++) {
            const currentDay = selectedDay.add(i, 'day');
            const dayName = consul_dayOfWeek[currentDay.day()];
            const horarioInfo = userLog.horarios.find(info => info.dia === dayName);
    
            if (horarioInfo) {
                const th = document.createElement("th");
                th.classList.add("office__week-table-header-cell");
                th.innerHTML = `<div class="currentDayWeek">${currentDay.format("DD")}</div>
                    <div class="currentMonthWeek">${currentDay.format("MM")}</div>
                    <div id="dayNameLink">${dayName}</div> `;
                doctorDayConsulting.appendChild(th);
    
                const td = document.createElement("td");
                doctorTimeDayConsulting.appendChild(td);
    
                const intervalPairs = Array.isArray(horarioInfo.intervalo[0]) ? horarioInfo.intervalo : [horarioInfo.intervalo];
    
                for (const interval of intervalPairs) {
                    const [startTime, endTime] = interval;
                    const startTimeObj = dayjs(currentDay).set('hour', parseInt(startTime.split(':')[0])).set('minute', parseInt(startTime.split(':')[1]));
                    const endTimeObj = dayjs(currentDay).set('hour', parseInt(endTime.split(':')[0])).set('minute', parseInt(endTime.split(':')[1]));
                    const tiempoConsulta = horarioInfo.tiempoConsulta;
                    const appointmentTime = getSlots(startTimeObj, endTimeObj, tiempoConsulta);
    
                    for (const slot of appointmentTime) {
                        const div = document.createElement("div");
                        div.classList.add("office__week-table-appintmentTime-cell");
                        div.innerHTML = `<div class="appointmentTime">${slot.format("HH:mm")}</div>
                         <div class="info"></div>
                         <div id="patienInfo"></div> `;
                        td.appendChild(div);
                    }
                }
            }
        }
    }
    
    function dayAppointmentCalendar(day) {
        const officeContent = document.createElement("div");
        officeContent.setAttribute("id", "office__content");
        main.appendChild(officeContent);

        const dayOfWeek = day.day();
        const dayName = consul_dayOfWeek[dayOfWeek];
        const horarioInfo = userLog.horarios.find(info => info.dia === dayName)

        officeContent.innerHTML = "";
        const table = document.createElement("table");
        table.classList.add("office__day-table");
        officeContent.appendChild(table);

        const thead = document.createElement("thead")
        thead.classList.add("office__day-table-header");
        table.appendChild(thead);

        const doctorDayConsulting = document.createElement("tr");
        thead.appendChild(doctorDayConsulting);

        const tbody = document.createElement("tbody")
        tbody.classList.add("office__day-table-body");
        table.appendChild(tbody);

        const doctorTimeDayConsulting = document.createElement("tr");
        tbody.appendChild(doctorTimeDayConsulting);

        const th = document.createElement("th");
        th.classList.add("office__day-table-header-cell");
        th.innerHTML = `<div>${day.format("dddd DD - MMMM YYYY")} </div>`;
        doctorDayConsulting.appendChild(th);

        const td = document.createElement("td");
        doctorTimeDayConsulting.appendChild(td);

        if (!horarioInfo) {

            return td.innerHTML = `<div clas="whitoutTiemeMessage"> Sin horarios asignados para este dia </div> `
        }

        const intervalPairs = Array.isArray(horarioInfo.intervalo[0]) ? horarioInfo.intervalo : [horarioInfo.intervalo];

        for (const interval of intervalPairs) {
            const [startTime, endTime] = interval;
            const startTimeObj = dayjs(day).set('hour', parseInt(startTime.split(':')[0])).set('minute', parseInt(startTime.split(':')[1]));
            const endTimeObj = dayjs(day).set('hour', parseInt(endTime.split(':')[0])).set('minute', parseInt(endTime.split(':')[1]));
            const tiempoConsulta = horarioInfo.tiempoConsulta;
            const appointmentTime = getSlots(startTimeObj, endTimeObj, tiempoConsulta);

            for (const slot of appointmentTime) {
                const div = document.createElement("div");
                div.classList.add("office__day-table-appintmentTime-cell");
                div.innerHTML = `<div class="appointmentTime">${slot.format("HH:mm")}</div>
                <div class="info">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=#6e99b3  class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                </div>
                <div id="patienInfo"></div> `;
                td.appendChild(div);

            }
        }
    }

    function showView(date) {
        if (currentView === "week") {
            calendar(weekAppointmentCalendar);
        } else if (currentView === "day") {
            calendar(dayAppointmentCalendar);
        }
    }

    //            Inicio Scrip   
    showView(currentDate)

})
