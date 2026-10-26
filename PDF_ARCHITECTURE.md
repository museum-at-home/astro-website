# PDF System Architecture & Flow

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    End Users (Website)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    Visits /downloads
                           │
        ┌──────────────────▼───────────────────┐
        │   downloads.astro (Public Page)      │
        │   - Loads documents.json             │
        │   - Groups by category               │
        │   - Renders PdfDownload components   │
        └──────────────────┬───────────────────┘
                           │
        ┌──────────────────▼───────────────────┐
        │  PdfDownload.astro (Component)       │
        │  - Displays PDF card                 │
        │  - Shows title, description, thumb   │
        │  - Provides download button           │
        └──────────────────┬───────────────────┘
                           │
        ┌──────────────────▼───────────────────┐
        │  Link to PDF File                    │
        │  /documents/example.pdf              │
        └──────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               Admin/Editors (Decap CMS)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    Visit /admin
                           │
        ┌──────────────────▼───────────────────┐
        │  Decap CMS Admin Interface           │
        │  - "Downloadable Resources"           │
        │  - Upload PDF files                  │
        │  - Edit metadata                     │
        └──────────────────┬───────────────────┘
                           │
        ┌──────────────────▼───────────────────┐
        │  GitHub Commit (Automatic)           │
        │  - Updates documents.json            │
        │  - Stores in Git history             │
        └──────────────────┬───────────────────┘
                           │
        ┌──────────────────▼───────────────────┐
        │  Repository Update                   │
        │  museum-at-home/astro-website        │
        └──────────────────────────────────────┘
```

## File Relationships

```
Input (Admin Creates)
    │
    ├── Uploads PDF file → public/documents/
    ├── Fills metadata → Decap CMS form
    │
    └─→ Commit to GitHub
        │
        └─→ updates src/data/documents.json

Processing (Build Time)
    │
    ├── src/data/documents.json
    │   (Contains document metadata)
    │
    ├── src/types/document.ts
    │   (TypeScript interface for type safety)
    │
    └─→ src/pages/downloads.astro
        (Loads JSON, builds page)

Output (User Sees)
    │
    ├─→ https://domain.com/downloads
    │   (Downloads page)
    │
    └─→ Rendered PdfDownload components
        (Beautiful PDF cards with download links)
```

## Data Flow Example

### 1️⃣ Admin Creates Document in CMS

```yaml
# Form Input in Decap CMS:
ID: guide-museum-2026
Title: Museum Visitor's Guide
Description: Complete guide for first-time visitors
Category: Guide
PDF File: [Upload guide.pdf]
Thumbnail: [Upload thumb.jpg]
Date Added: 2026-10-26
```

### 2️⃣ Automatically Saved to documents.json

```json
{
  "id": "guide-museum-2026",
  "title": "Museum Visitor's Guide",
  "description": "Complete guide for first-time visitors",
  "category": "Guide",
  "fileUrl": "/documents/guide-museum-2026.pdf",
  "thumbnail": "/images/guide-thumb.jpg",
  "dateAdded": "2026-10-26T15:30:00Z"
}
```

### 3️⃣ PDF File Stored in Repository

```
public/documents/guide-museum-2026.pdf
```

### 4️⃣ Rendered on /downloads Page

```
┌─────────────────────────────┐
│ Museum Visitor's Guide      │
├─────────────────────────────┤
│ [Thumbnail Image]           │
│                             │
│ [Guide]                     │
│                             │
│ Complete guide for first-   │
│ time visitors               │
│                             │
│ [📄 Download PDF]           │
└─────────────────────────────┘
```

## Component Usage in Different Contexts

### Context 1: Downloads Page
```
src/pages/downloads.astro
├─ Loads src/data/documents.json
├─ Groups by category: "Guide", "Educational", etc.
└─ For each document, renders:
   └─ PdfDownload component
