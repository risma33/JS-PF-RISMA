document.querySelector("#consultorio__newPacient_Button").addEventListener("click", async (event) => {
    event.preventDefault();

    const { value: formValues } = await Swal.fire({
        title: 'Nuevo Paciente',
        html: `
            <input type="text" id="inputName" placeholder="Nombre" class="swal2-input">
            <input type="text" id="inputAge" placeholder="Edad" class="swal2-input">
            <!-- Agrega más campos de entrada según tus necesidades -->
        `,
        focusConfirm: false,
        preConfirm: async () => {
            const name = document.getElementById('inputName').value;
            const age = document.getElementById('inputAge').value;
            // Obtén los valores de otros campos de entrada aquí

            // Realizar una petición al servidor para agregar los datos
            const response = await fetch('URL_DEL_ENDPOINT', {
                method: 'POST',
                body: JSON.stringify({ name, age }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al agregar el paciente');
            }

            return { name, age };
        }
    });

    if (formValues) {
        // Aquí puedes manejar el resultado de agregar el paciente si es necesario
        Swal.fire({
            title: 'Paciente Agregado',
            text: `Nombre: ${formValues.name}, Edad: ${formValues.age}`,
            icon: 'success'
        });
    }
});
