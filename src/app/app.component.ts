import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, MinLengthValidator, AbstractControl } from '@angular/forms';

import { CarsService, ICars } from './service/cars.service';

import { ToastrService } from 'ngx-toastr'

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
  submited: boolean = false;
  constructor(private carsService: CarsService, private toastrService: ToastrService) {
    
  }

  ngOnInit(){
    this.carsService.getCars().subscribe( (data: Array<ICars>) => {
      this.allCars = data;
      this.getUniqueArray(data, 'mark', this.carsMark)
    })
    this.setCarsFrom()
  }

  setCarsFrom(): void{
    this.carsForm = new FormGroup({
      mark: new FormControl('', Validators.required),
      model: new FormControl({value: '', disabled: true}, Validators.required),
      year: new FormControl({value: '', disabled: true}, Validators.required),
      needRepaired: new FormControl(''),
      categoryWork: new FormControl('', Validators.required),
      speedOfWork: new FormControl('', Validators.required),
      emirate: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      otherService: new FormArray([

      ]),
      date : new FormControl('', Validators.required)
    })
  }

  get f() { return this.carsForm.controls; }

  get otherServiceFormArray(): FormArray { return this.carsForm.get('otherService') as FormArray}


  selectedMark(mark): void{
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
    this.f.model.enable()
  }
  selectedModel(model): void{
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

  addOtherService(event, value, index): void{
    if (event.checked){
      this.otherServiceFormArray.push(new FormControl(value))
      return
    }
    this.otherServiceFormArray.removeAt(index)

  }

  dateChange(date): void{
    const selectDate = new Date(date).toLocaleDateString()
    this.f.date.setValue(selectDate)
  }

  clearForm(): void{
    this.carsForm.reset();
    this.f.model.disable();
    this.f.year.disable();
    this.step2 = false;
    this.submited = false;
  }

  submitForm(): void{
    this.submited = true
    this.f.needRepaired.setValidators([Validators.required, Validators.minLength(6)])
    this.f.needRepaired.updateValueAndValidity()
    if (this.carsForm.valid){
      this.carsService.regCar(this.carsForm.value).subscribe( data => {
        this.toastrService.success('Ваш заказ принят')
        this.submited = false;
        this.carsForm.reset(this.setCarsFrom())
        setTimeout(() => location.reload(), 1000)
        return
      })
      return
    }
    this.toastrService.error('Заполните форму')
  }


  getUniqueArray(fromArray, field:string, toArray): void{
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
