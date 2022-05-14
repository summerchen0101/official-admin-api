-- CreateTable
CREATE TABLE "OperationRec" (
    "id" SERIAL NOT NULL,
    "controller" TEXT NOT NULL,
    "handler" TEXT NOT NULL,
    "operator_id" TEXT NOT NULL,
    "reqBody" JSONB,
    "reqPath" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "resData" JSONB,

    CONSTRAINT "OperationRec_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OperationRec" ADD CONSTRAINT "OperationRec_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
