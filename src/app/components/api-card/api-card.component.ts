import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css']
})
export class APICardComponent implements OnInit {

  @Input()rec!:APIrec
  constructor() { }

  ngOnInit(): void {
  }

}

type APIrec ={
  "recipe": {
    "uri": "string",
    "label": "string",
    "image": "string",
    "images": {
      "THUMBNAIL": {
        "url": "string",
        "width": 0,
        "height": 0
      },
      "SMALL": {
        "url": "string",
        "width": 0,
        "height": 0
      },
      "REGULAR": {
        "url": "string",
        "width": 0,
        "height": 0
      },
      "LARGE": {
        "url": "string",
        "width": 0,
        "height": 0
      }
    },
    "source": "string",
    "url": "string",
    "shareAs": "string",
    "yield": 0,
    "dietLabels": [
      "string"
    ],
    "healthLabels": [
      "string"
    ],
    "cautions": [
      "string"
    ],
    "ingredientLines": [
      "string"
    ],
    "ingredients": [
      {
        "text": "string",
        "quantity": 0,
        "measure": "string",
        "food": "string",
        "weight": 0,
        "foodId": "string"
      }
    ],
    "calories": 0,
    "glycemicIndex": 0,
    "totalCO2Emissions": 0,
    "co2EmissionsClass": "A+",
    "totalWeight": 0,
    "cuisineType": [
      "string"
    ],
    "mealType": [
      "string"
    ],
    "dishType": [
      "string"
    ],
    "totalNutrients": {},
    "totalDaily": {},
    "digest": [
      {
        "label": "string",
        "tag": "string",
        "schemaOrgTag": "string",
        "total": 0,
        "hasRDI": true,
        "daily": 0,
        "unit": "string",
        "sub": {}
      }
    ]
  },
  "_links": {
    "self": {
      "href": "string",
      "title": "string"
    },
    "next": {
      "href": "string",
      "title": "string"
    }
  }
}