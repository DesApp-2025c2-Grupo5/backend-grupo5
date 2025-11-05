const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Configurar dotenv
dotenv.config();

// Importar modelos
const PrestadorModel = require("../models/prestador");
const SedeModel = require("../models/sede"); // Se asume que el modelo Sede está en ../models/sede

// =========================================================================
// DATOS ESTÁTICOS Y FUNCIONES DE GENERACIÓN
// =========================================================================

const especialidades = [
  "Cardiología",
  "Dermatología",
  "Pediatría",
  "Ginecología",
  "Traumatología",
  "Neurología",
  "Oftalmología",
  "Gastroenterología",
  "Psiquiatría",
  "Endocrinología",
  "Urología",
  "Otorrinolaringología",
  "Medicina General",
  "Radiología",
  "Anestesiología",
  "Cirugía General",
  "Oncología",
  "Neumología",
  "Reumatología",
  "Infectología",
];

const nombres = [
  "Carlos", "María", "Juan", "Ana", "Roberto", "Patricia", "José", "Laura", "Luis",
  "Carmen", "Miguel", "Isabel", "Antonio", "Teresa", "Francisco", "Rosa", "Alejandro",
  "Mónica", "Rafael", "Elena", "Fernando", "Silvia", "Eduardo", "Pilar", "Jorge",
  "Mercedes", "Diego", "Esperanza", "Alberto", "Gloria", "Sergio", "Beatriz",
  "Raúl", "Dolores", "Andrés", "Cristina", "Javier", "Amparo", "Óscar", "Remedios",
];

const apellidos = [
  "García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez",
  "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno",
  "Muñoz", "Álvarez", "Romero", "Alonso", "Gutiérrez", "Navarro", "Torres",
  "Domínguez", "Vázquez", "Ramos", "Gil", "Ramírez", "Serrano", "Blanco", "Suárez",
  "Molina", "Morales", "Ortega", "Delgado", "Castro", "Ortiz", "Rubio", "Marín",
  "Sanz", "Iglesias",
];

const ciudades = [
  "Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "Tucumán", "Mar del Plata",
  "Salta", "Santa Fe", "San Juan", "Resistencia", "Neuquén", "Santiago del Estero",
  "Corrientes", "Posadas",
];

const provincias = [
  "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Tucumán", "Salta", "Entre Ríos",
  "Misiones", "Chaco", "San Juan", "Jujuy", "Río Negro", "Neuquén", "Chubut",
  "Santa Cruz", "Tierra del Fuego", "La Pampa", "Santiago del Estero",
  "Corrientes", "Catamarca", "La Rioja", "Formosa",
];

const calles = [
  "Av. Corrientes", "San Martín", "Belgrano", "Rivadavia", "Mitre", "Sarmiento",
  "Alsina", "Moreno", "Urquiza", "Av. 9 de Julio", "Independencia", "25 de Mayo",
  "Alem", "Pellegrini", "Maipú", "Tucumán", "Santa Fe", "Córdoba",
];

const nombresClinicas = [
  "Clínica Mitre", "Sanatorio Modelo", "Centro Médico San Lucas", "Clínica del Sol",
  "Hospital Privado Central", "Sanatorio Belgrano", "Centro de Salud Integral",
  "Clínica Santa María", "Instituto Médico del Sur", "Clínica Regional",
];

function generarCUIT() {
  let cuit = "";
  for (let i = 0; i < 11; i++) {
    cuit += Math.floor(Math.random() * 10);
  }
  return cuit;
}

function generarMatricula() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let matricula = "";
  const numLetras = Math.floor(Math.random() * 2) + 2;
  const numDigitos = Math.floor(Math.random() * 3) + 4;

  for (let i = 0; i < numLetras; i++) {
    matricula += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  for (let i = 0; i < numDigitos; i++) {
    matricula += Math.floor(Math.random() * 10);
  }
  return matricula;
}

function generarTelefono() {
  const codigo = Math.floor(Math.random() * 900) + 100;
  const numero = Math.floor(Math.random() * 9000000) + 1000000;
  return `+54 ${codigo} ${numero}`;
}

