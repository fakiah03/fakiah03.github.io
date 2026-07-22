# Premium Software Developer Portfolio

A luxurious, high-end, Awwwards-inspired developer portfolio designed and developed for Fakiah. 
The project utilizes a modern glassmorphism aesthetic, deep purple and gold accents, and a futuristic dark theme.

## Features
- **Responsive Layout**: Adapts perfectly across Desktop, Laptop, Tablet, and Mobile devices.
- **Glassmorphism**: Sleek frosted glass UI components.
- **Interactive Animations**: Utilizing AOS (Animate on Scroll), Particles.js, Vanilla Tilt, and Typed.js.
- **Project Filtering**: Dynamic filtering to showcase projects by technology (e.g. PHP, Laravel).
- **Custom Elements**: Custom cursor, loading screen, scroll progress bar, and floating particle background.

## Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Libraries**:
  - [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
  - [Typed.js](https://mattboldt.com/demos/typed-js/)
  - [Vanilla Tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)
  - [Particles.js](https://vincentgarreau.com/particles.js/)
  - [Isotope.js](https://isotope.metafizzy.co/)
  - [Font Awesome 6](https://fontawesome.com/)

## File Structure
```
portfolio/
├── assets/
│   ├── css/
│   │   ├── style.css       # Core styles, variables, typography
│   │   ├── responsive.css  # Media queries
│   │   └── animation.css   # Keyframes, loader, cursor
│   ├── js/
│   │   ├── main.js         # Core logic (nav, loader, cursor, ripple)
│   │   ├── animation.js    # 3rd party initializations (AOS, Particles)
│   │   ├── filter.js       # Isotope project filtering
│   │   └── typing.js       # Typed.js hero text configuration
│   ├── images/
│   │   ├── profile/        # Contains developer profile pictures
│   │   └── projects/       # Contains project screenshots
│   └── downloads/
│       └── resume.pdf      # Downloadable resume
├── index.html              # Main HTML structure
└── README.md
```

## Setup & Running Locally
Simply serve the `index.html` file using any local web server. 
For example, using Python 3:
```bash
cd portfolio
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

## Design Aesthetic
- **Primary Background**: `#080808`
- **Secondary Background**: `#111111`
- **Accents**: Neon Purple (`#8A2BE2`) and Gold (`#D4AF37`)
- **Typography**: Poppins (Headings) and Inter (Body)
