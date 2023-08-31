document.querySelector("#consultorio__newPacient_Button").addEventListener("click", (event) => {
    event.preventDefault();

    Swal.fire({
        title: 'Nuevo Paciente',
        html: `
            <input type="text" id="inputName" placeholder="Nombre" class="swal2-input">
            <input type="text" id="inputAge" placeholder="Edad" class="swal2-input">
            <!-- Agrega más campos de entrada según tus necesidades -->
        `,
        showCancelButton: true,
        confirmButtonText: 'Agregar Paciente',
        preConfirm: () => {
            const name = document.getElementById('inputName').value;
            const age = document.getElementById('inputAge').value;
            // Obtén los valores de otros campos de entrada aquí

            return { name, age };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { name, age } = result.value;

            // Agregar la lógica para agregar el paciente a tu patientRegistry
            // Por ejemplo, puedes tener un objeto paciente y luego agregarlo a un array

            const newPatient = {
                name: name,
                age: age
                // Agrega más propiedades según tus campos de entrada
            };

            // Aquí puedes agregar newPatient a tu patientRegistry
            // patientRegistry.push(newPatient);

            Swal.fire({
                title: 'Paciente Agregado',
                text: `Nombre: ${name}, Edad: ${age}`,
                icon: 'success'
            });
        }
    });
});
