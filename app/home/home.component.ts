import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { isAndroid, isIOS, device } from "platform";
var appavailability = require("../nativescript-appavailability");
import { openUrl } from "tns-core-modules/utils/utils";
import { alert } from "ui/dialogs";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    isIOS: boolean = isIOS;

    constructor(private page: Page) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
    }

    onOpenTwitter(): void {
        let url, message;
        const urlScheme = this.isIOS ? "twitter://" : "com.twitter.android";
        
        /* 
        https://docs.nativescript.org/core-concepts/utils#openurl-function
        https://market.nativescript.org/plugins/nativescript-appavailability
        */

        appavailability.available(urlScheme).then((avail: boolean) => {
            console.log("App available? " + avail);
            if (avail) {
                message = "With nativescript-appavailability we determined you have the Twitter app installed, now opening it!";
                url = `twitter://user?screen_name=NativeScript`;
            } else {
                message = "With nativescript-appavailability we determined you don't have the Twitter app installed, so we're now loading Twitter in a browser instead.";
                url = "https://twitter.com/NativeScript";
            }
        })

        alert({
            title: "App Availability plugin FTW!",
            message: message,
            okButtonText: "Honestly I can't wait",
            cancelable: false
        }).then(() => {
            openUrl(url);
        });
    }

}
