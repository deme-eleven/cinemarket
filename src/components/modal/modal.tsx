import React from "react";
import Button from "../button/button";
import { useTable } from "react-table";
import { MdClose } from "react-icons/md";

type ModalProps = {
  close: () => void;
  heading: string;
  data: any;
};

export default function Modal(props: ModalProps) {
  const data = React.useMemo(() => {
    return props.data.data;
  }, [props.data]);

  const columns = React.useMemo(() => {
    let header = [{ Header: "Country", accessor: "country" }];
    for (const iterator of props.data.headers) {
      header.push({ Header: iterator, accessor: iterator });
    }
    return header;
  }, [props.data.headers]);

  const { headerGroups, rows, prepareRow } = useTable({ columns, data });

  const renderCell = (value: undefined | "exclusive" | "non-exclusive") => {
    switch (value) {
      case "exclusive":
        return <div className="pill">Exclusive</div>;
      case "non-exclusive":
        return <div className="pill">Non-Exclusive</div>;
      case undefined:
        return <div className="pill gray">Not Available</div>;
      default:
        return value;
    }
  };

  const renderTable = () => {
    return (
      <div className="table-content">
        <div className="rights">TYPE OF RIGHTS</div>
        <div className="table-container">
          <div className="territories">TERRITORIES</div>
          <table>
            <thead>
              {headerGroups.map((headerGroup: any) => (
                <tr>
                  {headerGroup.headers.map((column: any) => (
                    <th>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {rows.map((row: any) => {
                prepareRow(row);
                return (
                  <tr>
                    {row.cells.map((cell: any) => {
                      return <td>{renderCell(cell.value)}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="modal">
      <div className="window">
        <div className="close" onClick={props.close}>
          <MdClose />
        </div>
        <div className="modal-heading">
          <h2>{props.heading}</h2>
        </div>
        <div className="content">{renderTable()}</div>
        <div className="buttons">
          <Button
            alternate
            text="Clear selection"
            icon="close"
            onClick={() => {}}
          />
          <Button text="Make an offer" icon="offer" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
