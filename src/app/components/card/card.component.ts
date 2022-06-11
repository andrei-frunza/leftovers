import { Component, Input, OnInit } from '@angular/core';
import { recipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() recipe!:recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
