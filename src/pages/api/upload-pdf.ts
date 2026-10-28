import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function POST({ request }: any) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const pdfFile = formData.get('pdfFile');
    const thumbnail = formData.get('thumbnail');

    // Validate inputs
    if (!title || !description || !category || !pdfFile) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!(pdfFile instanceof File) || pdfFile.type !== 'application/pdf') {
      return new Response(
        JSON.stringify({ error: 'Invalid PDF file' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const fileUrl = `/documents/${fileName}`;

    // Read file buffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save PDF to public/documents
    const docsDir = join(process.cwd(), 'public', 'documents');
    if (!existsSync(docsDir)) {
      // Create directory if it doesn't exist (but it should)
      console.log('Documents folder not found at', docsDir);
    }

    const filePath = join(docsDir, fileName);
    writeFileSync(filePath, buffer);

    // Load existing documents
    const documentsPath = join(process.cwd(), 'src', 'data', 'documents.json');
    let documents = [];
    
    if (existsSync(documentsPath)) {
      const fileContent = readFileSync(documentsPath, 'utf-8');
      try {
        documents = JSON.parse(fileContent);
      } catch {
        documents = [];
      }
    }

    // Add new document entry
    const newDocument = {
      id: `doc-${timestamp}`,
      title,
      description,
      category,
      fileUrl,
      thumbnail: thumbnail ? `/images/thumbnails/${timestamp}-${thumbnail.name}` : null,
      dateAdded: new Date().toISOString(),
    };

    documents.push(newDocument);

    // Save updated documents.json
    writeFileSync(documentsPath, JSON.stringify(documents, null, 2));

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Document uploaded successfully',
        document: newDocument 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Upload failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
