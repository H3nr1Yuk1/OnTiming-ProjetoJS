-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LembretePadrao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "lembreteId" INTEGER,
    CONSTRAINT "LembretePadrao_lembreteId_fkey" FOREIGN KEY ("lembreteId") REFERENCES "Lembrete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_LembretePadrao" ("id", "lembreteId", "nome") SELECT "id", "lembreteId", "nome" FROM "LembretePadrao";
DROP TABLE "LembretePadrao";
ALTER TABLE "new_LembretePadrao" RENAME TO "LembretePadrao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
