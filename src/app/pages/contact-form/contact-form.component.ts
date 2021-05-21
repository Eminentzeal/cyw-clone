import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  phone: FormControl = new FormControl("", [Validators.required, Validators.pattern('[- +()0-9]+')])
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  category: FormControl= new FormControl("", [Validators.required]);
  message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
  honeypot: FormControl = new FormControl("") // To prevent spams
  submitted: boolean = false; // show hide success message
  isLoading: boolean = false; //disable the submit button if we're loading
  responseMessage!: string; //the response message to show to the user
 //the response message to show to the user

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      name: this.name,
      phone: this.phone,
      email: this.email,
      message: this.message,
      category: this.category,
      honepot: this.honeypot

    });
   }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.form.status == "VALID" && this.honeypot.value==""){
      this.form.disable(); // disable the form if it's valid to disable multiple submissions.
      const formData: any = new FormData();
      formData.append("name", this.form.get("name")?.value);
      formData.append("phone", this.form.get("phone")?.value);
      formData.append("email", this.form.get("email")?.value);
      formData.append("message", this.form.get("message")?.value);
      formData.append("category", this.form.get("category")?.value);
      this.isLoading = true; //sending the post request async so it's in progress
      this.submitted = false; // hid the response message on multiple submits
     
      this.http.post("API end point", formData).subscribe(
        (response) =>{
          //choose the response message to display
          // if(response["result"]=="success")
          if(response == "success"){
            this.responseMessage = "Thanks for the message! Our Team will get back to you soonest!";
          }else{
            this.responseMessage = "Oops! Something wrong ... Reload the page and try again.";
          }
          this.form.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(response);
        },
        (error) =>{
          this.responseMessage = "Oops! A server error occured... Reload the page and try again.";
          this.form.enable();
          this.submitted = true;
          this.isLoading = false;
          console.log(error);
        }
      );
    }
  }

}
