import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'profile-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

    @Input() userData:any;

  constructor() { }

  ngOnInit(): void {
  }

}
