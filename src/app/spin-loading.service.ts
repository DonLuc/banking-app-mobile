import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinLoadingService {
  isLoading = false;
  constructor(private loadingController: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'Please wait...'
    }).then((loader) => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss().then(() => {
            console.log('dismissed')
          })
        }
      })
    })
  }

  async dismiss() {
    this.isLoading = false
    return await this.loadingController.dismiss().then(() => console.log('dismissed'))
  }
}
