import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from '../backend.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  constructor(private http: HttpClient, private apiService: ApiService) { }
  contactList!:any;
  editContact:any={};
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('modalEdit') modalEdit!: ElementRef;
  
  ngOnInit(){
    this.fetchData();
  }

  ngAfterViewInit(){
    console.log(this.modal.nativeElement);
  }

  fetchData() {

    this.apiService.getData().subscribe(
      response => {
        console.log("response",response)
        this.contactList = response;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );

  }

  closeModal(){
    if (this.modal && this.modal.nativeElement) {
      this.modal.nativeElement.style.display = 'none';
    }
    if (this.modalEdit && this.modalEdit.nativeElement) {
      this.modalEdit.nativeElement.style.display = 'none';
    }
  }

  openModal(){
    if (this.modal && this.modal.nativeElement) {
      this.modal.nativeElement.style.display = 'block';
    }
  }

  openModalEdit(contact:any){
    this.editContact = structuredClone(contact);
    if (this.modalEdit && this.modalEdit.nativeElement) {
      this.modalEdit.nativeElement.style.display = 'block';
    }
  }

  createContact(data:any) {
    console.log("Entered Email id : ",data);
    const contact = {
      name: data.name,
      email: data.email,
      phone: data.phone
    }
    this.apiService.createContact(contact).subscribe(
      response => {
        console.log("response",response)
        this.contactList = response;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.fetchData();
    this.closeModal();
 }

 deleteContact(data:any){
  this.apiService.deleteContact(data._id).subscribe(
    response => {
      console.log("response",response);
      this.fetchData();
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
  
 }

 editContactSubmit(data:any){
  this.apiService.editContact(this.editContact._id,data).subscribe(
    response => {
      console.log("response",response);
      this.fetchData();
      this.closeModal()
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
 }
}
