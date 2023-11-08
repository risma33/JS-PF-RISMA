


document.addEventListener("DOMContentLoaded", function () {
    const {degrees, PDFDocument, StandardFonts, rgb } = PDFLib
    const linkIngreso = document.querySelector("#link_recetaElectronica")
    const body = document.querySelector('body')


    //              EVENTOS

    linkIngreso.addEventListener("click", (event) => {
        event.preventDefault();
        recetarioHtml ()
    })


    //funciones
   

    async function newRecetPDF() {
        const drPDFRecipe = await PDFDocument.create()
        const timesRomanFont = await drPDFRecipe.embedFont(StandardFonts.TimesRoman)
        const page = pdfDoc.addPage([283.46, 425.19]);
        page.setMargins();
        const fontSize = 11;

        page.drawText(` ${nombre} ${apellido}`, {
            x: 85.03,
            y: 425.19 - 70.86 - 2 * fontSize,
            size: fontSize,
            color: rgb(0, 0, 0),
          });

        page.drawText(` ${cobertura}: ${numeroAfiliado}`, {
            x: 85.03,
            y: 425.19 - 70.86 - 2 * fontSize,
            size: fontSize,
            color: rgb(0, 0, 0),
          });

    }

    function recetarioHtml() {
        body.innerHTML = "";
    //                  html inicial
        body.innerHTML = `
            <header class="header_consultorio">
                <nav class="navbar navbar-expand-lg ">
                    <div class="container-fluid justify-content-between">
                            <div class="full-logo">
                            <p class="g">G</p>
                            <p class="ervi">
                            <a href="../index.html">ERVI</a>
                            </p>
                            </div>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse border-start border-white border-3 mx-3" id="navbarNav">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
                                <li class="nav-item">
                                    <a class="nav-link" id="recetario__link_recetaElectronica" href="">RECETA</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="recetario__link_ordenMedicaEstudios" href="">OME</a>
                                </li>
                                
                            </ul>
                        </div>
                        <div class="dropdown">
                            <button class="btn .bg-body" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"
                                    class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="#">Cuenta</a></li>
                                <li><a class="dropdown-item" href="#">Configuracion</a></li>
                                <li><a class="dropdown-item" id="nav__userIcon_closeSesion" href="#">Cerrar Sesion</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main class="main--recElec">
                <div class="main--recElec_conteriner">
                    <div class= "newRecet_inputNameConteriner">
                        <input type="text" id="newRecet_inputName" placeholder="Nombre" autocomplete="off" required>
                    </div>
                    <div class="newRecet_inputLastNameConteriner">
                        <input type="text" id="newRecet_inputLastName" placeholder="Apellido"  autocomplete="off" required>
                    </div>
                    <div class="newRecet_coberturaConteiner">                        
                        <div>
                            <input type="text" name="cobertura" id="newRecet_inputCobertura" placeholder="Cobertura" autocomplete="off" required>
                        </div>
                        <div>
                            <input type="text" name="numero_afiliado" id="newRecet_inputNumeroAfiliado" placeholder="Numero de Afiliado" autocomplete="off" required>
                    </div>
                    <div class="newRecet_tratamientoConteiner">
                            <input type="text" name="tratamiento" id="newRecet_inputTratamiento" placeholder="Tratamiento" autocomplete="off" required>
                    </div>
                    <div class="newRecet_diagnosticoConteiner">
                            <input type="text" name="diagnostico" id="newRecet_inputDx" placeholder="Diagnostico" autocomplete="off" required>
                    </div>
                    <div class="newRecet_dateConteiner">
                        <input type="date" id="newRecet_inputDate" value="" required>
                    </div>
                    <div class="newRecet_indicacionesConteiner">
                            <input type="text" name="Indicaciones (Opcional)" id="newRecet_inputIndicaciones" placeholder="Indicaciones (Opcional)" autocomplete="off">
                    </div>
                    <div class="newRecet_buttonConteiner">
                        <button id="newRecet_buttonSave">Generar Receta</button>
                        <button id="newRecet_buttonCancel">Cancelar</button>

                    </div>  
                </div>
            </main>
            `

//                  VARIABLES
        const recetaSave = document.querySelector("#newRecet_buttonSave");

        recetaSave.addEventListener ("click", (event)=>{
            event.preventDefault();
    
            const nombre = document.querySelector("#newRecet_inputName").value;
            const apellido = document.querySelector("#newRecet_inputLastName").value;
            const cobertura = document.querySelector("#newRecet_inputCobertura").value;    
            const numeroAfiliado = document.querySelector("#newRecet_inputNumeroAfiliado").value;
            const tratamiento = document.querySelector("#newRecet_inputTratamiento").value;
            const diagnostico = document.querySelector("#newRecet_inputDx").value;
            const indicaciones = document.querySelector("#newRecet_inputIndicaciones").value;
            const fecha = document.querySelector("#newRecet_inputDate").value;
            
            

            async function newRecetPDF() {
                const drPDFRecipe = await PDFDocument.create()
                const timesRomanFont = await drPDFRecipe.embedFont(StandardFonts.TimesRoman)
                const heightRecipe = 283.46;
                const widthRecipe = 435.19;
                const page = drPDFRecipe.addPage([widthRecipe, heightRecipe]);
                
                const fontSize = 11;
        
                page.drawText(` ${nombre} ${apellido}`, {
                    x: 334.488,
                    y: heightRecipe - 79.37 - 2 * fontSize,
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                    rotate: degrees (-90)
                  });
        
                page.drawText(` ${cobertura}: ${numeroAfiliado}`, {
                    x: 314.64,
                    y: heightRecipe - 42.51- 2 * fontSize,
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                    rotate: degrees (-90)
                  });

                  page.drawText(`Dx: ${diagnostico}`, {
                    x: 99.2126,
                    y: heightRecipe - 46- 2 * fontSize,
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                    rotate: degrees(-90)
                  });

                  page.drawText(`${fecha}`, {
                    x: 56.69,
                    y: heightRecipe - 46 - 2 * fontSize,
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                    rotate: degrees(-90)
                  });

                  const areaTexto = {
                    x: 127.559, 
                    y: heightRecipe - 46, 
                    width: 155.90,
                    height: 226.72, 
                    
                  };

                  const texto = [`${tratamiento}`].join('\n')

                  const lineasTexto = page.drawText(texto, {
                    x: areaTexto.x,
                    y: areaTexto.y,
                    width: areaTexto.width,
                    height: areaTexto.height,
                    size: fontSize,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                    // rotate: degrees (-90),
                    align: 'center', 
                    lineHeight: 1.2, 
                    ellipsis: true, 
                    breakLines: true,
                  });

                  const pdfBytes = await drPDFRecipe.save();
                  const blob = new Blob([pdfBytes], { type: "application/pdf" });
                    const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = "receta_medica.pdf";
                link.click();
            }
            
            newRecetPDF()
        
            

           
   
        })
    }

})

