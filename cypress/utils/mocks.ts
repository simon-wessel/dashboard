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

import {Provider} from './provider';
import {RouteHandler} from 'cypress/types/net-stubbing';
import {Endpoint} from './endpoint';
import {RequestType} from './monitor';
import {Config} from './config';

interface Mock {
  m: RequestType;
  p: string;
  r: RouteHandler;
}

export class Mocks {
  private static _currentUser: any = {
    id: 'user-j9e03',
    name: 'roxy',
    creationTimestamp: new Date(),
    email: 'roxy@kubermatic.io',
    projects: [
      {
        id: 'fn9234fn1d',
        group: 'owners',
      },
    ],
    userSettings: {
      itemsPerPage: 5,
      lastSeenChangelogVersion: 'v9.0.0',
    },
  };

  static updateCurrentUser(email: string, isAdmin = false): void {
    this._currentUser.email = email;
    this._currentUser.name = email.split('@')[0];
    this._currentUser.isAdmin = isAdmin;
  }

  static adminSettings: any = {
    customLinks: [],
    cleanupOptions: {
      Enabled: true,
      Enforced: false,
    },
    defaultNodeCount: 1,
    clusterTypeOptions: 0,
    displayDemoInfo: true,
    displayAPIDocs: true,
    displayTermsOfService: true,
    enableDashboard: true,
    enableOIDCKubeconfig: false,
    userProjectsLimit: 0,
    restrictProjectCreation: false,
    enableExternalClusterImport: true,
    opaOptions: {
      enabled: false,
      enforced: false,
    },
    mlaOptions: {
      loggingEnabled: true,
      loggingEnforced: false,
      monitoringEnabled: true,
      monitoringEnforced: false,
    },
    mlaAlertmanagerPrefix: 'alertmanager',
    mlaGrafanaPrefix: 'grafana',
    machineDeploymentVMResourceQuota: {
      minCPU: 2,
      maxCPU: 0,
      minRAM: 2,
      maxRAM: 0,
      enableGPU: false,
    },
  };

