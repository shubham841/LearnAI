"use client";
import AppHeader from "@/app/workspace/_components/AppHeader";
import React, { useEffect, useState } from "react";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import ChapterContent from "../_components/ChapterContent";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Course = () => {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState([]);

  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    const result = await axios.get("/api/enroll-course?courseId=" + courseId);
    console.log(result.data);
    setCourseInfo(result.data);
  };
  return (
    <div>
      <div className="flex w-full space-x-16 mb-12 ">
        <div className="flex h-screen  border-blue-800 border-8 z-50 ">
          <ChapterListSidebar courseInfo={courseInfo} />
        </div>

        <div className="flex flex-col relative top-0 left-80  ">
          <div className="flex items-center justify-between ">
            <Link href={"/workspace/my-learning"}>
              <Button className="m-4">Back to My Learning</Button>
            </Link>
          </div>
          <div className="flex flex-col min-w-fit">
            <ChapterContent
              courseInfo={courseInfo}
              refreshData={() => GetEnrolledCourseById()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
