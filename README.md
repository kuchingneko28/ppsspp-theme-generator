# PPSSPP Theme Generator 🎮

A modern, web-based tool for creating custom themes (`.ini` files) for the PPSSPP Emulator.
Built with **Alpine.js** and **Glassmorphism** design principles.

## ✨ Features

- **🎨 Visual Editor**: Real-time preview of your theme on a mock PSP interface.
- **📱 Mobile Friendly**: Fully responsive design with a collapsible hamburger menu and stacked tabs.
- **⚙️ Advanced Controls**:
  - Multiple Views: **Home** (Grid) and **Settings** (List) to test all UI elements.
  - Transparency: Adjust Alpha levels (0-100%) for every color.
  - Live Code Preview: See the `.ini` source code generate as you type.
- **💾 Project Management**:
  - **Save/Load**: Export your work-in-progress as `.json` and resume later.
  - **Presets**: Quick-start with "Default Blue", "Catppuccin Mocha/Latte", or "I'm Feeling Lucky" (Randomizer).
- **📥 Export**: Download ready-to-use `theme.ini` files directly to your device.

## 🛠️ Technology Stack

- **HTML5 & CSS3**: Custom properties (Variables), Flexbox, CSS Grid.
- **JavaScript (Alpine.js)**: Lightweight reactive state management.
- **Lucide Icons**: Beautiful, consistently styled SVG icons.
- **Fonts**: _Plus Jakarta Sans_ and _JetBrains Mono_.

## 🚀 How to Use

1.  Open the [Live Editor](#) (or host it locally).
2.  **Pick Colors**: Use the sidebar to adjust background, text, and accent colors.
3.  **Test Views**: Switch between the "Home" and "Settings" tabs to ensure readability.
4.  **Download**: Click "Download Theme" to get your `.ini` file.
5.  **Install**: Place the file in your `PSP/SYSTEM/THEMES/` folder.

## 📂 Project Structure

```
/
├── index.html       # Main application entry
├── css/
│   └── style.css    # All styles (Glassmorphism, Layouts)
└── js/
    └── script.js    # Alpine.js logic (State, Export, Color Math)
```

## 📜 License

Created with 🐾 by **Tuan Kuchiiing**.
Free to use for creating any PPSSPP theme.
