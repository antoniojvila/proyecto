import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem("token");

    const authReq = req.clone({
        headers: req.headers.set('Authorization', "Bearer " + authToken as string)
    });
    
    return next.handle(authReq);
  }
}
