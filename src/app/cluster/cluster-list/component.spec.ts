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
import {ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {BrowserModule, By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConfigService} from '@app/config.service';
import {fakeAWSCluster} from '@app/testing/fake-data/cluster';
import {fakeHealth} from '@app/testing/fake-data/health';
import {ActivatedRouteStub, RouterStub, RouterTestingModule} from '@app/testing/router-stubs';
import {ApiMockService, asyncData} from '@app/testing/services/api-mock';
import {AppConfigMockService} from '@app/testing/services/app-config-mock';
import {AuthMockService} from '@app/testing/services/auth-mock';
import {DatacenterMockService} from '@app/testing/services/datacenter-mock';
import {ProjectMockService} from '@app/testing/services/project-mock';
import {SettingsMockService} from '@app/testing/services/settings-mock';
import {UserMockService} from '@app/testing/services/user-mock';
import {ApiService} from '@core/services/api';
import {Auth} from '@core/services/auth/service';
import {ClusterService} from '@core/services/cluster';
import {DatacenterService} from '@core/services/datacenter';
import {EndOfLifeService} from '@core/services/eol';
import {ProjectService} from '@core/services/project';
import {SettingsService} from '@core/services/settings';
import {UserService} from '@core/services/user';
import {SharedModule} from '@shared/module';
import {ClusterListComponent} from './component';

describe('ClusterListComponent', () => {
  let fixture: ComponentFixture<ClusterListComponent>;
  let component: ClusterListComponent;
  let getClustersSpy;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(
    waitForAsync(() => {
      const clusterServiceMock = {
        clusters: jest.fn(),
        health: jest.fn(),
        refreshClusters: () => {},
        restores: jest.fn(),
      };
      getClustersSpy = clusterServiceMock.clusters.mockReturnValue(asyncData([fakeAWSCluster()]));
      clusterServiceMock.health.mockReturnValue(asyncData([fakeHealth()]));
      clusterServiceMock.restores.mockReturnValue(asyncData([]));

      TestBed.configureTestingModule({
        imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, RouterTestingModule, SharedModule],
        declarations: [ClusterListComponent],
        providers: [
          {provide: ApiService, useValue: ApiMockService},
          {provide: ClusterService, useValue: clusterServiceMock},
          {provide: Auth, useClass: AuthMockService},
          {provide: ActivatedRoute, useClass: ActivatedRouteStub},
          {provide: UserService, useClass: UserMockService},
          {provide: Router, useClass: RouterStub},
          {provide: AppConfigService, useClass: AppConfigMockService},
          {provide: DatacenterService, useClass: DatacenterMockService},
          {provide: ProjectService, useClass: ProjectMockService},
          {provide: SettingsService, useClass: SettingsMockService},
          EndOfLifeService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterListComponent);
    component = fixture.componentInstance;

    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRoute.testParamMap = {projectID: '4k6txp5sq'};
  });

  it('should create the cluster list cmp', fakeAsync(() => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    discardPeriodicTasks();
  }));

  it('should get cluster list', fakeAsync(() => {
    fixture.detectChanges();
    tick(1);

    const expectedCluster = fakeAWSCluster();
    expectedCluster.creationTimestamp = expect.any(Date);

    expect(getClustersSpy).toHaveBeenCalled();
    expect(component.clusters).toEqual([expectedCluster]);
    discardPeriodicTasks();
  }));

  it('should render cluster list', fakeAsync(() => {
    component.isInitialized = true;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.mat-card'));

    expect(de).not.toBeNull();
    discardPeriodicTasks();
  }));

  it('should not render cluster list', fakeAsync(() => {
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.km-empty-list-msg'));

    expect(de).toBeNull();
    discardPeriodicTasks();
  }));
});
