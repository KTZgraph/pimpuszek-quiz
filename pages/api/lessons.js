const LessonModel = require("../../services/mongodb/mongodb-schema-lesson");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { emailOwner } = req.query;

    try {
      // FIXME - bezpieczeństwo danych
      const responseMongo = await LessonModel.find({ emailOwner });

      if (responseMongo) {
        res.status(200).json({
          data: responseMongo,
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

  //   -----------------------  POST ---------------------------------
  if (req.method === "POST") {
    const {
      lessonName,
      lessonNumber,
      classDate,
      title,
      description,
      emailOwner,
    } = req.body;

    // nazwa lekcji unikatowa
    const lesson = await LessonModel.findOne({ lessonName: lessonName });

    if (lesson) {
      res
        .status(400)
        .json({ message: "Lekcja z tą nazwą już istnieje w bazie" });
      return;
    }

    const newLessonData = {
      lessonName,
      lessonNumber,
      classDate,
      title,
      description,
      emailOwner,
    };

    await LessonModel.create(newLessonData, function (err, newLessonData) {
      if (err) return err;
      console.log("newLessonData: ", newLessonData);
      res.status(201).json({
        data: newLessonData._id,
        message: `Stworozno nową lekcję`,
      });
    });
  }
}
