const PrestadorModel = require("../models/prestador");       // Prestador Individual
const CentroMedicoModel = require("../models/centroMedico"); // Centro Médico (ASUMIDO)
const { verifyToken } = require("../utils/jwt");

exports.verifyTokenMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = verifyToken(token);
        
        // 1. 🔐 Verificar Token Decodificado, Expiración, e inclusión del ROl
        if (!decoded?._id || !decoded.role || decoded.exp < (Date.now() / 1000)) {
            throw new Error("Token inválido, expirado o sin rol");
        }

        let usuario;
        
        // 2. 🔍 Búsqueda Dinámica basada en el rol (Decoded.role)
        if (decoded.role === 'prestador') {
            // Si el rol es 'prestador', buscamos en el modelo Prestador
            usuario = await PrestadorModel.findById(decoded._id).select("-password");
        } else if (decoded.role === 'centroMedico') {
            // Si el rol es 'centroMedico', buscamos en el modelo CentroMedico
            usuario = await CentroMedicoModel.findById(decoded._id).select("-password");
        } else {
            throw new Error("Rol de usuario desconocido");
        }
        
        // 3. ✅ Verificar existencia y estado
        if (!usuario || usuario.estado !== 'Activo') {
            throw new Error("Usuario inactivo o no encontrado");
        }

        // 4. 🟢 Adjuntar el objeto encontrado a la request (usando un nombre genérico)
        req.usuario = usuario; 
        req.role = decoded.role; // Opcional, pero útil para la lógica de rutas
        
        next();
        
    } catch (error) {
        // En producción, solo retornar el 401 por seguridad
        return res.status(401).json({ message: "Unauthorized" });
    }
};
