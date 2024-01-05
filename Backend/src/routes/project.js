import express from "express";
import projectController from "../controllers/projectController";
import deletedController from "../controllers/deletedController";

const router = express.Router();

router.post("/createProject", projectController.createProject);
router.get("/getFolderChild", projectController.getFolderChild);
router.get("/getFileChild", projectController.getFileChild);
router.get("/getInfoProject", projectController.getInfoProject);
router.get("/getProjectByUserID", projectController.getProjectByUserID);
router.get("/getProjectByUserSort", projectController.getProjectByUserSort);
router.get("/getAllProject", projectController.getAllProject);
router.post('/deletePenPermanently', deletedController.deleteProjectPermanently); 
router.post('remove', projectController.removeProject);
router.post('/restore', projectController.restoreProject);

module.exports = router;