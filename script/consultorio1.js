import data from "../data/usuariosRegistrados.json" assert {type: "json"};
//import { findData } from "./fuciones";

document.addEventListener("DOMContentLoaded", function () {
    const userLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    console.log(userLocalStorage);
    const agendaContenido = document.querySelector("#agendaContenido");
    const tableDay = document.querySelector("#table-day")
    const currentMonthHTML = document.querySelector("#currentMonth");
    const daysContainer = document.querySelector(".days");
    const appointmentsList = document.querySelector("#appointmentsList");
    const prevMonth = document.querySelector("#prevMonth");
    const nextMonth = document.querySelector("#nextMonth")

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const userLogin = {
        nombre: userLocalStorage.nombre,
        apellido: userLocalStorage.apellido,
        email: userLocalStorage.email,
    };

    const consul_months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const consul_dayOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const userLog = findData(userLogin);
    const dayOfWeekDoctor = userLog.horarios.map(item => item.dia);
    console.log(dayOfWeekDoctor);
    const row = document.createElement("tr");

    prevMonth.addEventListener("click", () => {
        if (currentMonth === 0) {
            currentYear--;
            currentMonth = 11;
        } else {
            currentMonth--;
        }
        calendar();
    });
    nextMonth.addEventListener("click", () => {
        if (currentMonth === 11) {
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }
        calendar();
    });

    //funcion que no logro importar. y la tengo que volver a colocar aca
    function findData(criteriosBusqueda) {
        return data.find((registro) => {
            return Object.keys(criteriosBusqueda).every((key) => {
                return registro[key] === criteriosBusqueda[key];
            });
        });
    };

        
    function doctorCalendar() {
        for (const doctorDay of dayOfWeekDoctor) {
            const dayElement = document.createElement("th");
            dayElement.classList.add("doctor-day-of-week");
            dayElement.textContent = doctorDay;
            tableDay.appendChild(dayElement);
        }
        
        dayOfWeekDoctor.forEach(day => {
            const horario = userLog.horarios.find(item => item.dia === day);
            const cell = document.createElement("td");

            if (horario) {
                const timeSlots = horario.turno.map(turno => {
                    const ocupadoClass = turno.ocupado ? "Taken" : "";
                    return `<div class="doctor-appoiment${ocupadoClass}">${turno.hora}</div>`;
                }).join("");
                cell.innerHTML = timeSlots;
            }

            row.appendChild(cell);
        });
        agendaContenido.appendChild(row)
    };

function calendar() {
    currentMonthHTML.textContent = consul_months[currentMonth] + " " + currentYear;
    const currentDate = new Date()
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    // console.log(firstDay); 

    daysContainer.innerHTML = "";

    for (const dayOfWeek of consul_dayOfWeek) {
        const dayOfWeekE = document.createElement("div");
        dayOfWeekE.classList.add("day-of-week");
        dayOfWeekE.textContent = dayOfWeek;
        daysContainer.appendChild(dayOfWeekE);
    }

    const firstDayOfWeek = firstDay.getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("empty-day");
        daysContainer.appendChild(emptyDay);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayOfMonth = document.createElement("div");
        dayOfMonth.classList.add("month-day");
        if (
            day === currentDate.getDate() && 
            currentMonth === currentDate.getMonth() && 
            currentYear === currentDate.getFullYear() 
        ) {
            dayOfMonth.classList.add("current-day");
        }
        dayOfMonth.textContent = day;
        // dayOfMonth.addEventListener("click", () => showAppointments(currentYear, currentMonth, day));
        daysContainer.appendChild(dayOfMonth);
    }
}

// function showAppointments(year, month, day) {
//     const selectedDate = new Date(year, month, day);

//     // Simulated turnos, hasta que encuentre como traer los del medico.
//     const appointments = [
//         "Turno 1: 10:00 AM",
//         "Turno 2: 2:00 PM",
//         "Turno 3: 4:30 PM"
//     ];

//     appointmentsList.innerHTML = "";
//     for (const appointment of appointments) {
//         const appointmentItem = document.createElement("li");
//         appointmentItem.classList.add("appointment");
//         appointmentItem.textContent = appointment;
//         appointmentsList.appendChild(appointmentItem);
//     }
// }


calendar();
doctorCalendar();
})
