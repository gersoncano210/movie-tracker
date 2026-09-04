/*
  Warnings:

  - A unique constraint covering the columns `[userId,tmdbId]` on the table `MovieEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieEntry_userId_tmdbId_key" ON "MovieEntry"("userId", "tmdbId");
