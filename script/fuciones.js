import data from "../data/doctorsRegister.json" assert {type: "json"};

export function findData(criteriosBusqueda) {
    return data.find((registro) => {
        return Object.keys(criteriosBusqueda).every((key) => {
            return registro[key] === criteriosBusqueda[key];
        });
    });
};

export function linkTo(direccion) {
    setTimeout(() => {
        window.location.href = direccion;
    }, 3000);
}

export  function getSlots(startTime, endTime, interval) {
    const slots = [];
    let currentSlot = startTime.clone();

    while (currentSlot.isBefore(endTime)) {
        slots.push(currentSlot.clone());
        currentSlot = currentSlot.add(interval, 'minute');
    }
    
    return slots;
}
