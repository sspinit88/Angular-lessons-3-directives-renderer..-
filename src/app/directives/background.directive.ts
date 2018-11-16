// указываем ангуляру, что это директива
import {Directive, ElementRef, HostBinding, HostBinding, HostListener, OnInit, Renderer2, Input} from '@angular/core';

@Directive({
    selector: '[appBackground]'
})

// директива может пользоваться только OnInit или OnDestroy
// Renderer2 - позволяет автоматически определять где будет работать А
export class BackgroundDirective implements OnInit {

    // для изменения стиля лучше всего использовать @HostBinding
    @HostBinding('style.backgroundColor') background: string;
    @HostBinding('style.border') border: string;

    constructor(private element: ElementRef, private renderer: Renderer2) {

    }

    ngOnInit() {
        // console.log(this.element);
        // плохой подход - менять стиль напрямую через .nativeElement
        this.element.nativeElement.style.textTransform = 'uppercase';
        // верный подход (использовать Renderer2)
        // помещаем в поле класса элемент
        const {nativeElement} = this.element;
        this.renderer.setStyle(nativeElement, 'cursor', 'pointer');
    }

    @HostListener('mouseenter', ['$event']) mouseEnter(event: Event) {
        const {nativeElement} = this.element;
        this.renderer.addClass(nativeElement, 'color-white');
        // способ задать styles без обращения к renderer (через @HostBinding)
        this.background = 'red';
        this.border = '10px solid green';
    }

    @HostListener('mouseleave', ['$event']) mouseLeave(event: Event) {
        const {nativeElement} = this.element;
        this.renderer.removeClass(nativeElement, 'color-white');
        // способ задать styles без обращения к renderer (через @HostBinding)
        this.background = 'transparent';
        this.border = '10px solid transparent';
    }
}

// далее пример с передачей параметров

@Directive({
    selector: '[appBg]'
})

export class BgDirective implements OnInit {

    @Input('appBg') hoverColor: string;
    @Input('defaultColor') defColor: string;
    @HostBinding('style.background') bg: string;

    constructor(private  elem: ElementRef, rend: Renderer2) {

    }

    ngOnInit() {
        console.log(this.elem);
    }

    @HostListener('mouseenter', ['$event']) mouseEn(event: Event) {
        this.bg = this.hoverColor;
    }

    @HostListener('mouseleave', ['$event']) mouseLe(event: Event) {
        this.bg = this.defColor;
    }
}