/*
  Warnings:

  - The primary key for the `EventType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventId` on the `EventType` table. All the data in the column will be lost.
  - You are about to drop the column `eventTypeId` on the `EventType` table. All the data in the column will be lost.
  - You are about to drop the `EventAnalytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventAttendee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventBudget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventContactInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventCustomField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventSponsor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventVenue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventTypeId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `EventType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `EventType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventAnalytics" DROP CONSTRAINT "EventAnalytics_analyticsId_fkey";

-- DropForeignKey
ALTER TABLE "EventAnalytics" DROP CONSTRAINT "EventAnalytics_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventAttendee" DROP CONSTRAINT "EventAttendee_attendeeId_fkey";

-- DropForeignKey
ALTER TABLE "EventAttendee" DROP CONSTRAINT "EventAttendee_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventBudget" DROP CONSTRAINT "EventBudget_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "EventBudget" DROP CONSTRAINT "EventBudget_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventContactInfo" DROP CONSTRAINT "EventContactInfo_contactInfoId_fkey";

-- DropForeignKey
ALTER TABLE "EventContactInfo" DROP CONSTRAINT "EventContactInfo_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventCustomField" DROP CONSTRAINT "EventCustomField_customFieldId_fkey";

-- DropForeignKey
ALTER TABLE "EventCustomField" DROP CONSTRAINT "EventCustomField_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventSponsor" DROP CONSTRAINT "EventSponsor_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventSponsor" DROP CONSTRAINT "EventSponsor_sponsorId_fkey";

-- DropForeignKey
ALTER TABLE "EventType" DROP CONSTRAINT "EventType_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventType" DROP CONSTRAINT "EventType_eventTypeId_fkey";

-- DropForeignKey
ALTER TABLE "EventVenue" DROP CONSTRAINT "EventVenue_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventVenue" DROP CONSTRAINT "EventVenue_venueId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "contactInfoId" TEXT,
ADD COLUMN     "eventTypeId" TEXT NOT NULL,
ADD COLUMN     "venueId" TEXT;

-- AlterTable
ALTER TABLE "EventType" DROP CONSTRAINT "EventType_pkey",
DROP COLUMN "eventId",
DROP COLUMN "eventTypeId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "EventType_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "EventAnalytics";

-- DropTable
DROP TABLE "EventAttendee";

-- DropTable
DROP TABLE "EventBudget";

-- DropTable
DROP TABLE "EventContactInfo";

-- DropTable
DROP TABLE "EventCustomField";

-- DropTable
DROP TABLE "EventSponsor";

-- DropTable
DROP TABLE "EventVenue";

-- DropTable
DROP TABLE "Type";

-- CreateTable
CREATE TABLE "_AttendeeToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BudgetToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnalyticsToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CustomFieldToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToSponsor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttendeeToEvent_AB_unique" ON "_AttendeeToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendeeToEvent_B_index" ON "_AttendeeToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BudgetToEvent_AB_unique" ON "_BudgetToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_BudgetToEvent_B_index" ON "_BudgetToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnalyticsToEvent_AB_unique" ON "_AnalyticsToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_AnalyticsToEvent_B_index" ON "_AnalyticsToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomFieldToEvent_AB_unique" ON "_CustomFieldToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomFieldToEvent_B_index" ON "_CustomFieldToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToSponsor_AB_unique" ON "_EventToSponsor"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToSponsor_B_index" ON "_EventToSponsor"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "EventType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeeToEvent" ADD CONSTRAINT "_AttendeeToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeeToEvent" ADD CONSTRAINT "_AttendeeToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetToEvent" ADD CONSTRAINT "_BudgetToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetToEvent" ADD CONSTRAINT "_BudgetToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnalyticsToEvent" ADD CONSTRAINT "_AnalyticsToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Analytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnalyticsToEvent" ADD CONSTRAINT "_AnalyticsToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomFieldToEvent" ADD CONSTRAINT "_CustomFieldToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "CustomField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomFieldToEvent" ADD CONSTRAINT "_CustomFieldToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSponsor" ADD CONSTRAINT "_EventToSponsor_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToSponsor" ADD CONSTRAINT "_EventToSponsor_B_fkey" FOREIGN KEY ("B") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
