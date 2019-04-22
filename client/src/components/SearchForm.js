import React,{ Component } from "react";
import Jumbotron from "./Jumbotron";
import { Input, TextArea, FormBtn } from "./Form";
import axios from "axios";
import FirstPage from "../pages/FirstPage";
import NoMatch from "../pages/NoMatch";
import Result from "../pages/Result";
import { Link } from "react-router-dom";
import API from "../utils/API";

class SearchForm extends Component {  
  state = {    
    address: "",
    county: "",
    flood:"",
    school:"",
    price:0,
    levels:0,
    building_type:"",
    finished_size:0,
    year_built:0,
    add:{},
    flag:false,
    ZIP:"",
    zipresults:[],
    zipFlag:false,
    mapUrl:"",
    
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,     
    });
  };

  searchHome = () => {
    console.log("search home");
    API.displayAddress(this.state.address,this.state.city)

      .then(response => {
        console.log("response:  "+ JSON.stringify(response));
        this.setState({
        address:response.data.property[0].address.oneLine,
        county:response.data.property[0].area.countrysecsubd,
        building_type:response.data.property[0].summary.propclass,
        levels:response.data.property[0].summary.levels,
        finished_size:response.data.property[0].building.size.livingsize,
        year_built:response.data.property[0].summary.yearbuilt,
        
        });
        
      })

      .catch(err => console.log(err));

   
    }

    showMap = () => {
      console.log("search Map");
      API.displayMap(this.state.address)
  
        .then(response => {
          console.log("response:  "+ JSON.stringify(response));
          this.setState({
          mapUrl:response.data.results.locations[0].mapUrl,
          
          });
          console.log("MapUrl  "+this.state.mapUrl);
        })
        
        .catch(err => console.log(err));
  
     
      }

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({      
      flag:true,
    
    });

    this.searchHome();
    this.showMap();
     
  };

  handleZipFormSubmit = event => {
    event.preventDefault();
    
    var url= "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?postalcode=08817&page=1&pagesize=10"
    
    console.log("Url=="+url);
    axios.get( url,{
      headers: {
        "apikey": "833ffeb2822b8ee5778f7b5073319970"
      }
    }).then(response => {
      console.log("response:  "+ JSON.stringify(response));
      this.setState({
         zipFlag:true,
         flag:true,
         zipresults:response.data.property
      });
        
    }) 
  };

render() {
  if(!this.state.flag)
  {
    return (
      <Jumbotron>
      
   
      <legend>Search Property By Address</legend>
      <form>
      <div class="form-group">
        <label for="address">Address</label>
            <Input
              value={this.state.address}
              onChange={this.handleInputChange}
              name="address"
              placeholder="Address (Optional)"
            />
      </div>
      <div class="form-group">
      <label for="city">City</label>
      <Input
            value={this.state.city}
            onChange={this.handleInputChange}
            name="city"
            placeholder="City (required)"
          />
      </div>
      <div class="form-group">
        <label for="place">State</label>
        <select class="form-control" id="place"
         value={this.state.place}
         onChange={this.handleInputChange}
         name="place"
        >
          <option>NJ</option>
          <option>NY</option>
          <option>CA</option>
          <option>MD</option>
          <option>VA</option>
        </select>
      </div>   
      
      <FormBtn onClick={this.handleFormSubmit} className="btn btn-primary mt-3">
       Search
      </FormBtn>
      </form>

      <p>OR</p>
      <legend>Search Property By Zip Code</legend>
      <form>
      <div class="form-group">
        
            <Input
              value={this.state.ZIP}
              onChange={this.handleInputChange}
              name="ZIP"
              placeholder="Enter ZIP CODE (Required)"
            />
      </div>
      <FormBtn onClick={this.handleZipFormSubmit} className="btn btn-primary mt-3">
       Search By ZIP
      </FormBtn>
      </form>
    </Jumbotron>
  );
  }
  
    else{
    return(
      <Result flag={this.state.zipFlag}
            add={this.state.address}
            county={this.state.county}
            levels={this.state.levels}
            building_type={this.state.building_type}
            finished_size={this.state.finished_size}
            year_built={this.state.year_built}
            zipresults={this.state.zipresults}
            Url={this.state.mapUrl}
            

    />    
    )
    }
    
    
  
}
}
export default SearchForm;
