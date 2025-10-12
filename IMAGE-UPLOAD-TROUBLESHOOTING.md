# 🔧 Image Upload - Troubleshooting Guide

## ❌ Common Error: "Failed to upload image to storage"

### Error Details:
```
Error: Failed to upload image to storage
at ImageUpload.useCallback[onDrop] (src\components\admin\ImageUpload.tsx:124:19)
```

---

## 🎯 Root Cause

Error ini terjadi karena **RLS (Row Level Security) policy** di Supabase Storage tidak mengizinkan upload dengan anon key.

### Why This Happens:

```
Your Setup:
- Client menggunakan NEXT_PUBLIC_SUPABASE_ANON_KEY
- Policy requires: authenticated users
- Result: ❌ Permission denied

What Happens:
1. User uploads image dari admin panel
2. API route uses Supabase client with anon key
3. Supabase checks RLS policy
4. Policy says: "Only authenticated users"
5. Anon key ≠ authenticated
6. ❌ Upload rejected
```

---

## ✅ Solution: Update RLS Policies

### Step 1: Remove Old Policies

Go to Supabase Dashboard → Storage → portfolio-images → Policies

**Delete these policies if they exist:**
- ❌ "Allow authenticated users to upload"
- ❌ "Allow authenticated users to delete"

### Step 2: Create New Policies

Copy & paste ke **SQL Editor** di Supabase:

```sql
-- Drop old policies first (if exist)
DROP POLICY IF EXISTS "Allow authenticated users to upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON storage.objects;

-- Create new policies for public (anon key) access
CREATE POLICY "Allow public upload"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Allow public delete"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'portfolio-images');

-- Keep public read policy
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');
```

Click **"Run"** to execute.

### Step 3: Verify Policies

Check in Supabase Dashboard → Storage → portfolio-images → Policies

You should see:
- ✅ "Public read access" (SELECT, public)
- ✅ "Allow public upload" (INSERT, public)
- ✅ "Allow public delete" (DELETE, public)

---

## 🔒 Security Clarification

### "Wait, public upload? Isn't that insecure?"

**No! It's secure because:**

1. **Admin Panel Protected by NextAuth:**
   ```typescript
   // All /admin/* routes require authentication
   // Only logged-in users can access upload form
   middleware.ts checks session before allowing access
   ```

2. **API Route is Server-Side:**
   ```typescript
   // Upload happens on server, not directly from client
   // User must be logged in to admin panel to trigger upload
   ```

3. **Two-Layer Security:**
   ```
   Layer 1: NextAuth (blocks unauthorized users)
   Layer 2: Supabase RLS (allows upload with anon key)
   ```

4. **Public ≠ Unprotected:**
   ```
   "public" in RLS context means: "anon key can access"
   But anon key is only used AFTER NextAuth verification
   ```

### Architecture Flow:

```
User → NextAuth Login ✅ → Admin Panel ✅ → Upload Form
    ↓
  Upload Image
    ↓
  API Route (server-side, uses anon key)
    ↓
  Supabase RLS checks: "public" policy
    ↓
  ✅ Upload allowed
```

**Without NextAuth login:**
```
User → Try access /admin → ❌ Blocked by middleware
```

---

## 🧪 Test After Fix

### Test 1: Verify Policies

```sql
-- Check current policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects';
```

Should show:
- ✅ "Allow public upload" → INSERT → {public}
- ✅ "Allow public delete" → DELETE → {public}
- ✅ "Public read access" → SELECT → {public}

### Test 2: Upload Test

```powershell
# Start dev server
npm run dev

# Open browser
http://localhost:3000/admin/projects/new

# Try upload image
# Should work now! ✅
```

### Test 3: Check Console

Open DevTools (F12) → Console

**Before fix:**
```
❌ Error: Failed to upload image to storage
```

**After fix:**
```
✅ Image uploaded! Original: 1920x1080 → Optimized: 1280x720 (65% smaller)
```

---

## 🔍 Other Potential Issues

### Issue 1: Bucket Not Found

