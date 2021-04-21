import routerx from 'express-promise-router'
import { authenticate, debit, credit } from '../controllers/fairylandController'

const router=routerx()

router.post("/authenticate", authenticate)
router.post("/debit", debit)
router.post("/credit", credit)

export default router