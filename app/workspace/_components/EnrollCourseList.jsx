"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EnrollCourseCard from "./EnrollCourseCard";

const EnrollCourseList = () => {
  const [enrolledCourseList, setEnrolledCourseList] = useState([]);

  useEffect(() => {
    GetEnrolledCourse();
  }, []);

  const GetEnrolledCourse = async () => {
    try {
      const result = await axios.get("/api/enroll-course");
      console.log(result.data);
      setEnrolledCourseList(result.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  return (
    <div className="mt-4">
{   enrolledCourseList?.length>0 && <h2 className="font-bold text-2xl">Continue Learning Your Courses</h2>
}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {enrolledCourseList?.map((course, index) => (
          <EnrollCourseCard
            course={course?.courses}
            enrollCourse={course?.enrollCourse}
            key={course?.courses?.cid || index}
          />
        ))}
      </div>
    </div>
  );
};

export default EnrollCourseList;
