import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AppBase } from '../../../../app-base.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../shared/services/api.service';
import { UiToasterService } from '../../../core/services/toaster.service';
import { OrdersComponent } from '../orders/orders.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [CommonModule, OrdersComponent, WishlistComponent, NgbModule, ReactiveFormsModule, FormsModule]
})
export class MainComponent extends AppBase implements OnInit {
  @ViewChild('addressModal', { static: true }) addressModal!: TemplateRef<any>;
  address: any;
  USStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana",
    "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];
  public editId: any = null;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private ApiService: ApiService,
    private toaster: UiToasterService,
    private modalService: NgbModal
  ) { super() }


  activeTab = 1;

  setActiveTab(tab: number) {
    this.activeTab = tab;
  }

  async ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      pinCode: ['', Validators.required],
      address: ['', Validators.required],
      locality: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      landmark: [''],
      altPhoneNumber: ['', Validators.pattern(/^\+?[1-9]\d{1,14}$/)],
      defaultAddress: [true]
    });
    await this.fetchAddres();
  }

  openModal(content: any) {
    const modalRef: NgbModalRef = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });

  }

  closeModal() {
    this.form.reset();
    this.modalService.dismissAll()
  }

  async receiveData(item: any) {
    this.address = item;
    this.form.patchValue({
      fullName: item?.full_name,
      mobileNumber: item?.mobile_number,
      pinCode: item?.pin_code,
      address: item?.address,
      locality: item?.locality,
      city: item?.city,
      state: item?.state,
      landmark: item?.landmark,
      altPhoneNumber: item?.alternate_phone_number,
      defaultAddress: item?.is_default == 1 ? true : false
    })
  }

  async fetchAddres() {
    await this.ApiService.fetchAddress().then((res) => {
      this.address = res
      // debugger;
      // res?.map((item: any) => {
      //   if (item?.is_default) {
      //     this.receiveData(item);
      //   }
      // })
    })
  }

  async onSubmit() {
    if (this.form.valid) {
      const value = {
        full_name: this.form.value.fullName,
        mobile_number: this.form.value.mobileNumber,
        pin_code: this.form.value.pinCode,
        address: this.form.value.address,
        locality: this.form.value.locality,
        city: this.form.value.city,
        state: this.form.value.state,
        landmark: this.form.value.landmark,
        alternate_phone_number: this.form.value.altPhoneNumber,
        is_default: this.form.value.defaultAddress ? 1 : 0
      }
      if (this.editId) {
        await this.ApiService.editAddress(value, this.editId).then(async (res) => {
          this.toaster.Success('Address updated Successfully');
        })
      } else {
        await this.ApiService.saveAddress(value).then(async (res) => {
          this.toaster.Success('Address Added Successfully');
        })
      }
      await this.fetchAddres()
      this.closeModal();
    } else { this.validateForm(); }

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/sign-in']);
  }

  async editMode(item: any) {
    this.editId = item?.id;
    this.form.patchValue({
      fullName: item?.full_name,
      mobileNumber: item?.mobile_number,
      pinCode: item?.pin_code,
      address: item?.address,
      locality: item?.locality,
      city: item?.city,
      state: item?.state,
      landmark: item?.landmark,
      altPhoneNumber: item?.alternate_phone_number,
      defaultAddress: item?.is_default == 1 ? true : false
    })
    this.openModal(this.addressModal);
  }

  async deleteAddress(id: any) {
    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure you want to delete this address?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-yellow',
        cancelButton: 'btn btn-secondary'
      },
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await this.ApiService.deletAddress(id).then(async (res) => {
          this.toaster.Remove('Deleted SUccessfully');
          await this.fetchAddres();
        })
      }
    });

  }

}