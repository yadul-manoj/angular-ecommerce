import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductPageComponent } from './product-page.component';
import { UserService } from '../../services/user.service';
import { ToastrModule} from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastrModule.forRoot(), HttpClientTestingModule],
      providers: [UserService],
      declarations: [ProductPageComponent]
    });
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
