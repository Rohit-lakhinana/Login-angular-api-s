import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any;

  constructor(private http: HttpClient) {}

  
  
    getConfigJSON(newquestion: string) {
      return this.http.get('assets/' + newquestion + '.json');
    }

  loadAuthData(): void {
    this.http.get<any>('src/assets/auth.json').subscribe(
      (authData) => {
        this.auth = authData;
      },
      (error) => {
        console.log('Error loading auth.json', error);
      }
    );
  }
}
