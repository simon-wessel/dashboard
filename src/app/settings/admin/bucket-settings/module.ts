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

import {NgModule} from '@angular/core';
import {BucketSettingsComponent} from '@app/settings/admin/bucket-settings/component';
import {EditBucketSettingDialog} from '@app/settings/admin/bucket-settings/edit-bucket-setting-dialog/component';
import {EditCredentialsDialog} from '@app/settings/admin/bucket-settings/edit-credentials-dialog/component';
import {AdminSettingsBucketSettingsRoutingModule} from '@app/settings/admin/bucket-settings/routing';
import {SharedModule} from '@shared/module';

@NgModule({
  imports: [SharedModule, AdminSettingsBucketSettingsRoutingModule],
  declarations: [BucketSettingsComponent, EditBucketSettingDialog, EditCredentialsDialog],
})
export class AdminSettingsBucketSettingsModule {}
