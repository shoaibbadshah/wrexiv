"use client";

import RoomsTable from "./RoomsTable";

const Rooms = () => {
  return (
    <div className="pt-4 pb-8 px-8 space-y-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl">Rooms</h2>
        <p>
          AI sales assistant that helps you to close more deals and increase
        </p>
      </div>
      <RoomsTable />
    </div>
  );
};

export default Rooms;
