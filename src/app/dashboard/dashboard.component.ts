import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Injectable()
export class MyService {
  constructor(private authService: AuthService) {
    // console.log(this.authService.newquestion);
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  defaultUuid: string = '';
  defaultdefaultOptionsList: string = '';
  weight: number | undefined;
  isCorrect: boolean | undefined;
  questionType: string | undefined = '';
  Id: number | undefined;
  defaultDomain: string = '';
  defaultquestionCode: string = '';
  defaultquestionSubText: string = '';
  defaultquestionText: string = '';
  defaultquestionSubtype: string = '';
  defaultquestionComprehensionList: string = '';
  defaultrefClass: string = '';
  defaultquestionName: string = '';
  defaultquestionClass: string = '';
  token: string = 'eyJhbGciOiJIUzUxMiJ9.eyJzaWQiOiJkYzQ2MjAxYi1jNmJjLTQyZDctYTMyOC1jZjNkNmFhODZjODhAQGFkbWluQEBpZ3giLCJpYXQiOjE2ODU5NTU0NTQsImV4cCI6MTY4NTk1OTA1NH0.kY6k7dRDcxWeYN24A-5W07zxnTZefcic06C3gACxISdEatwdJyEjco3fKi2FcRO7Nqy3JTlrZRivD-0jSlMkiw'; // Replace with your token
  apiUrl: string = 'https://dev.platformcommons.org/gateway/assessment-service/api/v1/questions';
  questions: any[] = [];
  newquestion: any = {
    "id": 269,
    "tenant": 0,
    "domain": "DOMAIN.HEALTH",
    "questionCode": "FB_001",
    "questionClass": {
      "code": "QUESTION_CLASS.QUESTION"
    },
    "questionType": {
      "code": "QUESTION_TYPE.SUBJECTIVE_LONG"
    },
    "questionText": [
      {
        "text": "TEST",
        "language": {
          "code": "ENG",
          "label": "English"
        }
      }
    ],
    "questionSubText": [
      {
        "text": "",
        "language": {
          "code": "ENG",
          "label": "English"
        }
      }
    ],
    "questionName": [],
    "weight": 199,
    "tenantId": 0,
    "questionImageURL": "",
    "defaultOptionsList": [],
    "questionSubtype": {
      "code": "QUESTION_SUB_TYPE.SUBJECTIVE"
    }
  };

  constructor(private http: HttpClient,private router: Router ) {}

  ngOnInit() {
    this.fetchQuestions();
  }
  

  fetchQuestions() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any[]>(`${this.apiUrl}?page=10&size=10`, { headers })
      .subscribe(
        (response) => {
          this.defaultUuid = response[0]?.uuid.toString() || '';
          this.questions = response;

          this.defaultDomain = response[0]?.domain || '';
          this.defaultquestionCode = response[0]?.questionCode || '';
          this.defaultquestionSubText = response[0]?.questionSubText || '';
          this.defaultquestionText = response[0]?.questionText || '';
          this.defaultquestionSubtype = response[0]?.questionSubtype || '';
          this.defaultdefaultOptionsList = response[0]?.defaultOptionsList || '';
          this.defaultquestionComprehensionList = response[0]?.defaultquestionComprehensionList || [];
          this.defaultrefClass = response[0]?.questionSubtype?.refClass?.code || '';

          this.defaultquestionClass = response[0]?.questionClass || '';
          console.log(response);
        },
        (error) => {
          // Handle error
          console.error(error);

          this.router.navigate(['/login']);
        }
      );
  }

  submitQuestion() {
    console.log('submitted weight:', this.weight);
    console.log('subitted isCorrect:', this.isCorrect);
    console.log('Question Type:', this.questionType);
    console.log('id:', this.Id);

    const requestData = {
      uuid: this.defaultUuid,
      defaultOptionsList: this.defaultdefaultOptionsList,
      weight: this.weight,
      questionType: this.questionType,
      Id: this.Id,
      domain: this.defaultDomain, // the defaultDomain value here
      questionCode: this.defaultquestionCode,
      questionSubText: this.defaultquestionSubText,
      questionText: this.defaultquestionText,
      questionSubtype: this.defaultquestionSubText,
      questionComprehensionList: this.defaultquestionComprehensionList,
      refClass: this.defaultrefClass,
      question: this.questionType,
      questionClass: this.defaultquestionClass
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post<any>(this.apiUrl, this.newquestion, { headers })
      .subscribe(
        (response) => {
          console.log('Post response:', response);
          this.fetchQuestions();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  editQuestion(question: any) {
    console.log('Editing question:', question);

    const requestData = {
      questionText: question.questionText,
      weight: question.weight,
      questionType: question.questionType,
      marks: question.marks,
      Id: question.Id,
      domain: question.domain
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.patch<any>(`${this.apiUrl}`, this.newquestion, { headers })
      .subscribe(
        (response) => {
          console.log('Patch response:', response);
          this.fetchQuestions();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  deleteQuestion(question: any) {
    console.log('Deleting question:', question);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`${this.apiUrl}/${question.id}`, { headers })
      .subscribe(
        () => {
          console.log('Delete successful');
          this.fetchQuestions();
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
