const createTagService = ({ isValidTag }) => {
  let tags = [];
  const subscribers = [];

  const handleChange = () => subscribers.forEach(subscribe => subscribe.cb(tags));

  return {
    getTags: () => tags,
    setTagList: (newTags = []) => {
      tags = newTags;
      handleChange();
    },
    getAllValidTags: () => tags.filter(isValidTag),
    addTag: tag => {
      if (tags.includes(tag)) return;
      tags.push(tag);
      handleChange();
    },
    removeTag: tag => {
      tags.splice(tags.indexOf(tag), 1);
      handleChange();
    },
    removeLastTag: () => {
      if (tags.length > 0) {
        tags.splice(-1);
        handleChange();
      }
    },
    on: (eventType, cb) => {
      subscribers.push({ eventType, cb });
    },
    isValidTag,
  };
};

export default createTagService;
