# STEP 4: Build Admin Panel CRUD Features

## 🎯 Overview

Kita akan membuat complete CRUD (Create, Read, Update, Delete) features untuk semua content management:

1. ✨ Projects Management
2. ✨ Skills Management
3. ✨ Experiences Management
4. ✨ Blog Management
5. ✨ Contacts Inbox
6. ✨ Settings Page

---

## 📋 Fitur yang Akan Dibuat

### 4.1 Projects Management (Prioritas 1)
**Pages:**
- `/admin/projects` - List all projects (table view)
- `/admin/projects/new` - Create new project
- `/admin/projects/[id]` - View project detail
- `/admin/projects/[id]/edit` - Edit project

**Features:**
- ✅ CRUD operations
- ✅ Multiple image upload (Supabase Storage)
- ✅ Tech stack multi-select (Tags input)
- ✅ Programming languages multi-select
- ✅ Category dropdown
- ✅ Rich text editor for description
- ✅ Slug auto-generation
- ✅ Featured toggle
- ✅ Published toggle
- ✅ Date picker (completion date)
- ✅ Search & filter
- ✅ Pagination
- ✅ Bulk actions (delete, archive)

### 4.2 Skills Management (Prioritas 2)
**Pages:**
- `/admin/skills` - List & manage skills (inline editing)

**Features:**
- ✅ Add/Edit/Delete skills
- ✅ Category (Frontend, Backend, Languages, Tools, etc)
- ✅ Skill level (Beginner, Intermediate, Advanced, Expert)
- ✅ Drag & drop reordering
- ✅ Bulk add skills

### 4.3 Experiences Management (Prioritas 2)
**Pages:**
- `/admin/experiences` - Timeline view & management

**Features:**
- ✅ Add/Edit/Delete experiences
- ✅ Company, position, description
- ✅ Date range (start & end date)
- ✅ Current position toggle
- ✅ Reorder timeline
- ✅ Rich text description

### 4.4 Blog Management (Prioritas 3)
**Pages:**
- `/admin/blog` - List all posts
- `/admin/blog/new` - Create new post
- `/admin/blog/[id]/edit` - Edit post

**Features:**
- ✅ Markdown editor (with preview)
- ✅ Tags management
- ✅ Cover image upload
- ✅ Excerpt auto-generation
- ✅ SEO meta fields
- ✅ Publish date picker
- ✅ Published/Draft status
- ✅ Slug auto-generation

### 4.5 Contacts Inbox (Prioritas 3)
**Pages:**
- `/admin/contacts` - View all messages

**Features:**
- ✅ List all contact submissions
- ✅ Mark as replied
- ✅ Delete messages
- ✅ Filter by status (read/unread)
- ✅ Search messages

### 4.6 Settings Page (Prioritas 2)
**Pages:**
- `/admin/settings` - Site settings & profile

**Features:**
- ✅ Edit personal profile (name, bio, photo)
- ✅ Site settings (name, tagline, description)
- ✅ Social media links
- ✅ Contact information
- ✅ Resume upload
- ✅ Update password

---

## 🏗️ File Structure

```
src/
├── app/
│   └── admin/
│       ├── projects/
│       │   ├── page.tsx                  # List projects
│       │   ├── new/
│       │   │   └── page.tsx             # Create project
│       │   └── [id]/
│       │       ├── page.tsx             # View project
│       │       └── edit/
│       │           └── page.tsx         # Edit project
│       ├── skills/
│       │   └── page.tsx                  # Manage skills
│       ├── experiences/
│       │   └── page.tsx                  # Manage experiences
│       ├── blog/
│       │   ├── page.tsx                  # List posts
│       │   ├── new/
│       │   │   └── page.tsx             # Create post
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx         # Edit post
│       ├── contacts/
│       │   └── page.tsx                  # View messages
│       └── settings/
│           └── page.tsx                  # Settings
│
├── components/
│   └── admin/
│       ├── forms/
│       │   ├── ProjectForm.tsx           # Project form component
│       │   ├── SkillForm.tsx             # Skill form component
│       │   ├── ExperienceForm.tsx        # Experience form component
│       │   ├── BlogPostForm.tsx          # Blog post form component
│       │   └── SettingsForm.tsx          # Settings form component
│       ├── tables/
│       │   ├── ProjectsTable.tsx         # Projects table
│       │   ├── SkillsTable.tsx           # Skills table
│       │   ├── ExperiencesTable.tsx      # Experiences table
│       │   ├── BlogPostsTable.tsx        # Blog posts table
│       │   └── ContactsTable.tsx         # Contacts table
│       └── ui/
│           ├── ImageUpload.tsx           # Image upload component
│           ├── TagsInput.tsx             # Tags input component
│           ├── MarkdownEditor.tsx        # Markdown editor
│           └── DatePicker.tsx            # Date picker
│
└── lib/
    ├── validations/
    │   ├── project.ts                    # Project validation schemas
    │   ├── skill.ts                      # Skill validation schemas
    │   ├── experience.ts                 # Experience validation schemas
    │   ├── blog.ts                       # Blog validation schemas
    │   └── settings.ts                   # Settings validation schemas
    └── actions/
        ├── projects.ts                   # Server actions for projects
        ├── skills.ts                     # Server actions for skills
        ├── experiences.ts                # Server actions for experiences
        ├── blog.ts                       # Server actions for blog
        ├── contacts.ts                   # Server actions for contacts
        └── settings.ts                   # Server actions for settings
```

---

## 🚀 Let's Start!

Kita akan build step by step, mulai dari yang paling penting:

1. **First:** Projects Management (most complex)
2. **Then:** Skills & Experiences (simpler)
3. **Then:** Settings (important for profile)
4. **Finally:** Blog & Contacts (optional but good to have)

---

## 📦 Additional Dependencies

Kita akan install beberapa packages tambahan:

```powershell
# React DnD untuk drag & drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# React Markdown untuk blog editor
npm install react-markdown remark-gfm rehype-raw

# Date picker
npm install react-day-picker date-fns

# Rich text editor (alternative)
npm install @tiptap/react @tiptap/starter-kit
```

---

**Ready to start?** Let me know and I'll begin building! 🎉
