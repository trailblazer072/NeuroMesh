import express from "express";

const router = express.Router();
import { authMiddleware, AuthenticatedRequest } from "../middleware/clerkMiddleware";

import prismaClient from "../config/db";


async function getOrCreateUser(req : AuthenticatedRequest) {

        let userId = req.clerk?.userId as string;
        // Fetch user details from your database using Prisma
        let user = await prismaClient.user.findFirst({
            where: { clerk_id: userId },
        });
        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    clerk_id: userId,
                    name : req.clerk?.user.username || req.clerk?.user.firstName,}})
        }
    return user;
}

// Route to get user details
router.get('/', authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
        if (!req.clerk) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await getOrCreateUser(req);
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }})

  export default router;  