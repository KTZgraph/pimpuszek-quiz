const LessonModel = require("../../services/mongodb/mongodb-schema-lesson");

import {
  getDataById,
  saveToDatabase,
  getNotionQuiz,
} from "../../services/notion/helpers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // zwraca jedną lekcję
    const { lessonName } = req.query;
    res.status(200).json({
      data: `lista quizów dla lekcji: ${lessonName}`,
    });
  }

  if (req.method === "POST") {
    // zwraca jedną lekcję
    const {
      lessonName,
      notionUrl,
      emailOwner,
      questionColumnName,
      answerColumnName,
      typeColumnName,
    } = req.body;

    const databaseId = notionUrl
      .split("https://www.notion.so/")[1]
      .split("?")[0];

    const { data, columns } = await getDataById(databaseId);

    if (questionColumnName && answerColumnName && typeColumnName) {
      await saveToDatabase(
        lessonName,
        notionUrl,
        databaseId,
        columns,
        data,
        emailOwner,
        questionColumnName,
        answerColumnName,
        typeColumnName
      );

      const newQuiz = await getNotionQuiz({emailOwner, lessonName, databaseId});
      if (newQuiz) {
        res.status(201).json({
          message: `Zapisano dp bazy : ${lessonName} ${notionUrl} ${emailOwner}`,
          // data: mongoResponse._id,
          data: { data, columns },
          quizId: newQuiz._id,
        });
      }

      res.status(200).json({
        message: `Zapisano dp bazy : ${lessonName} ${notionUrl} ${emailOwner}`,
        // data: mongoResponse._id,
        data: { data, columns },
      });
    }
    res.status(200).json({
      message: `Pobrano dane: ${lessonName} ${notionUrl} ${emailOwner}`,
      data: { data, columns },
    });
  }
}
