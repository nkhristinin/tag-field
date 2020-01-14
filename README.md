# Tag-field

[Demo](http://email-editor.surge.sh/demo/)

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

## Geting started

You can download files from dist folder, and you need to include link to **css** and **js** files in your HTML page.

```html
<head>
  <link rel="stylesheet" href="${path-to-library}/tag-field.css"></script>
<head>

<body>
<!-- main conttent -->
<script src="${path-to-library}/tag-field.js"></script>
<script>
  TagField({
    container: document.querySelector("#tag-field"),
  });
</script>
</body>
```

## API

### Create tag-field options

#### container (required)

    container: document.querySelector('#tag-field')

Dom element which will be parent for tag-field


#### delimiters
    
    delimiters: [","]

List of delimiters, after type each of them the tag will be created. Or when you paste string like 'tag, tag2', it will be parsed into 2 tags `["tag1", "tag2"]`. Default: `[" ", ",", ";"]`

#### placeholder

    placeholder: "Add some tags"
    
Text for input placeholder. Default: `add more people...`

#### isValidTag

    isValidTag: (tag) => tag.length > 5
    
Function which check that tag valid or not. Default: return `true`

### Methods

After you create a tag-field, you can dynamicly control the bejaviour

```js
const editor = TagField({
  container: emailEditorContainer,
});
```

#### getTags
```js
  editor.getTags() // ["tag1", "tag2", "email@mail.com"]
```
Get list of all tags, return array of `string`.

#### getAllValidTags
```js
  editor.getAllValidTags() // ["email@mail.com""]
```
Get list of all valid tags, return array of `string`.


#### setTagList

```js
  editor.setTagList(["tag2", "tag4"])
```

#### addTag

```js
  editor.addTag("tag5")
```

Add a new tag to the list. If you try to add a tag that already exists in the list, it will not be added.

#### removeTag

```js
  editor.removeTag("tag5")
```

Remove tag by value from the list.

#### removeLastTag

```js
  editor.removeLastTag(")
```

Remove last tag from the list.

### Subscribe on changes

Now we only support subscribe on change of the list:

```js
  editor.on("tags_change", list => console.log("Tag list changed", list));
  editor.on("tags_change", list => doSomeWork(list));
```

