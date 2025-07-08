"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Book, Clock, PlayCircle, Settings, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CourseInfo = ({ course, viewCourse }) => {
  const courseLayout = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log("course", course);
  console.log("courseLayout", courseLayout);
  const GenerateCourseContent = async () => {
    //call api to generate course
    try {
      setLoading(true);
      const result = await axios.post("/api/generate-course-content", {
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid,
      });
      setLoading(false);
      router.replace("/workspace");
      toast.success("Course Generated successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Server Side error,Try Again!");
    }
  };

  return (
    <div className=" md:flex gap-5 justify-between p-5 rounded-2xl shadow">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-3xl">{courseLayout?.name}</h2>
        <p className="text-ggray-500 line-clamp-2">
          {courseLayout?.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex gap-5  items-center p-3 rounded-lg shadow">
            <Clock className="text-blue-500" />
            <section>
              <h2 className="font-bold">Duration</h2>
              <h2>2 hours</h2>
            </section>
          </div>

          <div className="flex gap-5  items-center p-3 rounded-lg shadow">
            <Book className="text-green-500" />
            <section>
              <h2 className="font-bold">Chapters</h2>
              <h2>{courseLayout?.noOfChapters}</h2>
            </section>
          </div>

          <div className="flex gap-5  items-center p-3 rounded-lg shadow">
            <TrendingUp className="text-red-500" />
            <section>
              <h2 className="font-bold">Difficulty Level</h2>
              <h2>{courseLayout?.level}</h2>
            </section>
          </div>
        </div>

        {!viewCourse ? (
          <Button
            disabled={loading}
            onClick={GenerateCourseContent}
            className={"max-w-sm"}
          >
            {" "}
            <Settings /> Generate Content
          </Button>
        ) : (
          <Link href={"/course/" + course?.cid}>
            <Button>
              {" "}
              <PlayCircle />
              Continue Learning
            </Button>{" "}
          </Link>
        )}
      </div>

      {course?.bannerImageUrl ? (
        <Image
          src={course?.bannerImageUrl}
          alt="Course banner"
          height={400}
          width={200}
          className="mt-5 md:mt-0 object-cover max-w-lg w-full rounded-2xl h-[240px]"
        />
      ) : (
        <div className="mt-5 md:mt-0 object-cover aspect-auto w-full rounded-2xl h-[240px]  bg-gray-200 flex items-center justify-center text-gray-500">
          No banner available
        </div>
      )}
    </div>
  );
};

export default CourseInfo;
