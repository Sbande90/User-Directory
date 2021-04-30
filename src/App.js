import React from "react";
import axios from "axios";

import { DataGrid } from '@material-ui/data-grid';
// import logo from "./logo.svg";
import "./App.css";

const columns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  {
    headerName: 'Name',
    field: 'name',
    width: 200
  },
  {
    headerName: 'Email',
    field: 'email',
    width: 240
  },
  {
    headerName: 'Gender',
    field: 'gender',
    width: 130
  },
  {
    headerName: 'Cell',
    field: 'cell',
    width: 150
  }
];

class App extends React.Component {
  state = {
    employeeList: [],
  };

  componentDidMount() {
    this.searchEmployee();
  }

  searchEmployee() {
    // Make a request for a user with a given ID
    axios
      .get("https://randomuser.me/api/?results=20")
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
            name:response.data.results[i].name.first +
              " " + response.data.results[i].name.last +" ("+response.data.results[i].name.title+")",
            email: response.data.results[i].email,
            gender: response.data.results[i].gender,
            cell: response.data.results[i].cell,
          });
        }
        this.setState({employeeList: list});

        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  handleSort = (key, asc) => {
    let employeeSorted = [...this.state.employeeList];
    
    // sort by key and asc
    employeeSorted.sort((a, b) => {
      return a[key] > b[key] ? asc * 1 : asc * -1;
    });

    // set the state
    this.setState({ employeeList: employeeSorted });
  }
  render() {
    return (
      <div>
        <div style={{ height: "900px", width: 800 }}>
        <DataGrid rows={this.state.employeeList} columns={columns} pageSize={10} />
        </div>
      </div>
    );
  }
}

export default App;
