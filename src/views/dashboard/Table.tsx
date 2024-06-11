// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { useEffect, useState } from "react";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

interface RowType {
  location: string;
  count: number;
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor;
  };
}

const statusObj: StatusObj = {
  applied: { color: "info" },
  rejected: { color: "error" },
  current: { color: "primary" },
  resigned: { color: "warning" },
  professional: { color: "success" },
};

const DashboardTable = () => {
  const [rows, setRows] = useState<RowType[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/top_countries")
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType, index: number) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                    >
                      {row.location}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
