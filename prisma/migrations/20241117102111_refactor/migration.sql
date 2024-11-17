/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `Favorites` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Album_Favorites_fk";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Artist_Favorites_fk";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Track_Favorites_fk";

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "favoriteId",
ADD COLUMN     "albumId" TEXT,
ADD COLUMN     "artistId" TEXT,
ADD COLUMN     "trackId" TEXT;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Track_Favorites_fk" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Album_Favorites_fk" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Artist_Favorites_fk" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
