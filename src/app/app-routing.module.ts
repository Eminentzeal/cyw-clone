
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './pages/contact/contact.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProgramsComponent } from './pages/programs/programs.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'contact-us', component: ContactFormComponent },
  { path: 'home', component: HomeComponent },
    
  // otherwise redirect to home
  {path: '', redirectTo: '', pathMatch: 'full'},

    // page not found
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