function generarEmailProfesional(nombres, apellidos, especialidad) {
  const nombre = nombres.toLowerCase().replace(/\s+/g, "");
  const apellido = apellidos.toLowerCase().replace(/\s+/g, "");
  const especialidadCorta = especialidad.toLowerCase().replace(/\s+/g, "");

  const dominios = ["medicos.com.ar", "salud.gov.ar", "hospital.com", "clinica.com.ar"];
  const dominio = dominios[Math.floor(Math.random() * dominios.length)];

  const opciones = [
    `dr.${nombre}${apellido}@${dominio}`,
    `${nombre}.${apellido}@${dominio}`,
    `${apellido}${especialidadCorta}@${dominio}`,
    `dr${apellido}@${dominio}`,
  ];
  return opciones[Math.floor(Math.random() * opciones.length)];
}

function generarDireccion() {
  const calle = calles[Math.floor(Math.random() * calles.length)];
  const numero = Math.floor(Math.random() * 9999) + 1;
  const piso = Math.random() > 0.6 ? `, Piso ${Math.floor(Math.random() * 20) + 1}` : "";
  return `${calle} ${numero}${piso}`;
}

function generarPassword() {
  return `medico${Math.floor(Math.random() * 9999) + 1000}`;
}

function generarPrestadores(cantidad) {
  const prestadores = [];
  const cuitsUsados = new Set();
  const matriculasUsadas = new Set();

  for (let i = 0; i < cantidad; i++) {
    let cuit, matricula;

    do {
      cuit = generarCUIT();
    } while (cuitsUsados.has(cuit));
    cuitsUsados.add(cuit);

    do {
      matricula = generarMatricula();
    } while (matriculasUsadas.has(matricula));
    matriculasUsadas.add(matricula);

    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    const esCentroMedico = Math.random() > 0.85; // 15% chance

    let especialidadesPrestador;
    if (esCentroMedico) {
      const numEspecialidades = Math.floor(Math.random() * 4) + 3; // 3-6
      const especialidadesSet = new Set();
      while (especialidadesSet.size < numEspecialidades && especialidadesSet.size < especialidades.length) {
        const esp = especialidades[Math.floor(Math.random() * especialidades.length)];
        especialidadesSet.add(esp);
      }
      especialidadesPrestador = Array.from(especialidadesSet);
    } else {
      const especialidad = especialidades[Math.floor(Math.random() * especialidades.length)];
      especialidadesPrestador = [especialidad];
    }

    let nombrePrestador, apellidoPrestador, emailPrestador;
    if (esCentroMedico) {
      const nombreClinica = nombresClinicas[Math.floor(Math.random() * nombresClinicas.length)];
      nombrePrestador = nombreClinica;
      apellidoPrestador = "";
      const clinicaCorta = nombreClinica.toLowerCase().replace(/\s+/g, "").replace(/clínica|sanatorio|centro|hospital|instituto/gi, "");
      emailPrestador = `info@${clinicaCorta}.com.ar`;
    } else {
      nombrePrestador = nombre;
      apellidoPrestador = apellido;
      emailPrestador = generarEmailProfesional(nombre, apellido, especialidadesPrestador[0]);
    }

    const prestador = {
      nombres: nombrePrestador,
      apellidos: apellidoPrestador,
      telefono: generarTelefono(),
      email: emailPrestador,
      direccion: generarDireccion(),
      ciudad: ciudades[Math.floor(Math.random() * ciudades.length)],
      provincia: provincias[Math.floor(Math.random() * provincias.length)],
      especialidades: especialidadesPrestador,
      cuit: cuit,
      password: generarPassword(),
      matricula: matricula,
      es_centro_medico: esCentroMedico,
      estado: "Activo",
    };

    prestadores.push(prestador);
  }
  return prestadores;
}

function generarSedesParaCentro(centroId, nombreCentro) {
  const sedesData = [];
  const numSedes = Math.floor(Math.random() * 3) + 1; // 1 a 3 sedes

  for (let i = 0; i < numSedes; i++) {
    const ciudadSede = ciudades[Math.floor(Math.random() * ciudades.length)];
    const provinciaSede = provincias[Math.floor(Math.random() * provincias.length)];

    sedesData.push({
      nombre: `Sede ${nombreCentro} - ${ciudadSede} #${i + 1}`,
      direccion: generarDireccion(),
      ciudad: ciudadSede,
      provincia: provinciaSede,
      telefono: generarTelefono(),
      email: `sede${i + 1}-${centroId}@mail.com`,
      horario_apertura: "08:00",
      horario_cierre: "20:00",
      centro_medico_id: centroId,
      estado: "activa",
    });
  }
  return sedesData;
}


