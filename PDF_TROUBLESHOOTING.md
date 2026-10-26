# PDF System - Troubleshooting Guide

## Common Issues & Solutions

### ❌ "Downloads page shows 'No documents available yet'"

**Possible Causes:**
1. No documents added to `documents.json`
2. Decap CMS changes haven't been deployed yet
3. Browser cache showing old version

**Solutions:**
- ✅ Wait 2-3 minutes for deployment to complete
- ✅ Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- ✅ Check GitHub to confirm commit was made
- ✅ Add a document via Decap CMS admin panel
- ✅ Verify `src/data/documents.json` has content

---

### ❌ "PDF upload not working in Decap CMS"

**Possible Causes:**
1. Not logged in to CMS
2. GitHub authentication token expired
3. Netlify Identity not configured (if using that method)
4. Browser cookies/cache issue

**Solutions:**
- ✅ Log out and log back in to CMS
- ✅ Clear browser cookies for the admin domain
- ✅ Try incognito/private browser window
- ✅ Check if you're logged in to GitHub
- ✅ Verify `.env.local` file has correct GitHub token (if using direct auth)
- ✅ Check GitHub for proper repository access permissions

---

### ❌ "Download link broken or file not found (404)"

**Possible Causes:**
1. PDF file doesn't exist in `public/documents/`
2. Filename in `documents.json` doesn't match actual file
3. Wrong file path in `fileUrl` field
4. Case sensitivity mismatch (file system is case-sensitive)

**Solutions:**
- ✅ Verify file exists: Check `public/documents/` folder
- ✅ Check exact filename: Use `ls` or file explorer
- ✅ Update `fileUrl` in `documents.json` to match exactly
  ```json
  // ✅ Correct
  "fileUrl": "/documents/visitor-guide.pdf"
  
  // ❌ Wrong
  "fileUrl": "/documents/Visitor-Guide.pdf"  // Case mismatch
  "fileUrl": "/documents/visitor guide.pdf"  // Extra space
  ```
- ✅ Rebuild and redeploy after fixing

---

### ❌ "Changes not appearing on website"

**Possible Causes:**
1. Deployment still in progress
2. Browser showing cached version
3. Commit wasn't successful
4. Wrong branch deployed

**Solutions:**
- ✅ Wait for deployment to complete (usually 1-2 minutes)
- ✅ Hard refresh: `Cmd+Shift+R` or `Ctrl+Shift+R`
- ✅ Check GitHub for successful commit
- ✅ Check deployment service (Netlify, Vercel, etc.) for build status
- ✅ Clear entire browser cache
- ✅ Try a different browser or device
- ✅ Run `npm run build` locally to check for build errors

---

### ❌ "PDF file won't upload via CMS"

**Possible Causes:**
1. File size too large (>50MB)
2. Not a valid PDF file
3. Filename has special characters
4. Network/connection issue

**Solutions:**
- ✅ Compress PDF before uploading
- ✅ Check file is actually a PDF (not renamed image)
- ✅ Rename file to simple name: `guide-2026.pdf` (avoid spaces, special chars)
- ✅ Try uploading from different network/connection
- ✅ Try with smaller PDF first to test
- ✅ Check browser console for error messages (F12)

---

### ❌ "PdfDownload component not rendering"

**Possible Causes:**
1. Component not imported correctly
2. Required props missing
3. Typo in component name
4. Build error

**Solutions:**
- ✅ Verify import statement:
  ```astro
  import PdfDownload from '../components/PdfDownload.astro';
  ```
- ✅ Provide required props: `title`, `fileUrl`
- ✅ Check file name is exactly: `PdfDownload.astro` (case-sensitive)
- ✅ Run `npm run build` to see build errors
- ✅ Check browser console for errors (F12)

---

### ❌ "Page showing TypeScript error about Document type"

**Possible Causes:**
1. Missing or incorrect TypeScript import
2. Type mismatch in documents.json data

**Solutions:**
- ✅ Import Document type:
  ```astro
  import type { Document } from '../types/document';
  ```
- ✅ Cast JSON import:
  ```ts
  const documents = documentsData.default as Document[];
  ```
- ✅ Verify documents.json matches schema:
  - All required fields present
  - Proper data types
  - Valid category values

---

