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
  validatingForm:any;
  buttonDisable: boolean = false;
  isCancel: boolean = true;

  constructor(private afs: AngularFirestore) {

    this.studentCollectionRef = this.afs.collection<IStudent>('students');
    this.student$ = this.studentCollectionRef.snapshotChanges().map( actions => {
      return actions.map( actions => {
        const data = actions.payload.doc.data() as IStudent;
        const id = actions.payload.doc.id;
        return { id, ...data };
      });
    });

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
      }else{
        // update
        this.studentCollectionRef.doc(data.id).update(datas);
        this.clear();
        this.buttonDisable = false;
        this.isCancel = true;
      }
      
    }else{
      alert('Insuficient Data');
    }
  }

  public doUpdate(student){
    this.data.id = student.id;
    this.data.fname = student.fname;
    this.data.mi = student.mi;
    this.data.lname = student.lname;
    this.data.course = student.course;
    this.buttonDisable = true;
    this.isCancel = false;
  }

  public doDelete(student:any){
    this.studentCollectionRef.doc(student.id).delete();
  }

  public doCancel(){
    this.clear();
    this.buttonDisable = false;
    this.isCancel = true;
  }

  public search(event){
    let data = event.target.value;
    console.log(data == "");
    if(data !== ""){
      this.student$ = this.afs.collection<IStudent>('students', ref => ref
                                                    .orderBy('lname')
                                                    .startAt(data)
                                                    .endAt(data+"\uf8ff")
                                                    .limit(10)).valueChanges();
    }
  }

}
