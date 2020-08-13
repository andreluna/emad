import { NgModule } from '@angular/core';
import { CoreModule } from '../../_core/core.module';
import { MedicamentoPacienteImpressaoService } from './medicamento-paciente.service';
import { PacienteMedicamentoImpressaoService } from './paciente-medicamento.service';
import { MedicamentoProfissionalImpressaoService } from './medicamento-profissional.service';
import { ProfissionalMedicamentoImpressaoService } from './profissional-medicamento.service';
import { MedicamentoVencidoVencerImpressaoService } from './medicamento-vencido-vencer.service';
import { MedicamentoMovimentoImpressaoService } from './medicamento-movimento.service';
import { MedicamentoExtratoMovimentoImpressaoService } from './medicamento-extrato-movimento.service';

@NgModule({
    imports: [
        CoreModule
    ],
    declarations: [],
    providers: [
        MedicamentoPacienteImpressaoService,
        PacienteMedicamentoImpressaoService,
        MedicamentoProfissionalImpressaoService,
        ProfissionalMedicamentoImpressaoService,
        MedicamentoVencidoVencerImpressaoService,
        MedicamentoMovimentoImpressaoService,
        MedicamentoExtratoMovimentoImpressaoService
    ]
})
export class RelatorioMedicamentoModule { }