  private static _defaults: Mock[] = [
    {m: RequestType.GET, p: Endpoint.CurrentUser, r: Mocks._currentUser},
    {m: RequestType.GET, p: Endpoint.AdminSettings, r: Mocks.adminSettings},
    {m: RequestType.GET, p: Endpoint.Seeds, r: ['test-seed']},
    {m: RequestType.GET, p: Endpoint.SeedSettings, r: {fixture: 'seed-settings.json'}},
    {m: RequestType.GET, p: Endpoint.Datacenters, r: {fixture: 'datacenters.json'}},
    {m: RequestType.GET, p: Endpoint.Presets, r: {fixture: 'preset.json'}},
    {m: RequestType.GET, p: Endpoint.CustomLinks, r: []},
    {m: RequestType.GET, p: Endpoint.Addons, r: []},
    {m: RequestType.GET, p: Endpoint.AddonConfigs, r: []},
    {m: RequestType.GET, p: Endpoint.SystemLabels, r: {}},
    {m: RequestType.POST, p: Endpoint.Projects, r: {fixture: 'project.json'}},
    {m: RequestType.GET, p: Endpoint.Projects, r: {fixture: 'projects.json'}},
    {m: RequestType.GET, p: Endpoint.Project, r: {fixture: 'project.json'}},
    {m: RequestType.GET, p: Endpoint.ExternalClusters, r: []},
    {m: RequestType.POST, p: Endpoint.ExternalClusters, r: {fixture: 'external-cluster.json'}},
    {m: RequestType.GET, p: Endpoint.ExternalCluster, r: {fixture: 'external-cluster.json'}},
    {m: RequestType.GET, p: Endpoint.ExternalClusterNodes, r: []},
    {m: RequestType.GET, p: Endpoint.ExternalClusterMetrics, r: []},
    {m: RequestType.GET, p: Endpoint.ExternalClusterNodesMetrics, r: []},
    {m: RequestType.GET, p: Endpoint.ExternalClusterEvents, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterHealth, r: {fixture: 'health.json'}},
    {m: RequestType.GET, p: Endpoint.ClusterMetrics, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterNodes, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterEvents, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterBindings, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterClusterBindings, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterRuleGroups, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterAddons, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterUpgrades, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterSSHKeys, r: {fixture: 'ssh-keys.json'}},
    {m: RequestType.PUT, p: Endpoint.ClusterSSHKey, r: {fixture: 'ssh-key.json'}},
    {m: RequestType.GET, p: Endpoint.MachineDeploymentNodes, r: []},
    {m: RequestType.GET, p: Endpoint.MachineDeploymentNodesEvents, r: []},
    {m: RequestType.GET, p: Endpoint.MachineDeploymentNodesMetrics, r: []},
    {m: RequestType.GET, p: Endpoint.ClusterTemplates, r: []},
    {m: RequestType.POST, p: Endpoint.Members, r: {fixture: 'member.json'}},
    {m: RequestType.GET, p: Endpoint.Members, r: {fixture: 'members.json'}},
    {m: RequestType.POST, p: Endpoint.ServiceAccounts, r: {fixture: 'service-account.json'}},
    {m: RequestType.GET, p: Endpoint.ServiceAccount, r: {fixture: 'service-account.json'}},
    {m: RequestType.GET, p: Endpoint.ServiceAccounts, r: {fixture: 'service-accounts.json'}},
    {m: RequestType.POST, p: Endpoint.ServiceAccountTokens, r: {fixture: 'token.json'}},
    {m: RequestType.GET, p: Endpoint.ServiceAccountTokens, r: {fixture: 'tokens.json'}},
    {m: RequestType.POST, p: Endpoint.SSHKeys, r: {fixture: 'ssh-key.json'}},
    {m: RequestType.GET, p: Endpoint.SSHKeys, r: {fixture: 'ssh-keys.json'}},
    {m: RequestType.GET, p: Endpoint.EtcdRestores, r: []},
    {m: RequestType.GET, p: Endpoint.AlertmanagerConfig, r: {spec: {config: ''}}},
    {m: RequestType.GET, p: Endpoint.AdmissionPlugins, r: []},
    {m: RequestType.GET, p: Endpoint.Versions, r: {fixture: 'versions.json'}},
    {m: RequestType.GET, p: Endpoint.Alibaba.InstanceTypes, r: {fixture: 'alibaba/instancetypes.json'}},
    {m: RequestType.GET, p: Endpoint.Alibaba.VSwitches, r: {fixture: 'alibaba/vswitches.json'}},
    {m: RequestType.GET, p: Endpoint.Alibaba.Zones, r: {fixture: 'alibaba/zones.json'}},
    {m: RequestType.GET, p: Endpoint.Anexia.Templates, r: {fixture: 'anexia/templates.json'}},
    {m: RequestType.GET, p: Endpoint.Anexia.VLANs, r: {fixture: 'anexia/vlans.json'}},
    {m: RequestType.GET, p: Endpoint.AWS.Sizes, r: {fixture: 'aws/sizes.json'}},
    {m: RequestType.GET, p: Endpoint.AWS.Subnets, r: {fixture: 'aws/subnets.json'}},
    {m: RequestType.GET, p: Endpoint.Azure.Sizes, r: {fixture: 'azure/sizes.json'}},
    {m: RequestType.GET, p: Endpoint.Digitalocean.Sizes, r: {fixture: 'digitalocean/sizes.json'}},
    {m: RequestType.GET, p: Endpoint.GCP.DiskTypes, r: {fixture: 'gcp/disktypes.json'}},
    {m: RequestType.GET, p: Endpoint.GCP.Sizes, r: {fixture: 'gcp/sizes.json'}},
    {m: RequestType.GET, p: Endpoint.GCP.Zones, r: {fixture: 'gcp/zones.json'}},
    {m: RequestType.GET, p: Endpoint.Equinix.Sizes, r: {fixture: 'packet/sizes.json'}},
    {m: RequestType.GET, p: Endpoint.Hetzner.Sizes, r: {fixture: 'hetzner/sizes.json'}},
    {m: RequestType.GET, p: Endpoint.OpenStack.AvailabilityZones, r: {fixture: 'openstack/availabilityzones.json'}},
    {m: RequestType.GET, p: Endpoint.OpenStack.Sizes, r: {fixture: 'openstack/sizes.json'}},
  ];

  static enabled(): boolean {
    return Config.isAPIMocked();
  }

  static register(provider?: Provider): void {
    Mocks._registerDefaultMocks();

    if (provider) {
      Mocks._registerProviderMocks(provider);
    }
  }

  private static _registerDefaultMocks(): void {
    this._defaults.forEach(mock => this._intercept(mock.m, mock.p, mock.r));
  }

  private static _registerProviderMocks(provider: Provider): void {
    this._intercept(RequestType.POST, Endpoint.Clusters, {fixture: `${provider}/cluster.json`});
    this._intercept(RequestType.GET, Endpoint.Clusters, {fixture: `${provider}/clusters.json`});
    this._intercept(RequestType.GET, Endpoint.Cluster, {fixture: `${provider}/cluster.json`});
    this._intercept(RequestType.GET, Endpoint.MachineDeployments, {fixture: `${provider}/machinedeployments.json`});
    this._intercept(RequestType.GET, Endpoint.MachineDeployment, {fixture: `${provider}/machinedeployment.json`});
  }

  private static _intercept(method: RequestType, path: string, response?: RouteHandler): void {
    cy.intercept({method, path}, response).as(Mocks._alias(method, path));
  }

  private static _alias(method: RequestType, path: string): string {
    return `${method} ${path}`;
  }
}
