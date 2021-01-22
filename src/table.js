import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';


  
class Table extends Component {

//     componentDidMount() {
    
//  }

constructor(props){
    super(props)
    this.state = {
        users:[],
        isLoading: false,
        isError: false
    }
}

//async function get request

async componentDidMount(){

    this.setState({isLoading:true})

    const response = await fetch("https://api.enye.tech/v1/challenge/records");

    if(response.ok){
        const data = await response.json();
        const users = data.records.profiles;
        console.log(data);
        this.setState({users, isLoading:false})
    }else{
        this.setState({isError:true, isLoading:false})
    }
    
//initialize datatable
$(document).ready(function () {
    $('#enyo-data').DataTable();
});
}

renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>
        {attr.toUpperCase()}
    </th>)

}

renderTableRows = () => {
    return this.state.users.map(user =>{
        return (
            <tr key={user.id}>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                            <td>{user.Gender}</td>
                            <td>{user.Latitude}</td>
							<td>{user.Longitude}</td>
                            <td>{user.CreditCardNumber}</td>
                            <td>{user.CreditCardType}</td>
							<td>{user.Email}</td>
                            <td>{user.DomainName}</td>
                            <td>{user.PhoneNumber}</td>
							<td>{user.MacAddress}</td>
                            <td>{user.URL}</td>
                            <td>{user.UserName}</td>
							<td>{user.LastLogin}</td>
                            <td>{user.PaymentMethod}</td>  
            </tr>
        )
    })
}
render(){
    const {users, isLoading, isError} = this.state

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <div>Error</div>
    }

    return users.length > 0
    ?(
        <div class="container-fluid">
        <div class="row">
  <div id="admin" class="col">
      <div>
          <div class="h3  text-center">Subscriber Database</div>
          
      </div>
    <div class="card " >
        <table id="enyo-data" class="table table-sm table-responsive table-striped">
            <thead >
                <tr>
                   {this.renderTableHeader()} 
                </tr>
            </thead>
            <tbody>
                {this.renderTableRows()}
            </tbody>
        </table>
        </div>
  </div>
</div>
</div>
    ):(
        <div> No Users</div> 
    )
}
}

export default Table;