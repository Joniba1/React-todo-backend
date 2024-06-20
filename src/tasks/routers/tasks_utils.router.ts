import { validateToken } from "../../auth/jwt";
import router from "../tasks.controller";

router.use(validateToken);
router.prefix('/tasks')

router.put('/edit', async (ctx) => editTaskController);
router.delete('/delete', async (ctx) => editTaskController);
router.put('/search', async (ctx) => editTaskController);
router.post('/complete', async (ctx) => editTaskController);
router.post('/relevance', async (ctx) => editTaskController);
