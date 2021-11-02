import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountsService } from '../services/accounts.service';
import { SpinLoadingService } from '../spin-loading.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  client: any = {}
  accounts: any[] = []
  constructor(private alertController: AlertController, 
    private loadingService: SpinLoadingService,
    private route: Router
    ) { }

  ngOnInit() {
    this.presentAlert("Click on an account for a detailed balance and to perform other operations", "Account")
    this.getClient()
    this.loadingService.presentLoading()
  }

  getClient() {
    if (localStorage.getItem("data_client")  !== undefined) {
      this.client = JSON.parse(localStorage.getItem("data_client"))
      this.accounts = this.client["client"]["accounts"]
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

  gotoAccountDetail (accountNumber: string) {
      alert(accountNumber)
      this.route.navigate(["/account-detail"], {queryParams: {accountNumber: accountNumber}})
  }
}
