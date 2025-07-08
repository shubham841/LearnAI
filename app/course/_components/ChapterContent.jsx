import { Button } from "@/components/ui/button";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContent";
import axios from "axios";
import { CheckCircle, Cross, Loader2Icon, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import YouTube from "react-youtube";
import { toast } from "sonner";

const ChapterContent = ({ courseInfo, refreshData }) => {
  const [loading,setLoading]=useState(false);
  const { courseId } = useParams();
  const { enrollCourse } = courseInfo ?? "";
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;

  let completedChapter = enrollCourse?.completedChapters ?? [];

  const markChapterCompleted = async () => {
    setLoading(true);
    completedChapter.push(selectedChapterIndex);
    const result = await axios.put("/api/enroll-course", {
      courseId: courseId,
      completedChapter: completedChapter,
    });
    console.log(result);
    refreshData();
    toast.success("Chapter Marked Completed !");
    setLoading(false);
  };

  const markInCompletedChapter = async () => {
     setLoading(true);
    const completeChp = completedChapter.filter(
      (item) => item != selectedChapterIndex
    );
    const result = await axios.put("/api/enroll-course", {
      courseId: courseId,
      completedChapter: completeChp,
    });
    console.log(result);
    refreshData();
    toast.success("Chapter Marked Incompleted !");
     setLoading(false);
  };

  return (
    <>
      <div className="w-full px-4 md:px-10 overflow-x-hidden mt-12">
        {/* Chapter Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold">
            {selectedChapterIndex + 1}.{" "}
            {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
          </h2>

          {completedChapter?.includes(selectedChapterIndex) ? (
            <Button disabled={loading} variant="outline" onClick={() => markInCompletedChapter()}>
              {loading? <Loader2Icon className="animate-spin"/> : <X />}
              Mark as Incompleted
            </Button>
          ) : (
            <Button disabled={loading} onClick={() => markChapterCompleted()}>
              {loading? <Loader2Icon className="animate-spin"/>  :<CheckCircle />}
              Mark as Completed
            </Button>
          )}
        </div>

        {/* Related Videos */}
        <h2 className="my-4 font-bold text-lg">Related Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {videoData?.slice(0, 2).map((video, index) => (
            <div key={index} className="w-full aspect-video ">
              <YouTube
                videoId={video?.videoId}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
                className="w-5/6 h-5/6"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div className="w-[1000px] mt-10 space-y-10 px-4 md:px-10 overflow-x-hidden">
        {topics?.map((topic, index) => (
          <div
            key={index}
            className="w-full p-4 sm:p-6 md:p-8 bg-secondary rounded-2xl shadow-md"
          >
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-primary mb-3">
              {index + 1}. {topic?.topic}
            </h2>
            <div
              className="break-words overflow-x-auto text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-gray-700"
              dangerouslySetInnerHTML={{ __html: topic?.content }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ChapterContent;
