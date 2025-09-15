import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['./range-input.component.scss']
})
export class RangeInputComponent {
  @Input() Point1: number = 1;
  @Input() Point2: number = 10;
  @Input() min: number = 1;
  @Input() max: number = 10;
  @Input() Range_Title: string = 'Range : ';

  @Output() point1Change = new EventEmitter<number>();
  @Output() point2Change = new EventEmitter<number>();

  @ViewChild('fakeBar') fakeBar!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.updateFakeBar();
  }

  onStartChange(): void {
    if (this.Point1 > this.Point2) this.Point2 = this.Point1;
    this.point1Change.emit(this.Point1);
    this.point2Change.emit(this.Point2);
    this.updateFakeBar();
  }

  onEndChange(): void {
    if (this.Point2 < this.Point1) this.Point1 = this.Point2;
    this.point1Change.emit(this.Point1);
    this.point2Change.emit(this.Point2);
    this.updateFakeBar();
  }

  updateFakeBar(): void {
    const startPercent = ((this.Point1 - this.min) / (this.max - this.min)) * 100 + '%';
    const endPercent = ((this.Point2 - this.min) / (this.max - this.min)) * 100 + '%';
    const el = this.fakeBar.nativeElement;

    el.style.setProperty('--start-percent', startPercent);
    el.style.setProperty('--end-percent', endPercent);
  }
}
