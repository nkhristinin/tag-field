import { createInput, clearTags, createTags, createElementWithClass } from "./dom";
import createTagService from "./service";
import { TAGS_CHANGE } from "./events";

const TagField = ({
  container,
  isValidTag = () => true,
  delimiters = [" ", ",", ";"],
  placeholder = "add more people...",
} = {}) => {
  if (!container) {
    throw new Error("You need to provide dom element for the container");
  }

  const tagFieldContainer = createElementWithClass("label", "tag-field");
  container.appendChild(tagFieldContainer);

  const tagService = createTagService({
    isValidTag,
  });

  const input = createInput({
    delimiters,
    tagService,
    placeholder,
  });

  const renderTags = ({ tagService, container }) => {
    clearTags(container);

    const tagElements = createTags({ tagService });

    tagElements.forEach(item => {
      input.insertAdjacentElement("beforebegin", item);
    });
  };

  tagFieldContainer.appendChild(input);

  renderTags({ container, tagService });

  tagService.on(TAGS_CHANGE, tags => {
    renderTags({ container, tagService });
  });

  return {
    ...tagService,
  };
};

export default TagField;
