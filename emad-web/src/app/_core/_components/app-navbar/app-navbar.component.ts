import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppNavbarService } from './app-navbar.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../login/login.service';
import { AppComponent } from '../../../app.component';
import { AuthGuard } from '../../_guards';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Util } from '../../_util/Util';


@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  

  route: string = "";
  app: AppComponent;
  @Input() classe: string;
  menus: any[];
  service: AppNavbarService;
  logo: string = 'assets/imgs/logo.png';
  idEstabelecimento: Number = null;
  modalRef: NgbModalRef;
  estabelecimentos : any[] = [];

  @ViewChild('content') content: ElementRef;
  allowCancelButton : Boolean = false;

  public isCollapsed = true;

  constructor(
    public loginService: LoginService,
    private router: Router,
    location: Location,
    app: AppComponent,
    service: AppNavbarService,
    private auth: AuthGuard,
    private modalService: NgbModal
  ) {

    this.app = app;
    this.service = service;


    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
      } else {
        this.route = '';
      }
    });

    if (localStorage.getItem('menu')) {
      this.menus = JSON.parse(localStorage.getItem('menu'));
    }
    else {
      this.getMenuLista();
    }

    this.getLogo();
  }

  sair() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  menuToggle(event) {
    event.preventDefault();

    this.app.abre();
  }


  getMenuLista() {
    this.menus = JSON.parse(localStorage.getItem('menu'));
  }

  getLogo() {
    let user = this.auth.getUser();
    if (user) {
      if (user.logo != "") {
        this.logo = "assets/imgs/logo.png";
      }

    }
  }

  open() {

    this.idEstabelecimento = !Util.isEmpty(JSON.parse(localStorage.getItem("est"))) ? +JSON.parse(localStorage.getItem("est"))[0].id : null;

    this.service.list("estabelecimento").subscribe(result =>{
      this.estabelecimentos = result;

      this.modalRef = this.modalService.open(this.content, {
        backdrop: 'static',
        centered: true,
        keyboard: false
      });
      
    }, error =>{
      console.log("Erro ao resgatar estabelecimentos!");
    });
    
  }
  
  ngOnInit(): void {  
    
    if (localStorage.getItem('est')) {
      this.allowCancelButton = true;
    }
    else {
      this.open();    
      this.allowCancelButton = false;
    }
    
  }

  populateEstabelecimento(){
    let estabelecimento = {};

    estabelecimento = this.estabelecimentos.filter((estabelecimento) => estabelecimento.id == this.idEstabelecimento);

    this.allowCancelButton = true;
    localStorage.setItem('est', JSON.stringify(estabelecimento));
    this.modalRef.close();
    window.location.href = "";

  }
}
