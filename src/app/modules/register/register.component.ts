import {AfterViewInit, Component, ElementRef} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import {UserService} from "../../services/user.services";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements AfterViewInit{
  isLoading: boolean = false;
  userFormGroup = new FormGroup({
    names: new FormControl('',[Validators.required, Validators.minLength(2)]),
    username: new FormControl('',[Validators.required, Validators.minLength(2)]),
    password: new FormControl('',[Validators.required, Validators.minLength(2)]),
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
          this.route.navigate(['/home']);
          this.isLoading=false;
        }
      );
    }

  }
}
