import { Component, Input } from '@angular/core';

import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event: Event;

  isToday(eventdate) {
    const q = new Date();
    const m = q.getMonth()+1;
    const d = q.getDate();
    const y = q.getFullYear();

    const date = new Date(eventdate);
    const m2 = date.getMonth()+1;
    const d2 = date.getDate();
    const y2 = date.getFullYear();

    if (d === d2 && y === y2 && m === m2) {
      return true;
    } else
    {return false;}

  }
}
