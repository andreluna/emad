import { Component, OnInit } from '@angular/core';
import { UnidadeMaterialService } from './unidade-material.service';
import { UnidadeMaterial } from '../../../_core/_models/UnidadeMaterial';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-unidade-material-form',
    templateUrl: './unidade-material-form.component.html',
    styleUrls: ['./unidade-material-form.component.css'],
    providers: [UnidadeMaterialService]
})

export class UnidadeMaterialFormComponent implements OnInit {

  object: UnidadeMaterial = new UnidadeMaterial();
  method: string = "unidade-material";
  fields: any[] = [];
  label: string = "Unidade de material";
  id: Number = null;
  domains: any[] = [];

  constructor(
    fb: FormBuilder,
    private service: UnidadeMaterialService,
    private route: ActivatedRoute) {
      this.fields = service.fields;
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

  }

}