### ❌ "CMS admin page showing blank or not loading"

**Possible Causes:**
1. `config.yml` has syntax errors
2. JavaScript disabled in browser
3. Network connectivity issue
4. Netlify Identity not configured (if required)

**Solutions:**
- ✅ Check `public/admin/config.yml` for YAML syntax errors
- ✅ Enable JavaScript in browser settings
- ✅ Check internet connection
- ✅ Try from different network
- ✅ Verify Netlify Identity is enabled (if using that auth method)
- ✅ Check browser console for errors (F12)

---

### ❌ "Decap CMS can't authenticate to GitHub"

**Possible Causes:**
1. GitHub personal access token expired
2. Token doesn't have `repo` scope
3. Repository URL incorrect in config
4. Branch name wrong

**Solutions:**
- ✅ Generate new GitHub token:
  - GitHub → Settings → Developer settings → Personal access tokens
  - Create new token with `repo` scope
  - Copy token to `.env.local`

- ✅ Verify config values:
  ```yaml
  backend:
    name: github
    repo: museum-at-home/astro-website  # ← Check this is correct
    branch: main  # ← Check branch exists
  ```

- ✅ Test locally first before deploying

---

### ❌ "PDF thumbnail not showing on downloads page"

**Possible Causes:**
1. Thumbnail file doesn't exist
2. Image path incorrect
3. Image corrupted

**Solutions:**
- ✅ Verify image exists at specified path
- ✅ Check exact image filename and path
- ✅ Try different image file
- ✅ Verify image is valid (try viewing in browser)
- ✅ Thumbnails are optional - page works without them

---

### ❌ "Downloads page looks broken or unstyled"

**Possible Causes:**
1. CSS not loading
2. Styling conflict with global styles
3. Browser cache issue

**Solutions:**
- ✅ Hard refresh browser: `Cmd+Shift+R`
- ✅ Check for CSS errors (F12 → Console tab)
- ✅ Verify `src/components/PdfDownload.astro` has `<style>` section
- ✅ Check `src/styles/global.css` doesn't conflict
- ✅ Try different browser

---

## Testing Checklist

After implementing PDF system, verify:

- [ ] Can access admin panel at `/admin`
- [ ] Can navigate to "Downloadable Resources" in CMS
- [ ] Can upload a test PDF
- [ ] Can edit document details
- [ ] Changes appear in GitHub commits
- [ ] Website deploys successfully
- [ ] `/downloads` page loads
- [ ] PDF cards display correctly
- [ ] Download button works
- [ ] Clicking download actually downloads PDF
- [ ] Categories group correctly
- [ ] Newest documents appear first
- [ ] Works on mobile devices
- [ ] No console errors (F12)

---

## Debug Steps

If something isn't working:

### 1. Check Browser Console
Press `F12` → Go to "Console" tab → Look for red error messages

### 2. Check Terminal Output
If running locally with `npm run dev`:
- Look for build errors
- Check for TypeScript errors

### 3. Check GitHub
- Go to repository on GitHub
- Verify your commits were pushed
- Check commit content to see what changed

### 4. Check Deployment Service
- Netlify: Check deployment logs and build status
- Vercel: Check build history
- Other services: Look for build/deploy logs

### 5. Test Locally
Run locally before testing on production:
```bash
npm run dev
# Visit http://localhost:3000/downloads
```

### 6. Hard Refresh
Always hard refresh after making changes:
- Mac: `Cmd+Shift+R`
- Windows: `Ctrl+Shift+R`
- Mobile: Close app/browser and reopen

---

## Getting Help

**Check these files first:**
- `PDF_MANAGEMENT.md` - Full usage guide
- `PDF_ARCHITECTURE.md` - System design
- `PDF_SETUP_CHECKLIST.md` - Quick reference

**Check external resources:**
- [Astro Documentation](https://docs.astro.build)
- [Decap CMS Documentation](https://decapcms.org)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

## Still Stuck?

Create a detailed issue description including:
- ✅ What you're trying to do
- ✅ What error message you see
- ✅ Steps to reproduce
- ✅ Browser console errors (if any)
- ✅ Screenshot if helpful
- ✅ What you've already tried

Then:
- Post to project issues on GitHub
- Check similar issues for solutions
- Contact project maintainer
