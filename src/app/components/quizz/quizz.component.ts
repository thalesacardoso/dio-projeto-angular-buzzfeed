import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.title = quizz_questions.title;

    this.questions = quizz_questions.questions;
    this.questionSelected = this.questions[this.questionIndex];

    this.questionIndex = 0;
    this.questionMaxIndex = this.questions.length;
  }

  playerChoose(alias: string) {
    this.answers.push(alias);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      this.checkResults();
    }
  }

  checkResults() {
    let A: number = 0;
    let B: number = 0;
    const lista: string[] = this.answers;

    for (let i = 0; i < lista.length; i++) {
      if (lista[i] === 'A') {
        A += 1;
      } else if (lista[i] === 'B') {
        B += 1;
      }
    }

    this.finalResults(A, B);
  }

  finalResults(A: number, B: number) {
    if (A > B) {
      this.answerSelected = quizz_questions.results.A;
    } else {
      this.answerSelected = quizz_questions.results.B;
    }
  }
}
