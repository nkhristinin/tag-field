import createTagService from "../service";

describe("TagField service", () => {
  let tagService = createTagService();
  beforeEach(() => {
    tagService = createTagService();
  });

  it("should set tag list", () => {
    tagService.setTagList(["tag1", "tag2"]);
    expect(tagService.getTags()).toEqual(["tag1", "tag2"]);
  });

  it("should add tags", () => {
    expect(tagService.getTags().length).toBe(0);
    tagService.addTag("tag");
    expect(tagService.getTags().length).toBe(1);
  });

  it("should remove tags", () => {
    tagService.addTag("tag");
    expect(tagService.getTags().length).toBe(1);
    tagService.removeTag();
    expect(tagService.getTags().length).toBe(0);
  });

  it("should do nothing if try to remove tags when list is empy", () => {
    tagService.removeTag();
    expect(tagService.getTags().length).toBe(0);
  });

  it("should remove last tag", () => {
    tagService.setTagList(["tag1", "tag2"]);
    tagService.removeLastTag();
    expect(tagService.getTags()).toEqual(["tag1"]);
  });

  it("getAllValidTags should return all tags if validation not define ", () => {
    tagService.setTagList(["tag1", "tag2"]);
    expect(tagService.getAllValidTags()).toEqual(["tag1", "tag2"]);
  });

  it("getAllValidTags should return correct tags if validation is define ", () => {
    const tagServiceWithValidation = createTagService({ isValidTag: tag => tag.length > 3 });
    tagServiceWithValidation.setTagList(["t", "tag2"]);
    expect(tagServiceWithValidation.getAllValidTags()).toEqual(["tag2"]);
  });

  it("should be able to subscribe on list change", done => {
    tagService.on("tags_change", tags => {
      expect(tagService.getTags()).toEqual(["tag1"]);
      done();
    });
    tagService.setTagList(["tag1"]);
  });
});
