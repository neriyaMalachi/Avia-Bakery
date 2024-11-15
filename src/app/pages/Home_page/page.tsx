"use client";
import AddUser from "@/app/components/AddUser";
import { validationToken } from "@/app/services/validationToken/validationToken";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // להפניה אם אין טוקן
import React from "react";

const Page = () => {
  const route = useRouter();

  const { isLoading, error } = useQuery({
    queryKey: ["users"], // מפתח ייחודי לשאילתה
    queryFn: validationToken, // פונקציית הפניה ל-API
  });

  if (isLoading) return <div className="">louding ...</div>;
  if (error) route.push("/");
  
    return (
      <div>
        <AddUser />
      </div>
    );

};

export default Page;
