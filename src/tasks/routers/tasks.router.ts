import { validateToken } from "../../auth/jwt";
import router from "../tasks.controller";

router.use(validateToken);
router.prefix('/tasks')

router.get('', async (ctx) => function);
router.get('/completed', async (ctx) => function);
router.get('/irrelevant', async (ctx) => function);