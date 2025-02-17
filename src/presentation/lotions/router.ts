import { Router } from 'express';
import { getVentas, createVenta } from '../lotions/ventaController';
import { getCompras, createCompra } from '../lotions/compraController';
import { getEmpleados, createEmpleado } from '../lotions/empleadoController';

const router = Router();

// Rutas de ventas
router.get('/ventas', getVentas);
router.post('/ventas', createVenta);

// Rutas de compras
router.get('/compras', getCompras);
router.post('/compras', createCompra);

// Rutas de empleados
router.get('/empleados', getEmpleados);
router.post('/empleados', createEmpleado);

export default router;
