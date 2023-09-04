export enum CategoryType {
    /// myStudies
    QUESTION_CATEGORY=1,
    TESTGROUP_CATEGORY = 4,
    DEPARTMENT = 8,
    LEARNINGMATERIAL_CATEGORY = 16,
    COURSE_CATEGORY = 32,
    EXAM_CATEGORY= 64,
    CLASSES =8,
    POST_CATEGORY= 128,
    PROGRAM_CATALOG=129, // Chương trình
    SUBJECT_CATALOG= 130, // Môn học
    SCHOOL_BLOCK_CATALOG= 131, // Khối lớp
    BOOK_CATALOG = 132,  // Bộ sách

    ///Quản lý Văn bản - myOffice
    DOCUMENT_ORGANIZATION = 133, // Cơ quan
    DOCUMENT_TOPIC = 134, // Chủ đề
    DOCUMENT_AREA = 135, // Lĩnh vực
    DOCUMENT_POSITION = 136, // Chức danh
    DOCUMENT_SIGNER = 137, // Chức danh

    ///Điều hành - myLesson
    MATERIAL_CATEGORY = 138, // Chức danh
    LIBRARY_CATEGORY = 139, // Chức danh
  };