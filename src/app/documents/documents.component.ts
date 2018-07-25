import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from './document';
import { DocumentService } from './document.service';
import { timer } from 'rxjs';
import { timeInterval, pluck, take} from 'rxjs/operators';



@Component({
	moduleId: module.id,
	selector: 'documents',
	templateUrl: 'documents.component.html',
	styleUrls: ['documents.component.css'],
	providers: [ DocumentService ]
})
export class DocumentsComponent implements OnInit {
	pageTitle: string = "Document Dashboard"
	documents: Document[];
	errorMessage: string;
	mode = "Observable";

	constructor(
		private documentService: DocumentService
	) {}

	ngOnInit() {
		var time = timer(0, 5000)
	  .pipe(
	    timeInterval()
  )
		time.subscribe(() => this.getDocuments());
	}

	getDocuments() {
		this.documentService.getDocuments()
				.subscribe(
					documents => this.documents = documents,
					error => this.errorMessage = <any>error
				);
	}
}