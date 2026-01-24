-- CreateIndex
CREATE INDEX "BlogPost_isPublished_publishDate_idx" ON "BlogPost"("isPublished", "publishDate");

-- CreateIndex
CREATE INDEX "Project_isPublished_order_idx" ON "Project"("isPublished", "order");

-- CreateIndex
CREATE INDEX "Project_userId_idx" ON "Project"("userId");

-- CreateIndex
CREATE INDEX "Skill_userId_order_idx" ON "Skill"("userId", "order");
