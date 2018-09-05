import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Auth } from '../auth/auth.service';
import { environment } from './../../../../environments/environment';
import { MemberEntity } from '../../../shared/entity/MemberEntity';

@Injectable()
export class UserService {
  private restRoot: string = environment.restRoot;
  private headers: HttpHeaders = new HttpHeaders();

  public user: Observable<MemberEntity>;
  public userGroup: string;

  constructor(private http: HttpClient,
              private auth: Auth) {
    const token = auth.getBearerToken();
    this.headers = this.headers.set('Authorization', 'Bearer ' + token);
  }

  getUser(): Observable<MemberEntity> {
    const url = `${this.restRoot}/me`;
    if (!this.user) {
      this.user = this.http.get<MemberEntity>(url, { headers: this.headers });
    }
    return this.user;
  }

  currentUserGroup(projectID: string): Observable<string> {
    return this.getUser().map(res => {
      for (let i = 0; i < res.projects.length; i++) {
        if (res.projects[i].id === projectID) {
          const group = res.projects[i].group.replace(/(\-[\w\d]+$)/, '');
          return this.userGroup = group;
        }
      }
      return this.userGroup = '';
    });
  }

}