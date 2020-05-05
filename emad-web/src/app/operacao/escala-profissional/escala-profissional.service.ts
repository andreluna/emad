import { Injectable } from '@angular/core';
import { GenericsService } from '../../_core/_services/generics.service';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';

@Injectable()
export class EscalaProfissionalService extends GenericsService{
  
  fields: any[] = [
    {
      field: "id",
      type: "hidden",
      label: "Id",
      grid: true,
      form: true,
      required: false,
      validator: ['', '']
    },
    {
      field: "idCaneta",
      type: "select",
      label: "Caneta",
      grid: false,
      form: true,
      required: false,
      validator: ['', ''],
      filter: {
        type: "select"
      }
    },
    {
      field: "nomeCaneta",
      type: "text",
      label: "Caneta",
      grid: true,
      form: false,
      required: true,
      validator: ['', ''],
    },
    {
      field: "idMesEscala",
      type: "select",
      label: "Mês de escal",
      grid: false,
      form: true,
      required: false,
      validator: ['',  ''],
      filter: {
        type: "select"
      }
    },    
    {
      field: "nomeProfissional",
      type: "text",
      label: "Nome do profissional",
      grid: true,
      form: false,
      required: false,
      validator: ['', ''],
    },	      
    {
      field: "periodoInicial",
      type: "text",
      label: "Data de atribuição inicial",
      grid: true,
      form: true,
      required: false,
      validator: ['', ''],
      filter: {
        type: 'date',
        placeHolder: '99/99/9999'
      }
    },	  	      
    {
      field: "periodoFinal",
      type: "text",
      label: "Data de atribuição final",
      grid: true,
      form: true,
      required: false,
      validator: ['', ''],
    },
    {
      field: "situacao",
      type: "text",
      label: "Situação",
      grid: true,
      form: true,
      required: true,
      validator: ['', Validators.required]
    }
    ];

    carregaAusenciaPorProfissional(id: any): Observable<any> {
        return this.http.get(this.url + "ausencia-profissional/profissional/" + id, { headers: this.headers }).map(res => res.json());
    }

    salvaAusencia(obj: any) {
      if (obj.id) {
          return this.http
              .put(this.url + 'ausencia-profissional', JSON.stringify(obj), { headers: this.headers })
              .map((res) => res.json());
      }
      else {
          return this.http
              .post(this.url + 'ausencia-profissional', JSON.stringify(obj), { headers: this.headers })
              .map((res) => res.json());
      }
    }

    removeAusencia(params: any) {
      return this.http.delete(this.url + 'ausencia-profissional/' + params, { headers: this.headers }).map(res => res.json());
    }

    carregaEscalaProfissionalAnoMes(id: any, anoMes: string): Observable<any> {
      return this.http.get(this.url + 'escala-profissional' + "/profissional/" + id + "/anomes/" + anoMes, { headers: this.headers }).map(res => res.json());
    }

    salvaEscalaProfissional(obj: any) {
      if (obj.id) {
          return this.http
              .put(this.url + 'escala-profissional', JSON.stringify(obj), { headers: this.headers })
              .map((res) => res.json());
      }
      else {
          return this.http
              .post(this.url + 'escala-profissional', JSON.stringify(obj), { headers: this.headers })
              .map((res) => res.json());
      }
    }

}