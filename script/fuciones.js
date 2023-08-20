import data from "../data/usuariosRegistrados.json" assert {type: "json"};

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
