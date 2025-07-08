import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Book,
  LoaderCircle,
  PlayCircle,
  Settings2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const CourseCard = ({ course }) => {
  const courseJson = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);

  // if (!courseJson) return null; // avoid rendering broken card
  // console.log("course",course);

  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/enroll-course", {
        courseId: course?.cid,
      });

      // console.log("RESULT",result);

      if (result.data.resp) {
        toast.warning("Already Enrolled");
      } else {
        toast.success("Enrolled");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server side error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow rounded-2xl">
      <Image
        src={course?.bannerImageUrl}
        alt={courseJson?.name || "Course Banner"}
        width={400}
        height={300}
        className="w-full aspect-video rounded-t-xl object-cover"
      />

      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg">{courseJson.name}</h2>
        <p className="line-clamp-3 text-gray-400 text-sm">
          {courseJson.description}
        </p>

        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-2 text-sm">
            <Book className="text-primary h-5 w-5" />
            {courseJson.noOfChapters} Chapters
          </h2>

          {course?.courseContent?.length ? (
            <Button size="sm" onClick={onEnrollCourse} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin mr-2" />
              ) : (
                <PlayCircle className="mr-2" />
              )}
              <span>{loading ? "Enrolling..." : "Enroll Course"}</span>
            </Button>
          ) : (
            <Link href={`/workspace/edit-course/${course?.cid}`}>
              <Button size="sm" variant="outline">
                <Settings2 className="mr-2" />
                Generate Course
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
