const colorVars = {
  ItemStyleFg: "--ItemStyleFg",
  ItemStyleBg: "--ItemStyleBg",
  ItemDownStyleBg: "--ItemDownStyleBg",
  PopupTitleStyleFg: "--PopupTitleStyleFg",
};

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

window.addEventListener("DOMContentLoaded", () => {
  Object.entries(colorVars).forEach(([id, cssVar]) => {
    const input = document.getElementById(id);
    const alphaInput = document.getElementById(id + "Alpha");

    if (!input || !alphaInput) return;

    const cssValue = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();

    if (cssValue.startsWith("rgba")) {
      const rgbaMatch = cssValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (rgbaMatch) {
        input.value = `#${[1, 2, 3].map((i) => parseInt(rgbaMatch[i]).toString(16).padStart(2, "0")).join("")}`;
        alphaInput.value = parseFloat(rgbaMatch[4]);
      }
    }

    function updateColor() {
      const rgba = hexToRgba(input.value, alphaInput.value);
      document.documentElement.style.setProperty(cssVar, rgba);
    }

    input.addEventListener("input", updateColor);
    alphaInput.addEventListener("input", updateColor);
  });
});

function rgbaToPPSSPP(rgba) {
  const [r, g, b, a] = (rgba.match(/([0-9.]+)/g) || []).map(Number);
  const alpha = Math.round((a || 1) * 255);
  return `0x${alpha.toString(16).padStart(2, "0")}${[b, g, r].map(c => (c || 0).toString(16).padStart(2, "0")).join("")}`.toLowerCase();
}

function generateIni() {
  const themeName = document.getElementById("themeName").value.trim();
  if (!themeName) {
    alert("Please input theme name.");
    return;
  }

  const rootStyles = getComputedStyle(document.documentElement);
  const getColor = (id) => rgbaToPPSSPP(rootStyles.getPropertyValue(colorVars[id]).trim());

  const theme = {
    Name: themeName,
    ItemStyleFg: getColor("ItemStyleFg"),
    ItemStyleBg: getColor("ItemStyleBg"),
    ItemFocusedStyleFg: getColor("ItemStyleFg"),
    ItemFocusedStyleBg: getColor("ItemDownStyleBg"),
    ItemDownStyleFg: getColor("ItemStyleFg"),
    ItemDownStyleBg: getColor("ItemDownStyleBg"),
    ItemDisabledStyleFg: getColor("ItemStyleFg"),
    ItemDisabledStyleBg: getColor("ItemStyleBg"),
    InfoStyleFg: getColor("ItemStyleFg"),
    InfoStyleBg: "0x00000000",
    PopupStyleFg: getColor("ItemStyleFg"),
    PopupStyleBg: getColor("ItemDownStyleBg"),
    HeaderStyleFg: getColor("ItemStyleFg"),
    PopupTitleStyleFg: getColor("PopupTitleStyleFg"),
  };

  const iniContent = `[${themeName.replace(/\s+/g, "")}]\n` +
    Object.entries(theme).map(([key, value]) => `${key} = ${value}`).join("\n");

  const blob = new Blob([iniContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${themeName}.ini`;
  link.click();
  URL.revokeObjectURL(link.href);
}

document.getElementById('generateBtn').addEventListener('click', generateIni);