// Copyright 2020 The Kubermatic Kubernetes Platform contributors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {fakeConstraints, fakeConstraintTemplates} from '@app/testing/fake-data/opa';
import {asyncData} from '@app/testing/services/api-mock';
import {MatDialogRefMock} from '@app/testing/services/mat-dialog-ref-mock';
import {CoreModule} from '@core/module';
import {NotificationService} from '@core/services/notification';
import {OPAService} from '@core/services/opa';
import {SharedModule} from '@shared/module';
import {NGX_MONACO_EDITOR_CONFIG, MonacoEditorModule} from 'ngx-monaco-editor';
import {of} from 'rxjs';
import {ConstraintDialog, Mode} from './component';

const modules: any[] = [BrowserModule, BrowserAnimationsModule, SharedModule, CoreModule, MonacoEditorModule];

declare let monaco: any;

describe('ConstraintDialog', () => {
  let fixture: ComponentFixture<ConstraintDialog>;
  let component: ConstraintDialog;
  let createConstraintSpy;
  let patchConstraintSpy;

  beforeEach(
    waitForAsync(() => {
      const opaMock = {
        createConstraint: jest.fn(),
        patchConstraint: jest.fn(),
        constraintTemplates: of(fakeConstraintTemplates()),
        refreshConstraint: () => {},
      };
      createConstraintSpy = opaMock.createConstraint.mockReturnValue(asyncData(fakeConstraints()[0]));
      patchConstraintSpy = opaMock.patchConstraint.mockReturnValue(asyncData(fakeConstraints()[0]));

      TestBed.configureTestingModule({
        imports: [...modules],
        declarations: [ConstraintDialog],
        providers: [
          {provide: MatDialogRef, useClass: MatDialogRefMock},
          {provide: OPAService, useValue: opaMock},
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              title: '',
              projectId: '',
              clusterId: '',
              mode: '',
              confirmLabel: '',
            },
          },
          NotificationService,
          {provide: NGX_MONACO_EDITOR_CONFIG, useValue: {onMonacoLoad: () => (monaco = (window as any).monaco)}},
        ],
      }).compileComponents();
    })
  );

  describe('Add Constraint Dialog', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ConstraintDialog);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.data = {
        title: 'Add Constraint',
        projectId: '123ab4cd5e',
        clusterId: '4k6txp5sq',
        mode: Mode.Add,
        confirmLabel: 'Add',
      };
      fixture.detectChanges();
    });

    it(
      'should create the add constraint dialog',
      waitForAsync(() => {
        expect(component).toBeTruthy();
      })
    );

    it('should have correct title: add', () => {
      expect(document.body.querySelector('km-dialog-title').textContent).toBe('Add Constraint');
    });

    it('should have correct button text: add', () => {
      expect(document.body.querySelector('#km-constraint-dialog-btn').textContent).toContain('Add');
    });

    it('should call createConstraint()', () => {
      component.save();
      fixture.detectChanges();
      expect(createConstraintSpy).toHaveBeenCalled();
    });
  });

  describe('Edit Constraint Dialog', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ConstraintDialog);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.data = {
        title: 'Edit Constraint',
        projectId: '123ab4cd5e',
        clusterId: '4k6txp5sq',
        mode: Mode.Edit,
        confirmLabel: 'Edit',
        constraint: fakeConstraints()[0],
      };
      fixture.detectChanges();
    });

    it(
      'should create the edit constraint dialog',
      waitForAsync(() => {
        expect(component).toBeTruthy();
      })
    );

    it('should have correct title: edit', () => {
      expect(document.body.querySelector('km-dialog-title').textContent).toContain('Edit Constraint');
    });

    it('should have correct button text: edit', () => {
      expect(document.body.querySelector('#km-constraint-dialog-btn').textContent).toContain('Edit');
    });

    it('should call patchConstraint()', () => {
      component.save();
      fixture.detectChanges();
      expect(patchConstraintSpy).toHaveBeenCalled();
    });
  });
});
