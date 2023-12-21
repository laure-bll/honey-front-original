import React, {useEffect, useState} from "react";
import SearchBar from "../components/search/search";
import {request} from "../Config/request";
import Paper from "@mui/material/Paper";
import UserFiles from "../components/main/UserFiles";
import {Typography} from "@mui/material";
import {formatFileSize} from "../helpers/Convert";

const UsersLayout = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  function filterData(
      searchQuery: string,
      data: Array<{ fullName: string; uid: string }>
  ) {
    return data.filter((user) =>
        user.fullName &&
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleUserClick = (uid: string) => {
    setSelectedUid(uid);
  };

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const response = await request("admin/users", "get", undefined);

        if (Array.isArray(response)) {
          const users = response;
          setData(users);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchUserNames();
  }, []);

  const dataFiltered = filterData(searchQuery, data);

  return (
      <div className="layout-container">
        <div className="page-container" style={{
          display: "flex",
        }}>
          <div style={{padding: 3}}>
            <SearchBar setSearchQuery={setSearchQuery}/>
            {data.filter(x => (x.firstName?.includes(searchQuery) || x.lastName?.includes(searchQuery))).map((user) => (
                <div key={user.uid}>
                  <div
                      style={{textDecoration: "none"}}
                      onClick={() => handleUserClick(user.uid)}
                  >
                    <Paper
                        elevation={3}
                        style={{
                          padding: 5,
                          justifyContent: "normal",
                          fontSize: 20,
                          color: "white",
                          margin: 1,
                          width: "250px",
                          marginTop: "10px",
                          border: "0px solid transparent",
                          backgroundColor: "#0E203A",
                          display: "flex",
                        }}
                    >
                      <Typography sx={{flex: 3}}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography sx={{flex: 1}}>
                        {formatFileSize(user.storage.used) || 0} / {formatFileSize(user.storage.max)}
                      </Typography>
                    </Paper>
                  </div>
                </div>
            ))}
          </div>
          <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 20,
              }}
          >
            {selectedUid && <UserFiles uid={selectedUid!}/>}
          </div>
        </div>
      </div>
  );
};

export default UsersLayout;
