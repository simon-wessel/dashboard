import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClusterService } from '../../../../core/services';
import { ClusterEntity } from '../../../../shared/entity/ClusterEntity';
import { ProviderSettingsPatch } from '../../../../core/services/cluster/cluster.service';

@Component({
  selector: 'kubermatic-vsphere-provider-settings',
  templateUrl: './vsphere-provider-settings.component.html',
})

export class VSphereProviderSettingsComponent implements OnInit, OnDestroy {
  @Input() cluster: ClusterEntity;
  public vsphereProviderSettingsForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private clusterService: ClusterService) {}

  ngOnInit(): void {
    this.vsphereProviderSettingsForm = new FormGroup({
      username: new FormControl(this.cluster.spec.cloud.vsphere.username, [Validators.required]),
      password: new FormControl(this.cluster.spec.cloud.vsphere.password, [Validators.required]),
    });

    this.subscriptions.push(this.vsphereProviderSettingsForm.valueChanges.subscribe(() => {
      this.clusterService.changeProviderSettingsPatch(this.getProviderSettingsPatch());
    }));
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

  getProviderSettingsPatch(): ProviderSettingsPatch {
    return {
      cloudSpecPatch: {
        vsphere: {
          password: this.vsphereProviderSettingsForm.controls.password.value,
          username: this.vsphereProviderSettingsForm.controls.username.value,
        },
      },
      isValid: this.vsphereProviderSettingsForm.valid,
    };
  }
}
