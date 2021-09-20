import {Component, Input, OnInit} from '@angular/core';
import {ElementData, ElementOnGrid, ElementSize} from '../shared/resizable-element/dtos';
import {FieldDto, group, GroupDto} from './mockData';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent implements OnInit {

  @Input() item!: GroupDto;
  @Input() group!: FieldDto[];
  
  shadow = {} as ElementOnGrid;

  columns = 4;
  rows = group.length - 1;
  gridGapsWidth = (this.columns - 1) * 4;
  gridGaspsHeight = (this.rows - 1) * 4;
  gridCellWidth = (window.innerWidth - this.gridGapsWidth) / this.columns;
  gridCellHeight = 100;
  shadowWidth!: number;
  shadowHeight!: number;

  isDragActive!: boolean;

  ngOnInit(): void {
    console.log('group', this.item, 'fields', this.group);
  }

  setElementSize(elementSize: ElementSize, i: number): void {
    if (elementSize.width) {
      const compare = Math.ceil(elementSize.width / this.gridCellWidth) + 1;
      this.group[i].designSettings.position.columnEnd = compare + this.group[i].designSettings.position.columnStart - 1;
    }

    if (elementSize.height) {
      const compare = Math.ceil(elementSize.height / this.gridCellHeight) + 1;
      this.group[i].designSettings.position.rowEnd = compare + this.group[i].designSettings.position.rowStart - 1;
    }
  }

  drag(data: ElementData, index: number): void {
    this.isDragActive = true;
    this.setShadeX(data.left, index);
    this.setShadeY(data.top, index);
  }

  drop(element: ElementData, index: number): void {
    this.isDragActive = false;
    this.setElementX(element.left, index);
    this.setElementY(element.top, index);
  }

  private setElementX(xPos: number, i: number): void {
    const elementWidth = this.getSelectedElementWidth(i);
    this.group[i].designSettings.position.columnStart = this.calcColumnStart(xPos, elementWidth);
    this.group[i].designSettings.position.columnEnd = this.calcColumnEnd(xPos, elementWidth);
  }

  private setElementY(yPos: number, i: number): void {
    const elementHeight = this.getSelectedElementHeight(i);
    this.group[i].designSettings.position.rowStart = this.calcRowStart(yPos, elementHeight);
    this.group[i].designSettings.position.rowEnd = this.calcRowEnd(yPos, elementHeight);
  }

  private setShadeX(xPos: number, i: number): void {
    this.shadowWidth = this.getSelectedElementWidth(i);
    this.shadow.columnStart = this.calcColumnStart(xPos, this.shadowWidth);
    this.shadow.columnEnd = this.calcColumnEnd(xPos, this.shadowWidth);
  }

  private setShadeY(yPos: number, i: number): void {
    this.shadowHeight = this.getSelectedElementHeight(i);
    this.shadow.rowStart = this.calcRowStart(yPos, this.shadowHeight);
    this.shadow.rowEnd = this.calcRowEnd(yPos, this.shadowHeight);
  }

  private getSelectedElementWidth(i: number): number {
    const occupiedColumns = this.group[i].designSettings.position.columnEnd - this.group[i].designSettings.position.columnStart;
    return (occupiedColumns ? occupiedColumns : 1) * this.gridCellWidth;
  }

  private getSelectedElementHeight(i: number): number {
    const occupiedRows = this.group[i].designSettings.position.rowEnd - this.group[i].designSettings.position.rowStart;
    return (occupiedRows ? occupiedRows : 1) * this.gridCellHeight;
  }

  private calcColumnStart(xPos: number, width: number): number {
    return Math.ceil((xPos + (width / 3)) / this.gridCellWidth);
  }

  private calcColumnEnd(xPos: number, width: number): number {
    return Math.ceil((xPos + this.shadowWidth + (width / 3)) / this.gridCellWidth);
  }

  private calcRowStart(yPos: number, height: number): number {
    return Math.ceil((yPos + (height / 2)) / this.gridCellHeight);
  }

  private calcRowEnd(yPos: number, height: number): number {
    return Math.ceil((yPos + height + (height / 2)) / this.gridCellHeight);
  }

  get groupArea(): string[] {
    return this.group.map(el => `${el.designSettings.position.rowStart} / ${el.designSettings.position.columnStart} / ${el.designSettings.position.rowEnd} / ${el.designSettings.position.columnEnd}`);
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
