import { SaccesoService } from "./sacceso.service";
import { AuthenticationService } from "./authentication.service";
import { CamadaService } from "./camada.service";
import { TestBed, async, inject } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JWTInterceptorHelper } from "@helpers/jwt.interceptor";
import { SaccesoComponent } from "@app/components/sacceso/sacceso.component";
import { NgxSpinnerService } from "ngx-spinner";
import { PurchasePlanningService } from "./purchasePlanning.service";
import { EsquemasService } from "./esquemas.service";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 10;

const verifyKey = ({ props, data, expect }) => {
  const keys = Object.keys(data);
  props.forEach(prop => {
    const exist = keys.some(key => key == prop);
    expect(exist).toBeTruthy();
  });
};

describe("Services", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JWTInterceptorHelper,
          multi: true
        }
      ],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    inject(
      [AuthenticationService],
      (authenticationService: AuthenticationService) => {
        const email = "tester";
        const password = "@t@ng0@t3ch";
        authenticationService.login(email, password).subscribe(event => {
          console.log({ event });
        });
      }
    )();
  }));

  /*
  Test sacceso service
  */
  it("sacceso getCampos()", done => {
    inject([SaccesoService], (saccesoService: SaccesoService) => {
      saccesoService
        .getCampos()
        .then(data => {
          const props = ["Cod_Campo", "Nome_Campo"];
          verifyKey({ props, data: data[0], expect });
          console.log(data);
          done();
        })
        .catch(err => {
          console.log("error");
          console.log(JSON.stringify(err));
          done();
        });
    })();
  });

  it("sacceso postSecuencia()", done => {
    inject([SaccesoService], (saccesoService: SaccesoService) => {
      // const component = new SaccesoComponent(saccesoService, new NgxSpinnerService);
      // console.log({saveSuccess: component.saveSuccess})
      const mock = spyOn(saccesoService, "postSequencia").and.returnValue(
        new Promise((resolve, reject) => {
          resolve();
        })
      );

      mock().then(data => {
        done();
      });
    })();
  });

  it("sacceso postCampo()", done => {
    inject([SaccesoService], (saccesoService: SaccesoService) => {
      // const component = new SaccesoComponent(saccesoService, new NgxSpinnerService);
      // console.log({saveSuccess: component.saveSuccess})
      const mock = spyOn(saccesoService, "postCampo").and.returnValue(
        new Promise((resolve, reject) => {
          resolve();
        })
      );

      mock().then(data => {
        done();
      });
    })();
  });

  it("sacceso getLastSequencia()", done => {
    inject([SaccesoService], (saccesoService: SaccesoService) => {
      saccesoService
        .getLastSequencia()
        .then(data => {
          const props = ["Cod_Sequencia", "Nome_Sequencia", "campos"];
          const keys = Object.keys(data);
          props.forEach(prop => {
            const exist = keys.some(key => key == prop);
            expect(exist).toBeTruthy();
          });

          done();
        })
        .catch(err => {
          console.log("error");
          console.log(JSON.stringify(err));
          done();
        });
    })();
  });

  /*
  Test purchasePlanning service
  */

  it("purchasePlanningService planningData()", done => {
    inject(
      [PurchasePlanningService],
      (purchasePlanningService: PurchasePlanningService) => {
        purchasePlanningService.planningData.subscribe(event => {
          // done();
        });
      }
    )();
  });

  /*
  Test esquema service
  */

  it("Esquema getMercadoria()", done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getMercadoria().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it("Esquema getEsquemaRelation()", done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getEsquemaRelation().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it("Esquema getFilial()", done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getFilial().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it("Esquema getFaturamento()", done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getFaturamento().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it("Esquema getEstado()", done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getEstado().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it("Esquema getRegion()", done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getRegion().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it("Esquema fetchCondicaoCamadaEsquema('B')", done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.fetchCondicaoCamadaEsquema("B").then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it("Esquema fetchCondicaoCamadaEsquema('v')", done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.fetchCondicaoCamadaEsquema("v").then(data => {
        console.log(data);
        done();
      });
    })();
  });

  //
  //
  //
  //
});
