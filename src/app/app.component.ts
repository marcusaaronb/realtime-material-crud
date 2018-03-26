import { Component } from '@angular/core';

// angularfire2
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// observable
import { Observable } from 'rxjs/Observable';

export interface IStudent {
  id?:string;
  fname: string;
  mi: string;
  lname: string;
  course: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  data:any = {};
  studentCollectionRef: AngularFirestoreCollection<IStudent>;
  student$: Observable<IStudent[]>;
  studentID:any;
  buttonDisable: boolean = false;
  isCancel: boolean = true;
  isAlert: boolean = false;
  isAdd: boolean = false;
  errorMessage: string = null;
  alertStyle:string;

  constructor(private afs: AngularFirestore) {
    this.init();
  }

  public init(){
    // collection
    this.studentCollectionRef = this.afs.collection<IStudent>('students');
    // get data with ref id
    this.student$ = this.studentCollectionRef.snapshotChanges().map( actions => {
      return actions.map( actions => {
        const data = actions.payload.doc.data() as IStudent;
        const id = actions.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  alert(boolean = true, message, style = "success"){
    this.isAlert = boolean;
    this.errorMessage = message;
    this.alertStyle = style;
  }

  clear(){
    // Clear data after Save
    this.data.id = null;
    this.data.fname = null;
    this.data.mi = null;
    this.data.lname = null;
    this.data.course = null;
  }

  public doSave(data:any){
    if(
      data.fname && data.fname.trim().length &&
      data.mi && data.mi.trim().length &&
      data.lname && data.lname.trim().length &&
      data.course && data.course.trim().length
    ){

      // save
      let datas = {
        fname : data.fname,
        mi : data.mi,
        lname : data.lname,
        course : data.course
      }
   
      if(data.id == undefined){
        // Add Query
        this.studentCollectionRef.add(datas);
        // Clear data after Save
        this.clear();
        this.alert(true,"Save Success!");
        this.isAdd = false;
      }else{
        // update
        this.studentCollectionRef.doc(data.id).update(datas);
        this.alert(true,`Update Success Ref ID = ${data.id}`);
        this.clear();
        this.buttonDisable = false;
        this.isCancel = true;
        this.isAdd = false;
      }
      
    }else{
      this.alert(true,"Insufficient Data!","danger");
    }
  }

  public doUpdate(student){
    this.isAlert = false;
    this.data.id = student.id;
    this.data.fname = student.fname;
    this.data.mi = student.mi;
    this.data.lname = student.lname;
    this.data.course = student.course;
    this.buttonDisable = true;
    this.isCancel = false;
    this.isAdd = true;
  }

  public doDelete(student:any){
    if(confirm("Are you sure you want to delete?")){
      this.studentCollectionRef.doc(student.id).delete();
      this.alert(true,`Successful Deleted Ref ID = ${student.id}`,"danger");
      this.isAdd = false;
    }
  }

  public doCancel(){
    this.clear();
    this.buttonDisable = false;
    this.isCancel = true;
    this.isAlert = false;
    this.isAdd = false;
  }

  public search(event){
    let data = event.target.value;
    if(data !== ""){
      this.student$ = this.afs.collection<IStudent>('students', ref => ref
                                                    .orderBy('lname')
                                                    .startAt(data)
                                                    .endAt(data+"\uf8ff")).snapshotChanges().map( actions => {
                                                      return actions.map( actions => {
                                                        const data = actions.payload.doc.data() as IStudent;
                                                        const id = actions.payload.doc.id;
                                                        return { id, ...data };
                                                      });
                                                    });
    }else{
      this.init();
    }
    this.isAlert = false;
  }

  doAdd(){
    this.isAdd = true;
    this.isCancel = false;
    this.isAlert = false;
  }

}
