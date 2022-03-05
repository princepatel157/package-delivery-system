import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// components import
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CheckoutComponent,
    HistoryComponent,
  ],
  imports: [BrowserModule, HttpClientModule, NgbModule, FormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
