import express from "express";
import { addStory, deleteStory, usersStory, viewStory } from "../controllers/Story-controllers.js";
import authenticateToken from "../middleware/authenticateToken.js"
import multer from "multer";

const upload = multer({ dest: 'uploads/' });
const storyRoutes = express.Router();


storyRoutes.post('/stories', authenticateToken, upload.single('media'),addStory);
storyRoutes.get('/stories', authenticateToken,usersStory);
storyRoutes.post('/stories/:id/view', authenticateToken,viewStory);
storyRoutes.delete('/stories/:id', authenticateToken,deleteStory);

export default storyRoutes;