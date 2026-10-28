export async function GET() {
  const config = {
    backend: {
      name: 'github',
      repo: 'museum-at-home/astro-website',
      branch: 'main',
      auth_endpoint: 'api/auth',
      cms_label_prefix: 'cms/'
    },
    local_backend: true,
    media_folder: 'public/images',
    public_path: '/images',
    collections: [
      {
        name: 'museums',
        label: 'Museums',
        folder: 'src/data',
        create: false,
        extension: 'json',
        format: 'json',
        files: [
          {
            file: 'src/data/museums.json',
            label: 'Museums Database',
            name: 'museums',
            fields: [
              { label: 'Museums', name: 'museums', widget: 'list', fields: [
                { label: 'ID', name: 'id', widget: 'number' },
                { label: 'Name', name: 'name', widget: 'string' },
                { label: 'Location', name: 'location', widget: 'string' },
                { label: 'Type', name: 'type', widget: 'select', options: ['Art', 'Science', 'History', 'Ethnography/Cultural'] },
                { label: 'Description', name: 'description', widget: 'text' },
                { label: 'Website', name: 'website', widget: 'string' },
                { label: '3D Tour Available', name: 'has3DTour', widget: 'boolean' },
                { label: 'Audio Tour Available', name: 'hasAudioTour', widget: 'boolean' },
                { label: 'Rating', name: 'rating', widget: 'number', min: 1, max: 5 },
                { label: 'Image URL', name: 'imageUrl', widget: 'string' },
                { label: '3D Tour Link', name: 'link3DTour', widget: 'string', required: false },
                { label: 'Audio Tour Link', name: 'linkAudioTour', widget: 'string', required: false },
                { label: 'Review', name: 'review', widget: 'text', required: false },
                { label: 'Virtual Learning Link', name: 'virtualLearning', widget: 'string', required: false, hint: "Direct link to museum's virtual educational content" }
              ] }
            ]
          }
        ]
      },
      {
        name: 'documents',
        label: 'Downloadable Resources',
        folder: 'src/data',
        create: true,
        extension: 'json',
        format: 'json',
        files: [
          {
            file: 'src/data/documents.json',
            label: 'Documents Database',
            name: 'documents',
            fields: [
              { label: 'Documents', name: 'documents', widget: 'list', fields: [
                { label: 'ID', name: 'id', widget: 'string' },
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
                { label: 'Category', name: 'category', widget: 'select', options: ['Guide', 'Educational', 'Research', 'Other'] },
                { label: 'PDF File', name: 'fileUrl', widget: 'file', media_library: { config: { multiple: false } } },
                { label: 'Thumbnail', name: 'thumbnail', widget: 'image', required: false },
                { label: 'Date Added', name: 'dateAdded', widget: 'datetime' }
              ] }
            ]
          }
        ]
      }
    ]
  };

  return new Response(JSON.stringify(config), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
