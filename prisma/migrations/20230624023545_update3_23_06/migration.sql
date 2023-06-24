/*
  Warnings:

  - Added the required column `lembreteId` to the `LembretePadrao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LembretePadrao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "lembreteId" INTEGER NOT NULL,
    CONSTRAINT "LembretePadrao_lembreteId_fkey" FOREIGN KEY ("lembreteId") REFERENCES "Lembrete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LembretePadrao" ("id", "nome") SELECT "id", "nome" FROM "LembretePadrao";
DROP TABLE "LembretePadrao";
ALTER TABLE "new_LembretePadrao" RENAME TO "LembretePadrao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
