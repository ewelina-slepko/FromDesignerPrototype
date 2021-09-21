import {Component, OnInit} from '@angular/core';
import {definition, FieldDto} from './group/mockData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  definition = definition;

  ngOnInit(): void {
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
