import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  private dataStore: {recipes:recipe[]};
  private APIdataStore:{recipes:any[]};
  private _recipes:BehaviorSubject<recipe[]>;
  private _API:BehaviorSubject<any[]>

  constructor(private http: HttpClient){
    this.dataStore={recipes:[]};
    this.APIdataStore={recipes:[]};
    this._recipes = new BehaviorSubject<recipe[]>([]);
    this._API = new BehaviorSubject<any[]>([]);
  }

  get Recipes(): Observable<recipe[]>{
    return this._recipes.asObservable();
  }
  get API():Observable<any[]>{
    return this._API.asObservable();
  }
  addRecipe(user:recipe){
    const res = fetch(`http://localhost:3000/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  loadAll(){
    const usersUrl = 'http://localhost:3000/database';

    return this.http.get<recipe[]>(usersUrl)
    .subscribe(data=>{
      this.dataStore.recipes=data;
      this._recipes.next(Object.assign({},this.dataStore).recipes)
    },error=>{
      console.log("failed to fetch users");
    }); 
  }

  loadAPI(inputs:String[]){
    let query=inputs[0];
    for(let i=1;i<inputs.length;i++){
      query=query+ '%2C'+inputs[i];
    }
    const url = 'https://api.edamam.com/api/recipes/v2?type=public&q='+query+'&app_id=379ce464&app_key=ed8dac52eecbd22f948a735ced93a8d9&random=true'

    return this.http.get<APIresp>(url)
    .subscribe(data=>{
      console.log("LOADED FROM THE API");
      this.APIdataStore.recipes=data.hits;
      this._API.next(Object.assign({},this.APIdataStore).recipes)
    })
  }

  getAll(){
    console.log(this.dataStore.recipes);
    return this.dataStore.recipes;
  }
  getAllAPI(){
    return this.APIdataStore.recipes;
  }
}

type APIresp ={
  "from": 0,
  "to": 0,
  "count": 0,
  "_links": {
    "self": {
      "href": "string",
      "title": "string"
    },
    "next": {
      "href": "string",
      "title": "string"
    }
  },
  "hits": [
    {
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
  ]
}