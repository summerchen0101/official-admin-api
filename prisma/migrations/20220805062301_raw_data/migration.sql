-- CreateTable
CREATE TABLE "RawData" (
    "code" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "RawData_pkey" PRIMARY KEY ("code")
);
