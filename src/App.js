import React from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { DataGrid } from "@material-ui/data-grid";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
// import logo from "./logo.svg";
import "./App.css";

const columns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  {
    headerName: "Name",
    field: "name",
    width: 200,
  },
  {
    headerName: "Email",
    field: "email",
    width: 240,
  },
  {
    headerName: "Gender",
    field: "gender",
    width: 130,
  },
  {
    headerName: "Cell",
    field: "cell",
    width: 150,
  },
];

class App extends React.Component {
  state = {
    employeeList: [],
    key: "",
    order: ""
  };

  handleKeyChange = (event) =>{
    this.setState({ key: event.target.value });
  };

  handleOrderChange = (event) => {
    this.setState({ order: event.target.value })
  }

  componentDidMount() {
    this.searchEmployee();
  }

  searchEmployee() {
    // Make a request for a user with a given ID
    axios
      .get("https://randomuser.me/api/?results=100")
      .then((response) => {
        // this.setState({ employeeList: list });
        // handle success
        console.log(response);
        var i;

        var list = [];

        for (i = 0; i < response.data.results.length; i++) {
          console.log(response.data.results[i].name.first);

          list.push({
            id: i,
            name:
              response.data.results[i].name.first +
              " " +
              response.data.results[i].name.last +
              " (" +
              response.data.results[i].name.title +
              ")",
            email: response.data.results[i].email,
            gender: response.data.results[i].gender,
            cell: response.data.results[i].cell,
          });
        }
        this.setState({ employeeList: list });

        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  handleSort = () => {
    let employeeSorted = [...this.state.employeeList];

    let key = this.state.key;
    let asc = this.state.order;

    // sort by key and asc
    employeeSorted.sort((a, b) => {
      return a[key] > b[key] ? asc * 1 : asc * -1;
    });

    // set the state
    this.setState({ employeeList: employeeSorted });
  };
  render() {
    return (
      <div>
        <div style={{width: 800, margin: "15px auto", display: "flex", flexDirection: "row"}}>
        <InputLabel id="key">Select property</InputLabel>
        <Select style={{width:"100px", margin: "15px"}}
          labelId="key"
          id="demo-simple-select"
          value={this.state.key}
          onChange={this.handleKeyChange}
        >
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"email"}>Email</MenuItem>
          <MenuItem value={"gender"}>Gender</MenuItem>
          <MenuItem value={"cell"}>Cell</MenuItem>
        </Select>

        <InputLabel id="order">Select asc/desc</InputLabel>

        <Select style={{width:"100px", margin: "15px"}}
          labelId="order"
          id="demo-simple-select"
          value={this.state.order}
          onChange={this.handleOrderChange}
        >
          <MenuItem value={1}>Asc</MenuItem>
          <MenuItem value={-1}>Desc</MenuItem>
          {/* <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
          <Button variant="contained" color="primary" onClick={this.handleSort}>
            Sort
          </Button>
        </div>
        <div style={{ height: "900px", width: 800, margin: "15px auto" }}>
          <DataGrid
            rows={this.state.employeeList}
            columns={columns}
            pageSize={15}
          />
        </div>
      </div>
    );
  }
}

export default App;
