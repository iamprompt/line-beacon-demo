-- Migration number: 0003 	 2024-09-26T00:40:10.662Z
-- AlterTable
ALTER TABLE "webhook_events" ADD COLUMN "webhook_event_id" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WebhookEvent";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "webhook_events_webhook_event_id_key" ON "webhook_events"("webhook_event_id");

