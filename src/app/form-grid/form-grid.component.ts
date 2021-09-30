import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DisplayGroupDto, FieldDisplaySettings} from '../group/mockData';
import {ElementData, ElementOnGrid, ElementSize} from '../shared/resizable-element/dtos';

@Component({
  selector: 'app-form-grid',
  templateUrl: './form-grid.component.html',
  styleUrls: ['./form-grid.component.scss']
})
export class FormGridComponent implements OnInit, AfterViewInit {

  @Input() elements!: Partial<DisplayGroupDto & FieldDisplaySettings>[];
  @Input() gridContainerWidth!: number;

  @Output() fieldEmitter = new EventEmitter<Partial<DisplayGroupDto & FieldDisplaySettings>>();
  @ViewChild('grid') public grid!: ElementRef;

  gridTopPosition!: number;
  shadow = {} as ElementOnGrid;
  columns = 8;
  rows!: number;
  gapSize = 16;
  gridGapsWidth = (this.columns - 1) * this.gapSize;
  gridGaspsHeight!: number;
  gridCellWidth: number;
  gridCellHeight = 100;
  shadowWidth!: number;
  shadowHeight!: number;

  isDragActive!: boolean;

  ngOnInit(): void {
    this.gridGaspsHeight = (this.rows - 1) * this.gapSize;
    this.gridCellWidth = (this.gridContainerWidth - this.gridGapsWidth) / this.columns;
    const additionalRows: number[] = [];

    this.elements.forEach(el => {
      const elementRows = el.position.rowEnd - el.position.rowStart;
      additionalRows.push(elementRows + (elementRows === 0 ? 1 : 0));
    });
    this.rows = additionalRows.reduce((a, b) => a + b, 0);
  }

  ngAfterViewInit(): void {
    this.gridTopPosition = this.grid.nativeElement.getBoundingClientRect().top;
  }

  setElementSize(elementSize: ElementSize, i: number): void {
    if (elementSize.width) {
      const compare = Math.ceil(elementSize.width / this.gridCellWidth) + 1;
      this.elements[i].position.columnEnd = compare + this.elements[i].position.columnStart - 1;
    }

    if (elementSize.height) {
      const compare = Math.ceil(elementSize.height / this.gridCellHeight) + 1;
      this.elements[i].position.rowEnd = compare + this.elements[i].position.rowStart - 1;
    }

    this.fieldEmitter.emit(this.elements[i]);
  }


  drag(data: ElementData, i: number): void {
    this.isDragActive = true;
    this.setShadeX(data.left, i);
    this.setShadeY(data.top, i);
  }

  drop(element: ElementData, i: number): void {
    this.isDragActive = false;
    this.setElementX(element.left, i);
    this.setElementY(element.top, i);

    this.fieldEmitter.emit(this.elements[i]);
  }

  private setElementX(xPos: number, i: number): void {
    const elementWidth = this.getSelectedElementWidth(i);
    this.elements[i].position.columnStart = this.calcColumnStart(xPos);
    this.elements[i].position.columnEnd = this.calcColumnEnd(xPos);
  }

  private setElementY(yPos: number, i: number): void {
    const elementHeight = this.getSelectedElementHeight(i);
    this.elements[i].position.rowStart = this.calcRowStart(yPos, elementHeight);
    this.elements[i].position.rowEnd = this.calcRowEnd(yPos, elementHeight);
  }

  private setShadeX(xPos: number, i: number): void {
    this.shadowWidth = this.getSelectedElementWidth(i);
    this.shadow.columnStart = this.calcColumnStart(xPos);
    this.shadow.columnEnd = this.calcColumnEnd(xPos);
  }

  private setShadeY(yPos: number, i: number): void {
    this.shadowHeight = this.getSelectedElementHeight(i);
    this.shadow.rowStart = this.calcRowStart(yPos, this.shadowHeight);
    this.shadow.rowEnd = this.calcRowEnd(yPos, this.shadowHeight);
  }

  private getSelectedElementWidth(i: number): number {
    const occupiedColumns = this.elements[i].position.columnEnd - this.elements[i].position.columnStart;
    return (occupiedColumns ? occupiedColumns : 1) * this.gridCellWidth;
  }

  private getSelectedElementHeight(i: number): number {
    const occupiedRows = this.elements[i].position.rowEnd - this.elements[i].position.rowStart;
    return (occupiedRows ? occupiedRows : 1) * this.gridCellHeight;
  }

  private calcColumnStart(xPos: number): number {
    return Math.ceil(xPos / this.gridCellWidth);
  }

  private calcColumnEnd(xPos: number): number {
    return Math.ceil((xPos + this.shadowWidth) / this.gridCellWidth);
  }

  private calcRowStart(yPos: number, height: number): number {
    return Math.ceil((yPos - this.gridTopPosition + (height / 2)) / this.gridCellHeight);
  }

  private calcRowEnd(yPos: number, height: number): number {
    return Math.ceil((yPos - this.gridTopPosition + height + (height / 2)) / this.gridCellHeight);
  }

  get groupArea(): string[] {
    return this.elements.map(el => `${el.position.rowStart} / ${el.position.columnStart} / ${el.position.rowEnd} / ${el.position.columnEnd}`);
  }

  get templateColumns(): string {
    return `repeat(${this.columns}, ${this.gridCellWidth}px)`;
  }

  get templateRows(): string {
    return `repeat(${this.rows}, ${this.gridCellHeight}px)`;
  }

  get dragShadeArea(): string {
    return `${this.shadow.rowStart} / ${this.shadow.columnStart} / ${this.shadow.rowEnd} / ${this.shadow.columnEnd}`;
  }
}
