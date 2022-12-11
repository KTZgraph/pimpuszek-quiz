"use client";
import axios from "axios";
import { useState } from "react";

import FormInput from "../atoms/FormInput";

const LessonCreate = ({ userEmail }) => {
  const [data, setData] = useState({
    lessonName: "lekcja_testowa",
    lessonNumber: "1",
    classDate: "01-01-2011",
    title: "tytuł testowy",
    description: "hjakiś opis lekcji",
    emailOwner: userEmail,
  });

  const handleChange = (e) => {
    // WARNING e.target.name to name z "name" z inputa
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/lessons", {
      lessonName: data.lessonName,
      lessonNumber: data.lessonNumber,
      classDate: data.classDate,
      title: data.title,
      description: data.description,
      emailOwner: data.emailOwner,
    });

    // console.log("response: ", response);
  };

  return (
    <div>
      <h2>Tworzenie nowej lekcji</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="lessonName"
          name="lessonName"
          type="text"
          value={data.lessonName}
          onChange={handleChange}
        />
        <FormInput
          label="lessonNumber"
          name="lessonNumber"
          type="text"
          value={data.lessonNumber}
          onChange={handleChange}
        />

        <FormInput
          label="classDate"
          name="classDate"
          type="text"
          value={data.classDate}
          onChange={handleChange}
        />

        <FormInput
          label="description"
          name="description"
          type="text"
          value={data.description}
          onChange={handleChange}
        />

        <button>Dodaj lekcję</button>
      </form>
    </div>
  );
};

export default LessonCreate;
