import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const EnrollCourseCard = ({ course, enrollCourse }) => {
  const courseJson = course?.courseJson?.course;
  
  const calculatePerProgress = () => {
  const completed = enrollCourse?.completedChapters?.length ?? 0;
  const total = courseJson?.chapters?.length ?? 0 +1 ;
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

  if (!course) return null;
  return (
    <div>
      <div className="shadow rounded-2xl">
        <Image
          src={course?.bannerImageUrl}
          alt={"course?.name"}
          width={400}
          height={300}
          className="w-full aspect-video rounded-t-xl object-cover"
        />

        <div className="p-3 flex flex-col gap-3">
          <h2 className="font-bold text-lg">{courseJson?.name}</h2>
          <p className="line-clamp-3 text-gray-400 text-sm">
            {courseJson?.description}
          </p>
          <div>
            <h2 className="flex justify-between text-sm text-primary">
              Progress <span>{calculatePerProgress()}%</span>
            </h2>
            <Progress value={calculatePerProgress()} />
            <Link href={"/workspace/view-course/" + course?.cid}>
              <Button className={"w-full mt-3"}>
                <PlayCircle />
                Continue Learning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseCard;
