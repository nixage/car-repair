import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { CarsService, ICars } from './service/cars.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'car-repair';
  allCars: Array<ICars>;


  /* STEP 1 */ 
  carsMark: Array<string> = [];
  carsModel: Array<string> = [];
  carsYear: Array<string> = []
  /* ===== */

  /* STEP 2 */
  date: Date = new Date()
  step2: boolean = false;
  categoryWork: Array<object> = [
    {category: 'A', title: 'Scrap – complete vehicle crushed without any components being removed.'},
    {category: 'B', title: 'Break – body-shell/chassis crushed without any structural components being removed'},
    {category: 'S', title: 'Structurally damaged but repairable.'},
    {category: 'N', title: 'Non-structurally damaged but repairable.'}
  ]
  area: string[] = ['Chicago', 'New Mexico', 'Phoenix']
  otherService: Array<string> = ['Need tow Truch', 'Need car Pickup', 'Custom Parts']

  /* ====== */

  carsForm: FormGroup;
  constructor(private carsService: CarsService) {
    
  }

  ngOnInit(){
    this.carsService.getCars().subscribe( (data: Array<ICars>) => {
      this.allCars = data;
      this.getUniqueArray(data, 'mark', this.carsMark)
    })
    this.carsForm = new FormGroup({
      mark: new FormControl('', Validators.required),
      model: new FormControl({value: '', disabled: true}, Validators.required),
      year: new FormControl({value: '', disabled: true}, Validators.required),
      categoryWork: new FormControl('', Validators.required),
      speedOfWork: new FormControl('', Validators.required),
      emirate: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      otherService: new FormArray([

      ]),
      date : new FormControl('')
    })

  }

  get f() { return this.carsForm.controls; }

  get otherServiceFormArray() { return this.carsForm.get('otherService') as FormArray}


  selectedMark(mark){
    if (this.carsModel.length != 0){
      if (this.carsYear.length != 0){
        this.carsYear = []
        this.f.year.setValue({value: '', disabled: true}, Validators.required)
        this.f.year.disable()
      }
      this.carsModel = []
      this.f.model.setValue({value: '', disabled: true}, Validators.required)
      this.f.model.disable()
    }
    let selectMark = this.allCars.filter( (val ) => val.mark == mark)
    this.getUniqueArray(selectMark, 'model', this.carsModel)
    console.log(this.f.model)
    this.f.model.enable()
  }
  selectedModel(model){
    if (this.carsYear.length != 0){
      this.carsYear = []
      this.f.year.setValue({value: '', disabled: true}, Validators.required)
    }
    let selectModel = this.allCars.filter( (val ) => val.model == model)
    this.getUniqueArray(selectModel, 'year', this.carsYear)
    this.f.year.enable()
  }

  selectedYear(){
    this.step2 = true
  }

  addOtherService(event, value, index){
    console.log(index)
    if (event.checked){
      this.otherServiceFormArray.push(new FormControl(value))
      console.log(this.otherServiceFormArray)
      return
    }
    this.otherServiceFormArray.removeAt(index)

    console.log(this.otherServiceFormArray)
  }

  clearForm(){
    this.carsForm.reset()
    this.f.model.disable()
    this.f.year.disable()
    this.step2 = false
  }

  submitForm(){
    console.log(this.carsForm.value)
    this.carsService.regCar(this.carsForm.value).subscribe( data => console.log(data))
  }


  getUniqueArray(fromArray, field:string, toArray){
    fromArray.forEach( (val, ind) => {
      if (toArray.indexOf(val[field]) === -1){
        toArray.push(val[field])
      }
    })
  }

  trackByFn(index, item) {  
    return item.id; // уникальный идентификатор, соответствующий элементу
 }


}
