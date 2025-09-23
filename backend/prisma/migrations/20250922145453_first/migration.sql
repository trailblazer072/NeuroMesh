-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "clerkId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
