//objeto de ruteo
import { Router } from 'express';

// routes:
import helpTasks from './helpTasks';
import todos from './todos';

const router = Router();

router.use('/helpTasks', helpTasks);
router.use('/todos', todos);

export default router;
