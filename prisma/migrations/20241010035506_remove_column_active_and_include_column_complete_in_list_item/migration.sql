/*
  Warnings:

  - You are about to drop the column `active` on the `list_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "list_items" DROP COLUMN "active",
ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false;
