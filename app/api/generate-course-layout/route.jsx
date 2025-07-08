import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { courseTable } from "@/config/schema";
import { db } from "@/config/db";
import axios from "axios";

const prompt = `Generate Learning Course depends on following details. In which make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, Topic under each chapters, Duration for each chapters etc. Return only raw JSON without any explanation

Schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  },
  "User Input": ""
}`;
export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

export async function POST(req) {
  const {has} = await auth();
  const hasPremiumAccess = has({plan:'starter'});
  const { courseId, ...formData } = await req.json();
  let user = null;
  try {
    user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
  } catch (err) {
    // console.error("Failed to fetch Clerk user:", err);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }

  

  const model = "gemini-2.0-flash"; // Use "gemini-1.5-pro" or "gemini-pro" based on availability

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt + JSON.stringify(formData),
        },
      ],
    },
  ];

  if(!hasPremiumAccess){
    const result = await db.select().from(courseTable).where(eq(courseTable.userEmail,user?.primaryEmailAddress/emailAddress));

    if(result?.length>=1){
      return NextResponse.json({'resp':'Limit Exceed'});
    }
  }

  const response = await ai.models.generateContent({
    model,
    contents,
  });

  // const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  // console.log("AI Response:", text);
  // console.log(response.candidates[0].content.parts[0].text);
  const RawResp = response.candidates[0]?.content?.parts[0]?.text || "";
  const RawJson = RawResp.replace(/.*```json/, "") // Remove everything before ```json
    .replace(/```/, "") // Remove closing ```
    .trim();

  const JSONResp = JSON.parse(RawJson);

  //generate Images'
  const ImagePrompt = JSONResp.course?.bannerImagePrompt;
  const bannerImageUrl = await GenerateImage(ImagePrompt);

  // // Optional: Save to DB

  const result = await db.insert(courseTable).values({
    ...formData,
    courseJson: JSONResp,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid: courseId,
    bannerImageUrl:bannerImageUrl
  });

  return NextResponse.json({ courseId: courseId });
}

const GenerateImage = async (ImagePrompt) => {
  const BASE_URL = "https://aigurulab.tech";
  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: ImagePrompt,
      model: "flux",
      aspectRatio: "16:9", //Applicable to Flux model only
    },
    {
      headers: {
        "x-api-key": process.env.AI_GURU_LAB_API_KEY, // Your API Key
        "Content-Type": "application/json", // Content Type
      },
    }
  );
  // console.log(result.data.image);

  return result.data.image;
};
