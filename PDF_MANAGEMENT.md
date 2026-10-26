# PDF Upload & Download System

This guide explains how to manage PDF documents for download on your Museum at Home website.

## How It Works

Your PDF upload and download system uses:
- **Decap CMS** - Admin interface for managing documents
- **Public folder** - Static storage for PDF files and images
- **documents.json** - Database file that tracks all PDFs
- **Downloads page** - User-facing page to view and download PDFs

## Adding PDF Documents

### Method 1: Via Decap CMS (Recommended for Non-Technical Users)

1. Go to `https://yourdomain.com/admin` (or `http://localhost:3000/admin` locally)
2. Click on **"Downloadable Resources"** in the left sidebar
3. Click **"New Document"** or edit an existing one
4. Fill in the following fields:
   - **ID**: Unique identifier (e.g., "guide-001")
   - **Title**: Name of the document (e.g., "Museum Visitor's Guide")
   - **Description**: Brief explanation of what the document contains
   - **Category**: Choose from Guide, Educational, Research, or Other
   - **PDF File**: Click to upload your PDF file
   - **Thumbnail**: Optional image to display with the PDF
   - **Date Added**: When you added the document

5. Click **"Save"**
6. The changes will be committed to your GitHub repository automatically

### Method 2: Manual Upload to Public Folder

If you prefer to handle files directly:

1. Add your PDF to: `public/documents/` folder
2. Edit `src/data/documents.json` manually
3. Add an entry following this format:

```json
{
  "id": "guide-001",
  "title": "Museum Visitor's Guide",
  "description": "Complete guide to museum etiquette and resources",
  "category": "Guide",
  "fileUrl": "/documents/visitors-guide.pdf",
  "thumbnail": "/images/guide-thumb.jpg",
  "dateAdded": "2026-10-26T00:00:00Z"
}
```

## File Structure

```
public/
  ├── documents/          # Store PDF files here
  │   ├── guide-001.pdf
  │   └── research-001.pdf
  └── images/             # Thumbnails for PDFs
      ├── guide-thumb.jpg
      └── research-thumb.jpg

src/
  ├── data/
  │   └── documents.json  # Document metadata
  ├── pages/
  │   └── downloads.astro # Public downloads page
  ├── components/
  │   └── PdfDownload.astro # Reusable PDF card component
  └── types/
      └── document.ts     # TypeScript type definitions
```

## Using PDFs in Different Contexts

### On the Downloads Page
Documents automatically appear at `/downloads` and are organized by category.

### In Other Pages
You can embed individual PDF download cards in any Astro page:

```astro
---
import PdfDownload from '../components/PdfDownload.astro';
---

<PdfDownload
  title="Museum Guide"
  fileUrl="/documents/guide.pdf"
  description="A comprehensive guide to the museum"
  category="Guide"
  thumbnail="/images/guide-thumb.jpg"
/>
```

### In Museum Profiles
You can add PDF links to specific museums by adding a field to their data:

```json
{
  "id": 1,
  "name": "Art Museum",
  "relatedDocuments": ["guide-001", "research-001"]
}
```

## Best Practices

1. **File Naming**: Use descriptive, lowercase names with hyphens
   - ✅ `visitor-guide.pdf`
   - ❌ `Document1.pdf`

2. **File Sizes**: 
   - Keep PDFs under 10MB for optimal performance
   - Compress large PDFs before uploading

3. **Thumbnails**: 
   - Create thumbnails at 400x300px
   - Use consistent branding/styling

4. **Categories**: 
   - Use consistent categories so users can find related documents
   - Consider adding custom categories if needed

5. **Descriptions**: 
   - Write clear, concise descriptions (1-2 sentences)
   - Help users understand what's in each document

## Troubleshooting

### PDFs Not Showing Up in Decap CMS
- Make sure you're logged in to your CMS
- Clear browser cache and refresh
- Check that `documents.json` exists in `src/data/`

### Download Links Broken
- Verify the file exists in `public/documents/`
- Check that the path in `documents.json` matches exactly (paths are case-sensitive)
- Ensure the file extension is `.pdf`

### Changes Not Appearing on Website
- Wait for your deployment to complete (usually 1-2 minutes)
- Hard refresh your browser (Cmd+Shift+R on Mac)
- Check GitHub for successful commits

## Security Considerations

- Decap CMS uses GitHub for authentication - only invited users can make changes
- All PDF files are public - don't upload sensitive/confidential documents
- Consider adding password protection for sensitive PDFs (requires custom solution)

## Next Steps

1. Create the `public/documents/` folder
2. Add your first PDF to the folder
3. Add an entry to `documents.json` via Decap CMS
4. Visit `/downloads` to see it live
5. Consider adding PDF links to specific museum pages or other areas

For more help, see the main README.md or DECAP_CMS_SETUP.md
