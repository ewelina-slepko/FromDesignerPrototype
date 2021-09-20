import {Component} from '@angular/core';
import {definition, FieldDto} from './group/mockData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  definition = definition;

  getFields(id: string): FieldDto[] {
    return definition.fields.filter(item => item.designSettings.groupId === id);
  }
}
