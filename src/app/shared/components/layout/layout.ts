import { Component, inject } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import { RouterOutlet } from "@angular/router";
import { Footer } from "../footer/footer";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [Header, Sidebar, RouterOutlet, Footer,CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {


  public sidebarService = inject(SidebarService);
}
