# Troubleshooting: Prisma Prepared Statement Error

## ❌ Error yang Terjadi

```
PrismaClientUnknownRequestError: 
Invalid `prisma.contact.count()` invocation:

Error occurred during query execution:
ConnectorError(ConnectorError { 
  kind: QueryError(PostgresError { 
    code: "42P05", 
    message: "prepared statement \"s0\" already exists"
  })
})
```

## 🔍 Penyebab

Error ini terjadi karena:
1. **Connection Pooling Issue** - Supabase connection pooler (port 6543) membutuhkan parameter khusus
2. **Prepared Statement Conflict** - PostgreSQL prepared statements tidak compatible dengan connection pooler tanpa configuration yang tepat
3. **Hot Reload** - Next.js development mode membuat multiple Prisma instances

## ✅ Solusi yang Diterapkan

### 1. Update Connection String

Di file `.env`, tambahkan parameter `pgbouncer=true` dan `connection_limit=1`:

```env
# BEFORE ❌
DATABASE_URL="postgresql://user:pass@host:6543/postgres"

# AFTER ✅
DATABASE_URL="postgresql://user:pass@host:6543/postgres?pgbouncer=true&connection_limit=1"
```

**Penjelasan:**
- `pgbouncer=true` - Disable prepared statements untuk compatibility dengan PgBouncer
- `connection_limit=1` - Limit concurrent connections dari Prisma Client
- `DIRECT_URL` tetap menggunakan port 5432 untuk migrations

### 2. Update Prisma Client Configuration

Di file `src/lib/prisma.ts`, tambahkan logging configuration:

```typescript
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}
```

### 3. Regenerate Prisma Client

```powershell
npx prisma generate
```

### 4. Restart Development Server

```powershell
# Kill proses yang sedang running
# Lalu start ulang
npm run dev
```

## 🧪 Verifikasi Fix

Setelah apply fixes di atas:

1. **Clear browser cache** (Ctrl + Shift + R)
2. **Restart terminal** (close & reopen)
3. **Test endpoints:**
   - http://localhost:3000/login
   - http://localhost:3000/admin

## 📚 Penjelasan Detail

### Connection Pooler vs Direct Connection

Supabase menyediakan 2 jenis connection:

| Type | Port | Use Case | Prepared Statements |
|------|------|----------|---------------------|
| **Connection Pooler** | 6543 | Production, High traffic | ❌ Disabled (with pgbouncer=true) |
| **Direct Connection** | 5432 | Migrations, Admin tasks | ✅ Enabled |

**Prisma Strategy:**
- `DATABASE_URL` (port 6543 + pgbouncer=true) → untuk queries dari aplikasi
- `DIRECT_URL` (port 5432) → untuk migrations dan schema operations

### Parameter Penjelasan

```
?pgbouncer=true
```
- Disable prepared statements
- Compatible dengan PgBouncer connection pooler
- Slightly slower tapi lebih stable untuk pooled connections

```
&connection_limit=1
```
- Limit Prisma Client connections
- Prevent connection pool exhaustion
- Recommended untuk serverless/edge functions

## 🔧 Alternative Fixes

Jika masih ada issue, coba alternatives ini:

### Option 1: Gunakan Direct Connection (Development Only)

```env
# Temporary untuk development - gunakan direct connection
DATABASE_URL="postgresql://user:pass@host:5432/postgres"
DIRECT_URL="postgresql://user:pass@host:5432/postgres"
```

⚠️ **Warning:** Tidak recommended untuk production karena limited connections.

### Option 2: Tambahkan statement_cache_size=0

```env
DATABASE_URL="postgresql://user:pass@host:6543/postgres?pgbouncer=true&statement_cache_size=0"
```

### Option 3: Tambahkan pool timeout

```env
DATABASE_URL="postgresql://user:pass@host:6543/postgres?pgbouncer=true&pool_timeout=20"
```

## 🆘 Jika Masih Error

### Reset Complete

```powershell
# 1. Stop dev server (Ctrl + C)

# 2. Clear Prisma cache
Remove-Item -Recurse -Force node_modules\.prisma

# 3. Regenerate
npx prisma generate

# 4. Restart
npm run dev
```

### Check Supabase Status

1. Buka Supabase Dashboard
2. Check project status (harus "Active")
3. Check database connection pooler enabled

### Check Environment Variables

```powershell
# Print connection string (hide password!)
$env:DATABASE_URL
```

Pastikan:
- ✅ `pgbouncer=true` ada
- ✅ Connection string format benar
- ✅ Password tidak ada karakter special yang perlu di-encode

## 📖 Resources

- [Prisma Connection Pooling](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Supabase Connection Pooler](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [PgBouncer with Prisma](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management/configure-pg-bouncer)

## ✅ Checklist

Setelah apply fixes:

- [ ] `.env` updated dengan `pgbouncer=true&connection_limit=1`
- [ ] `src/lib/prisma.ts` updated dengan logging config
- [ ] `npx prisma generate` executed successfully
- [ ] Dev server restarted
- [ ] Login page loads tanpa error
- [ ] Admin dashboard loads dengan stats
- [ ] No more "prepared statement" errors di console

---

**Status:** ✅ Fixed  
**Date:** October 1, 2025  
**Next Steps:** Continue to Step 4 - Build CRUD features
