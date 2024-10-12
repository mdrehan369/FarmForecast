/*
  Warnings:

  - You are about to drop the column `address_id` on the `User` table. All the data in the column will be lost.
  - Made the column `voterIdNumber` on table `Documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `voterIdPhoto` on table `Documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aadharCardNumber` on table `Documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aadharCardPhoto` on table `Documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `panCardNumber` on table `Documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `panCardPhoto` on table `Documents` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `staffId` to the `PriceData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_address_id_key";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "country" SET DEFAULT 'India',
ALTER COLUMN "landmark" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Documents" ALTER COLUMN "voterIdNumber" SET NOT NULL,
ALTER COLUMN "voterIdPhoto" SET NOT NULL,
ALTER COLUMN "aadharCardNumber" SET NOT NULL,
ALTER COLUMN "aadharCardPhoto" SET NOT NULL,
ALTER COLUMN "panCardNumber" SET NOT NULL,
ALTER COLUMN "panCardPhoto" SET NOT NULL;

-- AlterTable
ALTER TABLE "PriceData" ADD COLUMN     "staffId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address_id";

-- AddForeignKey
ALTER TABLE "PriceData" ADD CONSTRAINT "PriceData_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
