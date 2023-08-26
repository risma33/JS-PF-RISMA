import data from "../data/doctorsRegister.json" assert {type: "json"};
import { findData } from './fuciones.js';
import { getSlots } from './fuciones.js';

document.addEventListener("DOMContentLoaded", function () {
    const userLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    const officeContent = document.querySelector("#office__content");
    const currentMonthHTML = document.querySelector("#currentMonth");
    const daysContainer = document.querySelector(".days");
    const prevMonth = document.querySelector("#prevMonth");
    const nextMonth = document.querySelector("#nextMonth")

    let currentDate = dayjs();
    let currentMonth = currentDate.month();
    let currentYear = currentDate.year();

    const userLogin = {
        nombre: userLocalStorage.nombre,
        apellido: userLocalStorage.apellido,
        email: userLocalStorage.email,
    };

    const consul_months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const consul_dayOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const userLog = findData(userLogin);
    const { horarios } = userLog
    console.log(horarios);


    prevMonth.addEventListener("click", () => {
        currentDate = currentDate.subtract(1, 'month');
        currentMonth = currentDate.month();
        currentYear = currentDate.year();
        calendar();
    });
    nextMonth.addEventListener("click", () => {
        currentDate = currentDate.add(1, 'month');
        currentMonth = currentDate.month();
        currentYear = currentDate.year();
        calendar();
    });

    function calendar() {
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
            dayOfMonth.addEventListener("click", () => {
                const selectedDay = currentDate.date(day);
                WeekAppointmentCalendar(selectedDay)
            });
        }
        for (let i = 1; i <= daysInNextMonth; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("otherMonth-day");
            emptyDay.textContent = i;
            daysContainer.appendChild(emptyDay);
        }
    }
    

    function WeekAppointmentCalendar(day) {
        const weekStart = dayjs(day).startOf('week');

        officeContent.innerHTML = "";

        const table = document.createElement("table");
        table.classList.add("office__week-table");
        officeContent.appendChild(table);
        const thead = document.createElement("thead")
        thead.classList.add("office__week-table-header");
        table.appendChild(thead);

        const doctorDayConsulting = document.createElement("tr");
        thead.appendChild(doctorDayConsulting);

        const tbody = document.createElement("tbody")
        thead.classList.add("office__week-table-body");
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
                
                const [startTime, endTime] = horarioInfo.intervalo;
                const startTimeObj = dayjs(currentDayWeek).set('hour', parseInt(startTime.split(':')[0])).set('minute', parseInt(startTime.split(':')[1]));
                const endTimeObj = dayjs(currentDayWeek).set('hour', parseInt(endTime.split(':')[0])).set('minute', parseInt(endTime.split(':')[1]));
                const tiempoConsulta = horarioInfo.tiempoConsulta;
                const appointmentTime = getSlots(startTimeObj, endTimeObj, tiempoConsulta);
                
                for (const slot of appointmentTime) {
                    const divPrueba = document.createElement("div");
                    divPrueba.classList.add("office__week-table-appintmentTime-cell");
                    divPrueba.innerHTML = `<div class="appointmentTime">${slot.format("HH:mm")}</div>
                     <div class="info"></div>
                     <div id="patienInfo"></div> `;
                    td.appendChild(divPrueba);

                }
            }
        }
    }

    calendar();

})
