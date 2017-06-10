import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { GuestlistService } from '../services/guestlist.service';
import { Guestlistguest } from '../models/guestlist-guest.model';

@Component({
  selector: 'app-guestlist',
  templateUrl: './guestlist.component.html',
  styleUrls: ['./guestlist.component.scss']
})


export class GuestlistComponent implements OnInit {
  emailField: boolean;
  guestlist: Guestlistguest[];
  error: boolean;
  messageSent: boolean;
  messageSentTo: String;
  currentUser = {name: localStorage.getItem('username'), role: localStorage.getItem('role')};
  newGuest = {name: '', plus: '', addUser: this.currentUser.name, eventID: ''};
  sendguestlist = { eventID: '', email: '', guests: {}};

  constructor(
    private guestlistService: GuestlistService,
    private route: ActivatedRoute) { }

    getGuestlist() {
      this.route.params.forEach((params: Params) => {
        this.guestlistService
        .getGuestlist$(params['id'])
        .subscribe(
          res => {
            this.guestlist = res;
          },
          err => {
            this.error = true; }
          );
        });
      }

      addGuest() {
        this.route.params.forEach((params: Params) => {
          this.newGuest.eventID = params['id'];
          this.guestlistService
          .addGuest$(this.newGuest)
          .subscribe(
            res => {
              this.guestlist.push(res);
              this.newGuest.name = '';
              this.newGuest.plus = '';
            },
            err => {
              this.error = true; }
            );
          });
        }

        // function that is called when someone clicks delete this guest
        deleteGuest(guest: Guestlistguest) {
          this.route.params.forEach((params: Params) => {
            this.guestlistService
            .deleteGuest$(guest._id)
            .subscribe(
              res => {
                return true;
              },
              err => {
                this.error = true; }
              );
            });

            const index = this.guestlist.indexOf(guest);
            this.guestlist.splice(index, 1);
          }

          // function that is called when someone clicks delete this guest
          sendGuestlist() {
            this.route.params.forEach((params: Params) => {
              this.sendguestlist.eventID = params['id'];
              this.sendguestlist.guests = this.guestlist;
              this.messageSent = true;
              this.messageSentTo = this.sendguestlist.email;
              this.guestlistService
              .sendGuestlist$(this.sendguestlist)
              .subscribe(
                res => {
                  this.sendguestlist.email = '';
                  return true;
                },
                err => {
                  this.error = true; }
                );
              });
            }

          showEmail() {
            this.emailField = true;
            this.messageSent = false;
          }

          ngOnInit() {
            this.getGuestlist();
            this.emailField = false;
            this.error = false;
            this.messageSent= false;
          }
        }
