
import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';


import {TreeData, TreeNode} from './tree-data.model';

//===============================================================
@Component({
  selector: 'app-data-tree-view',
  templateUrl: './data-tree-view.component.html',
  styleUrls: ['./data-tree-view.component.scss'],
  providers: [TreeData]
})
export class DataTreeViewComponent implements OnInit, OnDestroy {  
  nestedTreeControl: NestedTreeControl<TreeNode>;
  nestedDataSource: MatTreeNestedDataSource<TreeNode>;

  constructor(private datamodel: TreeData) {
    
    this.nestedTreeControl = new NestedTreeControl<TreeNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    datamodel.dataChange.subscribe(data => {
      this.nestedDataSource.data = data;
    } );
 
  }//--- constructor ---

  //--------------------------------
  ngOnInit(){
    this.rootNode=this.datamodel.data[0];
    this.nestedTreeControl.expand(this.rootNode);
  }//--- ngOnInit() ----

  ngOnDestroy(){
  }

//=============================

  private _getChildren = (node: TreeNode) => node.childrenChange;  

  hasNestedChild = (_: number, nodeData: TreeNode) => ( !!nodeData.children && nodeData.children.length>0) ;
  
  hasNoContent = (_: number, node: TreeNode) => node.name === '';    

  bTrueNode = (node: TreeNode) => !(node.name===".");
  bHasTrueKid = (node:TreeNode) => (node.children.length>1);

//------------------------------  
  bAddInProgress=false;
  currentNode: TreeNode;  //keeps the node, for which "add new" has been initiated
  rootNode: TreeNode;
//============================================================
 
//we can easily do node.name in the template, but this way the data model and presentation template are more decoupled
getNodeName(node: TreeNode): string {
    return node.name;
}

addNewItem(node: TreeNode) {

  //see if there is already initiated and abandoned addnew process somewhere else; if so, cancel it first
  if (this.bAddInProgress==true)
      this.datamodel.cancelNew(this.currentNode);

  this.bAddInProgress=true;      
  this.currentNode = node;     

  this.datamodel.insertItem(node, '');

  this.nestedTreeControl.expand(node);
 
}//--- addNewItem -----

//---------------------------------
saveNode(node: TreeNode, itemValue: string) {

  var newname : string = itemValue.trim();

  //this is if we don't want kids with duplicate names:
  //check if we already have a child node with suchname; if so, scream and cancel
  if (newname!=='' && this.datamodel.hasNode(this.currentNode, newname))
  {
      var msg = "Sorry for the low-tech message box, but :\n\n";
      msg += ("Node  '" +   this.currentNode.name + "'  already has item  '" + newname +"' !");
      alert(msg);

      this.cancelNew(node, newname);
      return;
  }//end  if the new name is a dup ----

  
  this.datamodel.updateItem(this.currentNode, node, newname);       

  this.bAddInProgress=false;

}//--- saveNode ------------


cancelNew(node: TreeNode, itemValue: string) { 

    this.datamodel.cancelNew(this.currentNode);

    this.bAddInProgress=false;

}//--- cancelNew ---
//-------------------------------------
 
//todo  remove? collapse all instead of expaning them
  expandAll() {
    this.nestedTreeControl.expandAll();
  } //--- expandAll ---

}//=====  end DataTreeViewComponent  class ===============
  

