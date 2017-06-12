import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Event } from '../models/event.model';
import { ActivatedRoute, Params } from '@angular/router';

import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  error: boolean;
  admin = (localStorage.getItem('role') === 'admin');
  @Input() show;
  @Output() addDocumentEvent = new EventEmitter();
  @Output() removeDocumentEvent = new EventEmitter();
  @ViewChild('documentUploadForm') fileForm: any;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
  }

  removeDocument(document){
    this.documentService
    .removeDocument$(document)
    .subscribe(
      res => {
        this.removeDocumentEvent.emit(document);
      },
      err => {
        this.error = true; }
      );
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
            this.addDocumentEvent.emit(res);
            this.fileForm.nativeElement.value = "";
          },
          err => {
            this.error = true; }
          );
        });
      }


    }
  }
