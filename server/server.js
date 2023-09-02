const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3002;

const dataFolderPath = path.join(__dirname, 'data'); 
//              APP
app.use(cors());
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//             PETICIONES

app.post('/updateNewPacient', (req, res) => {
  const newPatient = req.body; 

  let pacientes = [];
  try {
    const filePath = path.join(dataFolderPath, 'patientRegistry.json'); 
    const pacientRegister = fs.readFileSync(filePath, 'utf8');
    pacientes = JSON.parse(pacientRegister);
  } catch (err) {
    console.error('Error al leer patientRegistry.json:', err);
  }
  pacientes.push(newPatient);

  const filePath = path.join(dataFolderPath, 'patientRegistry.json'); 
  fs.writeFileSync(filePath, JSON.stringify(pacientes, null, 2));

  console.log('Paciente guardado exitosamente.');
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
