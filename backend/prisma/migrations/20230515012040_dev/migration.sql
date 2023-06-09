-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "icone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lembrete" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "popUp" BOOLEAN,
    "popUpMsg" TEXT,
    "alarme" BOOLEAN,
    "alarmeSound" TEXT,
    "vibracao" BOOLEAN,
    "vibType" TEXT,
    "vibCount" INTEGER,
    "notificacao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LembretePadrao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rotina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "duracao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "tempoIni" TEXT NOT NULL,
    "tempoFim" TEXT NOT NULL,
    "rotinaId" INTEGER,
    "categoriaId" INTEGER NOT NULL,
    "lembreteId" INTEGER,
    CONSTRAINT "Tarefa_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_lembreteId_fkey" FOREIGN KEY ("lembreteId") REFERENCES "Lembrete" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tarefa_rotinaId_fkey" FOREIGN KEY ("rotinaId") REFERENCES "Rotina" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_cor_key" ON "Categoria"("cor");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_icone_key" ON "Categoria"("icone");
