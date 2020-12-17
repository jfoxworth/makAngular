import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserData } from '../../models/userData';
import {FormControl,  Validators} from '@angular/forms';

//Services
import { UserService } from '../../services/user.service';


@Component({
  selector: 'mak-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  constructor( private UserService : UserService ) { }

@Input() userData:UserData
@Input() viewType:number;
@Output() saveProfile = new EventEmitter<object>();
@Output() changeViewType = new EventEmitter<object>();

  ngOnInit(): void {
  }

}
