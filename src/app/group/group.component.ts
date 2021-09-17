import {Component} from '@angular/core';
import {ElementData} from '../shared/resizable-element/dtos';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent {

  group = [
    {
      rowStart: 1,
      rowEnd: 1,
      columnStart: 1,
      columnEnd: 1,
      textarea: true,
    }, {
      rowStart: 1,
      rowEnd: 1,
      columnStart: 2,
      columnEnd: 2,
      textarea: false,
    }, {
      rowStart: 1,
      rowEnd: 1,
      columnStart: 3,
      columnEnd: 3,
      textarea: false,
    }, {
      rowStart: 1,
      rowEnd: 1,
      columnStart: 4,
      columnEnd: 4,
      textarea: true
    }
  ];

  dragShade = {
    rowStart: 1,
    rowEnd: 1,
    columnStart: 1,
    columnEnd: 1
  };

  columns = 4;

  gapsWidth = (this.columns - 1) * 4;
  cellWidth = (window.innerWidth - this.gapsWidth) / this.columns;
  cellHeight = 100;

  shadowWidth!: number;
  shadowHeight!: number;

  isDragging!: boolean;

  get groupArea(): string[] {
    return this.group.map(el => `${el.rowStart} / ${el.columnStart} / ${el.rowEnd} / ${el.columnEnd}`);
  }

  get templateColumns(): string {
    return `repeat(${this.columns}, ${this.cellWidth}px)`;
  }

  get dragShadeArea(): string {
    return `${this.dragShade.rowStart} / ${this.dragShade.columnStart} / ${this.dragShade.rowEnd} / ${this.dragShade.columnEnd}`;
  }

  isTextArea(i: number): boolean {
    return this.group[i].textarea;
  }

  changeSize(width: number, index: number): void {
    const compare = Math.ceil(width / this.cellWidth) + 1;
    this.group[index].columnEnd = compare + this.group[index].columnStart - 1;
  }

  drop(element: ElementData, index: number): void {
    this.setX(element.left, index);
    this.setY(element.top, index);

    this.isDragging = false;
  }

  setX(xPos: number, index: number): void {
    const cols = this.group[index].columnEnd - this.group[index].columnStart;
    const width = (cols ? cols : 1) * this.cellWidth;
    const xCenterVal = width / 3;
    this.group[index].columnStart = Math.ceil((xPos + xCenterVal) / this.cellWidth);
    this.group[index].columnEnd = Math.ceil((xPos + width + xCenterVal) / this.cellWidth);
  }

  setY(yPos: number, index: number): void {
    const rows = this.group[index].rowEnd - this.group[index].rowStart;
    const height = (rows ? rows : 1) * 100; //todo do dokładnego określenia wysokości komórki
    const yCenterVal = height / 2;
    this.group[index].rowStart = Math.ceil((yPos + yCenterVal) / 100);
    this.group[index].rowEnd = Math.ceil((yPos + height + yCenterVal) / 100);
  }

  drag(data: ElementData, index: number): void {
    this.isDragging = true;

    this.setShadeX(data.left, index);
    this.setShadeY(data.top, index);
  }

  setShadeX(xPos: number, index: number): void {
    const cols = this.group[index].columnEnd - this.group[index].columnStart;
    this.shadowWidth = (cols ? cols : 1) * this.cellWidth;
    const xCenterValue = this.shadowWidth / 3;
    this.dragShade.columnStart = Math.ceil((xPos + xCenterValue) / this.cellWidth);
    this.dragShade.columnEnd = Math.ceil((xPos + this.shadowWidth + xCenterValue) / this.cellWidth);
  }

  setShadeY(yPos: number, index: number): void {
    const rows = this.group[index].rowEnd - this.group[index].rowStart;
    const shadowHeight = (rows ? rows : 1) * 100;
    const yCenterVal = shadowHeight / 2;
    this.dragShade.rowStart = Math.ceil((yPos + yCenterVal) / 100);
    this.dragShade.rowEnd = Math.ceil((yPos + shadowHeight + yCenterVal) / 100);
  }
}
