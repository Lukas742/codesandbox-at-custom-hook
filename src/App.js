import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import {
  ThemeProvider,
  AnalyticalTable,
  Button
} from "@ui5/webcomponents-react";
import { DATA } from "./data";
import { useRowState } from "react-table";

const COLUMNS = [
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Age",
    accessor: "age"
  },
  {
    Header: "Custom Cell",
    id: "custom",
    Cell: ({ cell }) => {
      const { value, row } = cell;
      if (row.state.hovered) {
        return <Button>Action</Button>;
      }
      return "";
    }
  }
];

const getRowProps = (rowProps, { row }) => {
  const handleMouseEnter = (e) => {
    // set row state
    row.setState((prev) => ({ ...prev, hovered: true }));
    // currently there is no internal implementation of the event, since this may change in the future it's better to check whether there is
    if (typeof rowProps?.onMouseEnter === "function") {
      rowProps.onMouseEnter(e);
    }
  };
  const handleMouseLeave = (e) => {
    row.setState((prev) => ({ ...prev, hovered: false }));
    // currently there is no internal implementation of the event, since this may change in the future it's better to check whether there is
    if (typeof rowProps?.onMouseLeave === "function") {
      rowProps.onMouseLeave(e);
    }
  };
  return [
    rowProps,
    {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  ];
};

const useRowMouseEvents = (hooks) => {
  hooks.getRowProps.push(getRowProps);
};
useRowMouseEvents.pluginName = "useRowMouseEvents";

export default function App() {
  return (
    <ThemeProvider>
      <AnalyticalTable
        columns={COLUMNS}
        data={DATA}
        // Imo using useRowState of `react-table` is the easiest way to achieve this behavior
        tableHooks={[useRowState, useRowMouseEvents]}
      />
    </ThemeProvider>
  );
}
