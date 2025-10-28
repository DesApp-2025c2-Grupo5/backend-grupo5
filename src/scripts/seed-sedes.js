const mongoose = require("mongoose");
const dotenv = require("dotenv");
const SedeModel = require("../models/sede").default;

dotenv.config();

const sedesData = [
    {
        nombre: "Hospital Privado de Morón",
        direccion: {
            calle: "Av. Rivadavia",
            numero: "17918",
            localidad: "Morón",
            entreCalles: "25 de Mayo y Cabildo",
        },
        telefono: "+54 11 4627-4100",
        email: "contacto.hpm@moron.com.ar",
    },
    {
        nombre: "Sanatorio Modelo de Caseros",
        direccion: {
            calle: "Av. San Martín",
            numero: "2600",
            localidad: "Caseros",
            entreCalles: "Belgrano y Mitre",
        },
        telefono: "+54 11 4750-6000",
        email: "turnos.smc@smc.com",
    },
    {
        nombre: "Clínica Ciudad de Ituzaingó",
        direccion: {
            calle: "Pringles",
            numero: "155",
            localidad: "Ituzaingó",
            entreCalles: "Soler y Gral. José Artigas",
        },
        telefono: "+54 11 4624-9000",
        email: "info@clinicaituzaingo.org",
    },
    {
        nombre: "Hospital Universitario Austral (Sede Pilar)",
        direccion: {
            calle: "Av. Juan D. Perón",
            numero: "1500",
            localidad: "Pilar",
            entreCalles: "Paseo del Pilar y Caamaño",
        },
        telefono: "+54 230 4482-000",
        email: "administracion@austral.edu.ar",
    },
    {
        nombre: "Centro Médico de Ramos Mejía",
        direccion: {
            calle: "Avenida de Mayo",
            numero: "588",
            localidad: "Ramos Mejía",
            entreCalles: "Belgrano y Viamonte",
        },
        telefono: "+54 11 4656-1111",
        email: "atencion@cmrm.net",
    },
    {
        nombre: "Consultorio Dr. Flores",
        direccion: {
            calle: "Almafuerte",
            numero: "3250",
            localidad: "San Justo",
            entreCalles: "Av. Monseñor Bufano y Ombú",
        },
        telefono: "+54 11 4651-7890",
        email: "flores.consultorio@gmail.com",
    },
    {
        nombre: "Hospital Zonal General de Agudos Dr. Güemes",
        direccion: {
            calle: "Gral. Belgrano",
            numero: "450",
            localidad: "Haedo",
            entreCalles: "Av. Pte. Perón y Gral. Paz",
        },
        telefono: "+54 11 4659-7000",
        email: "dirección@hospitalguemes.gov.ar",
    },

    {
        nombre: "Clínica del Parque",
        direccion: {
            calle: "Av. Bartolomé Mitre",
            numero: "3050",
            localidad: "Moreno",
            entreCalles: "Salta y Saavedra",
        },
        telefono: "+54 237 466-1000",
        email: "admin@clinicadelparque.com",
    },
    {
        nombre: "Sanatorio San Lucas",
        direccion: {
            calle: "Alcorta",
            numero: "450",
            localidad: "Moreno",
            entreCalles: "Corrientes y 9 de Julio",
        },
        telefono: "+54 237 466-2000",
        email: "turnos@sanatoriosanlucas.com.ar",
    },
    {
        nombre: "Consultorios del Sol",
        direccion: {
            calle: "Sarmiento",
            numero: "185",
            localidad: "Moreno",
            entreCalles: "Av. Victorica y Tablada",
        },
        telefono: "+54 237 466-3000",
        email: "contacto@consultoriosdelsol.com",
    },
    {
        nombre: "Centro de Diagnóstico Integral Oeste",
        direccion: {
            calle: "Av. Francisco Piovano",
            numero: "5200",
            localidad: "Moreno",
            entreCalles: "Vera y Azcuénaga",
        },
        telefono: "+54 237 466-4000",
        email: "diagnostico@cdioeste.com",
    },
    {
        nombre: "Hospital Municipal Merlo",
        direccion: {
            calle: "Av. Calle Real",
            numero: "1200",
            localidad: "Merlo",
            entreCalles: "Libertad y Fray Camilo Monteagudo",
        },
        telefono: "+54 220 488-5000",
        email: "info@hospitalmerlo.gov.ar",
    },
    {
        nombre: "Policlínico General Belgrano",
        direccion: {
            calle: "Libertad",
            numero: "150",
            localidad: "Merlo",
            entreCalles: "Av. 25 de Mayo y Suipacha",
        },
        telefono: "+54 220 488-6000",
        email: "consultas@policlinicobelgrano.com",
    },
    {
        nombre: "Consultorio Pediátrico Estrellitas",
        direccion: {
            calle: "Las Heras",
            numero: "780",
            localidad: "Merlo",
            entreCalles: "Av. Argentina y Balbín",
        },
        telefono: "+54 220 488-7000",
        email: "pediatria@estrellitasmerlo.com",
    },
    {
        nombre: "Clínica Odontológica Sonrisa",
        direccion: {
            calle: "25 de Mayo",
            numero: "250",
            localidad: "Merlo",
            entreCalles: "Av. Calle Real y Juncal",
        },
        telefono: "+54 220 488-8000",
        email: "odontologia@sonrisasmerlo.com",
    },
    {
        nombre: "Sanatorio Flandes",
        direccion: {
            calle: "España",
            numero: "1230",
            localidad: "Luján",
            entreCalles: "9 de Julio y San Martín",
        },
        telefono: "+54 2323 42-1500",
        email: "sanatorioflandes@lujan.com",
    },
    {
        nombre: "Centro de Rehabilitación Vida Activa",
        direccion: {
            calle: "Lezica",
            numero: "880",
            localidad: "Luján",
            entreCalles: "Mitre y Las Heras",
        },
        telefono: "+54 2323 42-2500",
        email: "reha@vidaactiva.org",
    },
    {
        nombre: "Consultorio Traumatológico Luján",
        direccion: {
            calle: "Dr. Muñiz",
            numero: "150",
            localidad: "Luján",
            entreCalles: "San Martín y Alsina",
        },
        telefono: "+54 2323 42-3500",
        email: "trauma@consultoriolujan.net",
    },
    {
        nombre: "Clínica General Rodríguez Central",
        direccion: {
            calle: "Av. España",
            numero: "700",
            localidad: "General Rodríguez",
            entreCalles: "9 de Julio y Intendente Garrahan",
        },
        telefono: "+54 237 484-1000",
        email: "clinica.gr@central.net",
    },
    {
        nombre: "Consultorio Geriátrico Esperanza",
        direccion: {
            calle: "2 de Abril",
            numero: "1500",
            localidad: "General Rodríguez",
            entreCalles: "Viamonte y Pellegrini",
        },
        telefono: "+54 237 484-2000",
        email: "geriatrico@esperanza.com",
    },
    {
        nombre: "Policlínico Privado San Miguel",
        direccion: {
            calle: "Belgrano",
            numero: "1345",
            localidad: "San Miguel",
            entreCalles: "Av. Pte. Perón y Sarmiento",
        },
        telefono: "+54 11 4667-1000",
        email: "info@ppsmiguel.com",
    },
    {
        nombre: "Centro de Salud Mental Armonía",
        direccion: {
            calle: "Balbín",
            numero: "2500",
            localidad: "San Miguel",
            entreCalles: "Muñiz y Paunero",
        },
        telefono: "+54 11 4667-2000",
        email: "saludmental@armonia.org",
    },
    {
        nombre: "Consultorio Oftalmológico Vista Clara",
        direccion: {
            calle: "Perón",
            numero: "550",
            localidad: "San Miguel",
            entreCalles: "Mitre y España",
        },
        telefono: "+54 11 4667-3000",
        email: "vista.clara@oftalmo.net",
    },
    {
        nombre: "Hospital Universitario Tres de Febrero",
        direccion: {
            calle: "Av. Rivadavia",
            numero: "14000",
            localidad: "Tres de Febrero",
            entreCalles: "Gral. Paz y Cnel. Mont",
        },
        telefono: "+54 11 4716-1000",
        email: "hun.3f@hospital.ar",
    },
    {
        nombre: "Consultorio Kinesiológico Movimiento",
        direccion: {
            calle: "San Lorenzo",
            numero: "450",
            localidad: "Tres de Febrero",
            entreCalles: "Av. Urquiza y Av. Bartolomé Mitre",
        },
        telefono: "+54 11 4716-2000",
        email: "kinesiologia@movimiento.com",
    },
]

