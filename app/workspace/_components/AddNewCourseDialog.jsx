"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Sparkle } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const AddNewCourseDialog = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  
  const [formData, setFormData] = useState({
      name: "",
      description: "",
      includeVideo: false,
      noOfChapters: 1,
      category: "",
      level: "",
    });
    
// const isFormValid = formData.courseName && formData.level && formData.category;
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };
  const onGenerate = async () => {
    const courseId=uuidv4();
    try {
        console.log(formData);
    setLoading(true);
    const result = await axios.post("/api/generate-course-layout", {
      ...formData,
      courseId:courseId
    });
    console.log(result.data);
    if(result.data.resp=='limit excedd'){
      toast.warning('Please Subscribe to plan!')
      router.push('/workspace/billing');
    }
    setLoading(false);
    router.push('/workspace/edit-course/'+result.data?.courseId);

        
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4 mt-3">
              <div>
                <label>Course Name</label>
                <Input
                  placeholder="Course Name"
                  onChange={(e) =>
                    onHandleInputChange("name", e?.target.value)
                  }
                />
              </div>
              <div>
                <label>Course Description (Optional)</label>
                <Textarea
                  placeholder="Course Description"
                  onChange={(e) =>
                    onHandleInputChange("description", e?.target.value)
                  }
                />
              </div>
              <div>
                <label>No. of Chapters</label>
                <Input
                  placeholder="No of chapters"
                  type="number"
                  onChange={(e) =>
                    onHandleInputChange("noOfChapters", parseInt(e?.target.value || "0"))
                  }
                />
              </div>

              <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch
                  onCheckedChange={() =>
                    onHandleInputChange("includeVideo", !formData?.includeVideo)
                  }
                />
              </div>

              <div>
                <label>Difficulty Level</label>
                <Select
                  className="mb-2"
                  onValueChange={(value) => onHandleInputChange("level", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Category</label>
                <Input
                  placeholder="Category (Separated By comma)"
                  onChange={(e) =>
                    onHandleInputChange("category", e?.target.value)
                  }
                />
              </div>

              <div className="mt-5">
                <Button className="w-full" onClick={onGenerate} disabled={loading}>
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <Sparkle />
                  )}
                  Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourseDialog;
