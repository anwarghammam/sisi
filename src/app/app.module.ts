import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgChartjsModule } from 'ng-chartjs';
import { AlertsComponent } from './alerts/alerts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { ConstraintsComponent } from './constraints/constraints.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { ExectimeComponent } from './exectime/exectime.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  imports: [
   
    GoogleChartsModule,
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    SidebarModule,
    AppRoutingModule,
    NgChartjsModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AlertsComponent,
    VisualizerComponent,
    ConstraintsComponent,
    ObjectivesComponent,
    ExectimeComponent,
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }