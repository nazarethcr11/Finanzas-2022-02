import {AfterViewInit, Component, ElementRef} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})

export class RegisterComponent implements AfterViewInit{
  isLoading: boolean = false;
  userFormGroup = new FormGroup({
    names: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    username: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
    password: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
  });

  constructor(private route: Router, private elementRef: ElementRef, private userService: UserService) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#e0ecf4';
  }

  register(){
    if(this.userFormGroup.valid) {
      this.isLoading = true;
      this.userService.create(this.userFormGroup.value).subscribe(
        (response) => {
          this.isLoading = false;
          this.route.navigate(['/login']);
        }
      );
    }

  }
}
