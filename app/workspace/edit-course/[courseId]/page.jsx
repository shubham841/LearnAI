"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseInfo from "../_components/CourseInfo";
import { useParams } from "next/navigation";
import ChapterTopicList from "../_components/ChapterTopicList";

const EditCourse = ({viewCourse}) => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();

  useEffect(() => {
    if (courseId) {
      GetCourseInfo();
    }
  }, [courseId]);

  const GetCourseInfo = async () => {
    setLoading(true);
    const result = await axios.get("/api/courses?courseId=" + courseId);
    console.log(result.data);
    setCourse(result.data);
    setLoading(false);
  };
  return (
    <div>
      <CourseInfo course={course} viewCourse={viewCourse} />
      <ChapterTopicList course={course} />
    </div>
  );
};

export default EditCourse;
