import { notion } from "./connector";

const NotionQuizzModel = require("../mongodb/mongodb-schema-quiz");
const LessonModel = require("../mongodb/mongodb-schema-lesson");

export const saveToDatabase = async (
  lessonName,
  notionUrl,
  notionDatabaseId,
  columns,
  data,
  emailOwner,
  questionColumnName,
  answerColumnName,
  typeColumnName
) => {
  const responseMongo = await LessonModel.findOne({ emailOwner, lessonName });

  const quizColumns = [
    ...columns,
    "quiz__question",
    "quiz__answer",
    "quiz__type",
    "quiz__triesCounter",
    "quiz__triesSum",
  ];

  const extendedData = [...data];
  for (const row of extendedData) {
    row["quiz__question"] = extendedData[questionColumnName];
    row["quiz__answer"] = extendedData[answerColumnName];
    row["quiz__type"] = extendedData[typeColumnName];
    row["quiz__triesCounter"] = 0;
    row["quiz__triesSum"] = 0;
  }

  const newQuizData = {
    lessonName,
    lessonId: responseMongo._id,
    notionDatabaseId,
    notionDatabaseUrl: notionUrl,
    columns: quizColumns,
    data,
    emailOwner,
  };

  await NotionQuizzModel.create(newQuizData, function (err, newQuizData) {
    if (err) return err;
    // res.status(201).json({ data: newQuizData._id });
  });
};

export const getNotionQuiz = async (args) => {
  const { emailOwner, lessonName, notionDatabaseId } = args;

  const responseMongo = await LessonModel.find({
    emailOwner: emailOwner,
    lessonName: lessonName,
    notionDatabaseId: notionDatabaseId,
  });

  return responseMongo;
};

const parseData = async (notionResponse) => {
  const resultList = notionResponse.results;

  const parsedData = [];
  const uniqueColumns = [];

  for (const res of resultList) {
    const keyList = Object.keys(res.properties);

    let tmp = {};
    for (const key of keyList) {
      if (!uniqueColumns.includes(key)) uniqueColumns.push(key);

      const type = res.properties[key].type;
      let value = null;

      if (type === "title") {
        value = res.properties[key].title[0]?.plain_text;
        tmp[key] = value;
      } else if (type === "select") {
        value = res.properties[key].select.name;
        tmp[key] = value;
      } else if (type === "rich_text") {
        value = res.properties[key].rich_text[0]?.plain_text;
        tmp[key] = value;
      }
    }
    parsedData.push(tmp);
  }

  return { data: parsedData, columns: uniqueColumns };
};

export const getDataById = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const parsedData = parseData(response);

  //   return response;
  return parsedData;
};

// ----------------------

const getFilteredData = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    // opcjnalne filtry
    // https://developers.notion.com/reference/post-database-query-filter
    filter: {
      property: "nazwaKoluimnyMojej",
      rich_text: {
        contains: "fragmentSlowa",
      },
    },
  });

  return response;
};
