import {Component, signal} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Navbar} from './components/navbar/navbar';
import { Footer } from './components/footer/footer';


@Component({  selector: 'app-root',
  imports: [RouterModule, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('style-proyect');
}