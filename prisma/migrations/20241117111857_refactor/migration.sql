/*
  Warnings:

  - The primary key for the `Favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `albumId` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `Favorites` table. All the data in the column will be lost.
  - Added the required column `favId` to the `Favorites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Album_Favorites_fk";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Artist_Favorites_fk";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Track_Favorites_fk";

-- AlterTable
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_pkey",
DROP COLUMN "albumId",
DROP COLUMN "artistId",
DROP COLUMN "id",
DROP COLUMN "trackId",
ADD COLUMN     "favId" TEXT NOT NULL,
ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY ("favId");
