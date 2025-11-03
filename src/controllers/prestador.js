const Prestador = require('../models/prestador');
const CentroMedico = require('../models/centroMedico')
const { generateToken } = require('../utils/jwt');


function normalizarCUIT(valor) {
    if (valor === undefined || valor === null) return '';
    return String(valor).replace(/\D/g, '');
}

exports.loginPrestador = async (req, res) => {
    try {
        const { cuit, password } = req.body;
        const cuitNormalizado = normalizarCUIT(cuit);

        if (cuitNormalizado.length !== 11) {
            return res.status(400).json({ message: 'CUIT inválido. Debe tener 11 dígitos.' });
        }

        let usuario;
        let tipoUsuario;

        
        usuario = await Prestador.findOne({ cuit: cuitNormalizado });
        if (usuario) {
            tipoUsuario = 'prestador';
        } else {
            
            usuario = await CentroMedico.findOne({ cuit: cuitNormalizado });
            if (usuario) {
                tipoUsuario = 'centroMedico';
            }
        }

       
        if (!usuario) {
            return res.status(401).json({ message: 'CUIT incorrecto o no registrado' });
        }
        if (usuario.estado !== 'Activo') {
            return res.status(401).json({ message: `${tipoUsuario === 'prestador' ? 'Prestador' : 'Centro Médico'} inactivo` });
        }
        
        if (usuario.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        
        
        const accessToken = generateToken({ _id: usuario._id, role: tipoUsuario }); 

        
        let userData;
        if (tipoUsuario === 'prestador') {
            userData = {
                _id: usuario._id,
                nombres: usuario.nombres,
                apellidos: usuario.apellidos,
                matricula: usuario.matricula,
                role: tipoUsuario,
            };
        } else { 
            userData = {
                _id: usuario._id,
                nombres: usuario.nombre,
                apellidos: "",
                role: tipoUsuario,
                
            };
        }

        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            accessToken, 
            prestador: userData, 
        });
    } catch (error) {
        console.error('Error en el login unificado:', error);
        res.status(500).json({ message: error.message || "Error interno del servidor" });
    }
};