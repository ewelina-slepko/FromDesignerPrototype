import {Component, OnInit} from '@angular/core';
import {ElData} from '../shared/resizable-element/resizable-element.component';

const columns = 4;
const gapsWidth = (columns - 1) * 4;
const cellWidth = (window.innerWidth - gapsWidth) / columns;


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent implements OnInit {

  group = [
    {
      rowStart: 1,
      rowEnd: 1,
      columnStart: 1,
      columnEnd: 1
    }, {
      rowStart: 1,
      rowEnd: 1,
      columnStart: 2,
      columnEnd: 4
    }, {
      rowStart: 2,
      rowEnd: 2,
      columnStart: 1,
      columnEnd: 1
    }, {
      rowStart: 2,
      rowEnd: 2,
      columnStart: 3,
      columnEnd: 5
    }
  ];

  dragShade = {
    rowStart: 1,
    rowEnd: 1,
    columnStart: 1,
    columnEnd: 1
  };

  isDragging!: boolean;
  dragShadowWidth!: number;

  constructor() {
  }

  ngOnInit(): void {

  }

  get groupArea(): string[] {
    return this.group.map(el => `${el.rowStart} / ${el.columnStart} / ${el.rowEnd} / ${el.columnEnd}`);
  }

  get templateColumns(): string {
    return `repeat(${columns}, ${cellWidth}px)`;
  }

  get dragShadeArea(): string {
    return `${this.dragShade.rowStart} / ${this.dragShade.columnStart} / ${this.dragShade.rowEnd} / ${this.dragShade.columnEnd}`;
  }

  changeSize(width: number, index: number): void {
    const compare = Math.ceil(width / cellWidth) + 1;
    this.group[index].columnEnd = compare + this.group[index].columnStart - 1;
  }

  drop(data: ElData, index: number): void {
    if (data.left) {
      const diff = this.group[index].columnEnd - this.group[index].columnStart;
      const width = (diff ? diff : 1) * cellWidth;
      const centerVal = width / 2;
      this.group[index].columnStart = Math.ceil((data.left + centerVal) / cellWidth);
      this.group[index].columnEnd = Math.ceil((data.left + width + centerVal) / cellWidth);
    }

    if (data.top) {
      // console.log('top', data);
    }

    this.isDragging = false;
  }

  drag(data: ElData, index: number): void {
    this.isDragging = true;
    if (data.left) {
      const diff = this.group[index].columnEnd - this.group[index].columnStart;
      this.dragShadowWidth = (diff ? diff : 1) * cellWidth;
      const centerVal = this.dragShadowWidth / 2;
      this.dragShade.columnStart = Math.ceil((data.left + centerVal) / cellWidth);
      this.dragShade.columnEnd = Math.ceil((data.left + this.dragShadowWidth + centerVal) / cellWidth);
      this.dragShade.rowStart = this.group[index].rowStart;
      this.dragShade.rowEnd = this.group[index].rowEnd;
    }

    if (data.top) {
      // console.log('top', data);
    }
  }
}
