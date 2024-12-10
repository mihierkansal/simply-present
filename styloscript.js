// Define the StyloScript input (for demonstration purposes) (May use this to *REPLACE* CSS)
const styloScript = `
global {
    font-family: 'Arial, sans-serif';
    line-height: 1.6;
    box-sizing: border-box;
}
tag h1 {
    color: #3498db;
    font-size: 2.5rem;
    margin-bottom: 10px;
}
tag p {
    margin: 0 0 15px;
    font-size: 1rem;
    color: #333;
}
utility .center-text {
    text-align: center;
}
utility .margin-auto {
    margin: auto;
}
utility .text-bold {
    font-weight: bold;
}
component Button {
    base {
        background-color: #3498db;
        font-size: 16px;
        padding: 10px 20px;
        border: none;
        color: white;
        border-radius: 5px;
        transition: background-color 0.3s;
    }
    state hover {
        background-color: darken(#3498db, 10%);
    }
}
`;

// Function to convert STL to CSS
function convertSTLtoCSS(stl) {
  // Basic parsing logic (for demonstration)
  let css = "";

  // Parse global styles
  css += stl
    .match(/global \{[^}]*\}/)[0]
    .replace(/global/g, ":root")
    .replace(/@/g, "--");

  // Parse tag-based styling
  const tagStyles = stl.match(/tag [^{]*\{[^}]*\}/g);
  tagStyles.forEach((tagStyle) => {
    css += tagStyle.replace(/tag/g, "").replace(/&:/g, "&");
  });

  // Parse utility styles
  const utilityStyles = stl.match(/utility \.[^{]*\{[^}]*\}/g);
  utilityStyles.forEach((utilityStyle) => {
    css += utilityStyle.replace(/utility/g, "");
  });

  // Parse components (simple example)
  const components = stl.match(/component [^{]*\{[^}]*\}/g);
  components.forEach((component) => {
    const componentName = component.match(/component ([^{]*)\{/)[1].trim();
    const componentStyles = component.match(/\{([^}]*)\}/)[1].trim();

    // Convert base styles
    let baseStyles = componentStyles
      .match(/base \{[^}]*\}/)[0]
      .replace(/base/g, `.${componentName}`);
    css += baseStyles;

    // Convert state styles
    const states = componentStyles.match(/state [^{]*\{[^}]*\}/g);
    states.forEach((state) => {
      const stateName = state.match(/state ([^{]*)\{/)[1].trim();
      const stateStyles = state.match(/\{([^}]*)\}/)[1].trim();
      css += `.${componentName}:${stateName} { ${stateStyles} }`;
    });
  });

  return css;
}

// Convert the example StyloScript to CSS
const compiledCSS = convertSTLtoCSS(styloScript);
console.log(compiledCSS);
