import { Component, OnInit } from '@angular/core';
import { AppNavbarService } from '../../_core/_components/app-navbar/app-navbar.service';
import { IntegracaoEsus } from '../../shared/services/integracao-e-sus.service';
import { IntegracaoEsusModel } from '../../_core/_models/IntegracaoEsus';
import { Util } from '../../_core/_util/Util';
declare function escape(s: string): string;

@Component({
  selector: 'app-esus',
  templateUrl: './esus.component.html',
  styleUrls: ['./esus.component.css'],
  providers: [IntegracaoEsus]
})

export class ESusComponent implements OnInit {

  object: IntegracaoEsusModel = new IntegracaoEsusModel();
  domains: any[] = [];
  periodoCriacao: boolean = false;
  periodoAlteracao: boolean = false;
  errors: any[] = [];
  loading: boolean = false;

  constructor(
    public nav: AppNavbarService,
    private service: IntegracaoEsus
  ) { }

  ngOnInit() {
    this.nav.show();
    this.loadDomain();
  }

  loadDomain() {
    this.domains.push({
      tipoFicha: [
        { id: '0', nome: "Todas" },
        { id: '2', nome: "Ficha de Cadastro Individual" },
        { id: '4', nome: "Ficha de Atendimento Individual" },
        { id: '7', nome: "Ficha de Procedimentos" },
        { id: '14', nome: "Ficha de Vacinação" }],
      tipoPeriodo: [
        { id: '1', nome: "Criação" },
        { id: '2', nome: "Alteração" }]
    });
  }

  tipoPeriodoAlterado(event) {
    if (event == 1) {
      this.periodoCriacao = true;
      this.periodoAlteracao = false;
    } else {
      this.periodoAlteracao = true;
      this.periodoCriacao = false;
    }
  }

  gerarXMLsPorTipoFicha() {
    this.service.obterXmlsPorTipoFicha(this.object).subscribe((result: ArrayBuffer) => {
      const blob = new Blob([result], { type: 'application/zip;' });
      const url = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = url;

      switch (this.object.idFichaEsus) {
        case '2':
          link.download = `lote-ficha-cadastro-individual.zip`;
          break;
        case '4':
          link.download = `lote-ficha-atendimento-individual.zip`;
          break;
        case '7':
          link.download = `lote-ficha-procedimentos.zip`;
          break;
        case '14':
          link.download = `lote-ficha-vacinacao.zip`;
          break;
        default:
          link.download = `lote-importacao-esus.zip`;
          break;
      }

      link.click();
    }, erro => {
      let encoded = String.fromCharCode.apply(null, new Uint8Array(erro) as any);
      let err = JSON.parse(decodeURIComponent(escape(encoded)));
      this.errors = Util.customHTTPResponse(err);
    });
  }
}