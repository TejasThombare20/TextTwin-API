"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { GridColumnHeaderParams } from "@mui/x-data-grid";
import { formatDistance } from "date-fns";
import { useTheme } from "next-themes";

const columnsDraft: GridColDef[] = [
  {
    field: "col1",
    headerName: "API key used",
    width: 400,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}🔑</strong>
      );
    },
  },
  {
    field: "col2",
    headerName: "Path",
    width: 250,
  },
  {
    field: "col3",
    headerName: "Recency",
    width: 250,
  },
  {
    field: "col4",
    headerName: "Duration",
    width: 250,
  },
  {
    field: "col5",
    headerName: "Status",
    width: 250,
  },
];

const columns = columnsDraft.map((col) => {
  if (col.field === "col1") {
    return col;
  }
  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}</strong>
      );
    },
  };
});
// type ModifiedRequestType<K extends keyof Request>

// interface TableProps {

//     userRequests : ModifiedRequestType<"timestamp">[]
// }

const Table = ({ userRequests }: any) => {
  const { theme: applicationTheme } = useTheme();

  const JSONObject = JSON.parse(userRequests);

  const serialzableRequests = JSONObject.map((req: any) => ({
    ...req,
    createdAt: formatDistance(new Date(req.createdAt), new Date()),
  }));

  // console.log("JSONObject", JSONObject);

  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });

  const rows = serialzableRequests.map((request: any) => ({
    id: request._id,
    col1: request.usedApiKey,
    col2: request.path,
    col3: `${request.createdAt} ago`,
    col4: `${request.duration} ms`,
    col5: request.status,
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === "light" ? "white" : "#152238",
          fontSize: "1rem",
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows}
      />
    </ThemeProvider>
  );
};

export default Table;
