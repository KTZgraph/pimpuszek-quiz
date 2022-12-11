import React from "react";

const NotionQuiz = ({ params: { lessonName, notionDBId } }) => {
  return (
    <div>
      Notion Quiz
      {lessonName}
      {notionDBId}
    </div>
  );
};

export default NotionQuiz;
