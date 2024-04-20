import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "roomName",
    headerName: "Room Name",
    width: 200,
  },
  {
    field: "roomType",
    headerName: "Room Type",
    width: 200,
  },
  {
    field: "roomCapacity",
    headerName: "Room Capacity",
    width: 200,
  },
  {
    field: "roomStatus",
    headerName: "Room Status",
    width: 200,
  },
  {
    field: "roomPrice",
    headerName: "Room Price",
    width: 200,
  },
  {
    field: "roomDescription",
    headerName: "Room Description",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: params => {
      return params.row.actions;
    },
  },
];

const RoomsTable = () => {
  const renderActions = () => {
    return (
      <div>
        <button className="btn btn-primary btn-sm">Share</button>
      </div>
    );
  };

  const rows = Array.from({ length: 100 }, (item, index) => {
    return {
      id: index + 1,
      roomName: `Room ${index + 1}`,
      roomType: "Single",
      roomCapacity: 1,
      roomStatus: "Available",
      roomPrice: 100,
      roomDescription: "This is a single room",
      actions: renderActions(),
    };
  });

  return (
    <DataGridPro
      columns={columns}
      rows={rows}
      initialState={{
        pinnedColumns: {
          right: ["actions"],
        },
      }}
    />
  );
};

export default RoomsTable;
