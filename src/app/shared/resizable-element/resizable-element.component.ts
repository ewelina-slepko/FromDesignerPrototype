import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AxisCoordinates, ElementData, ElementPosition, ElementSize, MousePosition, Status} from './dtos';

@Component({
  selector: 'app-resizable-element',
  templateUrl: './resizable-element.component.html',
  styleUrls: ['./resizable-element.component.scss']
})

export class ResizableElementComponent implements AfterViewInit {

  @Input() templateColumns!: string;
  @Input() cellWidth!: number;
  @Input() cellHeight!: number;

  @Output() resizeEmitter = new EventEmitter<ElementSize>();
  @Output() dragEmitter = new EventEmitter<ElementData>();
  @Output() dropEmitter = new EventEmitter<ElementData>();

  resizableElement = {width: this.cellWidth, height: this.cellHeight, left: 0, top: 0} as ElementData;

  private elementPosition!: ElementPosition;
  public status: Status = Status.OFF;

  public mousePosition!: AxisCoordinates;
  private mouseClick!: MousePosition;

  @ViewChild('resizableElementRef') public resizableElementRef!: ElementRef;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mousePosition = {x: event.clientX, y: event.clientY};

    if (this.status === Status.RESIZE) {
      this.resize();
      return;
    }

    if (this.status === Status.MOVE) {
      this.move();
      this.dragEmitter.emit(this.setLocation());
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(): void {

    if (!isNaN(this.resizableElement.width || this.resizableElement.height)) {
      const resizeData = {width: this.resizableElement.width, height: this.resizableElement.height} as ElementSize;
      this.resizeEmitter.emit(resizeData);
      return;
    }

    if (this.resizableElement.left || this.resizableElement.top) {
      this.dropEmitter.emit(this.setLocation());
    }
  }

  ngAfterViewInit(): void {
    this.loadElement();
    console.log(this.cellWidth, this.cellHeight);
  }

  private loadElement(): void {
    const {left, top} = this.resizableElementRef.nativeElement.getBoundingClientRect();
    this.elementPosition = {left, top} as ElementPosition;
  }

  setStatus(event: MouseEvent, status: number): void {
    this.status = status;

    if (status === 1) {
      event.stopPropagation();
      return;
    }

    if (status === 2) {
      this.mouseClick = {x: event.clientX, y: event.clientY, left: this.resizableElement.left, top: this.resizableElement.top};
      return;
    }

    this.loadElement();
  }

  private resize(): void {
    this.resizableElement.width = Number(this.mousePosition.x > this.elementPosition.left) ? this.mousePosition.x - this.elementPosition.left : 0;
    this.resizableElement.height = Number(this.mousePosition.y > this.elementPosition.top) ? this.mousePosition.y - this.elementPosition.top : 0;

    console.log(this.resizableElement);
  }

  private move(): void {
    this.resizableElement.left = this.mouseClick.left + (this.mousePosition.x - this.mouseClick.x);
    this.resizableElement.top = this.mouseClick.top + (this.mousePosition.y - this.mouseClick.y);
  }

  private setLocation(): ElementData {
    return {
      left: this.resizableElementRef.nativeElement.getBoundingClientRect().left,
      top: this.resizableElementRef.nativeElement.getBoundingClientRect().top
    } as ElementData;
  }
}
