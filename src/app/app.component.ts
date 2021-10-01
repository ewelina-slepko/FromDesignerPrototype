import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {definition, displaySettings, FieldDto} from './group/mockData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {


  @ViewChild('container') public container!: ElementRef;
  @ViewChild('grid') public grid!: ElementRef;

  gridContainerData!: DOMRect;

  definition = definition;
  displaySettings = displaySettings;

  ngOnInit(): void {
    // this.displaySettings.elements = this.displaySettings.elements.map(el => ({
    //   ...el,
    //   area: `${el.position.rowStart} / ${el.position.columnStart} / ${el.position.rowEnd} / ${el.position.columnEnd}`,
    //   // elements: el.
    // }));

  }

  ngAfterViewInit(): void {
    this.gridContainerData = this.container.nativeElement.getBoundingClientRect();
  }

  getFields(id: string): FieldDto[] {
    return definition.fields.filter(item => item.designSettings.groupId === id);
  }

  saveChanges(field: FieldDto): void {
    this.definition.fields.forEach(item => item.fieldName === field.fieldName ? field : item);
  }

  saveTemplate(): void {
  }
}
