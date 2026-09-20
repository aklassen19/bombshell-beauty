# Blonde Bombshell Beauty Website

## Files
- index.html — Home page
- about.html — About Krista
- services.html — Services & Pricing
- faq.html — FAQ
- book.html — Booking form
- css/global.css — All shared styles
- components.js — Shared navbar & footer
- images/ — Put logo.png here

## Setup Steps

### 1. Add Your Logo
Place Krista's logo file named exactly `logo.png` inside the `images/` folder.

### 2. Connect the Booking Form
Open `book.html` and find this line:
  action="https://formspree.io/f/YOUR_FORM_ID"
Replace YOUR_FORM_ID with your actual Formspree form ID.

### 3. Test Locally
Just open `index.html` in your browser — no server needed!

### 4. Deploy to Netlify (Free)
1. Go to netlify.com and sign up free
2. Drag the entire bombshell-site folder onto the Netlify dashboard
3. Netlify gives you a free URL instantly
4. To use a custom domain, go to Site Settings → Domain Management

## Updating Prices
Open services.html and edit the prices directly in the HTML.
Each price is inside a <span class="service-price"> tag.

## Adding Photos
Replace the image URLs in index.html and about.html with your own
photo URLs, or save photos to the images/ folder and use:
  src="images/your-photo.jpg"
