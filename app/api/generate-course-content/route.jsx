import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { courseTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format only no explanation at all.
Schema: {
  chapterName: <>,
  {
    topic: <>,
    content: <>
  }
}
: User Input:
`;

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  const promise = courseJson?.chapters?.map(async (chapter) => {
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-2.0-flash"; // Use "gemini-1.5-pro" or "gemini-pro" based on availability

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT + JSON.stringify(chapter),
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    console.log(response.candidates[0].content.parts[0].text);
    const RawResp = response.candidates[0]?.content?.parts[0]?.text || "";
    const RawJson = RawResp
    .replace('```json', '')
    .replace('```', '');

  // console.log("Cleaned JSON:", RawJson);

  const JSONResp = JSON.parse(RawJson);
    //GET YOUTUBE
    const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
    // console.log({
    //   youtubeVideo:youtubeData,
    //   courseData:JSONResp
    // })
    return {
      youtubeVideo: youtubeData,
      courseData: JSONResp,
    };
  });

  const CourseContent = await Promise.all(promise);

  const dbResp = await db.update(courseTable).set({
    courseContent:CourseContent,
  }).where(eq(courseTable.cid,courseId));


  return NextResponse.json({
    courseName: courseTitle,
    CourseContent: CourseContent,
  });
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const GetYoutubeVideo = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResult: 4,
    type: "video",
    key: process.env.Youtube_API_KEY,
  };
  const resp = await axios.get(YOUTUBE_BASE_URL, { params });
  const youtubeVideoListResp = resp.data.items;
  const youtubeList = [];
  youtubeVideoListResp.forEach(item => {
    const data ={
      videoId:item.id?.videoId,
      title:item?.snippet?.title,
    }
    youtubeList.push(data); 
  });
  return youtubeList;
};
