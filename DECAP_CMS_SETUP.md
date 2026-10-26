# Decap CMS Setup Guide

## What is Decap CMS?

Decap CMS is a Git-based headless CMS that allows you to manage your content (museums data, pages, etc.) through a web interface without touching code. It stores everything directly in your GitHub repository.

## Setup Instructions

### Step 1: Install Netlify Identity (Optional but Recommended)

Netlify Identity provides free authentication for up to 3 users:

1. Go to [netlify.com](https://netlify.com) and sign up
2. Create a new site from your GitHub repository
3. Enable **Identity** in your Netlify site settings
4. Enable **Git Gateway** in your Identity settings
5. Invite yourself as a user (you'll get an email)

### Step 2: Alternative - Use GitHub Personal Access Token (Free)

If you don't want to use Netlify, you can use GitHub authentication directly:

1. Go to your GitHub account → Settings → Developer settings → Personal access tokens
2. Create a new token with `repo` scope
3. This token will be used for authentication

### Step 3: Access Your CMS

Once deployed, your CMS will be at: `https://yourdomain.com/admin`

**Local Development:**
```bash
npm run dev
# Then visit: http://localhost:3000/admin
```

## What You Can Manage

### Museums Database
- Add new museums
- Edit existing museum information
- Modify museum types (Art, Science, History, Ethnography/Cultural, Archaeology, Natural History)
- Update ratings, tour links, and descriptions
- No need to manually edit `museums.json`

### Pages
- Home page content
- About page content
- Contact page content

## Workflow

1. **Edit in CMS**: Go to `/admin` and make changes
2. **Publish**: Click "Publish" in the CMS
3. **Auto-deploy**: Changes are committed to GitHub
4. **Auto-build**: Your hosting (Netlify/Vercel) rebuilds and deploys automatically

## Important Notes

⚠️ **Netlify Identity Setup Required**
- The CMS is configured to use GitHub backend through Netlify Identity
- You need to complete the Netlify setup for the CMS to work
- Netlify's free tier includes Identity for up to 3 users

## Security

- The `config.yml` file controls what can be edited
- Users must authenticate via Netlify Identity or GitHub
- All changes are made through Git commits (full version history)
- You can review and revert changes in GitHub

## Troubleshooting

**CMS shows "Access Token failed"**
- Make sure Netlify Identity and Git Gateway are enabled
- Invite yourself as a user in Netlify
- Check that your repository is correctly linked

**Changes aren't appearing**
- Wait 1-2 minutes for the auto-deploy to complete
- Check your deployment logs in Netlify/Vercel
- Verify changes were committed to your GitHub repository

**JSON formatting issues**
- The CMS handles JSON formatting automatically
- Don't manually edit `museums.json` while using the CMS

## Next Steps

1. Deploy your site to Netlify/Vercel
2. Set up Netlify Identity (or GitHub token authentication)
3. Visit `/admin` and start managing your content!
4. Add more team members by inviting them in Netlify Identity

For more information, visit [decapcms.org](https://decapcms.org)
