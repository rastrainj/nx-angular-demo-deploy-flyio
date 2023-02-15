import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";

export interface User {
  id: number;
  title: string;
}

@Component({
  selector: 'nx-angular-demo-deploy-flyio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: User[] = [];

  userTitle = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.users = [];
    this.http
      .get<User[]>(environment.apiUrl + "/users")
      .subscribe((response) => (this.users = response));
  }

  addNewUser() {
    this.http
      .post(
        environment.apiUrl + "/users",
        {
          title: this.userTitle,
        },
        { observe: 'response' }
      )
      .subscribe((response: HttpResponse<unknown>) => {
        if (response.status === 204) {
          this.loadData();
          alert('Usuario creado');
        } else {
          alert('ERROR');
        }
      });
  }
}
