"use client";

import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContent";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { useContext, useState } from "react";

const ChapterListSidebar = ({ courseInfo }) => {
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const { enrollCourse } = courseInfo ?? {};
  const completedChapter = enrollCourse?.completedChapters ?? [];

  const [openChapterIndex, setOpenChapterIndex] = useState(null);

  const toggleChapter = (index) => {
    setOpenChapterIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-80  overflow-y-auto bg-secondary h-screen fixed top-0 left-0  shadow-md">
      <h2 className="text-xl font-bold mb-6 m-6">
        Chapters ({courseContent?.length})
      </h2>

      <div className="space-y-2 ">
        {courseContent?.map((chapter, index) => {
          const isCompleted = completedChapter.includes(index);
          const isOpen = openChapterIndex === index;

          return (
            <div
              key={index}
              className={`rounded-xl bg-white shadow-sm ${isCompleted ? "border-l-4 border-green-500" : ""}`}
            >
              {/* Chapter Header */}
              <div
                onClick={() => {
                  setSelectedChapterIndex(index);
                  toggleChapter(index);
                }}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-t-xl ${
                  isOpen ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <div className="flex gap-2 items-center font-medium text-base">
                  {index + 1}. {chapter?.courseData?.chapterName}
                  {isCompleted && <CheckCircle className="text-green-600 w-4 h-4" />}
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>

              {/* Topics */}
              {isOpen && (
                <div className="px-5 py-2 space-y-2">
                  {chapter?.courseData?.topics?.map((topic, tIndex) => (
                    <div
                      key={tIndex}
                      className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md"
                    >
                      {topic?.topic}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterListSidebar;
