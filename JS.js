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
  
  function PTRadiada() {
    // Evita el comportamiento predeterminado del envío del formulario
    event.preventDefault();
  
    // Obtiene los valores de los elementos del formulario
    const frecuencia = parseFloat(document.getElementById("Frecuencia").value);
    const ganancia = parseFloat(document.getElementById("Ganancia").value);
    const altura = parseFloat(document.getElementById("Altura").value);
    const distancia = parseFloat(document.getElementById("Distancia").value);
    const potencia = parseFloat(document.getElementById("Potencia").value);
    const tipoUsuario = document.getElementById("TipoUsuario").value;
  
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
    const cumplimientoStr = `${SAR <= limiteSAR ? "Cumple con la Resolución 773" : "No cumple con la Resolución 773"}`;
  
    SAR1.value = SARStr;
    limite.value = limiteSARStr;
    cumplimiento.value = cumplimientoStr;
  }
  
  