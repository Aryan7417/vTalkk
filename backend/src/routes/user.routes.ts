import { Router } from "express";

import {
  updateProfileController,
  getAllUsersController,
} from "../controller/user.controller";

import { authMiddleware } from "../middleware/auth.middlewere";

const router = Router();

router.patch(
  "/profile",
  authMiddleware,
  updateProfileController
);

router.get(
  "/",
  authMiddleware,
  getAllUsersController
);

export default router;