const { Client } = require("@notionhq/client");

export const config = {
  api: {
    bodyParser: false,
  },
};

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});



// --------------------------
async function handler(req, res) {
  //   const response = await getFilteredData();
  const { databaseId, lessonName } = req.query;

  if (req.method === "GET") {
    try {
      const notionJson = readNotionFile(lessonName, databaseId);
      res.status(200).json({ data: notionJson });
      return;
    } catch (err) {
      console.log(err);
    }
    res
      .status(500)
      .json({ data: "Coś poszło nie tak -  Zwraca odczyt pliku jsona" });
  }

  if (req.method === "POST") {
    const response = await getDatabaseData(databaseId);
    const resultList = response.results;

    const parsedData = [];

    for (const res of resultList) {
      const keyList = Object.keys(res.properties);

      let tmp = {};
      for (const key of keyList) {
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

    const jsonFilepath = await saveToJsonFile(
      lessonName,
      databaseId,
      parsedData
    );
    res.status(201).json({ data: jsonFilepath });
    return;
  }
}

export default handler;
