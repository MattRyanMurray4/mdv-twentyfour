import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { WildComponent } from './wild/wild.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LoginComponent,
    WildComponent,
    ToolbarComponent
  ],
})
export class UiLibraryModule {}
