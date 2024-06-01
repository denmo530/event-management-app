/*
  Warnings:

  - You are about to drop the column `contactInfoId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventTypeId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `EventType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `EventType` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `EventType` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `EventType` table. All the data in the column will be lost.
  - You are about to drop the `_AnalyticsToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AttendeeToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BudgetToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CustomFieldToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToSponsor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `EventType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTypeId` to the `EventType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_contactInfoId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_venueId_fkey";

-- DropForeignKey
ALTER TABLE "_AnalyticsToEvent" DROP CONSTRAINT "_AnalyticsToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnalyticsToEvent" DROP CONSTRAINT "_AnalyticsToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_AttendeeToEvent" DROP CONSTRAINT "_AttendeeToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttendeeToEvent" DROP CONSTRAINT "_AttendeeToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_BudgetToEvent" DROP CONSTRAINT "_BudgetToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_BudgetToEvent" DROP CONSTRAINT "_BudgetToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_CustomFieldToEvent" DROP CONSTRAINT "_CustomFieldToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomFieldToEvent" DROP CONSTRAINT "_CustomFieldToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSponsor" DROP CONSTRAINT "_EventToSponsor_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToSponsor" DROP CONSTRAINT "_EventToSponsor_B_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "contactInfoId",
DROP COLUMN "eventTypeId",
DROP COLUMN "venueId";

-- AlterTable
ALTER TABLE "EventType" DROP CONSTRAINT "EventType_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "eventTypeId" TEXT NOT NULL,
ADD CONSTRAINT "EventType_pkey" PRIMARY KEY ("eventId", "eventTypeId");

-- DropTable
DROP TABLE "_AnalyticsToEvent";

-- DropTable
DROP TABLE "_AttendeeToEvent";

-- DropTable
DROP TABLE "_BudgetToEvent";

-- DropTable
DROP TABLE "_CustomFieldToEvent";

-- DropTable
DROP TABLE "_EventToSponsor";

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventVenue" (
    "eventId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,

    CONSTRAINT "EventVenue_pkey" PRIMARY KEY ("eventId","venueId")
);

-- CreateTable
CREATE TABLE "EventSponsor" (
    "eventId" TEXT NOT NULL,
    "sponsorId" TEXT NOT NULL,

    CONSTRAINT "EventSponsor_pkey" PRIMARY KEY ("eventId","sponsorId")
);

-- CreateTable
CREATE TABLE "EventAttendee" (
    "eventId" TEXT NOT NULL,
    "attendeeId" TEXT NOT NULL,

    CONSTRAINT "EventAttendee_pkey" PRIMARY KEY ("eventId","attendeeId")
);

-- CreateTable
CREATE TABLE "EventBudget" (
    "eventId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "EventBudget_pkey" PRIMARY KEY ("eventId","budgetId")
);

-- CreateTable
CREATE TABLE "EventAnalytics" (
    "eventId" TEXT NOT NULL,
    "analyticsId" TEXT NOT NULL,

    CONSTRAINT "EventAnalytics_pkey" PRIMARY KEY ("eventId","analyticsId")
);

-- CreateTable
CREATE TABLE "EventContactInfo" (
    "eventId" TEXT NOT NULL,
    "contactInfoId" TEXT NOT NULL,

    CONSTRAINT "EventContactInfo_pkey" PRIMARY KEY ("eventId","contactInfoId")
);

-- CreateTable
CREATE TABLE "EventCustomField" (
    "eventId" TEXT NOT NULL,
    "customFieldId" TEXT NOT NULL,

    CONSTRAINT "EventCustomField_pkey" PRIMARY KEY ("eventId","customFieldId")
);

-- AddForeignKey
ALTER TABLE "EventType" ADD CONSTRAINT "EventType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventType" ADD CONSTRAINT "EventType_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventVenue" ADD CONSTRAINT "EventVenue_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventVenue" ADD CONSTRAINT "EventVenue_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSponsor" ADD CONSTRAINT "EventSponsor_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSponsor" ADD CONSTRAINT "EventSponsor_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBudget" ADD CONSTRAINT "EventBudget_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBudget" ADD CONSTRAINT "EventBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAnalytics" ADD CONSTRAINT "EventAnalytics_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAnalytics" ADD CONSTRAINT "EventAnalytics_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventContactInfo" ADD CONSTRAINT "EventContactInfo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventContactInfo" ADD CONSTRAINT "EventContactInfo_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCustomField" ADD CONSTRAINT "EventCustomField_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCustomField" ADD CONSTRAINT "EventCustomField_customFieldId_fkey" FOREIGN KEY ("customFieldId") REFERENCES "CustomField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
