// index.js

// Get references to the HTML elements
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

// Default Markdown representing required elements
const defaultMarkdown = `# My Header (H1 size)

## My Sub Header (H2 size)

[Link to Google](https://www.google.com/)

Inline code: \`console.log('Hello World!')\`

Code Block:
\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

- List Item 1
- List Item 2
- List Item 3

> This is a blockquote.

![Image](https://via.placeholder.com/150)

**Bolded Text**`;

// Function to update the preview with the entered text
const updatePreview = () => {
  const enteredText = editor.value;
  preview.innerHTML = marked.parse(enteredText);
};

// Set the default markdown in the #editor field
editor.value = defaultMarkdown;

// Call updatePreview function on page load to render the default markdown
updatePreview();

// Add event listener to update the preview on textarea input
editor.addEventListener("input", updatePreview);

