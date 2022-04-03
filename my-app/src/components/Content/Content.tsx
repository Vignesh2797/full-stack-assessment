import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import CardContent from "@mui/material/CardContent";
import PatientModel  from '../../interfaces/patient';

import "./Content.css";
import { showAddress } from "../../utils/constants";
import { showName } from "../../utils/constants";
import { showMobile } from "../../utils/constants";

const Content = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const columns = [
    { field: "name", headerName: "Name", width: 400 },
    { field: "birthdate", headerName: "DOB", width: 200 },
    { field: "gender", headerName: "Gender", width: 200 },
    { field: "address", headerName: "Address", width: 400 },
    { field: "mobile", headerName: "Mobile", width: 200 },
  ];

  let patientData: PatientModel[] = []

  data.forEach((element: any) => {
    const obj = {
      id: element.entry[0].resource.id,
      name: showName(element.entry[0].resource.name),
      birthdate: element.entry[0].resource.birthDate,
      gender: element.entry[0].resource.gender,
      address: showAddress(element.entry[0].resource.address),
      mobile: showMobile(element.entry[0].resource.telecom),
    };

    patientData.push(obj);
  });

  const rows = patientData;

  useEffect(() => {
    fetch("http://localhost:3001/records")
      .then((res) => res.json())
      .then((res) => {
        setLoaded(true);
        setData(res);
      });
  }, []);

  return isLoaded ? (
    <>
      <Card>
        <CardContent>
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid disableSelectionOnClick 
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </CardContent>
      </Card>
    </>
  ) : (
    <>
      <div className="loader">
        <CircularProgress color="primary" />
        <h5>Loading....</h5>
      </div>
    </>
  );
};

export default Content;
