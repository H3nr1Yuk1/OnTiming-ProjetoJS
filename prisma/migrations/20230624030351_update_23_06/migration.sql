/*
  Warnings:

  - You are about to drop the column `lembreteId` on the `LembretePadrao` table. All the data in the column will be lost.
  - Added the required column `notificacao` to the `LembretePadrao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "tempoIni" TEXT NOT NULL,
    "tempoFim" TEXT NOT NULL,
    "rotinaId" INTEGER,
    "categoriaId" INTEGER NOT NULL,
    "lembreteId" INTEGER,
    "lembretePadraoId" INTEGER,
    CONSTRAINT "Tarefa_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_lembreteId_fkey" FOREIGN KEY ("lembreteId") REFERENCES "Lembrete" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_lembretePadraoId_fkey" FOREIGN KEY ("lembretePadraoId") REFERENCES "LembretePadrao" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_rotinaId_fkey" FOREIGN KEY ("rotinaId") REFERENCES "Rotina" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tarefa" ("categoriaId", "id", "lembreteId", "nome", "rotinaId", "tempoFim", "tempoIni") SELECT "categoriaId", "id", "lembreteId", "nome", "rotinaId", "tempoFim", "tempoIni" FROM "Tarefa";
DROP TABLE "Tarefa";
ALTER TABLE "new_Tarefa" RENAME TO "Tarefa";
CREATE TABLE "new_LembretePadrao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "popUp" BOOLEAN,
    "popUpMsg" TEXT,
    "alarme" BOOLEAN,
    "alarmeSound" TEXT,
    "vibracao" BOOLEAN,
    "vibType" TEXT,
    "vibCount" INTEGER,
    "notificacao" TEXT NOT NULL
);
INSERT INTO "new_LembretePadrao" ("id", "nome") SELECT "id", "nome" FROM "LembretePadrao";
DROP TABLE "LembretePadrao";
ALTER TABLE "new_LembretePadrao" RENAME TO "LembretePadrao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
