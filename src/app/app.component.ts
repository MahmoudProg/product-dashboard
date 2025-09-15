import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentLang!: string;

  // constructor(private translate: TranslateService) {
    // }

    constructor(private translate: TranslateService, private renderer: Renderer2) {
      // إضافة اللغات المدعومة
    this.currentLang = translate.currentLang || 'en';
    this.translate.addLangs(['en', 'ar']);
    // اللغة الافتراضية
    const browserLang = translate.getBrowserLang() || 'en';
    this.translate.setDefaultLang(browserLang);
    this.translate.use(browserLang);
  }

  ngOnInit(): void {
    // عند تغيير اللغة، نغير الـ dir تلقائي
    this.translate.onLangChange.subscribe(event => {
      const dir = event.lang === 'ar' ? 'rtl' : 'ltr';
      this.renderer.setAttribute(document.body, 'dir', dir);
    });
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
