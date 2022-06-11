import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { RecipeService } from 'src/app/services/recipe.service';
import { recipe } from 'src/app/models/recipe';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  ingredients:String[]=[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  item = new FormControl('')
  recipes!:recipe[];
  recFiltered!:recipe[];
  recAPI!:APIresp[];
  
  constructor(private service:RecipeService) { }

  ngOnInit(): void {
    this.item.valueChanges.subscribe(value=>{
      if(value.includes(',')){
        this.item.setValue(this.item.value.replace(',',''));
        this.add();
      }
    });
    this.service.loadAll();
    this.service.loadAPI(['chicken']);
    this.service.Recipes.subscribe(recipes=>{
      this.recipes=this.service.getAll();
      this.recFiltered=this.recipes;
    })
    this.service.API.subscribe(recipes=>{
      this.recAPI=this.service.getAllAPI();
      console.log(this.recAPI);
    })
    
  }

  add(){
    if(this.item.value!=''){
      this.ingredients.push(this.item.value.toLowerCase());
    console.log("ADDED",this.item.value)
    this.item.setValue('')
    }
    for (let i=0;i<this.ingredients.length;i++){
      this.recFiltered=this.recFiltered.filter(el=>el.ingredients.includes(this.ingredients[i]))
    }
    this.searchWeb();
    
  }
  remove(input:String){
    this.ingredients.splice(this.ingredients.indexOf(input),1)
    if(this.ingredients.length>0){
      this.recFiltered=this.recipes.filter(el=>el.ingredients.includes(this.ingredients[0]))
    for (let i=1;i<this.ingredients.length;i++){
      this.recFiltered=this.recFiltered.filter(el=>el.ingredients.includes(this.ingredients[i]))
    }
  } else {
    this.recFiltered=this.recipes;
  }
  this.searchWeb();
}

  searchWeb(){
    this.service.loadAPI(this.ingredients);
    this.recAPI=this.service.getAllAPI();
  }
}
type APIresp ={
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
  

