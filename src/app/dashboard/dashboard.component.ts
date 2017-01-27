import { Component, OnInit } from "@angular/core";
import {Auth} from "../auth/auth.service";
import {Router, NavigationEnd, ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from "../reducers/index";
import {Actions} from "../reducers/actions";
import "rxjs/add/operator/filter";

@Component({
  selector: "kubermatic-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  constructor(private auth: Auth, private router: Router, private activatedRoute: ActivatedRoute, private _store: Store<fromRoot.State>) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      })
      .filter(route => route.outlet === "primary")
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this._store.dispatch({ type: Actions.PUT_BREADCRUMB, payload: { crumb: event["title"] } });
      });
  }

  ngOnInit() {
    if (this.auth.authenticated()) {
      this.router.navigate(["wizard"]);
    } else {
      this.router.navigate(["welcome"]);
    }
  }
}
