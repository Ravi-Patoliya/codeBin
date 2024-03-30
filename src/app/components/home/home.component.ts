import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../models/snippet.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(private dbService:DbService) { }
items:any[] = []

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.dbService.getAllSnippets().then((snippets)=>{
    this.items = snippets
  })
}
}
