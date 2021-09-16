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

  changeSize(width: number, index: number): void {
    const compare = Math.ceil(width / cellWidth) + 1;
    this.group[index].columnEnd = compare + this.group[index].columnStart - 1;
  }

  drop(data: ElData, index: number) {
    if (data.left) {
      const width = (this.group[index].columnEnd - this.group[index].columnStart) * cellWidth;
      this.group[index].columnStart = Math.ceil(data.left / cellWidth);
      this.group[index].columnEnd = Math.ceil((data.left + width) / cellWidth);
    }

    if (data.top) {
      console.log('top', data);
    }
  }
}
