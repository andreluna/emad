import { Injectable } from "@angular/core";
import * as _moment from 'moment';
import { RelatorioMedicamentoService } from "./relatorio-medicamento.service";
import { MedicamentoExtratoMovimentoService } from "../../farmacia/relatorios/medicamento-extrato-movimento/medicamento-extrato-movimento.service";

@Injectable()
export class MedicamentoExtratoMovimentoImpressaoService extends RelatorioMedicamentoService{
    constructor(private medicamentoExtratoMovimentoService: MedicamentoExtratoMovimentoService){
        super();

        this.style = `<style type="text/css">
        
        @page { size: auto;  margin: 5mm; }

        .hidden-button{
            display: block;
        }

        div.page div.print-footer {
            /*Oculta os rodapes de impressão*/
            display: none;
        }
    
        @media print {
            html, body {
                min-height: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            .hidden-button{
                display: none;
            }
    
            footer {
                /*some com o rodapé original*/
                display: none;
            }
    
            div.page div.print-footer {
                /*exibe os rodapés de impressão (que no caso são divs)*/
                display: block;
                position: relative;
                top: 98%;
                margin-top: -2%;
                height: 2%; /*quando ajustar a altura deves ajustar margin-top e o top*/
            }
    
            div.content {
                /*Ajuda a trabalhar o conteudo com o .print-footer*/
                position: relative;
                background-color: #f00;
                top: 0;
                left: 0;
            }
    
            div.page {
                /*Força sempre quebrar a página no final*/
                page-break-after: always;
                max-height: 95%;
                height: 95%;
                background-color: #fc0;
            }
        }

        .row {
            margin-bottom: unset !important;
        }

        .collapsible {
            border-radius: 10px;
        }

        .table, th, td{
            border: 2px solid;
            padding: 5px 5px;
            font-size: 12px;
        }

        .container {
            width: 94%;
            margin-left: 30px;
            margin-right: 30px;
        }
        
        .collapsible-body{
            display: block !important;
        }
        
        .input-field{
            margin-top: unset !important;
        }
        
        .cor_topo {            
            color: #000000;
        }</style>`
    }

    imprimir(object: any, nomeEstabelecimento: string, criteriosPesquisa: any, target: string = '_blank'){
        
        this.medicamentoExtratoMovimentoService.carregaMedicamentoExtratoMovimento(object.idMaterial, object.params)
        .subscribe((medicamentos) => { 
        let gridMedicamentos = ''; 
      
        gridMedicamentos += (`
                                   <table class="table table-striped">
                                   <thead>
                                       <tr style="text-align: center;">                                           
                                           <th style="width:8%">Data</th>    
                                           <th style="width:8%">Documento</th>
                                           <th style="width:20%">Histórico</th>
                                           <th style="width:8%">Lote</th>
                                           <th style="width:8%">Quantidade</th>   
                                           <th style="width:8%">Saldo anterior</th>
                                           <th style="width:8%">Qtd. entrada</th>
                                           <th style="width:8%">Qtd. saída</th>
                                           <th style="width:8%">Qtd. perda</th>
                                           <th style="width:8%">Saldo atual</th>
                                           <th style="width:8%">Login</th>
                                       </tr>
                                   </thead>
                                 `); 

        gridMedicamentos += (medicamentos.length > 0 ? `<tbody>` : ``);                                 

        for (const medicamento of medicamentos) { 
            gridMedicamentos += (`
            <tr class="text-left">
                <td class="text-secondary">${medicamento.dataMovimentacao ? _moment(medicamento.dataMovimentacao).format('DD/MM/YYYY') : '' }</td>                                          
                <td class="text-secondary">${medicamento.idMovimentoGeral}</td>
                <td class="text-secondary">${medicamento.historico}</td>
                <td class="text-secondary">${medicamento.lote}</td> 
                <td class="text-secondary">${medicamento.quantidade}</td>                      
                <td class="text-secondary">${medicamento.saldoAnterior}</td>                
                <td class="text-secondary">${medicamento.quantidadeEntrada}</td>                
                <td class="text-secondary">${medicamento.quantidadeSaida}</td>                
                <td class="text-secondary">${medicamento.quantidadePerda}</td>                
                <td class="text-secondary">${medicamento.saldoAtual}</td>                
                <td class="text-secondary">${medicamento.nomeUsuario}</td>   
            </tr>`);
        }   

        gridMedicamentos += (medicamentos.length > 0 ? `</tbody></table><br/>` : `</table><br/>`);

        let tela = `
        <div class="page">
            <div class="content">
                <form class="container" id="form" style="font-size: 12px;">
                    <div class="row hidden-button" style="margin-bottom: 10px !important;">
                        <a class="waves-effect waves-light btn" style="float:right; margin-right:1%" onclick="window.print()">Imprimir</a>
                    </div>
                    <div class="row">
                        <div class="col s4" style="margin-top:20px;">
                            <img style="width:60%; float:left; margin-left:10px;" src="${window.location.origin}${window.location.pathname}/assets/imgs/logo_relatorio.png">
                        </div>                    
                        <div class="col s8" style="margin-top:40px;text-align: right; color: #7d0000; font-weight:bold">
                            Unidade: ${nomeEstabelecimento}  
                        </div>           
                        <div class="col s8" style="text-align: right; color: #7d0000; font-weight:bold">                
                            Extrato de movimentos
                        </div>           
                    </div>
                    <hr size = 7>                    
                    <div class="row"> 
                        &nbsp;&nbsp;&nbsp;&nbsp;<b>CRITÉRIOS DE PESQUISA</b>
                        <div class="col s12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Período: ${criteriosPesquisa.dataInicial ? _moment(criteriosPesquisa.dataInicial).format('DD/MM/YYYY') : ''} à ${criteriosPesquisa.dataFinal ? _moment(criteriosPesquisa.dataFinal).format('DD/MM/YYYY') : ''}
                        </div>   
                        <div class="col s12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unidade: ${criteriosPesquisa.nomeEstabelecimento ? criteriosPesquisa.nomeEstabelecimento : "Todas as unidades"}
                        </div>   
                        <div class="col s12">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Medicamento: ${criteriosPesquisa.nomeMaterial ? criteriosPesquisa.nomeMaterial : "Todos os medicamentos"}
                        </div>   
                    </div>
                    <hr size = 7>
                    <br/>      
                    <div class="row"> 
                        ${gridMedicamentos}   
                    </div>
                </form>    
            </div>
        </div>`
            
        this.print(tela, "", "Relatório-Medicamento-Extrato-Movimento", target);
        });
    }

