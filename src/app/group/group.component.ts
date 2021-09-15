import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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

  // @ViewChild('grid') grid!: ElementRef;
  // @ViewChild('cell') cell!: ElementRef;
  // columns = Array(4).fill(null);
  gridRect!: DOMRect;

  // cellRect!: DOMRect;

  constructor() {
  }

  ngOnInit(): void {

  }

  get groupArea() {
    return this.group.map(el => `${el.rowStart} / ${el.columnStart} / ${el.rowEnd} / ${el.columnEnd}`);
  }

  get templateColumns() {
    return `repeat(${columns}, ${cellWidth}px)`;
  }

  // ngAfterViewInit(): void {
  //   this.gridRect = this.grid.nativeElement.getBoundingClientRect();
  //   this.cellRect = this.cell.nativeElement.getBoundingClientRect();
  // }

  compareSize(width: number, index: number): void {
    const compare = Math.ceil(width / cellWidth) + 1;
    console.log('loguje?', compare);
    console.log('i', index);
    console.log('colStart', this.group[index].columnStart);


    // if (this.group[index].columnStart > 1) {
    //   this.group[index].columnEnd = compare;
    //   return;
    // }

    this.group[index].columnEnd = compare + this.group[index].columnStart - 1;
    // console.log('el', this.elementRect);
    // console.log('grid val', this.gridRect);
    // console.log('cell val', this.cell);


    // if (this.elData.width > cellVal.width) {
    //   this.elData.width = this.elData.width * 2;
    //   this.elData.left = cellVal.left;
    // }
  }

}
