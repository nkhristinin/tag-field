import { TAGS_CHANGE } from "./events";

const createTagService = ({ isValidTag }) => {
  let tags = [];
  const subscribers = [];

  const handleTagsChange = () =>
    subscribers.filter(subscribe => subscribe.eventType === TAGS_CHANGE).forEach(subscribe => subscribe.cb(tags));

  return {
    getTags: () => tags,
    setTagList: (newTags = []) => {
      tags = newTags;
      handleTagsChange();
    },
    getAllValidTags: () => tags.filter(isValidTag),
    addTag: tag => {
      if (tags.includes(tag)) return;
      tags.push(tag);
      handleTagsChange();
    },
    removeTag: tag => {
      tags.splice(tags.indexOf(tag), 1);
      handleTagsChange();
    },
    removeLastTag: () => {
      if (tags.length > 0) {
        tags.splice(-1);
        handleTagsChange();
      }
    },
    on: (eventType, cb) => {
      subscribers.push({ eventType, cb });
    },
    isValidTag,
  };
};

export default createTagService;
