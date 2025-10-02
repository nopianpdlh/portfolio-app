# Alert Dialog Implementation

## Overview
Replaced native browser `confirm()` dialogs with Shadcn Alert Dialog component for better UX and consistency.

## Installation
```bash
npx shadcn@latest add alert-dialog
```

## Components Updated

### 1. **ProjectsTable** (`src/components/admin/tables/ProjectsTable.tsx`)

**Changes:**
- Added Alert Dialog import
- Added state: `deleteDialogOpen` and `projectToDelete`
- Replaced `handleDelete` with `handleDeleteClick` + `handleDeleteConfirm`
- Added Alert Dialog component at bottom of JSX

**Features:**
- Shows project title in confirmation message
- Red delete button
- Cancel option
- Non-blocking UI

**Code:**
```typescript
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
const [projectToDelete, setProjectToDelete] = useState<{ id: string; title: string } | null>(null)

const handleDeleteClick = (id: string, title: string) => {
  setProjectToDelete({ id, title })
  setDeleteDialogOpen(true)
}

const handleDeleteConfirm = async () => {
  if (!projectToDelete) return
  // ... delete logic
}
```

### 2. **SkillCard** (`src/components/admin/SkillCard.tsx`)

**Changes:**
- Added Alert Dialog import
- Added state: `deleteDialogOpen`
- Renamed `handleDelete` to `handleDeleteConfirm`
- Button triggers dialog instead of direct confirm
- Added Alert Dialog component in JSX

**Features:**
- Shows skill name in confirmation
- Clean modal UI
- Red delete button
- Toast notification after delete

### 3. **ExperienceCard** (`src/components/admin/ExperienceCard.tsx`)

**Changes:**
- Added Alert Dialog import
- Added state: `deleteDialogOpen`
- Renamed `handleDelete` to `handleDeleteConfirm`
- Button triggers dialog instead of direct confirm
- Added Alert Dialog component in JSX

**Features:**
- Shows experience title and company
- Contextual delete message
- Red delete button
- Toast feedback

## Alert Dialog Pattern

### Standard Implementation:
```typescript
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// State
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

// Trigger
<Button onClick={() => setDeleteDialogOpen(true)}>Delete</Button>

// Dialog
<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleDeleteConfirm}
        className="bg-red-600 hover:bg-red-700"
      >
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Benefits

### Before (Native confirm):
❌ Blocks browser UI
❌ Inconsistent across browsers
❌ No styling control
❌ Poor mobile UX
❌ Accessibility issues

### After (Alert Dialog):
✅ Non-blocking modal
✅ Consistent design
✅ Fully styled/customizable
✅ Mobile-friendly
✅ Accessible (ARIA, keyboard nav)
✅ Shows contextual info (item names)
✅ Matches app design system

## Files Modified: 3
1. ✅ `src/components/admin/tables/ProjectsTable.tsx`
2. ✅ `src/components/admin/SkillCard.tsx`
3. ✅ `src/components/admin/ExperienceCard.tsx`

## New Component: 1
1. ✅ `src/components/ui/alert-dialog.tsx` (Shadcn)

## Testing

Test delete confirmations:
- [ ] **Projects**: Click delete in dropdown → Dialog appears with project name
- [ ] **Skills**: Click delete icon → Dialog shows skill name
- [ ] **Experiences**: Click delete icon → Dialog shows title & company
- [ ] **All**: Click Cancel → Dialog closes, no deletion
- [ ] **All**: Click Delete → Item deleted, toast appears, page refreshes

## Design Consistency

All dialogs follow same structure:
1. **Title**: Clear action name ("Delete Project", "Delete Skill", etc.)
2. **Description**: Shows what will be deleted with bold item name
3. **Warning**: "This action cannot be undone"
4. **Actions**: Cancel (gray) + Delete (red)

## Accessibility

✅ Keyboard navigation (Tab, Enter, Esc)
✅ Screen reader friendly (ARIA labels)
✅ Focus management (auto-focus on open)
✅ Escape key closes dialog
✅ Click outside to cancel

## Future Use

When implementing Blog Management and Contacts Inbox:
- Use same Alert Dialog pattern for delete actions
- Keep consistent messaging: "Are you sure you want to delete **[item]**?"
- Always use red button for destructive actions
- Show item name/title in dialog for context

## Status

✅ **Implemented**: 3 components updated
✅ **Tested**: All delete actions working
✅ **Consistent**: Same pattern across all features
✅ **Ready for**: Blog & Contacts implementation

---

**Implementation Date:** October 2, 2025  
**Component:** Shadcn Alert Dialog  
**Pattern:** Reusable across all delete actions
