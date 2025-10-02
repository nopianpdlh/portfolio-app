# DnD Kit Hydration Mismatch Fix

## Issue
React Hydration Mismatch error occurring with DnD Kit's `aria-describedby` attributes.

**Error Message:**
```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
aria-describedby="DndDescribedBy-0" vs aria-describedby="DndDescribedBy-1"
```

## Root Cause
DnD Kit generates unique IDs for accessibility attributes (`aria-describedby`) on the server and client. These IDs can differ between SSR and client-side hydration, causing a mismatch.

## Solution
Implement client-side only rendering for DnD components using `useEffect` and conditional rendering.

### Pattern Used:

```typescript
import { useState, useEffect } from "react"

export default function Component() {
  const [isMounted, setIsMounted] = useState(false)

  // Only enable DnD after client-side mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Render static version during SSR
  if (!isMounted) {
    return <StaticList />
  }

  // Render with DnD after mount
  return (
    <DndContext>
      <SortableContext>
        <InteractiveList />
      </SortableContext>
    </DndContext>
  )
}
```

## Files Fixed

### 1. SkillsManager (`src/components/admin/SkillsManager.tsx`)

**Changes:**
- Added `useEffect` import
- Added `isMounted` state
- Conditional rendering: static list during SSR, DnD-enabled list after mount

**Code:**
```typescript
const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
  setIsMounted(true)
}, [])

// In render:
{!isMounted ? (
  // Static list for SSR
  <div className="space-y-2">
    {filteredSkills.map((skill) => (
      <SkillCard key={skill.id} skill={skill} />
    ))}
  </div>
) : (
  // DnD-enabled list for client
  <DndContext>
    <SortableContext>
      {filteredSkills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </SortableContext>
  </DndContext>
)}
```

### 2. ExperiencesList (`src/components/admin/ExperiencesList.tsx`)

**Changes:**
- Added `useEffect` import
- Added `isMounted` state
- Early return with static list during SSR

**Code:**
```typescript
const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
  setIsMounted(true)
}, [])

// Early return for SSR
if (!isMounted) {
  return (
    <div className="space-y-4">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  )
}

// Normal DnD render after mount
return (
  <DndContext>
    <SortableContext>
      ...
    </SortableContext>
  </DndContext>
)
```

## How It Works

1. **Server-Side Rendering (SSR):**
   - `isMounted` is `false`
   - Components render static list without DnD wrapper
   - No `aria-describedby` attributes generated

2. **Client-Side Hydration:**
   - `useEffect` runs after hydration
   - Sets `isMounted` to `true`
   - Triggers re-render with DnD functionality
   - `aria-describedby` attributes generated on client only

3. **Result:**
   - No mismatch because DnD attributes only exist on client
   - Drag-and-drop functionality works perfectly after mount
   - No performance impact (static → interactive upgrade is instant)

## Benefits

✅ **Fixes hydration mismatch** - No more console errors
✅ **Maintains functionality** - Drag-and-drop still works perfectly
✅ **SEO-friendly** - Static content still rendered on server
✅ **Accessibility** - Proper ARIA attributes after mount
✅ **Performance** - Minimal overhead, instant upgrade to interactive

## Alternative Solutions (Not Used)

1. **suppressHydrationWarning** - Hides warning but doesn't fix root cause
2. **Client-only component** - Loses SSR benefits entirely
3. **Custom DnD implementation** - Unnecessary complexity

## Testing

Test drag-and-drop functionality:
1. Navigate to Skills page (`/admin/skills`)
2. Try dragging skills to reorder - should work smoothly
3. Navigate to Experiences page (`/admin/experiences`)
4. Try dragging experiences to reorder - should work smoothly
5. Check browser console - no hydration warnings

## Status

✅ **Fixed** - Both SkillsManager and ExperiencesList
✅ **Tested** - No console errors, drag-drop works perfectly
✅ **Pattern documented** - Can be applied to future DnD implementations

## Notes for Future Development

When adding new drag-and-drop features:
- Always use this pattern for DnD components
- Import `useEffect` from React
- Add `isMounted` state
- Render static version during SSR
- Enable DnD after mount

This ensures consistent, error-free drag-and-drop functionality across the application.
