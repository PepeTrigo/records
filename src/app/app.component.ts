import { Component, OnInit } from '@angular/core';
import { RecordsService } from './services/records.service';
import { Observable } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  recordsByGenre$: Observable<any[]> | undefined;
  cart: any[] = [];

  constructor(
    private recordService: RecordsService,
    private liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.recordsByGenre$ = this.recordService.getRecords();
  }

  addToCart(item: any) {
    const cartUpdated = `The record ${item.title} by ${item.artist} has been added to your cart`;
    this.cart.push(item);
    // this.liveAnnouncer.announce(cartUpdated);
  }
}
