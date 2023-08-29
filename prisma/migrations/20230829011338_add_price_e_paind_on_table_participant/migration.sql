/*
  Warnings:

  - Added the required column `contribution_value` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paid` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "schedule_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "drink" BOOLEAN NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "contribution_value" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "participants_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_participants" ("created_at", "drink", "id", "name", "schedule_id") SELECT "created_at", "drink", "id", "name", "schedule_id" FROM "participants";
DROP TABLE "participants";
ALTER TABLE "new_participants" RENAME TO "participants";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
