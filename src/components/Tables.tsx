import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card } from "@mui/material";
import Modal from "./Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable({
  columns,
  rows,
}: {
  columns: String[];
  rows: any;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [desc, setDesc] = React.useState<String>("ABC");

  return (
    <div style={{ padding: "16px" }}>
      <TableContainer component={Card}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column: String) => (
                <TableCell>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow
                key={row.companyName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.companyName}
                </TableCell>
                <TableCell>{row.jobRole}</TableCell>
                <TableCell
                  onClick={() => {
                    handleOpen();
                    setDesc(row.jobDesc);
                  }}
                >
                  {row.jobDesc}
                </TableCell>
                <TableCell>{row.dateOfApplication}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={row.status}
                      label="Status"
                      onChange={(event) => row.status = event?.target.value}
                    >
                      <MenuItem value={1}>Submitted</MenuItem>
                      <MenuItem value={2}>Interviewed</MenuItem>
                      <MenuItem value={3}>Selected</MenuItem>
                      <MenuItem value={4}>Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        title={"Job Description"}
        description={desc}
        setOpen={handleClose}
      />
    </div>
  );
}
