import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CondicionComponent } from "./condicion.component";
import { MetadataService } from "app/services/metadata.service";
import { CondicionService } from "app/services/condicion.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClientModule } from "@angular/common/http";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Condicion } from "app/models/condicion";
import { reject } from "q";

describe("CondicionComponent", () => {
  let component: CondicionComponent;
  let fixture: ComponentFixture<CondicionComponent>;

  const MockCondicionService = {
    provide: CondicionService,
    useValue: {
      getLastCondicao: () => {},
      getSequenciasAcesso: () => {},
      getChaveContas: () => {},
      getTiposValor: () => {},
      getCamadas: () => {},
      getCondicaos: () => {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CondicionComponent],
      providers: [
        MetadataService,
        CondicionService,
        NgxSpinnerService,
        MockCondicionService
      ],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("values init", () => {
      expect(component.message).toEqual({});
      expect(component.selectedProperties).toEqual([]);
      expect(component.condicion).toEqual(new Condicion());
    });

    //   it('should fetch the user', () => {
    //     // Arrange
    //     const fetchUserSpy = spyOn(component.condicionService, 'getLastCondicao').and.returnValue(new Promise((resolve, reject) => {

    //     }));

    //     // Act
    //     component.ngOnInit();

    //     // Assert
    //     expect(fetchUserSpy).toHaveBeenCalled();
    // });

    it("getLastCondicao()", done => {
      component.condicionService.getLastCondicao().then((result: any) => {
        const props = [
          "Cod_Condicao",
          "Desc_Condicao",
          "Escala_Qtde",
          "POS_NEG",
          "TIP_BASE_VENDAS",
          "MANDATORIA",
          "ESTATISTICA",
          "value",
          "Cod_Camada",
          "Cod_ChaveContas",
          "Cod_TipoValor",
          "sequencias"
        ];
        const keys = Object.keys(result);
        props.forEach(prop => {
          const exist = keys.some(key => key == prop);
          expect(exist).toBeTruthy();
        });
        done();
      });
    });
  });
});
