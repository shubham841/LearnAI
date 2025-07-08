"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";

const Explore = () => {
  const [courseList, setCourseList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search input state
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetCourseList(""); // Load all courses by default
    }
  }, [user,courseList]);

  const GetCourseList = async (query = "") => {
    try {
      const result = await axios.get(`/api/courses`, {
        params: {
          courseId: 0,
          search: query, // send search query
        },
      });
      setCourseList(result.data);
      

    } catch (error) {
      console.error("Failed to fetch course list", error);
    }
  };

  const handleSearch = () => {
    GetCourseList(searchTerm);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl mb-6">Explore More Courses</h2>

      {/* 🔍 Search Bar */}
      <div className="flex gap-5 max-w-md">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={()=>handleSearch()}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      {/* 🧾 Courses List or Loading Skeletons */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {courseList.length > 0
          ? courseList.map((course) => (
              <CourseCard course={course} key={course?.cid} />
            ))
          : [0, 1, 2, 3].map((item, index) => (
              <Skeleton key={index} className="w-full h-[240px]" />
            ))}
      </div>
    </div>
  );
};

export default Explore;