```

### Context 2: Museum Profile
```
src/pages/museums.astro or museum-detail.astro
├─ Load museum data
├─ Find related documents from documents.json
└─ For each related doc, render:
   └─ PdfDownload component
```

### Context 3: About Page
```
src/pages/about.astro
├─ Hardcode or load specific documents
└─ Render:
   └─ PdfDownload component(s)
```

## Files Involved & Their Purposes

```
┌─ Data Layer ─────────────────────────────────┐
│ src/data/documents.json                      │
│ └─ Stores PDF metadata & references         │
│                                              │
│ src/types/document.ts                        │
│ └─ TypeScript type definitions              │
└──────────────────────────────────────────────┘

┌─ Component Layer ─────────────────────────────┐
│ src/components/PdfDownload.astro             │
│ └─ Reusable PDF card component              │
│    ├─ Accepts: title, fileUrl, description, │
│    │            thumbnail, category          │
│    └─ Outputs: Styled PDF download card      │
└──────────────────────────────────────────────┘

┌─ Page Layer ──────────────────────────────────┐
│ src/pages/downloads.astro                    │
│ └─ Full-page downloads listing              │
│    ├─ Loads: documents.json                  │
│    ├─ Imports: PdfDownload component        │
│    └─ Renders: Organized PDF grid           │
└──────────────────────────────────────────────┘

┌─ Admin Layer ─────────────────────────────────┐
│ public/admin/config.yml                      │
│ └─ Decap CMS configuration                 │
│    └─ "Downloadable Resources" collection   │
└──────────────────────────────────────────────┘

┌─ Storage ─────────────────────────────────────┐
│ public/documents/                            │
│ └─ Actual PDF files (served statically)      │
└──────────────────────────────────────────────┘
```

## Complete Request/Response Cycle

### User Downloads a PDF:

```
User clicks "Download PDF" on /downloads
         │
         ▼
Browser sends GET request to /documents/example.pdf
         │
         ▼
CDN serves file from public/documents/
(or generates from src/pages/downloads.astro if dynamic)
         │
         ▼
Browser downloads PDF file
         │
         ▼
✅ User has PDF
```

### Admin Adds New PDF:

```
Admin visits /admin
         │
         ▼
Clicks "Downloadable Resources"
         │
         ▼
Fills form (title, description, category, PDF file)
         │
         ▼
Decap CMS uploads PDF to repo
         │
         ▼
Decap CMS updates documents.json
         │
         ▼
GitHub receives commit
         │
         ▼
Deployment service rebuilds site
         │
         ▼
New PDF appears on /downloads page
         │
         ▼
✅ Live for all users
```

## Configuration Points

```
Decap CMS Config (public/admin/config.yml)
├─ Media folder: "public/images"
├─ PDF upload folder: Uses default media folder
└─ Collections:
   └─ "documents" collection
      ├─ File: src/data/documents.json
      ├─ Widget fields: ID, Title, Description, Category, File, Thumbnail, Date

Component Styling (src/components/PdfDownload.astro)
├─ Colors (currently #1976d2 for brand color)
├─ Spacing & sizing
├─ Responsive breakpoints
└─ Hover effects

Page Layout (src/pages/downloads.astro)
├─ Grid column count
├─ Spacing between cards
├─ Category section styling
└─ Title & intro text
```

## Adding PDF to Other Pages

To embed a PDF card in any other page:

```astro
---
// src/pages/about.astro (or any other page)
import PdfDownload from '../components/PdfDownload.astro';
---

<section>
  <h2>Recommended Resources</h2>
  
  <PdfDownload
    title="Museum Guide"
    fileUrl="/documents/visitor-guide.pdf"
    description="Learn about our museum"
    category="Guide"
  />
</section>
```

---

This architecture provides:
✅ Clean separation of concerns  
✅ Reusable components  
✅ Easy maintenance  
✅ Scalability  
✅ Non-technical admin interface  
✅ Git version control  