// Función principal para poblar la base de datos
async function poblarBaseDeDatosSedes() {
  const MONGODB_URI = process.env.MONGODB_URI;

  // 1. Verificar MONGODB_URI
  if (!MONGODB_URI) {
    console.error("❌ ERROR: La variable de entorno MONGODB_URI no está definida en tu archivo .env");
    console.error("⛔ El script no puede continuar. Por favor, revisa tu .env y reintenta.");
    process.exit(1); // Sale con código de error
  }
  
  try {
    // 2. Conectar a MongoDB con opciones para evitar el cuelgue
    console.log("⏳ Intentando conectar a MongoDB...");

    // Configuración para forzar un timeout más rápido en caso de fallo de red
    const connectionOptions = {
        serverSelectionTimeoutMS: 5000, // 5 segundos para seleccionar un servidor
        socketTimeoutMS: 45000,         // 45 segundos para el socket
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    
    // Conectar
    await mongoose.connect(MONGODB_URI, connectionOptions);

    console.log("✅ Conectado a MongoDB");

    // 3. Limpiar la colección de sedes
    console.log("🧹 Limpiando la colección 'sedes'...");
    await SedeModel.deleteMany({});
    console.log("✅ Colección 'sedes' limpiada.");

    // 4. Insertar los nuevos datos
    console.log("🏥 Insertando datos de sedes médicas...");
    const sedesInsertadas = await SedeModel.insertMany(sedesData);

    console.log(`\n🎉 ¡Proceso completado exitosamente!`);
    console.log(`📊 Se insertaron ${sedesInsertadas.length} sedes en la base de datos.`);
    
  } catch (error) {
    // Manejo de errores de conexión o inserción
    console.error("\n❌ ERROR CRÍTICO DURANTE LA CONEXIÓN O INSERCIÓN:", error.message);
    console.error("POSIBLES CAUSAS:");
    console.error(" - La URI es incorrecta (credenciales, puerto, IP).");
    console.error(" - El servidor MongoDB no está corriendo (servicio local o Atlas).");
    console.error(" - Problemas de red o firewall.");
    if (error.code === 11000) {
        console.error("❌ Error de clave duplicada. Revisa los nombres de las sedes (unique: true).");
    }
  } finally {
    // 5. Cerrar la conexión
    if (mongoose.connection.readyState === 1) { // 1 significa conectado
        await mongoose.connection.close();
        console.log("🔌 Conexión a MongoDB cerrada");
    }
    process.exit(0);
  }
}

// Ejecutar el script
console.log("🚀 Iniciando el script de población de sedes médicas...");
poblarBaseDeDatosSedes();