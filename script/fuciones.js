import data from "../data/doctorsRegister.json" assert {type: "json"};


export function findData(criteriosBusqueda) {
    return data.find((registro) => {
        return Object.keys(criteriosBusqueda).every((key) => {
            return registro[key] === criteriosBusqueda[key];
        });
    });
};

export function linkTo(direccion, timer) {
    setTimeout(() => {
        window.location.href = direccion;
    }, timer);
}

export function getSlots(startTime, endTime, interval) {
    const slots = [];
    let currentSlot = startTime.clone();

    while (currentSlot.isBefore(endTime)) {
        slots.push(currentSlot.clone());
        currentSlot = currentSlot.add(interval, 'minute');
    }

    return slots;
};

export function valueVSSearch(value, searchQuery) {
    return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
}

export function calcularEdad(fechaNacimiento) {
    const fechaNacimientoDate = dayjs(fechaNacimiento);
    const fechaActual = dayjs();
    let edadCalculada = fechaActual.diff(fechaNacimientoDate, 'year');
    
    const cumpleaniosEsteAnio = fechaNacimientoDate.month() < fechaActual.month() ||
                                (fechaNacimientoDate.month() === fechaActual.month() && fechaNacimientoDate.date() <= fechaActual.date());
    
    if (!cumpleaniosEsteAnio) {
        edadCalculada--;
    }
    
    return edadCalculada;
}

