import { SaccesoService } from "./sacceso.service";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 10;

const verifyKey = ({ props, data, expect }) => {
  const keys = Object.keys(data);
  props.forEach(prop => {
    const exist = keys.some(key => key == prop);
    expect(exist).toBeTruthy();
  });
};

@Component({
  template: "",
  providers: [SaccesoService]
})
class ComponentService {
  constructor(public acesso: SaccesoService) {}
}

describe("SaccesoService", () => {
  let component: ComponentService;
  let fixture: ComponentFixture<ComponentService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentService],
      providers: [SaccesoService],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("getCampos", done => {
    component.acesso.getCampos().then(data => {
      const props = ["Cod_Campo", "Nome_Campo"];
      verifyKey({props, data: data[0], expect})
      done()
    })
  });

  it("getLastCampo", done => {
    component.acesso.getLastCampo().then(data => {
        console.log(data)
        const props = ["Cod_Campo", "Nome_Campo"];
        verifyKey({props, data, expect})
        done()
    })
  });

});
