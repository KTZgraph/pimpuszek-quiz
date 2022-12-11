"use client";
import axios from "axios";
import { useState } from "react";
import FormInput from "../atoms/FormInput";

const QuizCreate = ({ emailOwner, lessonName }) => {
  const [newQuiz, setNewQuiz] = useState("");
  const [previewData, setPreviewData] = useState({
    columns: [],
    data: [],
  });
  const [notionUrl, setNotionUrl] = useState(
    "https://www.notion.so/2d8cae19ab38419f991036f4ae5a2e90?v=ea2b4c14476d42ca8ae03436b6350790"
  );
  const [questionColumnName, setQuestionColumnName] = useState("");
  const [answerColumnName, setAnswerColumnName] = useState("");
  const [typeColumnName, setTypeColumnName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("dodwanie nowego quizu");
    // czyszczeue
    setPreviewData({
      columns: [],
      data: [],
    });

    const response = await axios.post("/api/lesson-quizzes", {
      lessonName,
      notionUrl,
      emailOwner,
      questionColumnName,
      answerColumnName,
      typeColumnName,
    });

    console.log("===============================");
    console.log(response);

    if (response.status === 201) {
      // to przejsć na stronę pliku
      console.log("201");
      console.log(response);
    }

    console.log(response.data?.data?.data);

    const previewData = response.data?.data?.data;
    const uniqueColumns = response.data?.data?.columns;
    setPreviewData({
      columns: uniqueColumns,
      data: previewData,
    });
  };

  return (
    <div>
      <p>Tworzy nowy quiz do lekcji</p>
      <form onSubmit={handleSubmit}>
        <h1>
          Trzeba jakoś pokazac i odebrac od usera które kolumny są testowe
        </h1>

        <FormInput
          label="Link do bazy notion"
          name="notionUrl"
          type="text"
          value={notionUrl}
          onChange={(e) => setNotionUrl(e.target.value)}
        />

        {previewData.data.length > 0 || previewData.columns.length > 0 ? (
          <>
            <p>Kolumny do wyboru to {JSON.stringify(previewData.columns)}</p>
            <p>
              Pierwsze kilka wierszy
              {JSON.stringify(previewData.data.slice(0, 10))}
            </p>
            <FormInput
              label="questionColumnName"
              name="questionColumnName"
              type="text"
              value={questionColumnName}
              onChange={(e) => setQuestionColumnName(e.target.value)}
            />
            <FormInput
              label="answerColumnName"
              name="answerColumnName"
              type="text"
              value={answerColumnName}
              onChange={(e) => setAnswerColumnName(e.target.value)}
            />
            <FormInput
              label="typeColumnName"
              name="typeColumnName"
              type="text"
              value={typeColumnName}
              onChange={(e) => setTypeColumnName(e.target.value)}
            />
            <button type="submit">Dodaj quiz do lekcji</button>
          </>
        ) : (
          <button type="submit">Podejrzyj plik</button>
        )}
      </form>
    </div>
  );
};

export default QuizCreate;
