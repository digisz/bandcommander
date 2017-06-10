import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../models/event.model';
import { ActivatedRoute, Params } from '@angular/router';

import { DocumentService } from '../services/document.service';
import { Document } from '../models/document.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  newDocument = {'key':"",'path':"",  'name':"",'location':""};
  error: boolean;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // TODO
    /*
    1. load all files for this event
    2. init with document name
    */
  }

  addDocument(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('document', file);
      this.route.params.forEach((params: Params) => {
        formData.append('location',params['id']);
        this.documentService
        .addDocument$(formData)
        .subscribe(
          res => {
            console.log(res);
            //TODO post document path and name to event (after the file url has been returned)
          },
          err => {
            this.error = true; }
          );
        });
      }


    }
  }
