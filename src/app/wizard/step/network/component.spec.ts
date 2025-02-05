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

import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppConfigService} from '@app/config.service';
import {NODE_DATA_CONFIG, NodeDataMode} from '@app/node-data/config';
import {ApiMockService} from '@app/testing/services/api-mock';
import {AuthMockService} from '@app/testing/services/auth-mock';
import {ProjectMockService} from '@app/testing/services/project-mock';
import {ApiService} from '@core/services/api';
import {Auth} from '@core/services/auth/service';
import {ClusterSpecService} from '@core/services/cluster-spec';
import {DatacenterService} from '@core/services/datacenter';
import {NodeDataService} from '@core/services/node-data/service';
import {ProjectService} from '@core/services/project';
import {PresetsService} from '@core/services/wizard/presets';
import {WizardService} from '@core/services/wizard/wizard';
import {SharedModule} from '@shared/module';
import {MachineNetworkStepComponent} from './component';

const modules: any[] = [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, SharedModule, HttpClientModule];

describe('MachineNetworkStepComponent', () => {
  let fixture: ComponentFixture<MachineNetworkStepComponent>;
  let component: MachineNetworkStepComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [...modules],
        declarations: [MachineNetworkStepComponent],
        providers: [
          WizardService,
          NodeDataService,
          ClusterSpecService,
          PresetsService,
          DatacenterService,
          AppConfigService,
          {provide: ProjectService, useValue: ProjectMockService},
          {provide: ApiService, useValue: ApiMockService},
          {provide: Auth, useClass: AuthMockService},
          {provide: NODE_DATA_CONFIG, useValue: NodeDataMode.Wizard},
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineNetworkStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Machine Network Step cmp', () => {
    expect(component).toBeTruthy();
  });
});
