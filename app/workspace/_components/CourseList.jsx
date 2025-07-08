"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewCourseDialog from "./AddNewCourseDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      (async () => {
        await GetCourseList();
      })();
    }
  }, [user]);

  const GetCourseList = async () => {
    try {
      const result = await axios.get("/api/courses");
      // console.log(result.data);
      setCourseList(result.data);
    } catch (error) {
      console.error("Failed to fetch course list", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">Course List</h2>

      {courseList?.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center p-7 border rounded-xl bg-secondary">
          <Image
            src={"/online-education.png"}
            alt="Education illustration"
            width={80}
            height={80}
            priority
          />
          <h2 className="text-lg my-2 font-bold">
            Looks like you haven't created any courses yet.
          </h2>
          <AddNewCourseDialog>
            <Button>+ Create your first course</Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {courseList.map((course) => (
            <CourseCard course={course} key={course?.cid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
