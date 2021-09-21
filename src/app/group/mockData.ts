export const group = [
  {
    rowStart: 1,
    rowEnd: 1,
    columnStart: 1,
    columnEnd: 1,
  }, {
    rowStart: 2,
    rowEnd: 2,
    columnStart: 1,
    columnEnd: 1,
  }, {
    rowStart: 3,
    rowEnd: 3,
    columnStart: 1,
    columnEnd: 1,
  }, {
    rowStart: 4,
    rowEnd: 4,
    columnStart: 1,
    columnEnd: 1,
  }
];

export interface DefinitionDto {
  groups: GroupDto[];
  fields: FieldDto[];
}

export interface GroupDto {
  name: string;
  index: number;
  id: string;
}

export interface FieldDto {
  label: string;
  fieldName: string;
  designSettings: DesignSettingsDto;
}

export interface DesignSettingsDto {
  groupId: string;
  position: PositionDto;
}

export interface PositionDto {
  rowStart: number;
  rowEnd: number;
  columnStart: number;
  columnEnd: number;
}

export const definition: DefinitionDto = {
  groups: [
    {name: 'Group 1', index: 0, id: '1'},
    {name: 'Group 2', index: 1, id: '2'},
    {name: 'Group 3', index: 2, id: '3'},
  ],
  fields: [
    {
      label: 'Pole 1',
      fieldName: 'F1',
      designSettings:
        {
          groupId: '1',
          position: {
            rowStart: 1,
            rowEnd: 1,
            columnStart: 1,
            columnEnd: 3,
          }
        }
    },
    {
      label: 'Pole 2',
      fieldName: 'F2',
      designSettings:
        {
          groupId: '1',
          position: {
            rowStart: 2,
            rowEnd: 2,
            columnStart: 1,
            columnEnd: 3,
          }
        }
    },
    {
      label: 'Pole 3',
      fieldName: 'F3',
      designSettings:
        {
          groupId: '1',
          position: {
            rowStart: 3,
            rowEnd: 3,
            columnStart: 1,
            columnEnd: 1,
          }
        }
    },
    {
      label: 'Pole 4',
      fieldName: 'F4',
      designSettings:
        {
          groupId: '1',
          position: {
            rowStart: 4,
            rowEnd: 4,
            columnStart: 1,
            columnEnd: 2,
          }
        }
    },
    {
      label: 'Pole 5',
      fieldName: 'F5',
      designSettings:
        {
          groupId: '2',
          position: {
            rowStart: 1,
            rowEnd: 1,
            columnStart: 1,
            columnEnd: 3,
          }
        }
    },
    {
      label: 'Pole 6',
      fieldName: 'F6',
      designSettings:
        {
          groupId: '2',
          position: {
            rowStart: 1,
            rowEnd: 1,
            columnStart: 3,
            columnEnd: 3,
          }
        }
    },
    {
      label: 'Pole 7',
      fieldName: 'F7',
      designSettings:
        {
          groupId: '3',
          position: {
            rowStart: 1,
            rowEnd: 1,
            columnStart: 3,
            columnEnd: 3,
          }
        }
    }
  ]
};

