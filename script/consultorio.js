import data from "../data/usuariosRegistrados.json" assert {type: "json"};


document.addEventListener("DOMContentLoaded", function () {
    const userLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    console.log(userLocalStorage);
    const agendaContenido = document.querySelector("#agendaContenido");
    const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]
    const userLogin = {
        nombre: userLocalStorage.nombre,
        apellido: userLocalStorage.apellido,
        email: userLocalStorage.email,
    };
    const row = document.createElement("tr");
    const userLog = findData(userLogin);

    function findData(criteriosBusqueda) {
        return data.find((registro) => {
            return Object.keys(criteriosBusqueda).every((key) => {
                return registro[key] === criteriosBusqueda[key];
            });
        });
    };

    diasSemana.forEach(day => {
        const horario = userLog.horarios.find(item => item.dia === day);
        const cell = document.createElement("td");

        if (horario) {
            const timeSlots = horario.turno.map(turno => {
                const ocupadoClass = turno.ocupado ? "ocupado" : "";
                return `<div class="slot ${ocupadoClass}">${turno.hora}</div>`;
            }).join("");
            cell.innerHTML = timeSlots;
        }

        row.appendChild(cell);
    });
    agendaContenido.appendChild(row)
});