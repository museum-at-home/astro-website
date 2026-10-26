# 🚀 Quick Start: PDF Upload & Download System

## 30-Second Setup

Your PDF system is ready! Here's all you need to do:

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Access Admin Panel
Visit: `http://localhost:3000/admin`

### Step 3: Add Your First PDF
1. Click **"Downloadable Resources"** in sidebar
2. Click the document to edit it
3. Upload your PDF file
4. Fill in the details
5. Click **"Save"**

### Step 4: View on Website
Visit: `http://localhost:3000/downloads`

**Done!** Your PDF is now downloadable. 🎉

---

## What You Get

✅ **Downloads Page** - at `/downloads`  
✅ **CMS Admin** - at `/admin`  
✅ **Reusable Component** - `PdfDownload.astro`  
✅ **Type Safe** - Full TypeScript support  
✅ **Mobile Ready** - Responsive design  
✅ **Git Tracked** - All changes in version control  

---

## File Locations

```
public/documents/              ← Upload PDFs here (or via CMS)
src/data/documents.json        ← Document metadata
src/components/PdfDownload.astro     ← Reusable component
src/pages/downloads.astro      ← Downloads page
src/types/document.ts          ← TypeScript types
public/admin/config.yml        ← CMS configuration
```

---

## Using PDFs in Your Pages

```astro
---
import PdfDownload from '../components/PdfDownload.astro';
---

<PdfDownload
  title="Your PDF Title"
  fileUrl="/documents/your-file.pdf"
  description="What this PDF is about"
  category="Guide"
/>
```

---

## Deployment

Just push to GitHub:
```bash
git push origin main
```

Your deployment service (Netlify, Vercel, etc.) will automatically:
1. Build the site
2. Deploy new files
3. Make PDFs live

---

## Documentation

- **PDF_MANAGEMENT.md** - Full detailed guide
- **PDF_ARCHITECTURE.md** - How everything works
- **PDF_TROUBLESHOOTING.md** - Fix common issues
- **PDF_SETUP_CHECKLIST.md** - Detailed checklist

---

## Admin CMS Fields

When adding a PDF in the admin panel:

| Field | What to Put |
|-------|------------|
| **ID** | Unique name: `guide-2026` |
| **Title** | Display name: `Visitor's Guide` |
| **Description** | Summary: `Learn museum basics` |
| **Category** | Guide / Educational / Research / Other |
| **PDF File** | Upload your `.pdf` file |
| **Thumbnail** | Optional preview image |
| **Date Added** | Auto-filled, leave as is |

---

## Quick Reference

| Want to... | Do this |
|-----------|---------|
| Add PDF | Go to `/admin` → Edit in CMS |
| View all PDFs | Visit `/downloads` |
| Use PDF in a page | Import `PdfDownload` component |
| Change styling | Edit `src/components/PdfDownload.astro` |
| Change categories | Edit `public/admin/config.yml` |
| Troubleshoot | See `PDF_TROUBLESHOOTING.md` |

---

## Testing Locally

```bash
# Start dev server
npm run dev

# Test downloads page
# Visit: http://localhost:3000/downloads

# Test admin
# Visit: http://localhost:3000/admin

# Build for production
npm run build

# Preview production
npm run preview
```

---

## Common Tasks

### ✅ Upload PDF
1. `/admin` → "Downloadable Resources"
2. Click document to edit
3. Upload file, fill form
4. Click "Save"

### ✅ Delete PDF
1. `/admin` → Remove from list
2. Save

### ✅ Edit PDF info
1. `/admin` → Click document
2. Change details
3. Save

### ✅ Add PDF to specific page
```astro
import PdfDownload from '../components/PdfDownload.astro';

<PdfDownload
  title="PDF Name"
  fileUrl="/documents/filename.pdf"
/>
```

---

## Pro Tips

💡 Use descriptive PDF names: `visitor-guide-2026.pdf`  
💡 Keep PDFs under 10MB for fast loading  
💡 Add 400x300px thumbnails for better look  
💡 Use same category names consistently  
💡 Check `/admin` regularly for activity  

---

## Next Steps

1. ✅ Run `npm run dev`
2. ✅ Visit `/admin`
3. ✅ Upload a PDF
4. ✅ Check `/downloads`
5. ✅ Deploy to GitHub
6. ✅ See it live on your website!

---

**Questions?** Check the documentation files or look at the example in `src/data/documents.json`.

Happy uploading! 📄✨
