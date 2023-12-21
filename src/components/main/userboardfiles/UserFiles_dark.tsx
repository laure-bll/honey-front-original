// UserFiles.js

import React, { useEffect, useState } from "react";
import { request } from "../../../Config/request";
import ListFiles from "./ListFiles_dark";
import { dataItem } from "./ListItem_dark";


interface UserFilesProps {
  uid: string; 
}

const UserFiles: React.FC<UserFilesProps> = ({ uid }) => {
  const [userFiles, setUserFiles] = useState<dataItem[]>([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await request("admin/filesbyuser/"+uid, "get");
        setUserFiles(response);
        console.log("response : ", response);
      } catch (error) {
        console.error("Error fetching user files:", error);
      }
    };
    fetchUserFiles();
  }, [uid]);

  return (
    <div>
    
      <ListFiles data={userFiles} /> 
    </div>
  );
};

export default UserFiles;
