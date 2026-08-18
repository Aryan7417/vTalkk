import { Router } from "express";

import {
  updateProfileController,
} from "../controller/user.controller";

import {
  authMiddleware,
} from "../middleware/auth.middlewere";

const router = Router();

router.patch(
  "/profile",
  authMiddleware,
  updateProfileController
);

export default router;