-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'ADMIN', 'OFFICER');

-- CreateEnum
CREATE TYPE "Zone" AS ENUM ('NORTH', 'SOUTH', 'EAST', 'WEST');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('CURRENT', 'PERMANENT');

-- CreateEnum
CREATE TYPE "PriceDataType" AS ENUM ('RETAIL', 'WHOLESALE');

-- CreateEnum
CREATE TYPE "Commodities" AS ENUM ('RICE', 'WHEAT', 'ATTA', 'GRAM_DAL', 'ARHAR_DAL', 'URAD_DAL', 'MOONG_DAL', 'MASOOR_DAL', 'SUGAR', 'MILK', 'GROUNDNUT_OIL', 'MUSTARD_OIL', 'VANASPATI', 'SOYA_OIL', 'SUNFLOWER_OIL', 'PALM_OIL', 'GUR', 'TEA_LOOSE', 'SALT', 'POTATO', 'ONION', 'TOMATO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "type" "Role" NOT NULL DEFAULT 'STAFF',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "type" "AddressType" NOT NULL DEFAULT 'CURRENT',
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "zone" "Zone" NOT NULL DEFAULT 'NORTH',
    "userId" INTEGER,
    "priceReportingCentreId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "voterIdNumber" TEXT,
    "voterIdPhoto" TEXT,
    "aadharCardNumber" TEXT,
    "aadharCardPhoto" TEXT,
    "panCardNumber" TEXT,
    "panCardPhoto" TEXT,
    "passportNumber" TEXT,
    "passportPhoto" TEXT,
    "drivingLicenceNumber" TEXT,
    "drivingLicencePhoto" TEXT,
    "priceReportingCentreId" INTEGER,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceReportingCentre" (
    "id" SERIAL NOT NULL,
    "headName" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PriceReportingCentre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceData" (
    "id" SERIAL NOT NULL,
    "type" "PriceDataType" NOT NULL DEFAULT 'RETAIL',
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commodity" "Commodities" NOT NULL,
    "priceReportingCentreId" INTEGER NOT NULL,

    CONSTRAINT "PriceData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_id_key" ON "User"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_priceReportingCentreId_key" ON "Address"("priceReportingCentreId");

-- CreateIndex
CREATE UNIQUE INDEX "Documents_id_key" ON "Documents"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Documents_userId_key" ON "Documents"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Documents_priceReportingCentreId_key" ON "Documents"("priceReportingCentreId");

-- CreateIndex
CREATE UNIQUE INDEX "PriceReportingCentre_id_key" ON "PriceReportingCentre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PriceData_id_key" ON "PriceData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PriceData_priceReportingCentreId_key" ON "PriceData"("priceReportingCentreId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_priceReportingCentreId_fkey" FOREIGN KEY ("priceReportingCentreId") REFERENCES "PriceReportingCentre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_priceReportingCentreId_fkey" FOREIGN KEY ("priceReportingCentreId") REFERENCES "PriceReportingCentre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceData" ADD CONSTRAINT "PriceData_priceReportingCentreId_fkey" FOREIGN KEY ("priceReportingCentreId") REFERENCES "PriceReportingCentre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
