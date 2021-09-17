import {Component} from '@angular/core';
import {ElData} from '../shared/resizable-element/resizable-element.component';

const columns = 4;
const gapsWidth = (columns - 1) * 4;
const cellWidth = (window.innerWidth - gapsWidth) / columns;


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

  isDragging!: boolean;
  shadowWidth!: number;
  dragShadowHeight!: number;

  get groupArea(): string[] {
    return this.group.map(el => `${el.rowStart} / ${el.columnStart} / ${el.rowEnd} / ${el.columnEnd}`);
  }

  get templateColumns(): string {
    return `repeat(${columns}, ${cellWidth}px)`;
  }

  get dragShadeArea(): string {
    return `${this.dragShade.rowStart} / ${this.dragShade.columnStart} / ${this.dragShade.rowEnd} / ${this.dragShade.columnEnd}`;
  }

  isTextArea(i: number): boolean {
    return this.group[i].textarea;
  }

  changeSize(width: number, index: number): void {
    const compare = Math.ceil(width / cellWidth) + 1;
    this.group[index].columnEnd = compare + this.group[index].columnStart - 1;
  }

  drop(element: ElData, index: number): void {
    this.setX(element.left, index);
    this.setY(element.top, index);

    this.isDragging = false;
  }

  setX(xPos: number, index: number): void {
    const cols = this.group[index].columnEnd - this.group[index].columnStart;
    const width = (cols ? cols : 1) * cellWidth;
    const xCenterVal = width / 3;
    this.group[index].columnStart = Math.ceil((xPos + xCenterVal) / cellWidth);
    this.group[index].columnEnd = Math.ceil((xPos + width + xCenterVal) / cellWidth);
  }

  setY(yPos: number, index: number): void {
    const rows = this.group[index].rowEnd - this.group[index].rowStart;
    const height = (rows ? rows : 1) * 100; //todo do dokładnego określenia wysokości komórki
    const yCenterVal = height / 2;
    this.group[index].rowStart = Math.ceil((yPos + yCenterVal) / 100);
    this.group[index].rowEnd = Math.ceil((yPos + height + yCenterVal) / 100);
  }

  drag(data: ElData, index: number): void {
    this.isDragging = true;

    this.setShadeX(data.left, index);
    this.setShadeY(data.top, index);
  }

  setShadeX(xPos: number, index: number): void {
    const cols = this.group[index].columnEnd - this.group[index].columnStart;
    this.shadowWidth = (cols ? cols : 1) * cellWidth;
    const xCenterValue = this.shadowWidth / 3;
    this.dragShade.columnStart = Math.ceil((xPos + xCenterValue) / cellWidth);
    this.dragShade.columnEnd = Math.ceil((xPos + this.shadowWidth + xCenterValue) / cellWidth);
  }

  setShadeY(yPos: number, index: number): void {
    const rows = this.group[index].rowEnd - this.group[index].rowStart;
    const shadowHeight = (rows ? rows : 1) * 100;
    const yCenterVal = shadowHeight / 2;
    this.dragShade.rowStart = Math.ceil((yPos + yCenterVal) / 100);
    this.dragShade.rowEnd = Math.ceil((yPos + shadowHeight + yCenterVal) / 100);
  }
}
