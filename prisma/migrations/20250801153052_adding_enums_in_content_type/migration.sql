/*
  Warnings:

  - Changed the type of `type` on the `Content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ContentTypes" AS ENUM ('BLOG', 'ARTICLE', 'RANT');

-- AlterTable
ALTER TABLE "public"."Content" DROP COLUMN "type",
ADD COLUMN     "type" "public"."ContentTypes" NOT NULL;
