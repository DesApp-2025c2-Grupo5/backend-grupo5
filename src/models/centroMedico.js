const mongoose = require("mongoose");

const centroMedicoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    cuit: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{11}$/.test(v);
            },
            message: "El CUIT debe tener exactamente 11 dígitos",
        },
    },
    password: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    telefono: {
        type: String,
        required: false,
        trim: true,
    },
    sedes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sede",
    }],
    estado: {
        type: String,
        enum: ["Activo", "Inactivo"],
        default: "Activo",
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_actualizacion: {
        type: Date,
        default: Date.now,
    },
});

const CentroMedicoModel = mongoose.model("CentroMedico", centroMedicoSchema);

module.exports = CentroMedicoModel;