import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  
  //Function to display Map for address
  
  displayAddress: function(address1,address2,address3) {
    
         
    var url= "https://search.onboard-apis.com/propertyapi/v1.0.0/property/detail?address1="+ address1 +"&address2=" + address2 + " " + address3;
       
    console.log("Url=="+url);
    let headers = {'apikey': "833ffeb2822b8ee5778f7b5073319970"}
     
    return(axios.get(url,{
    headers:{
      "apikey": "833ffeb2822b8ee5778f7b5073319970"
    }
  }));
      
},

  displayMap: function(address) {
    
         
      var url= "http://www.mapquestapi.com/geocoding/v1/address?key=ZPViVitEZfDIkNDJDVplI6lK2sz0ShE7&location=" + address;
      
      console.log("Url=="+url);
      return(axios.get( url));
  }
};
