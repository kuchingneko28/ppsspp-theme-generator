function themeApp() {
  return {
    themeName: "My Theme",
    mobileMenuOpen: false,
    activeTab: "home",
    iniContent: "",
    // Standard PPSSPP Default Colors (Classic Blue)
    colors: {
      // General
      BackgroundColor: { hex: "#244d75", alpha: 1 },
      ItemStyleFg: { hex: "#ffffff", alpha: 1 },
      ItemStyleBg: { hex: "#000000", alpha: 0.33 }, // ~0x55 alpha

      // Interaction - Highlight (Down)
      ItemDownStyleFg: { hex: "#ffffff", alpha: 1 },
      ItemDownStyleBg: { hex: "#3999bd", alpha: 1 },

      // Interaction - Focus (Selected/Controller)
      ItemFocusedStyleFg: { hex: "#ffffff", alpha: 1 },
      ItemFocusedStyleBg: { hex: "#4cc2ed", alpha: 1 },

      // Interaction - Disabled
      ItemDisabledStyleFg: { hex: "#eeeeee", alpha: 0.5 }, // ~0x80 alpha
      ItemDisabledStyleBg: { hex: "#000000", alpha: 0.33 }, // ~0x55 alpha

      // Headers & Info
      HeaderStyleFg: { hex: "#ffffff", alpha: 1 },
      InfoStyleFg: { hex: "#ffffff", alpha: 1 },
      InfoStyleBg: { hex: "#000000", alpha: 0 }, // Fully transparent

      // Popups
      PopupTitleStyleFg: { hex: "#59bee3", alpha: 1 },
      PopupStyleFg: { hex: "#ffffff", alpha: 1 },
      PopupStyleBg: { hex: "#1f4d5e", alpha: 1 },
    },

    presets: {
      default: {
        name: "Default Blue",
        BackgroundColor: { hex: "#244d75", alpha: 1 },
        ItemStyleFg: { hex: "#ffffff", alpha: 1 },
        ItemStyleBg: { hex: "#000000", alpha: 0.33 },
        ItemDownStyleFg: { hex: "#ffffff", alpha: 1 },
        ItemDownStyleBg: { hex: "#3999bd", alpha: 1 },
        ItemFocusedStyleFg: { hex: "#ffffff", alpha: 1 },
        ItemFocusedStyleBg: { hex: "#4cc2ed", alpha: 1 },
        ItemDisabledStyleFg: { hex: "#eeeeee", alpha: 0.5 },
        ItemDisabledStyleBg: { hex: "#000000", alpha: 0.33 },
        HeaderStyleFg: { hex: "#ffffff", alpha: 1 },
        InfoStyleFg: { hex: "#ffffff", alpha: 1 },
        InfoStyleBg: { hex: "#000000", alpha: 0 },
        PopupTitleStyleFg: { hex: "#59bee3", alpha: 1 },
        PopupStyleFg: { hex: "#ffffff", alpha: 1 },
        PopupStyleBg: { hex: "#1f4d5e", alpha: 1 },
      },
      mocha: {
        name: "Catppuccin Mocha",
        BackgroundColor: { hex: "#1e1e2e", alpha: 1 },
        ItemStyleFg: { hex: "#cdd6f4", alpha: 1 },
        ItemStyleBg: { hex: "#181825", alpha: 0.5 },
        ItemDownStyleFg: { hex: "#1e1e2e", alpha: 1 },
        ItemDownStyleBg: { hex: "#89b4fa", alpha: 1 },
        ItemFocusedStyleFg: { hex: "#89b4fa", alpha: 1 },
        ItemFocusedStyleBg: { hex: "#89b4fa", alpha: 1 },
        ItemDisabledStyleFg: { hex: "#6c7086", alpha: 1 },
        ItemDisabledStyleBg: { hex: "#1e1e2e", alpha: 0.5 },
        HeaderStyleFg: { hex: "#cdd6f4", alpha: 1 },
        InfoStyleFg: { hex: "#cdd6f4", alpha: 1 },
        InfoStyleBg: { hex: "#000000", alpha: 0 },
        PopupTitleStyleFg: { hex: "#89b4fa", alpha: 1 },
        PopupStyleFg: { hex: "#cdd6f4", alpha: 1 },
        PopupStyleBg: { hex: "#181825", alpha: 1 },
      },
      latte: {
        name: "Catppuccin Latte",
        BackgroundColor: { hex: "#eff1f5", alpha: 1 },
        ItemStyleFg: { hex: "#4c4f69", alpha: 1 },
        ItemStyleBg: { hex: "#e6e9ef", alpha: 0.5 },
        ItemDownStyleFg: { hex: "#eff1f5", alpha: 1 },
        ItemDownStyleBg: { hex: "#1e66f5", alpha: 1 },
        ItemFocusedStyleFg: { hex: "#1e66f5", alpha: 1 },
        ItemFocusedStyleBg: { hex: "#1e66f5", alpha: 1 },
        ItemDisabledStyleFg: { hex: "#9ca0b0", alpha: 1 },
        ItemDisabledStyleBg: { hex: "#eff1f5", alpha: 0.5 },
        HeaderStyleFg: { hex: "#4c4f69", alpha: 1 },
        InfoStyleFg: { hex: "#4c4f69", alpha: 1 },
        InfoStyleBg: { hex: "#000000", alpha: 0 },
        PopupTitleStyleFg: { hex: "#1e66f5", alpha: 1 },
        PopupStyleFg: { hex: "#4c4f69", alpha: 1 },
        PopupStyleBg: { hex: "#e6e9ef", alpha: 1 },
      },
    },

    init() {
      this.updateCSS();
      setTimeout(() => {
        if (window.lucide) window.lucide.createIcons();
      }, 50);
    },

    applyPreset(key) {
      if (this.presets[key]) {
        const preset = this.presets[key];
        // Extract name and handle colors separately
        const { name, ...colors } = preset;

        // Deep copy just the colors
        this.colors = JSON.parse(JSON.stringify(colors));

        if (name) {
          this.themeName = name;
        }
        this.updateCSS();
      }
    },

    randomizeColors() {
      const h = Math.floor(Math.random() * 360);
      const s = Math.floor(Math.random() * 40) + 40; // 40-80%
      const l = Math.floor(Math.random() * 20) + 10; // 10-30% (Dark bg)

      // Helper to hsl->hex
      const hslToHex = (h, s, l) => {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n) => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      };

      const bgHex = hslToHex(h, s, l);
      const accentHex = hslToHex((h + 180) % 360, 80, 60); // Complementary hue
      const textHex = "#ffffff";

      // Apply base logic
      this.colors.BackgroundColor.hex = bgHex;
      this.colors.ItemStyleFg.hex = textHex;
      this.colors.ItemStyleBg.hex = "#000000";

      this.colors.ItemDownStyleBg.hex = accentHex;
      this.colors.ItemDownStyleFg.hex = bgHex;

      this.colors.ItemFocusedStyleBg.hex = accentHex;
      this.colors.ItemFocusedStyleFg.hex = "#ffffff";

      this.colors.PopupTitleStyleFg.hex = accentHex;
      this.colors.PopupStyleFg.hex = textHex;
      this.colors.PopupStyleBg.hex = hslToHex(h, s, l + 10);

      this.themeName = `Random ${Math.floor(Math.random() * 1000)}`;
      this.updateCSS();
    },

    updateCSS() {
      Object.entries(this.colors).forEach(([key, value]) => {
        if (value && value.hex) {
          // check if valid color object
          const cssVar = `--${key}`;
          const rgba = this.hexToRgba(value.hex, value.alpha);
          document.documentElement.style.setProperty(cssVar, rgba);
        }
      });

      // Update Live Preview
      this.iniContent = this.getIniContent();

      // Re-render icons in case DOM changed (though mostly static)
      setTimeout(() => {
        if (window.lucide) window.lucide.createIcons();
      }, 0);
    },

    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },

    rgbaToPPSSPP(hex, alphaVal) {
      return `0x${Math.round(alphaVal * 255)
        .toString(16)
        .padStart(2, "0")}${hex.slice(5, 7)}${hex.slice(3, 5)}${hex.slice(1, 3)}`.toLowerCase();
    },

    saveProject() {
      const projectData = {
        themeName: this.themeName,
        colors: this.colors,
        version: "1.0",
      };
      const blob = new Blob([JSON.stringify(projectData, null, 2)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${this.themeName.replace(/\s+/g, "_")}_project.json`;
      link.click();
      URL.revokeObjectURL(link.href);
    },

    triggerLoad() {
      document.getElementById("projectLoader").click();
    },

    loadProject(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.colors && data.themeName) {
            this.themeName = data.themeName;
            this.colors = data.colors;
            this.updateCSS();
            // Reset input so same file can be selected again
            event.target.value = "";
          } else {
            alert("Invalid project file structure.");
          }
        } catch (err) {
          console.error(err);
          alert("Failed to load project file.");
        }
      };
      reader.readAsText(file);
    },

    getIniContent() {
      const theme = {
        Name: this.themeName || "My Theme",
      };

      // Add all colors to the theme object
      Object.entries(this.colors).forEach(([key, value]) => {
        if (value && value.hex) {
          theme[key] = this.rgbaToPPSSPP(value.hex, value.alpha);
        }
      });

      return (
        `[${theme.Name.replace(/\s+/g, "")}]\n` +
        Object.entries(theme)
          .map(([key, value]) => `${key} = ${value}`)
          .join("\n")
      );
    },

    downloadTheme() {
      const iniContent = this.getIniContent();
      const blob = new Blob([iniContent], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${(this.themeName || "theme").replace(/\s+/g, "_")}.ini`;
      link.click();
      URL.revokeObjectURL(link.href);
    },
  };
}
