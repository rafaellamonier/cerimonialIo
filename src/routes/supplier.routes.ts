import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CreateSupplierController } from "../controller/supplier/CreateSupplierController";
import { ListSuppliersController } from "../controller/supplier/ListSuppliersController";
import { UpdateSupplierStatusController } from "../controller/supplier/UpdateSupplierStatusController";
import { DeleteSupplierController } from "../controller/supplier/DeleteSupplierController";

const supplierRoutes = Router();

const createSupplierController = new CreateSupplierController();
const listSuppliersController = new ListSuppliersController();
const updateSupplierStatusController = new UpdateSupplierStatusController();
const deleteSupplierController = new DeleteSupplierController();

supplierRoutes.post("/", authMiddleware, createSupplierController.handle);
supplierRoutes.get("/", authMiddleware, listSuppliersController.handle);
supplierRoutes.patch("/:id/status", authMiddleware, updateSupplierStatusController.handle);
supplierRoutes.delete("/:id", authMiddleware, deleteSupplierController.handle);

export { supplierRoutes };