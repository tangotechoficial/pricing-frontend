// import { TestBed, getTestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import { SimulatorService } from '@services/simulator.service';
// import { environment } from '@env/environment'

// xdescribe('SimulatorServiceService', () => {
//   let injector: TestBed;
//   let simulatorService: SimulatorService;
//   let mock: HttpTestingController;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpTestingController],
//       providers: [SimulatorService]
//     })

//     injector = getTestBed()
//     service = injector.get(SimulatorService)
//     mock = injector.get(HttpTestingController)
//   });

//   it('should be created', () => {
//     const service: SimulatorService = TestBed.get(SimulatorService);
//     expect(service).toBeTruthy();
//   });

//   describe('#data', () => {
//     const simulation = {
//       "results": []
//     }
//     const req = mock.expectOne(`${environment.apiUrl}/simulator`);

//   })
// });
