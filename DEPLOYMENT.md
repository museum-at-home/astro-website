# Deployment Guide

## What's Ready to Deploy

Your Astro website is now fully built and ready to launch! Here's what you have:

### ✅ Build Output
- **Location**: `/dist/` directory
- **Files Generated**: 
  - `/index.html` (Home page)
  - `/about/index.html` (About page)
  - `/contact/index.html` (Contact page)
  - `/explore/index.html` (Explore page)
  - `/map/index.html` (Map page)
  - CSS and JavaScript assets bundled and optimized

### ✅ Project Structure
```
dist/                          # Production-ready files (upload this to your domain)
src/
  ├── components/             # Reusable components
  ├── layouts/                # Page layouts
  ├── pages/                  # Page files (auto-routed)
  └── styles/                 # Global styles
package.json                  # Project dependencies
astro.config.mjs             # Astro configuration
```

## Deployment Steps

### Option 1: Using Netlify (Recommended for Astro)
1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings (should auto-detect):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Deploy!

### Option 2: Using Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Framework: Select "Astro"
6. Deploy!

### Option 3: Manual Deployment (Any Web Host)
1. Build the project locally: `npm run build`
2. Upload the contents of the `dist/` folder to your web hosting
3. Ensure your domain points to the hosting server
4. No server-side configuration needed (static site)

### Option 4: Using Docker
Create a `Dockerfile` if you need containerized deployment:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Pre-Deployment Checklist

- [ ] **Update Contact Information**
  - Edit `/src/pages/contact.astro` with your actual email, phone, and address
  
- [ ] **Update Social Media Links**
  - Edit the social links section in `/src/pages/contact.astro`
  
- [ ] **Customize Map Page**
  - Add Google Maps, Mapbox, or your preferred map service
  - Edit `/src/pages/map.astro`
  
- [ ] **Add Your Content**
  - Update home page welcome message
  - Add team information to About page
  - Add featured items to Explore page
  
- [ ] **Update Site Title and Meta Description**
  - Edit page titles in each `.astro` file
  - Update the Layout component in `/src/layouts/Layout.astro`
  
- [ ] **Configure Domain**
  - Ensure your domain's DNS points to your hosting provider
  - Update site URL in `astro.config.mjs` if needed
  
- [ ] **Test All Pages**
  - Visit each page in development: `npm run dev`
  - Check all navigation links work
  - Test contact form
  
- [ ] **Mobile Responsiveness**
  - Test on mobile devices
  - Verify navigation works on small screens
  
- [ ] **Performance**
  - Run `npm run build` to ensure no errors
  - Check generated `dist/` folder has all pages

## Environment Variables (if needed)

If you need environment variables later, create a `.env` file:
```
PUBLIC_API_URL=https://your-api.com
SECRET_API_KEY=your_secret_key
```

Note: In Astro, variables starting with `PUBLIC_` are exposed to the browser.

## Git Version Control

Your project is now tracked in Git with the initial commit:
```bash
git log                    # View commit history
git status                # Check file status
git add .                 # Stage changes
git commit -m "message"   # Commit changes
```

## Commands Reference

```bash
# Development
npm run dev              # Start dev server (http://localhost:4321)
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run astro -- --help  # View all Astro commands
```

## After Deployment

1. **Test Your Domain**
   - Visit all pages through your domain
   - Test navigation
   - Verify contact form works
   
2. **Monitor Performance**
   - Use tools like Google PageSpeed Insights
   - Check Google Analytics (when set up)
   
3. **Updates**
   - When making changes, rebuild: `npm run build`
   - Redeploy the `dist/` folder
   - Consider using a CI/CD pipeline for automated deployments

## Support & Resources

- Astro Docs: https://docs.astro.build
- Deployment Guide: https://docs.astro.build/en/guides/deploy/
- Astro Community: https://astro.build/chat

---

**Your website is ready to go live! 🚀**
