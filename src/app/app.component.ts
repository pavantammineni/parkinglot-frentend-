import { LotService } from './services/lot-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public vehicleForm: FormGroup;
  parkings = null;
  errorAlert = null;
  error_message: string = null;
  lotDetails = null;

  lot = null;
  parkingAmount = null;
  parkingDuration = null;
  vehicleNumber = null;

  lotCtrl: FormControl;
  parkingAmountCtrl: FormControl;
  parkingDurationCtrl: FormControl;
  vehicleNumberCtrl: FormControl;

  constructor(
    private lotService: LotService,
    public formBuilder: FormBuilder
  ) {
    this.error_message = 'Please enter valid details.';

    this.lotCtrl = this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]*[0-9]$')]);
    this.parkingAmountCtrl = this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]*[0-9]$')]);
    this.parkingDurationCtrl = this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]*[0-9]$')]);
    this.vehicleNumberCtrl = this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]*[0-9]$')]);

    this.vehicleForm = this.formBuilder.group({
      lot: this.lotCtrl,
      parkingAmount: this.parkingAmountCtrl,
      parkingDuration: this.parkingDurationCtrl,
      vehicleNumber: this.vehicleNumberCtrl
    });
  }

  ngOnInit() {
    this.getAllLots();
  }

  calculateAmount(amount) {
    if (this.parkingDuration <= 30) {
      this.parkingAmount = 20;
    } else {
      this.parkingAmount = Math.floor(((this.parkingDuration / 60)) + 1) * 30;
    }
  }

  onSubmit() {
    this.lotDetails = {
      lot: this.lot,
      parkingAmount: this.parkingAmount,
      parkingDuration: this.parkingDuration,
      vehicleNumber: this.vehicleNumber
    };

    this.lotService.addLot(this.lotDetails).subscribe(
      response => {
        console.log('response from server is: ' + response);
        alert('Parking saved successfully.');
        this.parkings = response;
      },
      error => {
        console.log('Error from server is: ' + error);
      }
    );

  }

  getAllLots() {
    this.lotService.getAllLots().subscribe(
      res => {
        console.log('response from server is: ' + res);
        this.parkings = res;
      },
      err => {
        console.log('Error from server is: ' + err);
      });
  }

  getLotInfo(lotId) {
    this.lotService.getLotInfo(lotId).subscribe(
      res => {
        console.log('response from server is: ' + res);
      },
      err => {
        console.log('Error from server is: ' + err);
      }
    );
  }
}