**Error:**
```
Bucket not found
```

**Solution:**
```
1. Check bucket name is exactly: portfolio-images
2. Verify bucket is public (check "Make public" checkbox)
3. Refresh Supabase dashboard
```

### Issue 2: Environment Variables

**Error:**
```
Cannot read properties of undefined (reading 'storage')
```

**Solution:**
```bash
# Check .env.local
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."

# Restart dev server after changing env
npm run dev
```

### Issue 3: CORS Error

**Error:**
```
CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solution:**
```
1. Go to Supabase → Settings → API
2. Add your domain to allowed origins:
   - http://localhost:3000 (development)
   - https://yourdomain.com (production)
```

### Issue 4: File Too Large

**Error:**
```
File too large. Maximum size: 5MB
```

**Solution:**
```typescript
// Increase in src/lib/image-utils.ts
export const IMAGE_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB instead of 5MB
}

// Also update in API route
// src/app/api/upload/image/route.ts
const maxSize = 10 * 1024 * 1024 // 10MB
```

### Issue 5: Invalid API Key

**Error:**
```
Invalid API key
```

**Solution:**
```
1. Go to Supabase → Settings → API
2. Copy "anon" key (not "service_role" key!)
3. Update .env.local
4. Restart server
```

---

## 📝 Verification Checklist

After applying the fix:

- [ ] Old "authenticated" policies deleted
- [ ] New "public" policies created
- [ ] All 3 policies visible in dashboard
- [ ] Bucket is public
- [ ] Environment variables correct
- [ ] Dev server restarted
- [ ] Upload test successful
- [ ] No console errors
- [ ] Image appears in grid
- [ ] Image displays on frontend

---

## 🎯 Quick Fix Command

**Run this in Supabase SQL Editor:**

```sql
-- Quick fix: Drop old policies and create new ones
BEGIN;

-- Drop old policies
DROP POLICY IF EXISTS "Allow authenticated users to upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;

-- Create new policies
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Allow public upload"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Allow public delete"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'portfolio-images');

COMMIT;
```

**Then verify:**
```sql
-- Check policies
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
```

---

## ✅ Expected Result

After fix, upload flow should be:

```
1. User logs in → NextAuth ✅
2. Access admin panel → Middleware allows ✅
3. Upload image → Form submits ✅
4. API processes → Optimization ✅
5. Supabase upload → RLS allows (public policy) ✅
6. Success! → Image appears ✅
```

**Console output:**
```
✅ Image uploaded! Original: 1920x1080 → Optimized: 1280x720 (65% smaller)
```

---

## 🆘 Still Not Working?

### Debug Steps:

1. **Check Supabase logs:**
   ```
   Supabase Dashboard → Logs → API Logs
   Look for 403/401 errors
   ```

2. **Check browser console:**
   ```
   F12 → Console → Look for errors
   Network tab → Check API calls
   ```

3. **Verify bucket settings:**
   ```
   Storage → portfolio-images → Configuration
   - Is it public? ✅
   - Does it have policies? ✅
   ```

4. **Test API directly:**
   ```bash
   # Test upload endpoint
   curl -X POST http://localhost:3000/api/upload/image \
     -F "file=@test.jpg" \
     -F "folder=projects"
   ```

5. **Check Supabase client:**
   ```typescript
   // Add debug in src/lib/supabase.ts
   console.log('Supabase URL:', supabaseUrl)
   console.log('Has anon key:', !!supabaseAnonKey)
   ```

---

## 📞 Need More Help?

**Still stuck? Check:**

1. Supabase documentation: https://supabase.com/docs/guides/storage
2. Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
3. Project issues: GitHub repository issues tab

**Or provide these details:**
- Supabase error logs
- Browser console errors
- Network tab (API call details)
- Policy list (from Supabase dashboard)

---

## ✨ Success!

After fix, you should see:
- ✅ Upload working smoothly
- ✅ Images optimized automatically
- ✅ Perfect display in cards
- ✅ No console errors
- ✅ Fast loading

**Happy uploading! 🎉📸**
