import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm(null);
  }

  resetForm(form? : NgForm) {
    if(form!= null)
    form.reset();
    this.employeeService.selectedEmployee = {
      EmployeeID:null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    }
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    
    if(form.value.EmployeeID == null){
      this.employeeService.postEmployee(form.value)
      .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastr.success('Employee Registered', 'Success');
      });
    }else{
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
      .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastr.success('Employee Updated', 'Success');
      });
    }
  }
}
