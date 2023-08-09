import {test} from '../controllers/user.js';

import express from 'express';

const router = express.Router();

router.get("/test",test);


export default router;