# Tag-field

A library to create a field which supports tags

```js
const tagFieldContainer = document.querySelector("#tagFieldContainer");

const editor = TagField({
  container: tagFieldContainer,
});

editor.on("tags_change", list => console.log("Tag list changed", list));
```

You can also use **EdmailEditor** which support all parameters from **TagField** and additionally email validation.

```js
const editor = EmailEditor({
  container: emailEditorContainer,
});
```

The full options list will look like:

```js
const editor = TagField({
  container: tagFieldContainer,
  isValidTag: (tag) => tag.length > 5,
  delimiters: [",", " "],
  placeholder = "add more people...",
});
```
