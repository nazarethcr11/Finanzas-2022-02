import {AfterViewInit, Component, ElementRef} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [UserService]
})

export class HomeComponent implements AfterViewInit {
  isLoading: boolean = false;
  userFormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });
  constructor(private route: Router, private elementRef: ElementRef, private userService: UserService) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#e0ecf4';
  }

  login(){
    if(this.userFormGroup.valid) {
      this.isLoading = true;
      this.userService.authenticate(this.userFormGroup.get("username")?.value, this.userFormGroup.get("password")?.value).subscribe(
        (response) => {
          this.route.navigate(['/home_calculator']);
          this.isLoading=false;
        },
        (error) => {
          this.isLoading=false;
        }
      );
    }
  }
}
