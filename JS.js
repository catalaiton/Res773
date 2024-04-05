const escenariosOcupacionales = [
    {
      
      frecuenciaMin: 0.1,
      frecuenciaMax: 30,
      Einc: (frecuencia) => 660 / (frecuencia ** 0.7),
      Hinc: (frecuencia) => 4.9 / frecuencia,
      Sinc: () => null, // No aplica
    },
    {
      frecuenciaMin: 30,
      frecuenciaMax: 400,
      Einc: ()=> 61,
      Hinc: ()=>0.16,
      Sinc: ()=>10,
    },
    {
      frecuenciaMin: 400,
      frecuenciaMax: 2000,
      Einc: (frecuencia) => 3 * Math.pow(frecuencia, 0.5), // 3fM^0.5
      Hinc: (frecuencia) => 0.008 * Math.pow(frecuencia, 0.5), // 0.008fM^0.5
      Sinc: (frecuencia) => frecuencia / 40, // fm/40
    },
    {
      frecuenciaMin: 2000,
      frecuenciaMax: 300000, // 300 GHz
      Einc: () => null, // No aplica
      Hinc: () => null, // No aplica
      Sinc: 50,
    },
  ];
  
  const escenariosPublicoGeneral = [
    {
      frecuenciaMin: 0.1,
      frecuenciaMax: 30,
      Einc: (frecuencia) => 300 / (frecuencia ** 0.7),
      Hinc: (frecuencia) => 2.2 / frecuencia,
      Sinc: () => null, // No aplica
    },
    {
      frecuenciaMin: 30,
      frecuenciaMax: 400,
      Einc: ()=>27.7,
      Hinc: ()=>0.073,
      Sinc: ()=>2,
    },
    {
      frecuenciaMin: 400,
      frecuenciaMax: 2000,
      Einc: (frecuencia) => 1.373 * Math.pow(frecuencia, 0.5), // 1.373fM^0.5
      Hinc: (frecuencia) => 0.0037 * Math.pow(frecuencia, 0.5), // 0.0037fM^0.5
      Sinc: (frecuencia) => frecuencia / 200, // fm/200
    },
    {
      frecuenciaMin: 2000,
      frecuenciaMax: 300000, // 300 GHz
      Einc: () => null, // No aplica
      Hinc: () => null, // No aplica
      Sinc: ()=>10,
    },
  ];


  const densidad = 1000; // kg/m^3 (densidad del tejido humano asumida)
  const impedanciaEspacioLibre = Math.PI * 4 * Math.pow(10, -7); // Ohmio (impedancia del espacio libre)
  
  function Comprobacion() {

    const altura = parseFloat(document.getElementById("Altura").value);
    const potencia = parseFloat(document.getElementById("Potencia").value);
    const tipoAntena = document.getElementById("TipoAntena").value;
  
    let requiereMedicion = true;
  
    if (
      // Antena de radiodifusión sonora o televisiva
      (tipoAntena === "Antena de Radiodifusion Sonora o Televisiva" && altura <= 10 && potencia < 100) ||
      // Antena de telecomunicaciones
      (tipoAntena === "Antena de Telecomunicaciones" && altura <= 15 && potencia < 50) ||
      // Antena de radioaficionados
      (tipoAntena === "Antena de Radioaficionados" && altura <= 20 && potencia < 100)
    ) {
      requiereMedicion = false;
      alert ("Su antena no requiere medicion");
    }
  
    if (requiereMedicion) {
      PTRadiada();
    }
  }
  

  function PTRadiada() {
    
    // Obtiene los valores de los elementos del formulario
    const frecuencia = parseFloat(document.getElementById("Frecuencia").value);
    const ganancia = parseFloat(document.getElementById("Ganancia").value);
    const altura = parseFloat(document.getElementById("Altura").value);
    const distancia = parseFloat(document.getElementById("Distancia").value);
    const potencia = parseFloat(document.getElementById("Potencia").value);
    const tipoUsuario = document.getElementById("TipoUsuario").value;
    // Evita el comportamiento predeterminado del envío del formulario
    event.preventDefault();
  
   
  
    // Comprueba si algún campo está vacío
    if (isNaN(frecuencia) || isNaN(ganancia) || isNaN(altura) || isNaN(distancia) || isNaN(potencia)) {
      alert("Por favor, complete todos los campos del formulario.");
      return;
    }
  
    // Convierte la frecuencia a MHz si se ingresa en GHz
    let frecuenciaMHz = frecuencia;
    if (frecuencia.toString().includes("GHz")) {
      frecuenciaMHz = frecuencia * 1000;
    }
  
    // Calcula la potencia radiada (suponiendo antena isotrópica)
    
    const potenciaRadiada = potencia * ganancia ;

  
    // Selecciona el escenario adecuado
    let escenarioSeleccionado;
    if (tipoUsuario === "Ocupacional") {
      escenarioSeleccionado = escenariosOcupacionales.find(
        (escenario) => frecuenciaMHz >= escenario.frecuenciaMin && frecuenciaMHz <= escenario.frecuenciaMax
      );
    } else {
      escenarioSeleccionado = escenariosPublicoGeneral.find(
        (escenario) => frecuenciaMHz >= escenario.frecuenciaMin && frecuenciaMHz <= escenario.frecuenciaMax
      );
    }
  
    // Calcula la SAR
    let Einc, Hinc, Sinc;
    if (escenarioSeleccionado) {
      Einc = escenarioSeleccionado.Einc(frecuenciaMHz);
      Hinc = escenarioSeleccionado.Hinc(frecuenciaMHz);
      Sinc = escenarioSeleccionado.Sinc;
    } else {
      alert("No se encontró un escenario válido para la frecuencia y tipo de usuario.");
      return;
    }
  
    const campoElectrico = Einc || Math.sqrt(30 * potenciaRadiada * ganancia / impedanciaEspacioLibre); // Suponiendo impedancia del espacio libre si no hay valor específico
  
    const SAR = (potenciaRadiada * Math.pow(campoElectrico, 2)) / (4 * Math.PI * Math.pow(distancia, 2) * densidad);
  
    // Muestra el resultado con la comparación del límite
    const SAR1 = document.getElementById("SAR");
    const limite = document.getElementById("limite");
    const cumplimiento = document.getElementById("cumplimiento");
  
    let limiteSAR;
    if (tipoUsuario === "Poblacion General") {
      limiteSAR = 1; // W/kg
    } else if (tipoUsuario === "Ocupacional") {
      limiteSAR = 10; // W/kg
    } else {
      alert("Tipo de usuario no válido");
      return;
    }
  
    const SARStr = ` ${SAR.toFixed(3)} W/kg.`;
    const limiteSARStr = ` Limite para ${tipoUsuario}: ${limiteSAR} W/kg.`;

    const cumplimientoStr = `${SAR <= limiteSAR ?  "Cumple con la Resolución 773\n ARTÍCULO 4o. FUENTES INHERENTEMENTE CONFORMES.\n<Resolución derogada por el artículo 14 de la Resolución 754 de 2016>\nARTÍCULO 5o. FUENTES NORMALMENTE CONFORMES. \n<Resolución derogada por el artículo 14 de la Resolución 754 de 2016> \nARTÍCULO 9o. METODOLOGÍA DE MEDICIONES.\n <Resolución derogada por el artículo 14 de la Resolución 754 de 2016> \n"
                                                    : "No cumple con la Resolución 773 , \ninflingue los articulos validado en el ITU-T Rec. K.100"}`;

  
    SAR1.value = SARStr;
    limite.value = limiteSARStr;
    cumplimiento.value = cumplimientoStr;

  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", (event) => {
        event.preventDefault(); // Detiene el comportamiento predeterminado del formulario

        const $elementoParaConvertir = document.body;
        html2pdf()
            .set({
                margin: 1,
                filename: 'RES_773.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait'
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err))
            .finally()
            .then(() => {
                console.log("Guardado!")
            })
    })
})
