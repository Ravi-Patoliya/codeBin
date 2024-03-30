import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../models/snippet.model';

@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.scss'
})
export class CreateBinComponent {
  title= new FormControl("",Validators.required);
  code= new FormControl("",Validators.required);

  binForm = new FormGroup({
  title: this.title,
  code: this.code
  });
    constructor(private dbService:DbService ) { }

    async save(){
      console.log(this.binForm.value);
     await this.dbService.createSnippet(this.binForm.value as Snippet);
    }
    reset(){
      this.binForm.reset();
    }
}
