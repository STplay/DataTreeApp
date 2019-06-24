import { Injectable } from '@angular/core';

// Here, normally , we would get the data from some type of real service (api, http request, database, etc..)


@Injectable({
  providedIn: 'root'
})
export class DataService{

  // for exmpample we are to get the data through an http get
  /*
  constructor(private http: HttpClient) {  }
  getCategories() {
      return this.http.get('....');
  }
  */

  // Here, for the purposes of this app, the categories content is returned from the harcoded json with sample data 
  getCategories():  string {

     return JSON.stringify(CATEGORIES_DATA);

  }//--- DataServcie:: getCategories() ---


}//--- DataService ----

//The Category hierarchy tree is presented in JSON obj(or the string presentation of it)
//where a Category is presented as <key>:<value> : <category>::=  <name>: {<sub categries>} ,
//with 0-.. sub-categories: <sub categories>::= <category>, <category>,...,<category>.
//A  leaf category has an empty dictionary for its children  {}
//Elements of type <name>:<simple value> are not used/considered category (are simply ignored) intentionally
//as -) creates inconsistency, -) can be used for presenting attributes or other category information 
//(in addition to the name and subcategories), not implemented here
//Having "wraping" "top" element ('Books' in this case) as root is an easy way to treat adding top-levels node
//just as adding any other more internal ones. If not included in data (in a real worls scenario)
//it can be easility added by the code.

const CATEGORIES_DATA  = {
  Books: {
    Fiction: {
      'Action' : {},
      'Anthology' : {},
      'Classic' : {},
      'Comic and Graphic Novel' : {},
      'Crime and Detective' : {},
      'Drama' : {},
      'Fantasy' : {},
      'Historical Fiction' : {},
      'Humor' : {},
      'Legend' : {},
      'Mythology' : {},
      'Realistic Fiction' : {},
      'Romance' : {},
      'Satire' : {},
      'Science Fiction' : {},
      'Short Story' : {}
      
    }//end Fiction
    ,
   Nonfiction : {
      'Biography' : {},
      'Essay' : {},
      'Memoir' : {},
      'Narrative Nonfiction' : {},
      'Periodicals' : {},
      'Reference Books' : {},
      'Self-help Book' : {},
      'Textbook' : {},
      'Poetry' : {}
    }//end 'Nonfiction

  }//end Books
}; 


    