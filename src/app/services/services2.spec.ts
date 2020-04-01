import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";

import { SaccesoService } from "./sacceso.service";
import { AuthenticationService } from "./authentication.service";
import { JWTInterceptorHelper } from "@helpers/jwt.interceptor";

describe("Lang-interceptor.service", () => {
  // beforeEach(() =>
  //   TestBed.configureTestingModule({
  //     imports: [HttpClientTestingModule],
  //     providers: [
  //       {
  //         provide: HTTP_INTERCEPTORS,
  //         useClass: JWTInterceptorHelper,
  //         multi: true
  //       }
  //     ]
  //   })
  // );

  describe("intercept HTTP requests", () => {
    
    it("should add Accept-Language to Headers", done => {
    //   inject(
    //   [AuthenticationService, SaccesoService],
    //   (auth: AuthenticationService) => {
    //     const email = 'tester'
    //     const password = '@t@ng0@t3ch'
    //     auth.login(email, password).subscribe(event => {
    //       console.log({event})
    //       done()
    //     })
    //   }
    // )()
      
    inject(
      [ AuthenticationService, SaccesoService],
      (
        authenticationService: AuthenticationService,
        saccesoService: SaccesoService
      ) => {
        const email = 'tester'
        const password = '@t@ng0@t3ch'
        authenticationService.login(email, password).subscribe(event => {
          console.log({event})
          // saccesoService.getCampos().then(data => {
          //   const props = ["Cod_Campo", "Nome_Campo"];
          //   verifyKey({props, data: data[0], expect})
          //   done()
          // }).catch(err => {
          //   console.log(JSON.stringify(err))
          //   done()
          // })

          // camadaService.getCamadas().then(data => {
          //   console.log(data)
          //   done()
          // })
          // .catch(err => {
          //   console.log(JSON.stringify(err))
          // })
        })
      }
    )()
  
    });
  });

  
});
