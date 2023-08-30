import data from "../data/doctorsRegister.json" assert {type: "json"};
import { findData } from './fuciones.js';
import { getSlots } from './fuciones.js';
import { linkTo } from './fuciones.js';
import { valueVSSearch } from './fuciones.js';

document.addEventListener("DOMContentLoaded", function () {

    //                      parametros

    const userLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    const main = document.querySelector('main')
    const officeLinkWeekCalendario = document.querySelector("#office__link_week_calendario");
    const officeLinkDayCalendario = document.querySelector("#office__link_day_calendario");
    const officeLinkPacient = document.querySelector("#office__link_pacient")
    const navUserIconCloseSesion = document.querySelector("#nav__userIcon_closeSesion")

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
    officeLinkPacient.addEventListener("click", (event) => {
        main.innerHTML = ""
        async function importPacienData() {
            try {
                const response = await fetch('../data/patientRegistry.json');
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
                    text: `Algo no salio bien! Vuelve a intentarlo <br>
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

        const prevButton = document.createElement("button");
        prevButton.setAttribute("id", "prevMonth");
        prevButton.textContent = "Anterior";
        headerContainer.appendChild(prevButton);

        const currentMonthHeader = document.createElement("h1");
        currentMonthHeader.setAttribute("id", "currentMonth");
        headerContainer.appendChild(currentMonthHeader);

        const nextButton = document.createElement("button");
        nextButton.setAttribute("id", "nextMonth");
        nextButton.textContent = "Siguiente";
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


        const weekStart = dayjs(day).startOf('week');

        officeContent.innerHTML = "";

        const table = document.createElement("table");
        table.classList.add("office__week-table");
        officeContent.appendChild(table);
        const thead = document.createElement("thead")
        thead.classList.add("office__week-table-header");
        table.appendChild(thead);

        const doctorDayConsulting = document.createElement("tr");
        doctorDayConsulting.classList.add("table-primary")
        thead.appendChild(doctorDayConsulting);

        const tbody = document.createElement("tbody")
        tbody.classList.add("office__week-table-body");
        table.appendChild(tbody);

        const doctorTimeDayConsulting = document.createElement("tr");
        tbody.appendChild(doctorTimeDayConsulting);

        const selectedWeekStartDay = weekStart.clone();

        for (let i = 0; i < 7; i++) {
            const currentDayWeek = selectedWeekStartDay.add(i, 'day');
            const dayName = consul_dayOfWeek[currentDayWeek.day()];
            const horarioInfo = userLog.horarios.find(info => info.dia === dayName)

            if (horarioInfo) {
                const th = document.createElement("th");
                th.classList.add("office__week-table-header-cell");
                th.innerHTML = `<div>${currentDayWeek.format("DD")} </div>
                <div>${currentDayWeek.format("MM")}</div>
                <div id="dayNameLink">${dayName}</div> `;
                doctorDayConsulting.appendChild(th);

                const td = document.createElement("td");
                doctorTimeDayConsulting.appendChild(td);

                const intervalPairs = Array.isArray(horarioInfo.intervalo[0]) ? horarioInfo.intervalo : [horarioInfo.intervalo];

                for (const interval of intervalPairs) {
                    const [startTime, endTime] = interval;
                    const startTimeObj = dayjs(currentDayWeek).set('hour', parseInt(startTime.split(':')[0])).set('minute', parseInt(startTime.split(':')[1]));
                    const endTimeObj = dayjs(currentDayWeek).set('hour', parseInt(endTime.split(':')[0])).set('minute', parseInt(endTime.split(':')[1]));
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
             <div class="info"></div>
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
