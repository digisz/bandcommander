import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';


import { EventsService } from '../../services/events.service';
import { Eventdetail } from '../../models/event-detail.model';

@Component({
  selector: 'app-eventsetup',
  templateUrl: './eventsetup.component.html',
  styleUrls: ['./eventsetup.component.scss']
})
export class EventsetupComponent implements OnInit {

error: boolean;
show: Eventdetail;
admin = (localStorage.getItem('role') === 'admin');
  constructor(
    private titleService: Title,
    private eventService: EventsService,
    private router: Router,
  ) { }

  saveEvent() {
    console.log(this.show);

      this.eventService
      .saveEvent$(this.show)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/event/' + res.objectid]);
        },
          err => {
            this.error = true; }
          );
}

  ngOnInit() {
    this.show = new Eventdetail('', '', '');
    this.show.band = "Möchtegang";
    this.show.public = false;
    this.show.published = false;
  }

}
