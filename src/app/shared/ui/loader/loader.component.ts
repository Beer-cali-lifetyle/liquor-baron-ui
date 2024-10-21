import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiLoaderService } from '../../../core/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  loading: boolean = false;
  loadingSubcription: Subscription = new Subscription;

  constructor(private loaderService: UiLoaderService) { }
  ngOnInit(): void {
    this.loadingSubcription = this.loaderService.onLoad().subscribe((status: any) => {

      this.loading = status;
    });

  }
}
