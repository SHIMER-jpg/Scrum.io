//objeto de ruteo
import { Router } from 'express';

// routes:
import todoHelp from './todoHelp';
import todos from './todos';

const router = Router();

router.use('/todoHelp', todoHelp);
router.use('/todos', todos);

export default router;
