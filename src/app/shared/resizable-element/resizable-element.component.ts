import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

export interface ElData {
  left: number;
  top: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-resizable-element',
  templateUrl: './resizable-element.component.html',
  styleUrls: ['./resizable-element.component.scss']
})

export class ResizableElementComponent implements AfterViewInit {

  @Input('data') public data!: ElData;
  @Output() resizeEmitter = new EventEmitter<void>();

  private boxPosition!: { left: number, top: number };
  private containerPos!: { left: number, top: number, right: number, bottom: number };
  public mouse!: { x: number, y: number };
  public status: Status = Status.OFF;
  private mouseClick!: { x: number, y: number, left: number, top: number };

  @ViewChild('box') public box!: ElementRef;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouse = {x: event.clientX, y: event.clientY};

    if (this.status === Status.RESIZE) {
      this.resize();
    } else if (this.status === Status.MOVE) {
      this.move();
    }
  }

  ngAfterViewInit(): void {
    this.loadBox();
    this.loadContainer();
  }

  private loadBox(): void {
    const {left, top} = this.box.nativeElement.getBoundingClientRect();
    this.boxPosition = {left, top};
  }

  private loadContainer(): void {
    const left = this.boxPosition.left - this.data.left;
    const top = this.boxPosition.top - this.data.top;
    const right = left + 600;
    const bottom = top + 450;
    this.containerPos = {left, top, right, bottom};
  }

  setStatus(event: MouseEvent, status: number): void {
    if (status === 1) {
      event.stopPropagation();
    } else if (status === 2) {
      this.mouseClick = {x: event.clientX, y: event.clientY, left: this.data.left, top: this.data.top};
    } else {
      this.loadBox();
    }
    this.status = status;
  }

  private resize(): void {
    this.data.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
    this.resizeEmitter.emit();
  }

  private move(): void {
    this.data.left = this.mouseClick.left + (this.mouse.x - this.mouseClick.x);
    this.data.top = this.mouseClick.top + (this.mouse.y - this.mouseClick.y);
  }
}
