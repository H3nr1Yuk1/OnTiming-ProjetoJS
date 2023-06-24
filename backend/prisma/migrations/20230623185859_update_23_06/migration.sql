/*
  Warnings:

  - Added the required column `usuarioId` to the `LembretePadrao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Rotina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Tarefa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Lembrete` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LembretePadrao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "LembretePadrao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LembretePadrao" ("id", "nome") SELECT "id", "nome" FROM "LembretePadrao";
DROP TABLE "LembretePadrao";
ALTER TABLE "new_LembretePadrao" RENAME TO "LembretePadrao";
CREATE TABLE "new_Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "icone" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Categoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Categoria" ("cor", "icone", "id", "nome") SELECT "cor", "icone", "id", "nome" FROM "Categoria";
DROP TABLE "Categoria";
ALTER TABLE "new_Categoria" RENAME TO "Categoria";
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");
CREATE UNIQUE INDEX "Categoria_cor_key" ON "Categoria"("cor");
CREATE UNIQUE INDEX "Categoria_icone_key" ON "Categoria"("icone");
CREATE TABLE "new_Rotina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "duracao" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Rotina_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rotina" ("duracao", "id", "nome") SELECT "duracao", "id", "nome" FROM "Rotina";
DROP TABLE "Rotina";
ALTER TABLE "new_Rotina" RENAME TO "Rotina";
CREATE TABLE "new_Tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "tempoIni" TEXT NOT NULL,
    "tempoFim" TEXT NOT NULL,
    "rotinaId" INTEGER,
    "categoriaId" INTEGER NOT NULL,
    "lembreteId" INTEGER,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Tarefa_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_lembreteId_fkey" FOREIGN KEY ("lembreteId") REFERENCES "Lembrete" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_rotinaId_fkey" FOREIGN KEY ("rotinaId") REFERENCES "Rotina" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tarefa" ("categoriaId", "id", "lembreteId", "nome", "rotinaId", "tempoFim", "tempoIni") SELECT "categoriaId", "id", "lembreteId", "nome", "rotinaId", "tempoFim", "tempoIni" FROM "Tarefa";
DROP TABLE "Tarefa";
ALTER TABLE "new_Tarefa" RENAME TO "Tarefa";
CREATE TABLE "new_Lembrete" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "popUp" BOOLEAN,
    "popUpMsg" TEXT,
    "alarme" BOOLEAN,
    "alarmeSound" TEXT,
    "vibracao" BOOLEAN,
    "vibType" TEXT,
    "vibCount" INTEGER,
    "notificacao" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Lembrete_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lembrete" ("alarme", "alarmeSound", "id", "notificacao", "popUp", "popUpMsg", "vibCount", "vibType", "vibracao") SELECT "alarme", "alarmeSound", "id", "notificacao", "popUp", "popUpMsg", "vibCount", "vibType", "vibracao" FROM "Lembrete";
DROP TABLE "Lembrete";
ALTER TABLE "new_Lembrete" RENAME TO "Lembrete";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
