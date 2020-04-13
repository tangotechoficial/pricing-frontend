import { SaccesoService } from "./sacceso.service";
import { AuthenticationService } from "./authentication.service";
import { TestBed, async, inject } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JWTInterceptorHelper } from "@helpers/jwt.interceptor";
import { PurchasePlanningService } from "./purchasePlanning.service";
import { EsquemasService } from "./esquemas.service";
import { CondicionService } from './condicion.service';
import { Campo } from 'app/models/campo';


// Setea el tiempo de espera de la peticion
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
        },
        CondicionService
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
  it("check Sacceso-getCampos properties", done => {
    inject([SaccesoService], (saccesoService: SaccesoService) => {
      saccesoService
        .getCampos()
        .then(data => {
          const props = ["cod_campo", "nome_campo"];
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

  it("check Sacceso-sequencias data & properties", done => {
    inject([SaccesoService], (saccesoService: SaccesoService) => {
      saccesoService
        .getSequencias()
        .then(data => {
          const props = ["cod_sequencia", "campos" , "nome_sequencia" ];
          const propsData = Object.keys(data[0]);
          expect(props).toEqual(propsData)
          expect(data.length).toBeGreaterThan(1);
          done();
        })
        .catch(err => {
          console.log("error");
          console.log(JSON.stringify(err));
          done();
        });
    })();
  });


  it("PostCampo", done => {
    inject([SaccesoService], (saccesoService: SaccesoService) => {
      
      let testCampo = new Campo("xxx", "xxx");
      console.log({testCampo})
      saccesoService
        .postCampo(testCampo)
        .then(data => {
          console.log({data})

          expect(data.cod_campo).toEqual(testCampo.cod_campo)

          fetch(saccesoService.url + '/campo/' + testCampo.cod_campo, 
            { method: 'DELETE', 
            headers: {
              'Authorization': 'JWT ' + localStorage['token'].replace(`"`, ``).replace(`"`, ``)
              }
            })
            .then(data => {
              console.log({delete:data})
              done();
            })
          
        })
        .catch(err => {
          console.log("error");
          console.log(JSON.stringify(err));
          done();
        });
    })();
  });

    /*
  Test condicion service
  */

 it("check Condicion-camadas data & properties", done => {
  inject([CondicionService], (condicionService: CondicionService) => {
    condicionService
      .getCamadas()
      .then(data => {
        const props = ["cod_camada", "nome_camada" , "tipo_base_vendas"];
        const propsData = Object.keys(data[0]);
        expect(props).toEqual(propsData)
        expect(data.length).toBeGreaterThan(1);
        done();
      })
      .catch(err => {
        console.log("error");
        console.log(JSON.stringify(err));
        done();
      });
  })();
});


it("check Condicion-chavecontas data & properties", done => {
  inject([CondicionService], (condicionService: CondicionService) => {
    condicionService
      .getChaveContas()
      .then(data => {
        const props = ["cod_chavecontas", "desc_chavecontas"];
        const propsData = Object.keys(data[0]);
        expect(props).toEqual(propsData)
        expect(data.length).toBeGreaterThan(1);
        done();
      })
      .catch(err => {
        console.log("error");
        console.log(JSON.stringify(err));
        done();
      });
  })();
});


it("check Condicion-tipoValor data & properties", done => {
  inject([CondicionService], (condicionService: CondicionService) => {
    condicionService
      .getTiposValor()
      .then(data => {
        const props = ["cod_tipovalor", "desc_tipovalor"];
        const propsData = Object.keys(data[0]);
        expect(props).toEqual(propsData)
        expect(data.length).toBeGreaterThan(1);
        done();
      })
      .catch(err => {
        console.log("error");
        console.log(JSON.stringify(err));
        done();
      });
  })();
});

it("check Condicion-SecuenciaAcceso data & properties", done => {
  inject([CondicionService], (condicionService: CondicionService) => {
    condicionService
      .getSequenciasAcesso()
      .then(data => {
        const props = ["cod_sequencia", "campos" , "nome_sequencia" ];
        const propsData = Object.keys(data[0]);
        console.log(props,propsData);
        expect(props).toEqual(propsData);
        expect(data.length).toBeGreaterThan(1);
        done();
      })
      .catch(err => {
        console.log("error");
        console.log(JSON.stringify(err));
        done();
      });
  })();
});


it("check Condicion-SecuenciaAcceso data & properties", done => {
  inject([CondicionService], (condicionService: CondicionService) => {
    condicionService
      .getSequenciasAcesso()
      .then(data => {
        const props = ["cod_sequencia", "campos" , "nome_sequencia" ];
        const propsData = Object.keys(data[0]);
        console.log(props,propsData);
        expect(props).toEqual(propsData);
        expect(data.length).toBeGreaterThan(1);
        done();
      })
      .catch(err => {
        console.log("error");
        console.log(JSON.stringify(err));
        done();
      });
  })();
});


  // it("sacceso postSecuencia()", done => {
  //   inject([SaccesoService], (saccesoService: SaccesoService) => {
  //     // const component = new SaccesoComponent(saccesoService, new NgxSpinnerService);
  //     // console.log({saveSuccess: component.saveSuccess})
  //     const mock = spyOn(saccesoService, "postSequencia").and.returnValue(
  //       new Promise((resolve, reject) => {
  //         resolve();
  //       })
  //     );

  //     mock().then(data => {
  //       done();
  //     });
  //   })();
  // });
});

/*   it('sacceso postCampo()', done => {
    inject([SaccesoService], (saccesoService: SaccesoService) => {
      // const component = new SaccesoComponent(saccesoService, new NgxSpinnerService);
      // console.log({saveSuccess: component.saveSuccess})
      const mock = spyOn(saccesoService, 'postCampo').and.returnValue(
        new Promise((resolve, reject) => {
          resolve();
        })
      );

      mock().then(data => {
        done();
      });
    })();
  });

  it('sacceso getLastSequencia()', done => {
    inject([SaccesoService], (saccesoService: SaccesoService) => {
      saccesoService
        .getLastSequencia()
        .then(data => {
          const props = ['Cod_Sequencia', 'Nome_Sequencia', 'campos'];
          const keys = Object.keys(data);
          props.forEach(prop => {
            const exist = keys.some(key => key == prop);
            expect(exist).toBeTruthy();
          });

          done();
        })
        .catch(err => {
          console.log('error');
          console.log(JSON.stringify(err));
          done();
        });
    })();
  }); */

/*
  Test purchasePlanning service
  */

/*   it('purchasePlanningService planningData()', done => {
    inject(
      [PurchasePlanningService],
      (purchasePlanningService: PurchasePlanningService) => {
        purchasePlanningService.planningData.subscribe(event => {
          // done();
        });
      }
    )();
  }); */

/*
  Test esquema service
  */

/*   it('Esquema getMercadoria()', done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getMercadoria().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it('Esquema getEsquemaRelation()', done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getEsquema().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it('Esquema getFilial()', done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getFilial().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it('Esquema getFaturamento()', done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getFaturamento().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it('Esquema getEstado()', done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getEstado().then(data => {
        console.log(data);
        done();
      });
    })();
  });

  it('Esquema getRegion()', done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.getRegion().then(data => {
        console.log(data);
        done();
      });
    })();
  }); */

/*   it('Esquema fetchCondicaoCamadaEsquema(\'B\')', done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.fetchCondicaoCamadaEsquema('B').then(data => {
        console.log(data);
        done();
      });
    })();
  }); */

/*   it('Esquema fetchCondicaoCamadaEsquema(\'EC001\')', done => {
    inject([EsquemasService], (esquemasService: EsquemasService) => {
      esquemasService.fetchCondicaoCamadaEsquema('v').then(data => {
        console.log(data);
        done();
      });
    })();
  }); */

//
//
//
//
