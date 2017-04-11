import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { EventsService } from '../../services/events.service';
import { Eventdetail } from '../../models/event-detail.model';
import { GuestlistComponent } from '../../guestlist/guestlist.component';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.scss']
})
export class EventdetailComponent implements OnInit {
  show: Eventdetail;
  error: boolean;
  edit_times: boolean;
  edit_bandleader: boolean;
  edit_address: boolean;
  edit_detail: boolean;
  edit_titel: boolean;
  admin = (localStorage.getItem('role') === 'admin');

  constructor(
    private titleService: Title,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private router: Router) { }

    getEvent() {
      this.route.params.forEach((params: Params) => {
        const event_id = params['id'];
        this.eventService
        .getEvent$(event_id)
        .subscribe(
          res => {
            if (res.links == null) {res.links = {}; };
            if (res.times == null) {res.times = {}; };
            this.show = res;
            this.titleService.setTitle(this.show.titel+" | Bandcommander");
          },
          err => {
            this.error = true; }
          );

        });
      }
      saveDate($event){
        this.show.date = $event.target.value
        this.saveEditable();
      }

      saveEditable() {
        console.log(this.show);
        this.eventService
        .saveEvent$(this.show)
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            this.error = true; }
          );
        }

        editTimes() {
          this.edit_times = !this.edit_times;
        }
        editDetail() {
          this.edit_detail = !this.edit_detail;
        }
        editAddress() {
          this.edit_address = !this.edit_address;
        }
        editBandleader() {
          this.edit_bandleader = !this.edit_bandleader;
        }
        editTitel() {
          this.edit_titel = !this.edit_titel;
        }

        deleteEvent() {
          const confirmation = confirm('Sicher löschen?');
          if (!confirmation) { return true; }
          this.route.params.forEach((params: Params) => {
            this.eventService
            .deleteEvent$(params['id'])
            .subscribe(
              res => {
                this.router.navigate(['/']);
              },
              err => {
                this.error = true; }
              );
            });
          }

          ngOnInit() {
            this.getEvent();
            this.edit_times = false;
            this.edit_address = false;
            this.edit_detail = false;
            this.edit_bandleader = false;
            this.edit_titel = false;
          }
        }