    exportar(object: any, nomeEstabelecimento: string, criteriosPesquisa: any){        
        var data = [];

        this.medicamentoExtratoMovimentoService.carregaMedicamentoExtratoMovimento(object.idMaterial, object.params)
        .subscribe((medicamentos) => { 
            
            data.push({ coluna1: 'Unidade: ' + nomeEstabelecimento, coluna2: '', coluna3: '', coluna4: '', coluna5: '', coluna6: '', coluna7: '', coluna8: '', coluna9: '', coluna10: '', coluna11: ''});
            data.push({ coluna1: 'Extrato de movimentos', coluna2: '', coluna3: '', coluna4: '', coluna5: '', coluna6: '', coluna7: '', coluna8: '', coluna9: '', coluna10: '', coluna11: ''});
            
            data.push({ coluna1 : '', coluna2: '', coluna3: '', coluna4: '', coluna5: '', coluna6: '', coluna7: '', coluna8: '', coluna9: '', coluna10: '', coluna11: ''});
            
            data.push({ coluna1: 'CRITÉRIOS DE PESQUISA', coluna2: '', coluna3: '', coluna4: '', coluna5: '', coluna6: '', coluna7: '', coluna8: '', coluna9: '', coluna10: '', coluna11: ''});
            data.push({ coluna1: 'Período: ' + (criteriosPesquisa.dataInicial ? _moment(criteriosPesquisa.dataInicial).format('DD/MM/YYYY') : '') + " à " + (criteriosPesquisa.dataFinal ? _moment(criteriosPesquisa.dataFinal).format('DD/MM/YYYY') : '') , coluna2: '', coluna3: '', coluna4: '', coluna5: '', coluna6: '', coluna7: '', coluna8: '', coluna9: '', coluna10: '', coluna11: ''});
            data.push({ coluna1: 'Unidade: ' + (criteriosPesquisa.nomeEstabelecimento ? criteriosPesquisa.nomeEstabelecimento : "Todas as unidades") , coluna2: '', coluna3: '', coluna4: '', coluna5: '', coluna6: '', coluna7: '', coluna8: '', coluna9: '', coluna10: '', coluna11: ''});            
            data.push({ coluna1: 'Medicamento: ' + (criteriosPesquisa.nomeMaterial ? criteriosPesquisa.nomeMaterial : "Todos os medicamentos") , coluna2: '', coluna3: '', coluna4: '', coluna5: '', coluna6: '', coluna7: '', coluna8: '', coluna9: '', coluna10: '', coluna11: ''});
            
            data.push({ coluna1 : '', coluna2: '', coluna3: '', coluna4: '', coluna5: '', coluna6: '', coluna7: '', coluna8: '', coluna9: '', coluna10: '', coluna11: ''});

            data.push({ coluna1: 'Data', 
                            coluna2: 'Documento',
                            coluna3: 'Histórico',
                            coluna4: 'Lote', 
                            coluna5: 'Quantidade',
                            coluna6: 'Saldo anterior',
                            coluna7: 'Qtd. entrada',
                            coluna8: 'Qtd. saída',
                            coluna9: 'Qtd. perda',
                            coluna10: 'Saldo atual',
                            coluna11: 'Login', });

            data.push({ coluna1 : '', coluna2: '', coluna3: '', coluna4: '', coluna5: '', coluna6: '', coluna7: '', coluna8: '', coluna9: '', coluna10: '', coluna11: ''});

            for (const medicamento of medicamentos) {  
                data.push({ coluna1: (medicamento.dataMovimentacao ? _moment(medicamento.dataMovimentacao).format('DD/MM/YYYY') : '') , 
                    coluna2: medicamento.idMovimentoGeral,
                    coluna3: medicamento.historico,
                    coluna4: medicamento.lote,                                        
                    coluna5: medicamento.quantidade,
                    coluna6: medicamento.saldoAnterior,
                    coluna7: medicamento.quantidadeEntrada,
                    coluna8: medicamento.quantidadeSaida,
                    coluna9: medicamento.quantidadePerda,
                    coluna10: medicamento.saldoAtual,
                    coluna11: medicamento.nomeUsuario});
                }  

            this.exportCsv(data,"Relatório-Medicamento-Extrato-Movimento" );
        });
    }
}