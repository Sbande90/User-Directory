import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import logo from "./logo.svg";
import "./App.css";

const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    right: true,
  },
  {
    name: 'Gender',
    selector: 'gender',
    sortable: true,
  },
  {
    name: 'Cell',
    selector: 'cell',
    sortable: true,
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
            name:
              response.data.results[i].name.title +
              " " +
              response.data.results[i].name.first +
              " " +
              response.data.results[i].name.last,
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

  render() {
    return (
      <div>
        {/* {this.state.employeeList.map((employee, index)=>{
        return (
          <h1 key={index}>
          
            {employee.name.first}
            </h1>
        )
      })} */}
        <DataTable
          title="Arnold Movies"
          columns={columns}
          data={this.state.employeeList}
          // customStyles={customStyles}
        />
      </div>
    );
  }
}

export default App;
