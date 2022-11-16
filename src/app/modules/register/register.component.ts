import {AfterViewInit, Component, ElementRef} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})

export class RegisterComponent implements AfterViewInit{
  isLoading: boolean = false;
  userAvatar: string = "ghost";
  userFormGroup = new FormGroup({
    names: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    username: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    password: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
  });

  constructor(private route: Router, private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#e0ecf4';
  }

  register(){
    if(this.userFormGroup.valid) {
      this.isLoading = true;
    }

  }
}
