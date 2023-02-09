enum ContentType {
  FOLDER = "0",
  // QUIZ = "2",
  FILES = "6",
  LINK = "4",
  SCORM = "5",
  TEXT = "1",
  VIDEO = "3",
}

export default ContentType;

export const getContentTypeName = (role: ContentType) => {
  switch (role) {
    case ContentType.FOLDER:
      return "Thư mục";
    case ContentType.TEXT:
      return "Văn bản";
    // case ContentType.QUIZ:
    //   return "Bài kiểm tra";
    case ContentType.FILES:
      return "File đính kèm";
    case ContentType.VIDEO:
      return "Video";
    case ContentType.SCORM:
      return "Scorm";
    case ContentType.LINK:
      return "Liên kết";
  }
};
