import { Component, OnInit, Input } from '@angular/core';
import { UserData } from '../../models/userData';

@Component({
  selector: 'mak-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  constructor() { }

  @Input() userData:UserData
  @Input() viewType:number;

  ngOnInit(): void {
  }

}
