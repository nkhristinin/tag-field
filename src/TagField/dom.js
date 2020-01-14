const ENTER_CODE = 13;
const BACKSPACE_CODE = 8;

export const createElementWithClass = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

export const clearTags = container => {
  const existingTags = [...container.querySelectorAll(".tag-field__tag-block")];

  existingTags.forEach(tag => tag.parentNode.removeChild(tag));
};

export const createTags = ({ tagService }) => {
  return tagService.getTags().map(tag => {
    const tagFieldTag = createElementWithClass("div", "tag-field__tag-block");
    if (tagService.isValidTag(tag)) {
      tagFieldTag.classList.add("tag-field__tag-block--valid");
    } else {
      tagFieldTag.classList.add("tag-field__tag-block--invalid");
    }

    const tagFieldTagContent = createElementWithClass("div", "tag-field__tag-block-content");
    tagFieldTagContent.innerHTML = tag;
    tagFieldTag.appendChild(tagFieldTagContent);

    const tagFieldTagClose = createElementWithClass("div", "tag-field__tag-block-close");
    tagFieldTagClose.addEventListener("click", () => {
      tagService.removeTag(tag);
    });

    tagFieldTag.appendChild(tagFieldTagClose);

    return tagFieldTag;
  });
};

export const transformStringToTags = (delimiters = [], stringInput = "") =>
  delimiters
    .reduce((acc, val) => acc.replace(new RegExp(`\\${val}`, "g"), " "), stringInput)
    .split(" ")
    .filter(str => str !== "")
    .map(item => item.trim());

export const createInput = ({ delimiters, tagService }) => {
  const tagFieldInput = createElementWithClass("input", "tag-field__input");
  tagFieldInput.placeholder = "add more people...";

  const processTags = stringInput => transformStringToTags(delimiters, stringInput).map(tagService.addTag);

  const handleAddTag = e => {
    const email = e.target.value;
    if (!email) return;

    processTags(e.target.value);
    e.target.value = "";
    e.target.focus();
  };

  tagFieldInput.addEventListener("blur", handleAddTag);

  tagFieldInput.addEventListener("keyup", e => {
    if (e.keyCode === ENTER_CODE || delimiters.includes(e.key)) {
      handleAddTag(e);
    }
    if (e.keyCode === BACKSPACE_CODE && e.target.value == "") {
      tagService.removeLastTag();
    }
  });

  //  asdasd@asdasd.com,   asdasd@asdasd11.com
  tagFieldInput.addEventListener("paste", e => {
    e.preventDefault();
    const clipboardData = (event.clipboardData || window.clipboardData).getData("text");
    processTags(clipboardData);
  });

  return tagFieldInput;
};
