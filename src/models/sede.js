import mongoose from 'mongoose';

const DireccionSchema = new mongoose.Schema({
    calle: {
        type: String,
        required: true,
        trim: true,
    },
    numero: {
        type: String,
        required: true,
        trim: true,
    },
    localidad: {
        type: String,
        required: true,
        trim: true,
    },
    entreCalles: {
        type: String,
        trim: true,
        default: '',
    },
}, { _id: false });


const SedeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    direccion: {
        type: DireccionSchema,
        required: true,
    },

    telefono: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
    },
});

const Sede = mongoose.model('Sede', SedeSchema);

export default Sede;