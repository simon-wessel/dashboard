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

import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

export enum CredentialsType {
  Default = 'default',
  Application = 'application',
}

@Injectable()
export class OpenstackCredentialsTypeService {
  private _credentialsType = CredentialsType.Default;

  readonly credentialsTypeChanges = new ReplaySubject<CredentialsType>();

  get credentialsType(): CredentialsType {
    return this._credentialsType;
  }

  set credentialsType(type: CredentialsType) {
    this._credentialsType = type;
    this.credentialsTypeChanges.next(type);
  }
}
