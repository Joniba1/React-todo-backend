import { validateToken } from "../../auth/jwt";
import router from "../tasks.controller";
const taskControllers = require('./path/to/your/controller/file');

router.use(validateToken);
router.prefix('/tasks')

router.get('', async (ctx) => taskControllers.getTasks);
router.get('/completed', async (ctx) => taskControllers.getCompletedTasks);
router.get('/irrelevant', async (ctx) => taskControllers.getIrrelevantTasks);