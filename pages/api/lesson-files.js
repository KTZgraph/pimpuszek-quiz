const LessonModel = require("../../services/mongodb/mongodb-schema-lesson");

export default async function handler(req, res) {
  if (req.method === "GET") {
    // zwraca jedną lekcję
    const { lessonName } = req.query;

    try {
      const responseMongo = await LessonModel(lessonName);

      if (responseMongo.length > 0) {
        res.status(200).json({
          data: responseMongo[0],
          mongoDatabaseId: responseMongo[0]._id,
        });
        return;
      }
      return;
    } catch (err) {
      console.error(err);
    }
    res.status(400).json({
      data: `[ERROR] GET - bład pobierania lekcji`,
    });
  }
}
