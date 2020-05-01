

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuoteService } from 'app/main/e-commerce/quote/quote.service';

@Component({
    selector     : 'app-quote',
    templateUrl  : './quote.component.html',
    styleUrls    : ['./quote.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuoteComponent implements OnInit, OnDestroy
{
    quote: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _quoteService: QuoteService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._quoteService.quoteOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((invoice) => {
                this.quote = invoice;
            });

        console.log('Here');
        console.log(this.quote);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
