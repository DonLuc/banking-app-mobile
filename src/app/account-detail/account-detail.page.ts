import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountsService } from '../services/accounts.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})
export class AccountDetailPage implements OnInit {
  accountToQuery: string = ""
  account: any = {}
  constructor(
    private clientService: ClientService,
    private alertController: AlertController,
    private accountService: AccountsService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((data) => {
      this.accountToQuery = data["accountNumber"]
    });
    this.getAccountDetails();
  }

  getAccountDetails() {
    this.accountService.getAccounts()
    .subscribe((data) => {
      if (data["ok"]) {
          for (var x = 0; x < data["accounts"]["accounts"].length; x++) {
            if (data["accounts"]["accounts"][x]["account"] === this.accountToQuery) {
              this.account = data["accounts"]["accounts"][x]
              break;
            }
          }
      }
    });
    
  }

  deposit() {
    this.presentInputAlert("How much would you like to deposit?", "Deposit");
  }

  withdraw() {
    this.presentInputAlert("How much would you like to withdraw?", "Withdraw");    
  }

  presentInputAlert(message: string, header: string) {
    this.alertController.create({
      header: header,
      message: message,
      inputs: [
        {
          name: "Amount",
          placeholder: "R0",
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: (data: any) => {
            console.log("Cancelled")
          }
        },
        {
          text: "Done",
          handler: (data: any) => {
            if (header.toLowerCase() === "withdraw") {
              this.accountService.withdraw(this.accountToQuery, Number(data["Amount"])).subscribe((data) => {
                
                if (data["ok"]) {
                  this.presentAlert("Enjoy the funds.", "Withdraw")
                  this.getAccountDetails()
                  console.log(JSON.stringify(data));
                } else {
                  this.presentAlert(data["message"] , "Withdraw")
                }
              }) ;
            } else if (header.toLowerCase() === "deposit") {
              this.accountService.deposit(this.accountToQuery, Number(data["Amount"])).subscribe((data) => {
                this.getAccountDetails()
              });
            }
          }
        }
      ]
    }).then((res) => {
      res.present()
    })
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
