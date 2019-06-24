import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import { DataService } from "../shared/data.service";

   
//==================================================
/***       TreeData     ***
/*
/*   Presents the Tree Node data (one category in this example app)
 *   Each node has a name and an array of children (sub categories)
 *   This can be obviously extended to include additional data about the node (categpry)
 *   like type, description, various attributes (not included in this implementation )
 */
export class TreeNode {

    name: string;
   
    //type: any; //or description: string, etc - add.data for example 
    
    children: TreeNode[] = [];
    
    childrenChange:BehaviorSubject<TreeNode[]> = new BehaviorSubject<TreeNode[]>([]);

    constructor() {
        this.childrenChange.next(this.children);
        if (this.children && this.children.length==0) {  //a ittle trick, as work around
          this.children.push({name: "."} as TreeNode) ;  
          this.childrenChange.next(this.children);    
        }   
    }//--- TreeData:: constructor ---

    addChild(node:TreeNode):void {
      this.childrenChange.next(this.children);
      this.children.push(node);
      this.childrenChange.next(this.children);   
    }//--- TreeNode:: addChild ------
  
    updateNewNode( node : TreeNode, name:string) {

      this.children.pop();  //this would be the just added empty "spot" for the new node (a little trick I had to apply)
      this.childrenChange.next(this.children);            

      node.name=name;
      this.children.push(node);
      this.childrenChange.next(this.children);  

    }//--- TreeNode::updateNewNode ------
   
    //-- for some internal maintanance works - delete kids with given values
    deleteChildren(value:string) {
      for( var i = 0; i < this.children.length; i++) { 
        if ( this.children[i].name === value) {
          this.children.splice(i, 1); 
        }
      }
      this.childrenChange.next(this.children);
    }//--- TreeNode:: deleteChildren ---

    deleteEmptyChildren() {
      for( var i = 0; i < this.children.length; i++){ 
        if ( this.children[i].name === '') {
          this.children.splice(i, 1); 
        }
      }     
      this.childrenChange.next(this.children);
    }//--- TreeNode::deleteEmptyChildren -----
  
  
    //-----------------------------------------
    assignchildren(nodes:TreeNode[]) { 
      if (nodes.length ==0) return;
      this.children = nodes;
      this.childrenChange.next(this.children);      
    }//--- TreeNode:: assignchildren  ---

    appendchildren(nodes:TreeNode[]){
      if (nodes.length ==0) return;
      this.children = this.children.concat(this.children, nodes);
      this.childrenChange.next(this.children);    
    }//--- TreeNode:: appendchildren ----

    hasNode(name:string) : boolean     {    
          return (this.children.find((node) => node.name == name)) ? true : false;      
    }//--- TreeNode:: hasNode
    

  }//--- end class TreeNode ------------
  //================================================
  
//==================================================
/**       TreeData     ***
 *    Holds the tree data structure 
  */
@Injectable()
export class TreeData {

  dataChange = new BehaviorSubject<TreeNode[]>([]);

  get data(): TreeNode[] { return this.dataChange.value; }

  constructor(private _dataService: DataService) {
    this.initialize();
  }

  initialize() {
    // This is passed a string presentation of the JSON (returned by _dataService.getCategories()) . 
    // Could easily changed to be directly JSON      
    const dataObject = JSON.parse(this._dataService.getCategories()); 
                                                     
    // Build the tree nodes from Json object. The result is a list of `TreeNode` with nested children.
    const data = this.buildDataTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }//--- TreeData:: initialize  ----

  //----------------------------------------------------------------------
  /**   buildDataTree **  Build the data tree from the passed json string
   * 
   *  (see notes in data.service.ts):  The Category hierarchy tree is presented in JSON obj(or the string presentation of it)
   *  where a Category is presented as <key>:<value> : <category>::=  <name>: {<sub categries>} ,
   *  with 0-.. sub-categories: <sub categories>::= <category>, <category>,...,<category>.
   *  A  leaf category has an empty dictionary for its children  {}
   *   In this implementation Elements of type <name>:<simple value> are not used/considered category (are simply ignored) intentionally
   *   as -) creates inconsistency, -) can be used for presenting attributes or other category information 
   *  (in addition to the name and subcategories), not implemented here
   ------------------------------------------------------------------------
   */
  buildDataTree(obj: {[key: string]: any}, level: number): TreeNode[] {

    return Object.keys(obj).reduce<TreeNode[]>((accumulator, key) => {
      const value = obj[key];
      if (value != null) {
        if (typeof value === 'object') {
            const node = new TreeNode();
            node.name = key;      
            node.assignchildren(this.buildDataTree(value, level + 1));
            return accumulator.concat(node);
        }
      }

      return accumulator;
    }, []);

  }//---  TreeData:: buildDataTree ---------

 

//==============================================
insertItem(parent: TreeNode, name: string) {
    var newnode=new TreeNode()  ;
    newnode.name=name;
    parent.addChild(newnode);
    this.dataChange.next(this.data);  
}//---  TreeData:: insertItem ------------


cancelNew(parent: TreeNode) {

  parent.deleteEmptyChildren();
  this.dataChange.next(this.data);
      
}//---  TreeData:: cancelNew  ---

hasNode(parent:TreeNode, name:string)
{
  return parent.hasNode(name);
}

updateItem(parent: TreeNode, node: TreeNode, name: string) {

  if (!name||name==='')
    {
      this.cancelNew(parent);
      return;
    }
    parent.updateNewNode(node, name);

    this.dataChange.next(this.data);

    parent.deleteChildren('.'); 
    this.dataChange.next(this.data); 

  }//--- TreeData:: updateItem ----- 


}//-------   end class  FileDatabase -------------------------
//============================================================

