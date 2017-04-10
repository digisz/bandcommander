import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})

export class EventlistComponent implements OnInit {
  events: Event[];
  error: boolean;
  archive: boolean;
  pageName =  'Alle Events | Bandcommander' ;
  constructor(
    private titleService: Title,
    private eventsService: EventsService,
  private route: ActivatedRoute) { }
  getEvents(archive: boolean) {
    this.eventsService
      .getAllEvents$(archive)
      .subscribe(
res => {
this.events = res;
 },
err => {
this.error = true; }
); }

ngOnInit() {

this.titleService.setTitle(this.pageName);
// set archive to be false
this.archive = false;
// check if certain value is available - cheap hack going on here
if (this.route.snapshot.url[0]) {this.archive = true}
this.getEvents(this.archive);
 }
}
