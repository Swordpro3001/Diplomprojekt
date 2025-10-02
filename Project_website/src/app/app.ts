import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import { Footer } from "./footer/footer";
import { Team } from "./team/team";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Team],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Project_website');
}
