import { Router } from "express";
import { getMyPassport, markMinted, updateMyPassport } from "../controllers/passport.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/me", requireAuth, asyncHandler(getMyPassport));
router.put("/me", requireAuth, asyncHandler(updateMyPassport));
router.post("/mark-minted", requireAuth, asyncHandler(markMinted));

export default router;
