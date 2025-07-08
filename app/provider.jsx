"use client";

import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContent";
import { UseDetailContext } from "@/context/UserDetailsContext";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

const Provider = ({ children }) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);
  const [selectedChapterIndex,setSelectedChapterIndex]=useState([]);


  useEffect(() => {
    user && createNewUser();
  }, [user]);
  const createNewUser = async () => {
    const result = await axios.post("/api/user", {
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(result.data);
    setUserDetail(result.data);
  };
  return (
    <UseDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SelectedChapterIndexContext.Provider value={{selectedChapterIndex,setSelectedChapterIndex}}>
        <div>{children}</div>
      </SelectedChapterIndexContext.Provider>
    </UseDetailContext.Provider>
  );
};

export default Provider;
