const Sede = require('../models/sede');

exports.getSedeByID = async (req, res) => {
    try {
        const { id } = req.params;
        const sede = await Sede.findById(id)
        if (!sede) {
            return res.status(404).json({ message: 'Sede no encontrada' });
        }
        res.status(200).json(sede);
    } catch (error) {
        console.error('Error al obtener sede:', error);
        res.status(500).json({
            message: error.message || "Error interno del servidor"
        })
    }
}