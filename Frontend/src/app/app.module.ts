import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { CodeEditorComponent } from './pages/pen/components/code-editor/code-editor.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SettingComponent } from './pages/setting/setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PenHeaderComponent } from './pages/pen/components/header/header.component';
import { HomeCodeComponent } from './pages/pen/home-code.component';
import { TrendingComponent } from './pages/trending/trending.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FollowingComponent } from './pages/following/following.component';
import { ContentGridUserComponent } from './components/content-grid-user/content-grid-user.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { SearchComponent } from './components/search/search.component';
import { BodyFollowingTrendingComponent } from './components/body-following-trending/body-following-trending.component';
import { FooterComponent } from './components/footer/footer.component';
import { FollowingCenterComponent } from './pages/following/following-center/following-center.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PenHeaderComponent,
    CodeEditorComponent,
    LoginComponent,
    SignupComponent,
    SettingComponent,
    HomeCodeComponent,
    TrendingComponent,
    SidebarComponent,
    HeaderComponent,
    FollowingComponent,
    ContentGridUserComponent,
    SearchComponent,
    BodyFollowingTrendingComponent,
    FooterComponent,
    FollowingCenterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, data: {title: 'CodePen'} },
      // { path: '', component: CodeEditorComponent },
      { path: 'pen', component: HomeCodeComponent, data: {title: 'A Pen of you - Nhom XXX'} },
      { path: "login", component: LoginComponent, data: {title: 'Đăng nhập - Nhom XXX'}},
      { path: "signup", component: SignupComponent },
      { path: "trending", component: TrendingComponent},
      {path: "following", component: FollowingComponent},
    ]),
    NgbModule,
    MatSidenavModule, 
    MatToolbarModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }