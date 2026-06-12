# Terminal9X Blackbox API on Vercel

This server has been adjusted for Vercel Functions.

## Vercel settings

Root Directory:

```txt
server
```

Framework Preset:

```txt
Other
```

Install Command:

```txt
pnpm install
```

Build Command:

```txt
pnpm build
```

Output Directory:

```txt
leave empty
```

## Environment Variables

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/cold_inbox
JWT_SECRET=replace_with_long_secret
CLIENT_URL=https://your-client-domain.vercel.app
```

## Test endpoint

```txt
https://your-server-domain.vercel.app/api/health
```

Expected response:

```json
{
  "ok": true,
  "service": "cold-inbox-passport",
  "runtime": "vercel-function"
}
```

## Notes

- `pnpm approve-builds` warning for esbuild is only a pnpm security warning, not the TypeScript error.
- The TypeScript errors were fixed by pinning `@types/express` to v4 and explicitly typing Express request/response/next handlers.
- This Vercel server mode is for REST API routes. Do not use Socket.io/WebSocket here.
