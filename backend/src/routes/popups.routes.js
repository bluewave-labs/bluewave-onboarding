import express from 'express';
import { createPopup, getPopups, getPopupById } from '../controllers/popup.controller';

const router = express.Router();

router.post('/create', createPopup);
router.get('/all', getPopups);
router.get('/:id', getPopupById);

export default router;
