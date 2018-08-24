import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsoleService } from '../console.service';

@Component({
  selector: 'admin-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  constructor(private srv: ConsoleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.srv.setAccountInfo({ accid: this.route.snapshot.params.accid });
  }

}
