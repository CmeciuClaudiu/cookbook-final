import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DtoRecipeModel } from 'src/app/models/recipe-models';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  @Input()
  recipesListDto: DtoRecipeModel[] = [];
  filteredRecipesDto: DtoRecipeModel[] = [];

  colNumber: number = 0;
  screenWidth: number = 0;
  showFilter: boolean = false;
  filterCtrl = new FormControl;
  @Output() recipeId = new EventEmitter<string>();


  constructor() {

  }

  ngOnInit(){

  }

  @HostListener('window:resize', [])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  setColumnNumber() {
    if (this.screenWidth > 2010) {
      this.colNumber = 5;
      return;
    }

    if (this.screenWidth > 1630) {
      this.colNumber = 4;
      return;
    }

    if (this.screenWidth > 1200) {
      this.colNumber = 3;
      return;
    }

    if (this.screenWidth > 855) {
      this.colNumber = 2;
      return;
    }

    this.colNumber = 1;
    return; 
  }

  filterList($event: any) {
    this.filteredRecipesDto = this.filteredRecipesDto.filter(x => x.dishName.toLowerCase().includes(this.filterCtrl.value.toLowerCase()))

    if (this.filterCtrl.value === "") {
      this.filteredRecipesDto = this.recipesListDto;
    }
  }

  ngOnChanges() {
    this.filteredRecipesDto = this.recipesListDto;
  }

  ngDoCheck() {
    this.onResize();
    this.setColumnNumber();
  }

  sendRecipeId(id:string){
    this.recipeId.emit(id);
  }
}
