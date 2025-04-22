const colorPicker = document.getElementById("colorPicker");
const recommendations = document.getElementById("recommendations");

colorPicker.addEventListener("input", (e) => {
  const selectedColor = e.target.value;
  const combos = getColorCombinations(selectedColor);

  recommendations.innerHTML = `<h2>Recommended Combos:</h2>`;
  combos.forEach(color => {
    const div = document.createElement("div");
    div.className = "color-box";
    div.style.backgroundColor = color;
    recommendations.appendChild(div);
  });
});

function getColorCombinations(baseColor) {
  // Simple logic: return a triadic scheme (for demo)
  const hsl = hexToHSL(baseColor);
  const combo1 = `hsl(${(hsl.h + 120) % 360}, ${hsl.s}%, ${hsl.l}%)`;
  const combo2 = `hsl(${(hsl.h + 240) % 360}, ${hsl.s}%, ${hsl.l}%)`;

  return [baseColor, combo1, combo2];
}

function hexToHSL(hex) {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h *= 60;
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

