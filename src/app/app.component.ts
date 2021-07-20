import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
 import { Employee } from './employee';
import { EmployeeService } from './Services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  public employees: Employee[] = [];
  public editEmployee?: Employee;
  public deleteEmployee!: Employee;
  
  ngOnInit(): void {
    this.getEmployees();
  }
  constructor(private employeeService: EmployeeService) { }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response : Employee[]) =>{
        this.employees = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    console.log(addForm.value);
    addForm.value.phone = "+" + addForm.value.countryCode +  addForm.value.phone;
    console.log(addForm.value);
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) =>{
        console.log("Error" + response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    document.getElementById('update-employee-form')?.click();
    
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) =>{
        console.log("Error" + response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
  
  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) =>{
        console.log("Error" + response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
    document.getElementById('delete-employee-form')?.click();
  }

   public onModalClick(employee: any, mode: string){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModel')
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModel')
    }
    if(mode === 'update'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModel')
    }

    container?.appendChild(button);
    button.click();
  }

  

}
