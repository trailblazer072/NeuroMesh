import { Request, Response, NextFunction } from 'express';
import { createClerkClient, verifyToken } from '@clerk/backend';

export interface AuthenticatedRequest extends Request {
  clerk?: {
    sessionId: string;
    userId: string;
    user: any; // Will contain full user details
  };
}

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'No authorization header' });
      return;
    }

    // Remove "Bearer " prefix
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    // Create Clerk client instance
    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
    

    // Verify the JWT token (most common approach)
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
      audience: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    });
    
    if (!payload || !payload.sub) {
      res.status(401).json({ message: 'Unauthorized - Invalid token' });
      return;
    }

    // Fetch complete user details using the user ID from token payload
    const user = await clerkClient.users.getUser(payload.sub);
    
    if (!user) {
      res.status(401).json({ message: 'Unauthorized - User not found' });
      return;
    }

    // Attach user details to request
    req.clerk = {
      sessionId: payload.sid || '', // session ID from token
      userId: payload.sub,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddresses: user.emailAddresses,
        phoneNumbers: user.phoneNumbers,
        imageUrl: user.imageUrl,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastSignInAt: user.lastSignInAt,
        publicMetadata: user.publicMetadata,
        privateMetadata: user.privateMetadata,
        unsafeMetadata: user.unsafeMetadata,
        // Add any other user properties you need
      }
    };
    next();
  } catch (err: any) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Unauthorized', error: err.message });
    return;
  }
}

export default authMiddleware;