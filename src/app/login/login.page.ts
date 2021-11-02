import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SpinLoadingService } from '../spin-loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  isLoading = false
  constructor(private loadingService: SpinLoadingService, 
    private alertController: AlertController, 
    private route: Router, private loadingController: LoadingController, 
    private formBuilder: FormBuilder, private clientService: ClientService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  signIn() {
    this.loadingService.presentLoading()
    if (this.loginForm.valid) {
      this.clientService.getClientByUsername(this.loginForm.get("username").value).subscribe((data) => {

        if (data["ok"]) {
          localStorage.setItem("data_client", JSON.stringify(data))
          this.route.navigate(["/accounts"])
        } else {
          this.presentAlert("Incorrect username, please provide the correct one.", "Sign In Error")
          this.loginForm.get("username").setValue("")
          this.loginForm.get("password").setValue("")
        }
        this.loadingService.dismiss();
      }, (error) => {
        this.loadingService.dismiss();
      }) 
    } 
  }

  async presentAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['Okay']
    });
    await alert.present();
  }
}
