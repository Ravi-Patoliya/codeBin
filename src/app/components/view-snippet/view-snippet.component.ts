import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Snippet } from '../../models/snippet.model';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.scss'
})
export class ViewSnippetComponent {
constructor(private dbService:DbService,private route:ActivatedRoute) { }
codeSnippet:Snippet = {
  title: "",
  code: "",
 };
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
this.dbService.getSnippetById(id!).then((snippet:any)=>{
  console.log(snippet)
this.codeSnippet = snippet;

})
}
}
