import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppBase } from '../../../app-base.component';
import { UiToasterService } from '../../core/services/toaster.service';
import { ContextService } from '../../core/services/context.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class CheckoutComponent extends AppBase implements OnInit {
  addresses: any = [];
  @ViewChild('modalContent') modalContent: TemplateRef<any> | undefined;
  subTotal: any;
  selectedBillingAddress: any;
  selectedPaymentMethod: any;
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
  constructor(
    private ApiService: ApiService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toaster: UiToasterService,
    private cdr: ChangeDetectorRef,
    public contextService: ContextService
  ) { super(); }

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
      defaultAddress: [false]
    });
    await this.fetchAddres();

  }

  async fetchAddres() {
    await this.ApiService.fetchAddress().then((res) => {
      this.addresses = res
    })
  }

  async getCart() {
    await this.ApiService.getCartProducts().then((res) => {
      this.contextService.cart.set(res)
      this.cdr.detectChanges();
    })
  }

  openModalToAdd() {
    this.modalService.open(this.modalContent, { centered: true, backdrop: 'static', keyboard: false, size: 'lg' });
  }

  closeModal() {
    this.form.reset();
    this.modalService.dismissAll()
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
      await this.ApiService.saveAddress(value).then(async (res) => {
        this.toaster.Success('Address Added Successfully');
      })
      await this.fetchAddres()
      this.closeModal();
    } else { this.validateForm(); }

  }

  calculateSubTotal(cart: any) {
    let itemsTotal = 0;
    cart?.data?.map((item: any) => {
      itemsTotal += item?.quantity * item?.product?.price
    })
    this.subTotal = itemsTotal;
    return itemsTotal
  }

  async placeOrder() {
    if (this.selectedBillingAddress && this.selectedPaymentMethod) {
      debugger;
      const value = {
        cart: this.contextService.cart(),
        user: this.contextService.user()?.id
      }
      console.log(value)
      if (this.contextService.cart()?.data.length > 0 && this.contextService.user()?.id) {
        if (this.selectedPaymentMethod === 'cod') {
          const payload = {
            user_id: this.contextService.user()?.id,
            items: this.contextService.cart()?.data?.map((product: any) => {
              return { item_id: product?.product?.id, name: product?.product?.name, quantity: product?.quantity, price: product?.product?.price }
            }),
            total_amount: this.subTotal,
            delivery_address: this.selectedBillingAddress,
            payment_method: this.selectedPaymentMethod,
            status: 'active'
          }

          await this.ApiService.placeOrder(payload).then(async (res) => {
            if (res) {
              this.toaster.Success('Order Placed Succesfully')
            }
          })
        } else {
          const payload = {
            user_id: this.contextService.user()?.id,
            items: this.contextService.cart()?.data?.map((product: any) => {
              return { item_id: product?.product?.id, name: product?.product?.name, quantity: product?.quantity, price: product?.product?.price }
            }),
            amount: this.subTotal,
            delivery_address: this.selectedBillingAddress,
            payment_method: this.selectedPaymentMethod,
            status: 'active'
          }

          await this.ApiService.placeOrderOnline(payload).then(async (res) => {
            if (res) {
              this.toaster.Success('Order Placed Succesfully')
            }
          })
        }
      }
    } else {
      this.toaster.Warning('Please select delivery address and Payment method to proceed.');
    }
  }

}
