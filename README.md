# Quix Company Website

A professional, modern company website for Quix - a leading provider of geopolitical threat intelligence solutions.

## Overview

This website serves as the primary online presence for Quix, showcasing our advanced threat intelligence platform, services, and capabilities. Built with modern web technologies, the site features a clean, professional design with smooth animations and full mobile responsiveness.

## Features

- **Modern Design**: Clean, professional interface with smooth animations and transitions
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Navigation**: Smooth scrolling, active link highlighting, mobile menu
- **Animated Sections**: Fade-in effects and scroll-triggered animations
- **Contact Form**: Integrated contact form for inquiries
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Structure

```
quix-web/
├── index.html      # Main HTML file
├── styles.css      # All styling and responsive design
├── script.js       # Interactive features and animations
└── README.md       # This file
```

## Sections

1. **Hero Section**: Compelling headline with call-to-action buttons
2. **About Section**: Company overview with key statistics
3. **Services Section**: Six core service offerings with icons and descriptions
4. **Features Section**: Eight platform features highlighting capabilities
5. **Technology Section**: Four categories showcasing technical infrastructure
6. **Contact Section**: Contact form and company information
7. **Footer**: Links, company info, and legal pages

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, animations
- **JavaScript (Vanilla)**: No dependencies, pure JavaScript for all interactions
- **Google Fonts**: Inter font family for modern typography

## Getting Started

### Local Development

1. Clone the repository
2. Navigate to the `quix-web` directory
3. Open `index.html` in a web browser

Or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Customization

### Colors

All colors are defined as CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #0f172a;
    --accent-color: #06b6d4;
    /* ... more variables */
}
```

### Content

Edit `index.html` to update:
- Company information
- Service descriptions
- Features and technology lists
- Contact information

### Styling

Modify `styles.css` to customize:
- Typography
- Colors and gradients
- Spacing and layout
- Animations

### Functionality

Update `script.js` to change:
- Navigation behavior
- Animation triggers
- Form handling
- Interactive elements

## Contact Form Integration

The contact form currently displays an alert on submission. To integrate with a backend:

1. Uncomment the fetch code in `script.js`
2. Update the endpoint URL to your backend API
3. Implement server-side form handling

Example:

```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    // Handle success
})
.catch(error => {
    // Handle error
});
```

## Deployment

### Static Hosting

This website can be deployed to any static hosting service:

- **GitHub Pages**: Push to a repository and enable GitHub Pages
- **Netlify**: Drag and drop the `quix-web` folder
- **Vercel**: Deploy via CLI or GitHub integration
- **AWS S3**: Upload files and configure static website hosting
- **Cloudflare Pages**: Connect to repository or upload files

### Traditional Web Servers

Upload files via FTP/SFTP to your web server's public directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The website is optimized for performance:
- Minimal dependencies (no external libraries)
- Optimized images (when added)
- Efficient CSS with hardware-accelerated animations
- Lazy loading for off-screen content
- Gzip compression ready

## Future Enhancements

Potential improvements:
- Blog section for thought leadership
- Case studies/testimonials
- Interactive product demos
- Multi-language support
- Dark mode toggle
- Search functionality
- Newsletter signup integration

## License

© 2025 Quix Intelligence. All rights reserved.

## Support

For questions or issues, contact: info@quix-intel.com