// =========================================================================
// FUNCIÓN PRINCIPAL DE POBLACIÓN
// =========================================================================

async function poblarPrestadores() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Conectado a MongoDB");

    // Limpiar colecciones
    console.log("🧹 Limpiando colecciones de Prestadores y Sedes...");
    await PrestadorModel.deleteMany({});
    await SedeModel.deleteMany({});
    console.log("🧹 Colecciones limpias.");

    // Generar y crear prestadores
    const cantidadPrestadores = 30;
    console.log(`🏥 Generando ${cantidadPrestadores} prestadores...`);
    const prestadoresAInsertar = generarPrestadores(cantidadPrestadores);

    const prestadoresCreados = [];
    for (const prestador of prestadoresAInsertar) {
      const prestadorCreado = await PrestadorModel.create(prestador);
      prestadoresCreados.push(prestadorCreado);

      const tipo = prestador.es_centro_medico ? "Centro Médico" : "Médico";
      const nombreCompleto = prestador.es_centro_medico
        ? prestadorCreado.nombres
        : `Dr. ${prestadorCreado.nombres} ${prestadorCreado.apellidos}`;
      const especialidadesStr = prestadorCreado.especialidades.join(", ");
      console.log(
        `✅ ${tipo} creado: ${nombreCompleto} - [${especialidadesStr}] (CUIT: ${prestadorCreado.cuit})`
      );
    }
    
    // Separar centros médicos y médicos individuales
    const centrosMedicos = prestadoresCreados.filter(p => p.es_centro_medico);
    const medicosIndividuales = prestadoresCreados.filter(p => !p.es_centro_medico);

    // ---------------------------------------------------
    // PASO 1: CREACIÓN Y ASIGNACIÓN DE SEDES A CENTROS MÉDICOS
    // ---------------------------------------------------
    console.log("\n🏢 Creando sedes para los Centros Médicos...");
    
    for (const centro of centrosMedicos) {
      const sedesData = generarSedesParaCentro(centro._id, centro.nombres);
      const sedesCreadas = await SedeModel.insertMany(sedesData);
      const sedeIds = sedesCreadas.map(s => s._id);

      // Asignar sedes al campo 'sedes' del centro médico
      await PrestadorModel.findByIdAndUpdate(centro._id, {
        $set: { sedes: sedeIds },
      });

      console.log(
        `   ✅ Centro '${centro.nombres}' actualizado con ${sedesCreadas.length} sede(s).`
      );
    }
    
    // ---------------------------------------------------
    // PASO 2: ASIGNACIÓN DE MÉDICOS A medicosQueTrabajan EN CENTROS
    // ---------------------------------------------------
    console.log("\n👨‍⚕️ Asignando médicos a los centros (medicosQueTrabajan)...");

    for (const centro of centrosMedicos) {
      // Tomar un subconjunto aleatorio de médicos individuales (entre 1 y 5)
      const numMedicos = Math.floor(Math.random() * 5) + 1; 
      const medicosAsignados = medicosIndividuales
        .sort(() => 0.5 - Math.random()) // Aleatorizar
        .slice(0, numMedicos)
        .map(m => m._id); // Obtener solo los IDs

      // Asignar los IDs al campo 'medicosQueTrabajan' del centro
      await PrestadorModel.findByIdAndUpdate(centro._id, {
        $set: { medicosQueTrabajan: medicosAsignados },
      });

      console.log(
        `   ✅ Centro '${centro.nombres}' asignado a ${medicosAsignados.length} médicos.`
      );
    }


    console.log(`\n🎉 ¡Proceso completado exitosamente!`);
    console.log(`📊 Se crearon ${prestadoresCreados.length} prestadores y ${centrosMedicos.length} centros con sedes.`);

  } catch (error) {
    console.error("❌ Error al poblar prestadores:", error);
    if (error.code === 11000) {
      console.error("💡 Error de duplicado: CUIT o matrícula ya existe. Intenta correr el script de nuevo.");
    }
  } finally {
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log("🔌 Conexión a MongoDB cerrada");
    process.exit(0);
  }
}

// Ejecutar el script
console.log("🚀 Iniciando creación de prestadores...");
poblarPrestadores();