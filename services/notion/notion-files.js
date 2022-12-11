const NotionQuizzModel = require("../mongodb/mongodb-schema-quiz");


export const getNotionQuizData = (
  lessonName,
  databaseId,
  questionColumnName,
  answerColumnName,
  typeColumnName
) => {

  const quizColumnList = [
    ...columns,
    "quiz__question",
    "quiz__answer",
    "quiz__type",
    "quiz__triesCounter",
    "quiz__triesSum",
  ];

  let quizData = [...data];

  for (const row of quizData) {
    row["quiz__question"] = row[questionColumnName];
    row["quiz__answer"] = row[answerColumnName];
    row["quiz__type"] = row[typeColumnName];
    row["quiz__triesCounter"] = 0;
    row["quiz__triesSum"] = 0;
  }

  console.log("quizData: ", quizData);

  return {
    quizColumnList: quizColumnList,
    quizData: quizData,
  };
};

export const getNotionQuizDatabase = async (lessonName, databaseId) => {
  try {
    const responseMongo = await NotionQuizzModel.find({
      lessonName: lessonName,
      notionDatabaseId: databaseId,
    });

    return responseMongo;
  } catch (err) {
    console.log(err);
  }

  return null;
};
