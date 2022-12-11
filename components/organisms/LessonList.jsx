"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const LessonList = ({ emailOwner }) => {
  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      // FIXME - bezpieczeństwo danych, na backendzie tez trzeba by się autoryzować może JWT?
      const response = await axios.get(`/api/lessons?emailOwner=${emailOwner}`);
      setLessonList(response.data?.data);
    };

    fetchLessons();
  }, []);

  return (
    <div>
      Lesson List
      <ul>
        {lessonList.map((lesson) => (
          <li key={lesson._id}>
            <Link href={`/lessons/${lesson.lessonName}`}>
              {lesson.lessonName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
