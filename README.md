# Modern Portfolio Website

A beautiful, responsive dark-themed portfolio website built with modern web technologies.

## Features

- **Modern Dark Theme**: Elegant blue-to-purple gradient design
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Hover effects, floating animations, and smooth scrolling
- **Interactive Elements**: Animated skill bars, mobile navigation, back-to-top button
- **Clean Code**: Well-structured HTML with modern CSS and JavaScript

## Sections

- **Hero**: Introduction with profile image and call-to-action buttons
- **About**: Personal information, experience timeline, and bio
- **Skills**: Technical and professional skills with animated progress bars
- **Projects**: Portfolio of work with project cards and links
- **Contact**: Contact form and information with social media links
- **Footer**: Additional navigation and copyright information

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox/Grid
- **TailwindCSS**: Utility-first CSS framework
- **JavaScript**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## Getting Started

1. Open `index.html` in your web browser
2. Or serve it using a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   live-server
   ```

## Customization

To personalize this portfolio:

1. Replace the profile image in `images/` folder
2. Update personal information in `index.html`
3. Modify the color scheme in the CSS variables
4. Add your own projects and content
5. Update social media links and contact information

## File Structure

```
My-Portfolio/
├── index.html          # Main HTML file
├── css/                # Stylesheets
│   └── styles.css     # Main CSS file with custom styles
├── js/                 # JavaScript files
│   └── script.js      # Main JavaScript functionality
├── images/             # Image assets
│   └── rehana.jpeg    # Profile image
└── README.md          # This file
```

## Customization Made Easy

### 🎨 **CSS Variables (css/styles.css)**
Easily change the entire color scheme by modifying these variables:
```css
:root {
    --primary-color: #0ea5e9;     /* Main blue color */
    --secondary-color: #7e22ce;   /* Purple accent color */
    --dark-bg: #0f172a;           /* Dark background */
    --darker-bg: #020617;         /* Darker sections */
    --text-primary: #e2e8f0;      /* Main text color */
    --text-secondary: #94a3b8;    /* Secondary text */
    --card-bg: #1e293b;           /* Card background */
}
```

### 📝 **Content (index.html)**
- Update personal information in the HTML
- Replace placeholder text with your content
- Add your own projects and experience
- Update social media links

### ⚙️ **Functionality (js/script.js)**
- Contact form validation and handling
- Smooth scrolling navigation
- Mobile menu functionality
- Skill bar animations
- Scroll-triggered animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).
