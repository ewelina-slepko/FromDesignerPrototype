import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('cell') cell!: ElementRef;
  columns = Array(4).fill(null);

  elData = {
    width: 300,
    height: 100,
    left: 0,
    top: 0
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  compareSize(): void {
    const {left, top, width, height} = this.cell.nativeElement.getBoundingClientRect();
    console.log('el', this.elData);

    if (this.elData.width > width) {
      console.log('hello');
      this.elData.width = this.elData.width * 2;
      this.elData.left = left;
    }
  }

}
