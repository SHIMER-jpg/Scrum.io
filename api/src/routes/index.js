//objeto de ruteo
import { Router } from 'express';

// routes:
import helpTasks from './helpTasks';
import toDos from './toDos';

const router = Router();

router.use('/helpTasks', helpTasks);
router.use('/toDos', toDos);

export default router;