import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

const ApplicationUrl = () => {
    const [url, setUrl] = useState('');
  const [data, setData] = useState(null);

  const handleChange = (event: any) => {
    setUrl(event.target?.value);
    console.log(url);
  }

  const handleSubmit = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/", {
            url: url
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        paddingTop: "16px",
        paddingLeft: "32px",
      }}
    >
      <h3>Url: </h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "720px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField onChange={handleChange} id="outlined-basic" label="URL" variant="outlined" />
      </Box>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default ApplicationUrl;
