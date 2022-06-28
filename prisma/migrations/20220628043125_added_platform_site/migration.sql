-- CreateTable
CREATE TABLE "PlatformSite" (
    "host" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "desc" TEXT,

    CONSTRAINT "PlatformSite_pkey" PRIMARY KEY ("host")
);
