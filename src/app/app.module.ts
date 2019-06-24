import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { DataTreeViewComponent } from './data-tree-view/data-tree-view.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CdkTreeModule} from '@angular/cdk/tree';
import { MatTreeModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule } from  '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavComponent,
    ContactComponent,
    HomeComponent,
    
    DataTreeViewComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    ReactiveFormsModule,
    CdkTreeModule,
    MatTreeModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
