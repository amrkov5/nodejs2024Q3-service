-- CreateTable
CREATE TABLE "Auth" (
    "userId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("userId")
);
