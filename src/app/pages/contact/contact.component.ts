
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';


import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  FormData!: FormGroup;

  constructor(private builder: FormBuilder, private contact: ContactService) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),

      Email: new FormControl('', 
      [Validators.required]),
        Comment: new FormControl('', [Validators.required])
    })
  }

  onSubmit(FormData: any){
    console.log(FormData)
    this.contact.PostMessage(FormData).subscribe(response=>{
      location.href='https://mailthis.to/aop08072595114@gmail.com'
      console.log(response)
    }, error =>{
      console.warn(error.responseText)
      console.log({error})
    })
  }

}
